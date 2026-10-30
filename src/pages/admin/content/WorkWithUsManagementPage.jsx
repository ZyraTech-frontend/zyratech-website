import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import api from '../../../services/api';
import Loader from '../../../components/admin/shared/LoadingSpinner';
import { Save, Plus, Trash2, HelpCircle } from 'lucide-react';

const WorkWithUsManagementPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingField, setUploadingField] = useState(null); // Track which field is uploading
    const [activeTab, setActiveTab] = useState('hero');
    const [data, setData] = useState({
        hero: {},
        setup: [],
        projectSteps: [],
        collaboration: { points: [] },
        hiring: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await contentService.getWorkWithUs();
            console.log('Work With Us Response:', response);
            
            let workWithUsData = response;
            
            // If response is wrapped in data property
            if (response && response.data) {
                workWithUsData = response.data;
            }
            
            // Check if it's a single object (new backend format)
            if (workWithUsData && !Array.isArray(workWithUsData) && workWithUsData.id) {
                // New format: single object with content field
                const contentData = typeof workWithUsData.content === 'string' 
                    ? JSON.parse(workWithUsData.content) 
                    : workWithUsData.content || {};
                
                setData({
                    hero: {
                        title: workWithUsData.title || '',
                        subtitle: workWithUsData.subtitle || '',
                        description: workWithUsData.description || '',
                        image: workWithUsData.image || workWithUsData.imageUrl || ''
                    },
                    setup: contentData.setup || [],
                    projectSteps: contentData.projectSteps || [],
                    collaboration: contentData.collaboration || { 
                        title: '',
                        description: '',
                        image: '',
                        points: [] 
                    },
                    hiring: contentData.hiring || []
                });
            } 
            // If it's an array (old backend format)
            else if (Array.isArray(workWithUsData)) {
                const structuredData = {
                    hero: {},
                    setup: [],
                    projectSteps: [],
                    collaboration: { 
                        title: '',
                        description: '',
                        image: '',
                        points: [] 
                    },
                    hiring: []
                };

                workWithUsData.forEach(item => {
                    // Hero section
                    if (item.order === 0 || workWithUsData.indexOf(item) === 0) {
                        structuredData.hero = {
                            title: item.title || '',
                            subtitle: item.subtitle || '',
                            description: item.description || '',
                            image: item.image || item.imageUrl || ''
                        };
                    }
                    
                    // Try to parse content as JSON if it exists
                    if (item.content) {
                        try {
                            const parsedContent = typeof item.content === 'string' 
                                ? JSON.parse(item.content) 
                                : item.content;
                            
                            if (parsedContent.setup) {
                                structuredData.setup = parsedContent.setup;
                            }
                            if (parsedContent.projectSteps) {
                                structuredData.projectSteps = parsedContent.projectSteps;
                            }
                            if (parsedContent.collaboration) {
                                structuredData.collaboration = parsedContent.collaboration;
                            }
                            if (parsedContent.hiring) {
                                structuredData.hiring = parsedContent.hiring;
                            }
                        } catch (e) {
                            // content is not JSON, skip
                        }
                    }
                });
                
                setData(structuredData);
            } 
            // Object with proper structure (legacy format)
            else if (workWithUsData && !Array.isArray(workWithUsData)) {
                setData({
                    hero: workWithUsData.hero || {},
                    setup: workWithUsData.setup || [],
                    projectSteps: workWithUsData.projectSteps || [],
                    collaboration: workWithUsData.collaboration || { points: [] },
                    hiring: workWithUsData.hiring || []
                });
            } 
            // No data
            else {
                setData({
                    hero: {},
                    setup: [],
                    projectSteps: [],
                    collaboration: { points: [] },
                    hiring: []
                });
            }
        } catch (error) {
            console.error("Failed to fetch Work With Us data:", error);
            setData({
                hero: {},
                setup: [],
                projectSteps: [],
                collaboration: { points: [] },
                hiring: []
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (section) => {
        setSaving(true);
        try {
            // Get existing items to preserve the ID
            const existing = await contentService.getWorkWithUs();
            let items = existing?.data || existing || [];
            if (!Array.isArray(items)) {
                items = items ? [items] : [];
            }
            
            const existingItem = items.length > 0 ? items[0] : null;
            
            // Prepare the full data structure to save
            // Store setup, projectSteps, collaboration, hiring in the content field as JSON
            const contentData = {
                setup: data.setup,
                projectSteps: data.projectSteps,
                collaboration: data.collaboration,
                hiring: data.hiring
            };
            
            const payload = {
                section: 'work-with-us',
                title: data.hero?.title || '',
                subtitle: data.hero?.subtitle || '',
                description: data.hero?.description || '',
                image: data.hero?.image || null,
                content: JSON.stringify(contentData), // Store all other sections as JSON
                status: 'published',
                isVisible: true,
                order: 0
            };
            
            let response;
            if (existingItem && existingItem.id) {
                // Update existing
                response = await contentService.updateWorkWithUsItem(existingItem.id, payload);
            } else {
                // Create new
                response = await api.post('/admin/content/items', payload);
            }
            
            dispatch(openConfirmDialog({
                title: 'Success',
                message: 'Section updated successfully',
                hideCancelButton: true
            }));
            
            // Refresh data after save
            await fetchData();
        } catch (error) {
            console.error(`Failed to save ${section}:`, error);
            dispatch(openConfirmDialog({
                title: 'Error',
                message: 'Failed to save changes',
                hideCancelButton: true
            }));
        } finally {
            setSaving(false);
        }
    };

    const handleNestedChange = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (section, index, field, value) => {
        const newArray = [...data[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        setData(prev => ({ ...prev, [section]: newArray }));
    };

    const addItem = (section, template) => {
        setData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now(), ...template }]
        }));
    };

    const deleteItem = (section, index) => {
        const newArray = [...data[section]];
        newArray.splice(index, 1);
        setData(prev => ({ ...prev, [section]: newArray }));
    };

    // Specific handler for collaboration which is an object containing an array
    const handleCollaborationChange = (field, value) => {
        setData(prev => ({
            ...prev,
            collaboration: { ...prev.collaboration, [field]: value }
        }));
    };

    const handleCollaborationPointChange = (index, field, value) => {
        const newPoints = [...data.collaboration.points];
        newPoints[index] = { ...newPoints[index], [field]: value };
        setData(prev => ({
            ...prev,
            collaboration: { ...prev.collaboration, points: newPoints }
        }));
    };

    // Image upload handler for hero
    const handleHeroImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            dispatch(openConfirmDialog({
                title: 'Invalid File',
                message: 'Please upload an image file',
                hideCancelButton: true
            }));
            return;
        }

        try {
            setUploadingField('hero-image');
            const imageUrl = await contentService.uploadImage(file);
            handleNestedChange('hero', 'image', imageUrl);
        } catch (error) {
            console.error('Image upload failed:', error);
            dispatch(openConfirmDialog({
                title: 'Upload Failed',
                message: error.message || 'Failed to upload image',
                hideCancelButton: true
            }));
        } finally {
            setUploadingField(null);
        }
    };

    // Image upload handler for collaboration
    const handleCollaborationImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            dispatch(openConfirmDialog({
                title: 'Invalid File',
                message: 'Please upload an image file',
                hideCancelButton: true
            }));
            return;
        }

        try {
            setUploadingField('collaboration-image');
            const imageUrl = await contentService.uploadImage(file);
            handleCollaborationChange('image', imageUrl);
        } catch (error) {
            console.error('Image upload failed:', error);
            dispatch(openConfirmDialog({
                title: 'Upload Failed',
                message: error.message || 'Failed to upload image',
                hideCancelButton: true
            }));
        } finally {
            setUploadingField(null);
        }
    };

    if (loading) return <AdminLayout><Loader /></AdminLayout>;

    return (
        <AdminLayout>
            <div className="space-y-6 pb-20">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Work With Us Management</h1>
                </div>

                <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-1">
                    {['hero', 'setup', 'projectSteps', 'collaboration', 'hiring'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-[#004fa2] text-[#004fa2]' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                        </button>
                    ))}
                </div>

                {/* HERO TAB */}
                {activeTab === 'hero' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Hero Section</h2>
                        <Input label="Title" value={data.hero.title} onChange={(e) => handleNestedChange('hero', 'title', e.target.value)} />
                        <Input label="Subtitle" value={data.hero.subtitle} onChange={(e) => handleNestedChange('hero', 'subtitle', e.target.value)} />
                        <TextArea label="Description" value={data.hero.description} onChange={(e) => handleNestedChange('hero', 'description', e.target.value)} />
                        
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
                            {data.hero.image ? (
                                <div className="relative">
                                    <img 
                                        src={data.hero.image} 
                                        alt="Hero" 
                                        className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                                    />
                                    <button
                                        onClick={() => handleNestedChange('hero', 'image', '')}
                                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        title="Remove image"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleHeroImageUpload}
                                        disabled={uploadingField === 'hero-image'}
                                        className="hidden"
                                        id="hero-image-upload"
                                    />
                                    <label
                                        htmlFor="hero-image-upload"
                                        className={`flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                            uploadingField === 'hero-image'
                                                ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                                                : 'border-gray-300 hover:border-[#004fa2] hover:bg-[#004fa2]/5'
                                        }`}
                                    >
                                        {uploadingField === 'hero-image' ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 border-4 border-[#004fa2]/20 border-t-[#004fa2] rounded-full animate-spin" />
                                                <p className="text-sm text-gray-500">Uploading...</p>
                                            </div>
                                        ) : (
                                            <>
                                                <Plus className="mb-2 text-gray-400" size={40} />
                                                <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                                                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
                                            </>
                                        )}
                                    </label>
                                </div>
                            )}
                        </div>

                        <SaveButton onClick={() => handleSave('hero')} saving={saving} />
                    </div>
                )}

                {/* SETUP TAB */}
                {activeTab === 'setup' && (
                    <div className="space-y-6">
                        {data.setup.map((item, index) => (
                            <div key={item.id || index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                <button onClick={() => deleteItem('setup', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={18} />
                                </button>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input label="Title" value={item.title} onChange={(e) => handleArrayChange('setup', index, 'title', e.target.value)} />
                                    <Input label="Icon (Lucide Name)" value={item.icon} onChange={(e) => handleArrayChange('setup', index, 'icon', e.target.value)} />
                                    <div className="md:col-span-2">
                                        <TextArea label="Description" value={item.description} onChange={(e) => handleArrayChange('setup', index, 'description', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <button onClick={() => addItem('setup', { title: 'New Point', description: '', icon: 'CheckCircle' })} className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline">
                                <Plus size={18} /> Add Point
                            </button>
                            <SaveButton onClick={() => handleSave('setup')} saving={saving} />
                        </div>
                    </div>
                )}

                {/* PROJECT STEPS TAB */}
                {activeTab === 'projectSteps' && (
                    <div className="space-y-6">
                        {data.projectSteps.map((item, index) => (
                            <div key={item.id || index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                <button onClick={() => deleteItem('projectSteps', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={18} />
                                </button>
                                <div className="space-y-4">
                                    <Input label="Title" value={item.title} onChange={(e) => handleArrayChange('projectSteps', index, 'title', e.target.value)} />
                                    <TextArea label="Description" value={item.description} onChange={(e) => handleArrayChange('projectSteps', index, 'description', e.target.value)} />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <button onClick={() => addItem('projectSteps', { title: 'New Step', description: '' })} className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline">
                                <Plus size={18} /> Add Step
                            </button>
                            <SaveButton onClick={() => handleSave('projectSteps')} saving={saving} />
                        </div>
                    </div>
                )}

                {/* COLLABORATION TAB */}
                {activeTab === 'collaboration' && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-semibold text-lg">Main Content</h3>
                            <Input label="Title" value={data.collaboration.title} onChange={(e) => handleCollaborationChange('title', e.target.value)} />
                            <TextArea label="Description" value={data.collaboration.description} onChange={(e) => handleCollaborationChange('description', e.target.value)} />
                            
                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Image</label>
                                {data.collaboration.image ? (
                                    <div className="relative">
                                        <img 
                                            src={data.collaboration.image} 
                                            alt="Collaboration" 
                                            className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
                                        />
                                        <button
                                            onClick={() => handleCollaborationChange('image', '')}
                                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            title="Remove image"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCollaborationImageUpload}
                                            disabled={uploadingField === 'collaboration-image'}
                                            className="hidden"
                                            id="collaboration-image-upload"
                                        />
                                        <label
                                            htmlFor="collaboration-image-upload"
                                            className={`flex flex-col items-center justify-center w-full max-w-md h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                                uploadingField === 'collaboration-image'
                                                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
                                                    : 'border-gray-300 hover:border-[#004fa2] hover:bg-[#004fa2]/5'
                                            }`}
                                        >
                                            {uploadingField === 'collaboration-image' ? (
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-8 h-8 border-4 border-[#004fa2]/20 border-t-[#004fa2] rounded-full animate-spin" />
                                                    <p className="text-sm text-gray-500">Uploading...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    <Plus className="mb-2 text-gray-400" size={40} />
                                                    <p className="text-sm text-gray-600 font-medium">Click to upload image</p>
                                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (max 5MB)</p>
                                                </>
                                            )}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg px-2">Collaboration Points</h3>
                            {data.collaboration.points.map((point, index) => (
                                <div key={point.id || index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                    <button 
                                        onClick={() => {
                                            const newPoints = [...data.collaboration.points];
                                            newPoints.splice(index, 1);
                                            setData(prev => ({
                                                ...prev,
                                                collaboration: { ...prev.collaboration, points: newPoints }
                                            }));
                                        }} 
                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Number" value={point.number} onChange={(e) => handleCollaborationPointChange(index, 'number', e.target.value)} />
                                        <Input label="Title" value={point.title} onChange={(e) => handleCollaborationPointChange(index, 'title', e.target.value)} />
                                        <Input label="Icon (Users, Target, or Handshake)" value={point.icon} onChange={(e) => handleCollaborationPointChange(index, 'icon', e.target.value)} />
                                        <div className="md:col-span-2">
                                            <TextArea label="Description" value={point.description} onChange={(e) => handleCollaborationPointChange(index, 'description', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    const newPoint = {
                                        id: Date.now(),
                                        number: String(data.collaboration.points.length + 1),
                                        title: 'New Point',
                                        icon: 'Users',
                                        description: ''
                                    };
                                    setData(prev => ({
                                        ...prev,
                                        collaboration: {
                                            ...prev.collaboration,
                                            points: [...prev.collaboration.points, newPoint]
                                        }
                                    }));
                                }}
                                className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline"
                            >
                                <Plus size={18} /> Add Collaboration Point
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <SaveButton onClick={() => handleSave('collaboration')} saving={saving} />
                        </div>
                    </div>
                )}

                {/* HIRING TAB */}
                {activeTab === 'hiring' && (
                    <div className="space-y-6">
                        {data.hiring.map((item, index) => (
                            <div key={item.id || index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                <button onClick={() => deleteItem('hiring', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={18} />
                                </button>
                                <div className="space-y-4">
                                    <Input label="Step Title" value={item.title} onChange={(e) => handleArrayChange('hiring', index, 'title', e.target.value)} />
                                    <TextArea label="Description" value={item.description} onChange={(e) => handleArrayChange('hiring', index, 'description', e.target.value)} />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <button onClick={() => addItem('hiring', { title: 'New Step', description: '' })} className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline">
                                <Plus size={18} /> Add Hiring Step
                            </button>
                            <SaveButton onClick={() => handleSave('hiring')} saving={saving} />
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

const Input = ({ label, value, onChange, type = 'text' }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            value={value || ''}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-colors"
        />
    </div>
);

const TextArea = ({ label, value, onChange }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <textarea
            value={value || ''}
            onChange={onChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-colors resize-y"
        />
    </div>
);

const SaveButton = ({ onClick, saving }) => (
    <button
        onClick={onClick}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
    >
        {saving ? (
            <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
            </>
        ) : (
            <>
                <Save size={18} />
                Save Changes
            </>
        )}
    </button>
);

export default WorkWithUsManagementPage;

