import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import Loader from '../../../components/admin/shared/LoadingSpinner';
import { Save, Plus, Trash2, HelpCircle } from 'lucide-react';

const WorkWithUsManagementPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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
            const response = await contentService.getWorkWithUs();
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch Work With Us data:", error);
            setLoading(false);
        }
    };

    const handleSave = async (section) => {
        setSaving(true);
        try {
            await contentService.updateWorkWithUs(section, data[section]);
            dispatch(openConfirmDialog({
                title: 'Success',
                message: 'Section updated successfully',
                hideCancelButton: true
            }));
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
                        <Input label="Image URL" value={data.hero.image} onChange={(e) => handleNestedChange('hero', 'image', e.target.value)} />

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
                            <Input label="Image URL" value={data.collaboration.image} onChange={(e) => handleCollaborationChange('image', e.target.value)} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg px-2">Collaboration Points</h3>
                            {data.collaboration.points.map((point, index) => (
                                <div key={point.id || index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Number" value={point.number} onChange={(e) => handleCollaborationPointChange(index, 'number', e.target.value)} />
                                        <Input label="Title" value={point.title} onChange={(e) => handleCollaborationPointChange(index, 'title', e.target.value)} />
                                        <Input label="Icon" value={point.icon} onChange={(e) => handleCollaborationPointChange(index, 'icon', e.target.value)} />
                                        <div className="md:col-span-2">
                                            <TextArea label="Description" value={point.description} onChange={(e) => handleCollaborationPointChange(index, 'description', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
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
