
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Save, Loader, Plus, Edit2, Trash2,
    Layout, Target, MapPin, Flag, Clock,
    Users, TrendingUp, CheckCircle, Globe
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

// --- Sub-components (inline forms for unchanging sections) ---

const HeroForm = ({ data, onSubmit, onChange, saving }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Hero Section</h3>
        <div><label className="block text-sm font-medium mb-1">Title</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="title" value={data.title || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Highlight (Blue)</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="highlight" value={data.highlight || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Description</label><textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="description" value={data.description || ''} onChange={onChange} rows={3} /></div>
        <div><label className="block text-sm font-medium mb-1">Image URL</label><input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2]" name="backgroundImage" value={data.backgroundImage || ''} onChange={onChange} /></div>
        <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4 transition-colors hover:bg-[#003d7a] disabled:opacity-50">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Hero</button>
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

// Simple Milestone Manager Component (removed modal, uses navigation)
const MilestonesManager = ({ milestones, setMilestones, dispatch, navigate }) => {
    const { logAction } = useActivityLogger();

    const handleDelete = (item) => {
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
const TimelineManager = ({ timeline, setTimeline, dispatch, navigate }) => {
    const { logAction } = useActivityLogger();

    const handleDelete = (item) => {
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
                    onClick={() => navigate('/admin/content/about-page/timeline/add')}
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
    const [activeTab, setActiveTab] = useState('hero');
    const [loading, setLoading] = useState(true);

    // Data States
    const [heroData, setHeroData] = useState({});
    const [missionData, setMissionData] = useState({});
    const [whyGhanaData, setWhyGhanaData] = useState({});
    const [milestones, setMilestones] = useState([]);
    const [timeline, setTimeline] = useState([]);

    // Loading States for Saving Forms
    const [savingHero, setSavingHero] = useState(false);
    const [savingMission, setSavingMission] = useState(false);
    const [savingWhyGhana, setSavingWhyGhana] = useState(false);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const [hero, mission, why, milestonesRes, timelineRes] = await Promise.all([
                contentService.getAboutHero(),
                contentService.getMission(),
                contentService.getWhyGhana(),
                contentService.getMilestones(),
                contentService.getTimeline()
            ]);

            setHeroData(hero.data);
            setMissionData(mission.data);
            setWhyGhanaData(why.data);
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
        e.preventDefault();
        setSavingHero(true);
        await contentService.updateAboutHero(heroData);
        setSavingHero(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Hero section saved.', confirmText: 'OK', hideCancelButton: true }));
    };

    const handleMissionChange = (e) => setMissionData({ ...missionData, [e.target.name]: e.target.value });
    const handleMissionSubmit = async (e) => {
        e.preventDefault();
        setSavingMission(true);
        await contentService.updateMission(missionData);
        setSavingMission(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Mission section saved.', confirmText: 'OK', hideCancelButton: true }));
    };

    const handleWhyGhanaChange = (e) => setWhyGhanaData({ ...whyGhanaData, [e.target.name]: e.target.value });
    const handleWhyGhanaSubmit = async (e) => {
        e.preventDefault();
        setSavingWhyGhana(true);
        await contentService.updateWhyGhana(whyGhanaData);
        setSavingWhyGhana(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Why Ghana section saved.', confirmText: 'OK', hideCancelButton: true }));
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
                    {activeTab === 'hero' && <HeroForm data={heroData} onChange={handleHeroChange} onSubmit={handleHeroSubmit} saving={savingHero} />}
                    {activeTab === 'mission' && <MissionForm data={missionData} onChange={handleMissionChange} onSubmit={handleMissionSubmit} saving={savingMission} />}
                    {activeTab === 'why' && <WhyGhanaForm data={whyGhanaData} onChange={handleWhyGhanaChange} onSubmit={handleWhyGhanaSubmit} saving={savingWhyGhana} />}
                    {activeTab === 'milestones' && <MilestonesManager milestones={milestones} setMilestones={setMilestones} dispatch={dispatch} navigate={navigate} />}
                    {activeTab === 'timeline' && <TimelineManager timeline={timeline} setTimeline={setTimeline} dispatch={dispatch} navigate={navigate} />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AboutPageManagementPage;
