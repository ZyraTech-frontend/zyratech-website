
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Save, Loader, Plus, Edit2, Trash2,
    Layout, Target, MapPin, Flag, Clock,
    Users, TrendingUp, CheckCircle, Globe, Quote
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

// --- Sub-components (inline forms for unchanging sections) ---

const HeroForm = ({ data, onSubmit, onChange, saving, onImageUpload, uploading }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Hero Section</h3>
        <div><label className="block text-sm font-medium mb-1">Title</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="title" value={data.title || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Highlight (Blue)</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="highlight" value={data.highlight || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="description" value={data.description || ''} onChange={onChange} rows={3} /></div>
        
        {/* Image Upload */}
        <div>
            <label className="block text-sm font-medium mb-2">Background Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#004fa2] transition-colors cursor-pointer" onClick={() => !uploading && document.getElementById('hero-image-upload').click()} style={{ opacity: uploading ? 0.6 : 1, pointerEvents: uploading ? 'none' : 'auto' }}>
                <input id="hero-image-upload" type="file" accept="image/*" onChange={onImageUpload} disabled={uploading} className="hidden" />
                <div className="flex flex-col items-center justify-center">
                    {uploading ? (
                        <>
                            <Loader className="w-8 h-8 text-[#004fa2] mb-2 animate-spin" />
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
                <div className="mt-3 p-2 border rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-600 mb-2">Preview:</p>
                    <img src={data.backgroundImage} alt="Background preview" className="w-full h-40 rounded-lg object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
            )}
        </div>

        <button type="submit" disabled={saving || uploading} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4 transition-colors hover:bg-[#003d7a] disabled:opacity-50">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Hero</button>
    </form>
);

const MissionForm = ({ data, onSubmit, onChange, saving }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Mission Section</h3>
        <div><label className="block text-sm font-medium mb-1">Title</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="title" value={data.title || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Content</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="content" value={data.content || ''} onChange={onChange} rows={4} /></div>
        <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4 transition-colors hover:bg-[#003d7a] disabled:opacity-50">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Mission</button>
    </form>
);

const WhyGhanaForm = ({ data, onSubmit, onChange, saving }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Why Ghana Section</h3>
        <div><label className="block text-sm font-medium mb-1">Title</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="title" value={data.title || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Paragraph 1</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="content1" value={data.content1 || ''} onChange={onChange} rows={3} /></div>
        <div><label className="block text-sm font-medium mb-1">Paragraph 2</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="content2" value={data.content2 || ''} onChange={onChange} rows={3} /></div>
        <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Link Text</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="linkText" value={data.linkText || ''} onChange={onChange} /></div>
            <div><label className="block text-sm font-medium mb-1">Link URL</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="linkUrl" value={data.linkUrl || ''} onChange={onChange} /></div>
        </div>
        <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4 transition-colors hover:bg-[#003d7a] disabled:opacity-50">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Why Ghana</button>
    </form>
);

const AboutQuoteForm = ({ data, onSubmit, onChange, saving }) => {
    // Available images from public/images folder
    const AVAILABLE_IMAGES = [
        '/images/Dalene.webp',
        '/images/kal.webp',
        '/images/masco.webp',
        '/images/hero1.webp',
        '/images/hero2.webp',
        '/images/hero3.webp',
        '/images/hero4.webp',
        '/images/hero5.webp',
        '/images/image1.webp',
        '/images/image2.webp',
        '/images/image3.webp',
    ];

    // Available statistic labels (common ones)
    const STATISTIC_LABELS = [
        'Founded',
        'Trainees',
        'Location',
        'Team Members',
        'Projects',
        'Years',
        'Clients',
        'Offices',
        'Partners',
        'Students',
        'Courses',
        'Countries'
    ];

    return (
        <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Mission & About Quote</h3>
            <div><label className="block text-sm font-medium mb-1">Mission Quote</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="quote" value={data.quote || ''} onChange={onChange} rows={4} /></div>
            
            <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Author Name</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="authorName" value={data.authorName || ''} onChange={onChange} /></div>
                <div><label className="block text-sm font-medium mb-1">Author Title</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="authorTitle" value={data.authorTitle || ''} onChange={onChange} /></div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Author Image (Select from available images)</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="authorImage" value={data.authorImage || ''} onChange={onChange}>
                    <option value="">-- Choose an image --</option>
                    {AVAILABLE_IMAGES.map(img => (
                        <option key={img} value={img}>{img.split('/').pop()}</option>
                    ))}
                </select>
                {data.authorImage && (
                    <div className="mt-2 p-2 border rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-600 mb-2">Preview:</p>
                        <img src={data.authorImage} alt="Author preview" className="w-20 h-20 rounded-lg object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }} />
                    </div>
                )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4">Key Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Statistic 1 Value</label>
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="stat1Value" value={data.stat1Value || ''} onChange={onChange} placeholder="e.g. 2024" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Statistic 1 Label</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="stat1Label" value={data.stat1Label || ''} onChange={onChange}>
                            <option value="">-- Select label --</option>
                            {STATISTIC_LABELS.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Statistic 2 Value</label>
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="stat2Value" value={data.stat2Value || ''} onChange={onChange} placeholder="e.g. 50+" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Statistic 2 Label</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="stat2Label" value={data.stat2Label || ''} onChange={onChange}>
                            <option value="">-- Select label --</option>
                            {STATISTIC_LABELS.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Statistic 3 Value</label>
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="stat3Value" value={data.stat3Value || ''} onChange={onChange} placeholder="e.g. 1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Statistic 3 Label</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="stat3Label" value={data.stat3Label || ''} onChange={onChange}>
                            <option value="">-- Select label --</option>
                            {STATISTIC_LABELS.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4 transition-colors hover:bg-[#003d7a] disabled:opacity-50">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Quote & Statistics</button>
        </form>
    );
};

// Simple Milestone Manager Component (removed modal, uses navigation)
const MilestonesManager = ({ milestones, setMilestones, dispatch, navigate, canCreateContent, handlePermissionDenied }) => {
    const { logAction } = useActivityLogger();

    const handleDelete = (item) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        dispatch(openConfirmDialog({
            title: 'Delete Milestone',
            message: 'Are you sure?',
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteMilestone(item.id);
                    setMilestones(prev => prev.filter(m => m.id !== item.id));
                    logAction({
                        type: 'content_deleted',
                        severity: 'warning',
                        description: `Deleted milestone: "${item.title}"`,
                        details: { contentType: 'Milestone', contentId: item.id }
                    });
                } catch (e) { console.error(e); }
            }
        }));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Milestones List</h3>
                <button 
                    onClick={() => navigate('/admin/content/about-page/milestone/add')}
                    className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors"
                >
                    <Plus size={16} /> Add Milestone
                </button>
            </div>
            <div className="space-y-4">
                {milestones.length === 0 ? (
                    <p className="text-gray-500 italic">No milestones found.</p>
                ) : (
                    milestones.map(m => (
                        <div key={m.id} className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm">
                            <div className="flex-1 pr-4">
                                <h4 className="font-bold text-gray-900">{m.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">{m.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => navigate(`/admin/content/about-page/milestone/edit/${m.id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(m)}
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

// Simple Timeline Manager Component (removed modal, uses navigation)
const TimelineManager = ({ timeline, setTimeline, dispatch, navigate, canCreateContent, handlePermissionDenied }) => {
    const { logAction } = useActivityLogger();

    const handleDelete = (item) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        dispatch(openConfirmDialog({
            title: 'Delete Timeline Item',
            message: 'Are you sure?',
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteTimelineItem(item.id);
                    setTimeline(prev => prev.filter(t => t.id !== item.id));
                    logAction({
                        type: 'content_deleted',
                        severity: 'warning',
                        description: `Deleted timeline item: "${item.title}"`,
                        details: { contentType: 'TimelineItem', contentId: item.id }
                    });
                } catch (e) { console.error(e); }
            }
        }));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Timeline Items</h3>
                <button 
                    onClick={() => { if (!canCreateContent) { handlePermissionDenied(); return; } navigate('/admin/content/about-page/timeline/add'); }}
                    className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors"
                >
                    <Plus size={16} /> Add Item
                </button>
            </div>
            <div className="space-y-4">
                {timeline.length === 0 ? (
                    <p className="text-gray-500 italic">No timeline items found.</p>
                ) : (
                    timeline.map(t => (
                        <div key={t.id} className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm">
                            <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-blue-100 text-[#004fa2] text-xs font-bold px-2 py-0.5 rounded">{t.year}</span>
                                    <h4 className="font-bold text-gray-900">{t.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-1">{t.desc}</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => navigate(`/admin/content/about-page/timeline/edit/${t.id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(t)}
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

// --- Main Page Component ---
const AboutPageManagementPage = () => {
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

    // Data States
    const [heroData, setHeroData] = useState({});
    const [missionData, setMissionData] = useState({});
    const [whyGhanaData, setWhyGhanaData] = useState({});
    const [quoteData, setQuoteData] = useState({});
    const [milestones, setMilestones] = useState([]);
    const [timeline, setTimeline] = useState([]);

    // Loading States for Saving Forms
    const [savingHero, setSavingHero] = useState(false);
    const [savingMission, setSavingMission] = useState(false);
    const [savingWhyGhana, setSavingWhyGhana] = useState(false);
    const [savingQuote, setSavingQuote] = useState(false);
    const [uploadingHero, setUploadingHero] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [hero, mission, why, quote, milestonesRes, timelineRes] = await Promise.all([
                contentService.getAboutHero(),
                contentService.getMission(),
                contentService.getWhyGhana(),
                contentService.getAboutQuote(),
                contentService.getMilestones(),
                contentService.getTimeline()
            ]);

            setHeroData(hero.data);
            setMissionData(mission.data);
            setWhyGhanaData(why.data);
            setQuoteData(quote.data);
            setMilestones(milestonesRes.data);
            setTimeline(timelineRes.data);
        } catch (error) {
            console.error("Error fetching about page data", error);
        } finally {
            setLoading(false);
        }
    };

    // Generic Handlers
    const handleHeroChange = (e) => setHeroData({ ...heroData, [e.target.name]: e.target.value });
    const handleHeroSubmit = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        setSavingHero(true);
        await contentService.updateAboutHero(heroData);
        setSavingHero(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Hero section saved.', confirmText: 'OK', hideCancelButton: true }));
    };

    const handleMissionChange = (e) => setMissionData({ ...missionData, [e.target.name]: e.target.value });
    const handleMissionSubmit = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        setSavingMission(true);
        await contentService.updateMission(missionData);
        setSavingMission(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Mission section saved.', confirmText: 'OK', hideCancelButton: true }));
    };

    const handleWhyGhanaChange = (e) => setWhyGhanaData({ ...whyGhanaData, [e.target.name]: e.target.value });
    const handleWhyGhanaSubmit = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        setSavingWhyGhana(true);
        await contentService.updateWhyGhana(whyGhanaData);
        setSavingWhyGhana(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Why Ghana section saved.', confirmText: 'OK', hideCancelButton: true }));
    };

    // Image Upload Handler for Hero Background
    const handleHeroImageUpload = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        const file = e.target.files?.[0];
        if (!file) return;

        // File validation
        if (file.size > 5 * 1024 * 1024) {
            dispatch(openConfirmDialog({ title: 'Error', message: 'File must be smaller than 5MB', confirmText: 'OK', hideCancelButton: true }));
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
            dispatch(openConfirmDialog({ title: 'Error', message: err.message || 'Failed to upload image', confirmText: 'OK', hideCancelButton: true }));
        } finally {
            setUploadingHero(false);
        }
    };

    const handleQuoteChange = (e) => setQuoteData({ ...quoteData, [e.target.name]: e.target.value });
    const handleQuoteSubmit = async (e) => {
        if (!canCreateContent) { handlePermissionDenied(); return; }
        e.preventDefault();
        setSavingQuote(true);
        try {
            await contentService.updateAboutQuote(quoteData);
            dispatch(openConfirmDialog({ title: 'Success', message: 'Mission & statistics saved.', confirmText: 'OK', hideCancelButton: true }));
        } catch (error) {
            console.error('Error saving quote:', error);
            dispatch(openConfirmDialog({ title: 'Error', message: 'Failed to save quote', confirmText: 'OK', hideCancelButton: true }));
        } finally {
            setSavingQuote(false);
        }
    };

    if (loading) return (
        <AdminLayout>
            <div className="h-64 flex items-center justify-center">
                <Loader className="animate-spin text-[#004fa2]" size={32} />
            </div>
        </AdminLayout>
    );

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Layout className="text-blue-600" size={22} />
                    </div>
                    About Page Management
                </h1>
                <p className="text-sm text-gray-500 mt-1 ml-[52px]">Manage content for sections on the public About page</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation for Tabs */}
                <div className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-1">
                        {[
                            { id: 'hero', label: 'Hero Section', icon: Layout },
                            { id: 'mission', label: 'Mission', icon: Target },
                            { id: 'quote', label: 'About Quote', icon: Quote },
                            { id: 'why', label: 'Why Ghana', icon: Globe },
                            { id: 'milestones', label: 'Milestones', icon: Flag },
                            { id: 'timeline', label: 'Timeline', icon: Clock },
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

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {activeTab === 'hero' && <HeroForm data={heroData} onChange={handleHeroChange} onSubmit={handleHeroSubmit} saving={savingHero} onImageUpload={handleHeroImageUpload} uploading={uploadingHero} />}
                    {activeTab === 'mission' && <MissionForm data={missionData} onChange={handleMissionChange} onSubmit={handleMissionSubmit} saving={savingMission} />}
                    {activeTab === 'quote' && <AboutQuoteForm data={quoteData} onChange={handleQuoteChange} onSubmit={handleQuoteSubmit} saving={savingQuote} />}
                    {activeTab === 'why' && <WhyGhanaForm data={whyGhanaData} onChange={handleWhyGhanaChange} onSubmit={handleWhyGhanaSubmit} saving={savingWhyGhana} />}
                    {activeTab === 'milestones' && <MilestonesManager milestones={milestones} setMilestones={setMilestones} dispatch={dispatch} navigate={navigate} canCreateContent={canCreateContent} handlePermissionDenied={handlePermissionDenied} />}
                    {activeTab === 'timeline' && <TimelineManager timeline={timeline} setTimeline={setTimeline} dispatch={dispatch} navigate={navigate} canCreateContent={canCreateContent} handlePermissionDenied={handlePermissionDenied} />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AboutPageManagementPage;


