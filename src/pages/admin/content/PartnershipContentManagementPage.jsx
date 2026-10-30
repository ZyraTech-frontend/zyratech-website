
/**
 * Partnership Page Content Management
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Save, Loader, Plus, Edit2, Trash2, X,
    Layout, Info, BookOpen, Handshake
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import LinkPicker from '../../../components/admin/common/LinkPicker';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

// --- Sub-components (defined outside to preserve focus) ---

const HeroForm = ({ data, onChange, onSubmit, saving, onImageUpload, uploading, canCreateContent, handlePermissionDenied }) => {
    const handleFileClick = () => {
        document.getElementById('partnership-hero-upload').click();
    };

    return (
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Partnership Hero</h3>
            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input className="w-full px-4 py-2 border rounded-lg" name="title" value={data.title || ''} onChange={onChange} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Subtitle</label>
                <input className="w-full px-4 py-2 border rounded-lg" name="subtitle" value={data.subtitle || ''} onChange={onChange} />
            </div>
            
            {/* File Upload for Background Image */}
            <div>
                <label className="block text-sm font-medium mb-2">Background Image (Upload)</label>
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#004fa2] transition-colors cursor-pointer"
                    onClick={handleFileClick}
                    style={{ opacity: uploading ? 0.6 : 1, pointerEvents: uploading ? 'none' : 'auto' }}
                >
                    <input 
                        id="partnership-hero-upload"
                        type="file" 
                        accept="image/*" 
                        onChange={onImageUpload}
                        disabled={uploading}
                        className="hidden" 
                    />
                    <div className="flex flex-col items-center justify-center">
                        {uploading ? (
                            <>
                                <div className="w-8 h-8 text-[#004fa2] mb-2 animate-spin">
                                    <svg className="animate-spin h-8 w-8 text-[#004fa2]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-gray-700">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                            </>
                        )}
                    </div>
                </div>
                {data.backgroundImage && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 mb-2">Preview:</p>
                        <img 
                            decoding="async"
                            src={data.backgroundImage} 
                            alt="Preview" 
                            loading="lazy"
                            className="w-full h-48 object-cover rounded"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="border-t pt-4">
                <h4 className="text-md font-semibold text-gray-800 mb-4">Call-to-Action Buttons</h4>
                
                {/* CTA 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Button 1 Text</label>
                        <input 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20"
                            name="cta1Text"
                            placeholder="e.g. Become a Partner"
                            value={data.cta1Text || ''}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Button 1 Link</label>
                        <LinkPicker 
                            value={data.cta1Link || ''}
                            onChange={(link) => onChange({ target: { name: 'cta1Link', value: link } })}
                            placeholder="Select or paste a link"
                        />
                    </div>
                </div>

                {/* CTA 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Button 2 Text</label>
                        <input 
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#004fa2]/20"
                            name="cta2Text"
                            placeholder="e.g. Learn More"
                            value={data.cta2Text || ''}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Button 2 Link</label>
                        <LinkPicker 
                            value={data.cta2Link || ''}
                            onChange={(link) => onChange({ target: { name: 'cta2Link', value: link } })}
                            placeholder="Select or paste a link"
                        />
                    </div>
                </div>
            </div>
            
            <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4">
                {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} 
                Save Hero
            </button>
        </form>
    );
};

const ImpactStatsManager = ({ stats, setStats, canCreateContent, handlePermissionDenied }) => {
    const handleStatChange = (id, field, value) => {
        setStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSave = async (stat) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        await contentService.updateImpactStat(stat.id, stat);
        // Show success toast?
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Impact Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map(stat => (
                    <div key={stat.id} className="p-4 border rounded-lg bg-gray-50 space-y-3">
                        <div className="flex justify-between items-center"><span className="font-semibold text-gray-500">Stat #{stat.id}</span> <button onClick={() => handleSave(stat)} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Save</button></div>
                        <div><label className="block text-xs font-medium mb-1">Number</label><input className="w-full px-3 py-1.5 border rounded" value={stat.number} onChange={(e) => handleStatChange(stat.id, 'number', e.target.value)} /></div>
                        <div><label className="block text-xs font-medium mb-1">Suffix</label><input className="w-full px-3 py-1.5 border rounded" value={stat.suffix} onChange={(e) => handleStatChange(stat.id, 'suffix', e.target.value)} /></div>
                        <div><label className="block text-xs font-medium mb-1">Label</label><input className="w-full px-3 py-1.5 border rounded" value={stat.label} onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)} /></div>
                    </div>
                ))}
            </div>
            <p className="text-sm text-gray-500 italic">Click "Save" on each card to update individually.</p>
        </div>
    );
};

const WhyPartnerManager = ({ whyPartners, setWhyPartners, dispatch, navigate, canCreateContent, handlePermissionDenied }) => {
    const [formData, setFormData] = useState({ title: '', description: '' });
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const { logAction } = useActivityLogger();

    const handleAdd = () => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        setFormData({ title: '', description: '' });
        setEditingId(null);
    };

    const handleEdit = (item) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        setFormData({ title: item.title, description: item.description });
        setEditingId(item.id);
    };

    const handleSave = async () => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        if (!formData.title || !formData.description) return;
        
        setSaving(true);
        try {
            if (editingId) {
                // Update existing - pass id and data separately
                await contentService.updateWhyPartner(editingId, formData);
                setWhyPartners(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } : p));
                logAction({
                    type: 'content_updated',
                    severity: 'info',
                    description: `Updated why partner reason: "${formData.title}"`,
                    details: { contentType: 'WhyPartner', contentId: editingId }
                });
            } else {
                // Create new
                await contentService.createWhyPartner(formData);
                const res = await contentService.getWhyPartner();
                setWhyPartners(res.data);
                logAction({
                    type: 'content_created',
                    severity: 'success',
                    description: `Created new why partner reason: "${formData.title}"`,
                    details: { contentType: 'WhyPartner' }
                });
            }
            setFormData({ title: '', description: '' });
            setEditingId(null);
        } catch (error) {
            console.error('Error saving why partner:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (item) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        dispatch(openConfirmDialog({
            title: 'Delete Reason',
            message: `Remove "${item.title}" from why partner reasons?`,
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteWhyPartner(item.id);
                    setWhyPartners(prev => prev.filter(p => p.id !== item.id));
                    logAction({
                        type: 'content_deleted',
                        severity: 'warning',
                        description: `Deleted why partner reason: "${item.title}"`,
                        details: { contentType: 'WhyPartner', contentId: item.id }
                    });
                } catch (error) {
                    console.error('Error deleting:', error);
                }
            }
        }));
    };

    return (
        <div className="space-y-6">
            {/* Add/Edit Form */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-gray-800">{editingId ? 'Edit' : 'Add New'} Why Partner Reason</h3>
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input 
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Mission Alignment"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                        className="w-full px-4 py-2 border rounded-lg"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe this partnership benefit..."
                        rows={4}
                    />
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handleSave}
                        disabled={saving || !formData.title || !formData.description}
                        className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                        {editingId ? 'Update' : 'Add'}
                    </button>
                    {editingId && (
                        <button 
                            onClick={() => { setFormData({ title: '', description: '' }); setEditingId(null); }}
                            className="px-6 py-2 border border-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* List of Reasons */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Why Partner Reasons</h3>
                {whyPartners.length === 0 ? (
                    <p className="text-gray-500 italic">No reasons added yet.</p>
                ) : (
                    <div className="space-y-3">
                        {whyPartners.map(partner => (
                            <div key={partner.id} className="flex justify-between items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{partner.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{partner.description}</p>
                                </div>
                                <div className="flex gap-2 ml-4 shrink-0">
                                    <button 
                                        onClick={() => handleEdit(partner)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(partner)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Simple Stories Manager Component (removed modal, uses navigation)
const StoriesManager = ({ stories, setStories, dispatch, navigate, canCreateContent, handlePermissionDenied }) => {
    const { logAction } = useActivityLogger();

    const handleDelete = (item) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        dispatch(openConfirmDialog({
            title: 'Delete Story',
            message: 'Are you sure?',
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                await contentService.deletePartnershipStory(item.id);
                setStories(prev => prev.filter(s => s.id !== item.id));
                logAction({
                    type: 'content_deleted',
                    severity: 'warning',
                    description: `Deleted partnership story: "${item.title}"`,
                    details: { contentType: 'PartnershipStory', contentId: item.id }
                });
            }
        }));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Partnership Stories</h3>
                <button 
                    onClick={() => navigate('/admin/content/partnership/story/add')}
                    className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors"
                >
                    <Plus size={16} /> Add Story
                </button>
            </div>
            <div className="space-y-4">
                {stories.length === 0 ? (
                    <p className="text-gray-500 italic">No stories found.</p>
                ) : (
                    stories.map(s => (
                        <div key={s.id} className="bg-white p-4 rounded-xl border flex justify-between items-start shadow-sm">
                            <div className="flex-1 pr-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-gray-900">{s.title}</h4>
                                    {s.category && (
                                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                            {s.category}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
                                {s.impact && (
                                    <p className="text-xs text-gray-500">
                                        <span className="font-semibold">Impact:</span> {s.impact}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => navigate(`/admin/content/partnership/story/edit/${s.id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(s)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const PartnershipContentManagementPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userPermissions } = useAuth();

    // Permission checks
    const canCreateContent = userPermissions?.includes('content') ?? false;
    const handlePermissionDenied = () => {
        dispatch(addNotification({
            type: 'error',
            title: 'Permission Required',
            message: 'You do not have permission to manage this content.',
            description: 'Contact Super Admin at admin@zyratechhub.com',
            duration: 6000
        }));
    };
    const [activeTab, setActiveTab] = useState('hero');
    const [loading, setLoading] = useState(true);
    const [uploadingHero, setUploadingHero] = useState(false);

    // Data States
    const [heroData, setHeroData] = useState({});
    const [whyPartner, setWhyPartner] = useState([]);
    const [stories, setStories] = useState([]);
    const [recognition, setRecognition] = useState([]);

    const [savingHero, setSavingHero] = useState(false);
    const [savingWhy, setSavingWhy] = useState(false);

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        try {
            setLoading(true);
            const [hero, why, storiesRes] = await Promise.all([
                contentService.getPartnershipHero(),
                contentService.getWhyPartner(),
                contentService.getPartnershipStories()
            ]);
            setHeroData(hero.data);
            setWhyPartner(why.data);
            setStories(storiesRes.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleHeroImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // File validation
        if (file.size > 5 * 1024 * 1024) {
            dispatch(openConfirmDialog({
                title: 'Error',
                message: 'File must be smaller than 5MB',
                confirmText: 'OK',
                hideCancelButton: true
            }));
            return;
        }

        try {
            setUploadingHero(true);
            const imageUrl = await contentService.uploadImage(file);
            setHeroData(prev => ({
                ...prev,
                backgroundImage: imageUrl
            }));
        } catch (err) {
            console.error('Error uploading image:', err);
            dispatch(openConfirmDialog({
                title: 'Error',
                message: err.message || 'Failed to upload image',
                confirmText: 'OK',
                hideCancelButton: true
            }));
        } finally {
            setUploadingHero(false);
        }
    };

    const handleHeroSubmit = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        setSavingHero(true);
        await contentService.updatePartnershipHero(heroData);
        setSavingHero(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Hero updated', confirmText: 'OK', hideCancelButton: true }));
    };

    const handleWhySubmit = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        setSavingWhy(true);
        await contentService.updateWhyPartner(whyPartner);
        setSavingWhy(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Why Partner updated', confirmText: 'OK', hideCancelButton: true }));
    };

    if (loading) return <AdminLayout><div className="h-64 flex items-center justify-center"><Loader className="animate-spin text-[#004fa2]" size={32} /></div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Handshake className="text-blue-600" size={22} />
                    </div>
                    Partnership Content
                </h1>
                <p className="text-sm text-gray-500 mt-1 ml-[52px]">Manage Partnership Page sections</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Tabs */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-1">
                        {[
                            { id: 'hero', label: 'Hero Section', icon: Layout },
                            { id: 'why', label: 'Why Partner', icon: Info },
                            { id: 'stories', label: 'Success Stories', icon: BookOpen },
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 font-medium text-sm ${activeTab === tab.id
                                        ? 'bg-[#004fa2] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#004fa2]'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {activeTab === 'hero' && <HeroForm data={heroData} onChange={(e) => setHeroData({ ...heroData, [e.target.name]: e.target.value })} onSubmit={handleHeroSubmit} saving={savingHero} onImageUpload={handleHeroImageUpload} uploading={uploadingHero} canCreateContent={canCreateContent} handlePermissionDenied={handlePermissionDenied} />}
                    {activeTab === 'why' && <WhyPartnerManager whyPartners={whyPartner} setWhyPartners={setWhyPartner} dispatch={dispatch} navigate={navigate} canCreateContent={canCreateContent} handlePermissionDenied={handlePermissionDenied} />}
                    {activeTab === 'stories' && <StoriesManager stories={stories} setStories={setStories} dispatch={dispatch} navigate={navigate} canCreateContent={canCreateContent} handlePermissionDenied={handlePermissionDenied} />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default PartnershipContentManagementPage;
