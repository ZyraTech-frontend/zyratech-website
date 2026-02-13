
/**
 * Partnership Page Content Management
 */
import React, { useState, useEffect } from 'react';
import {
    Save, Loader, Plus, Edit2, Trash2, X,
    Layout, PieChart, Info, BookOpen, Star, Handshake
} from 'lucide-react';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';

// --- Sub-components (defined outside to preserve focus) ---

const HeroForm = ({ data, onChange, onSubmit, saving }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Partnership Hero</h3>
        <div><label className="block text-sm font-medium mb-1">Title</label><input className="w-full px-4 py-2 border rounded-lg" name="title" value={data.title || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Subtitle</label><input className="w-full px-4 py-2 border rounded-lg" name="subtitle" value={data.subtitle || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Background Image URL</label><input className="w-full px-4 py-2 border rounded-lg" name="backgroundImage" value={data.backgroundImage || ''} onChange={onChange} /></div>
        <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Hero</button>
    </form>
);

const ImpactStatsManager = ({ stats, setStats }) => {
    const handleStatChange = (id, field, value) => {
        setStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleSave = async (stat) => {
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

const WhyPartnerForm = ({ data, onChange, onSubmit, saving }) => (
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Why Partner With Us</h3>
        <div><label className="block text-sm font-medium mb-1">Title</label><input className="w-full px-4 py-2 border rounded-lg" name="title" value={data.title || ''} onChange={onChange} /></div>
        <div><label className="block text-sm font-medium mb-1">Content</label><textarea className="w-full px-4 py-2 border rounded-lg" name="content" value={data.content || ''} onChange={onChange} rows={4} /></div>
        <button type="submit" disabled={saving} className="bg-[#004fa2] text-white px-6 py-2 rounded-lg flex items-center gap-2 mt-4">{saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />} Save Section</button>
    </form>
);

const StoriesManager = ({ stories, setStories, dispatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [saving, setSaving] = useState(false);

    const handleEdit = (item) => { setCurrentItem(item); setIsModalOpen(true); };
    const handleAdd = () => { setCurrentItem(null); setIsModalOpen(true); };

    const handleDelete = (item) => {
        dispatch(openConfirmDialog({
            title: 'Delete Story',
            message: 'Are you sure?',
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                await contentService.deletePartnershipStory(item.id);
                setStories(prev => prev.filter(s => s.id !== item.id));
            }
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            if (currentItem) {
                await contentService.updatePartnershipStory(currentItem.id, data);
            } else {
                await contentService.createPartnershipStory(data);
            }
            const res = await contentService.getPartnershipStories();
            setStories(res.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Partnership Stories</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors"><Plus size={16} /> Add Story</button>
            </div>
            <div className="space-y-4">
                {stories.length === 0 ? <p className="text-gray-500 italic">No stories found.</p> : stories.map(s => (
                    <div key={s.id} className="bg-white p-4 rounded-xl border flex justify-between items-start shadow-sm">
                        <div className="flex gap-4">
                            <img src={s.image} alt="" className="w-16 h-16 object-cover rounded bg-gray-100" />
                            <div>
                                <h4 className="font-bold text-gray-900">{s.title}</h4>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{s.category}</span>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{s.story}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(s)} className="p-2 text-blue-600 hover:bg-blue-50 rounded"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(s)} className="p-2 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold">{currentItem ? 'Edit' : 'Add'} Story</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div><label className="block text-sm font-medium mb-1">Title (Partner Name)</label><input type="text" name="title" defaultValue={currentItem?.title} required className="w-full border px-3 py-2 rounded-lg" /></div>
                            <div><label className="block text-sm font-medium mb-1">Category</label><input type="text" name="category" defaultValue={currentItem?.category} placeholder="e.g. Corporate Partner" className="w-full border px-3 py-2 rounded-lg" /></div>
                            <div><label className="block text-sm font-medium mb-1">Story Quote</label><textarea name="story" defaultValue={currentItem?.story} required rows={3} className="w-full border px-3 py-2 rounded-lg" /></div>
                            <div><label className="block text-sm font-medium mb-1">Impact Stat</label><input type="text" name="impact" defaultValue={currentItem?.impact} placeholder="e.g. 500+ trained" className="w-full border px-3 py-2 rounded-lg" /></div>
                            <div><label className="block text-sm font-medium mb-1">Image URL</label><input type="text" name="image" defaultValue={currentItem?.image} className="w-full border px-3 py-2 rounded-lg" /></div>
                            <div><label className="block text-sm font-medium mb-1">Fallback Image URL</label><input type="text" name="fallbackImage" defaultValue={currentItem?.fallbackImage} className="w-full border px-3 py-2 rounded-lg" /></div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] flex items-center gap-2">{saving && <Loader size={16} className="animate-spin" />} Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const RecognitionManager = ({ recognition, setRecognition, dispatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleAdd = () => { setIsModalOpen(true); };

    const handleDelete = (item) => {
        dispatch(openConfirmDialog({
            title: 'Delete Partner Logo',
            message: `Remove ${item.name} from the recognition strip?`,
            isDangerous: true,
            confirmLabel: 'Delete',
            onConfirm: async () => {
                try {
                    await contentService.deleteRecognition(item.id);
                    setRecognition(prev => prev.filter(r => r.id !== item.id));
                } catch (e) {
                    console.error(e);
                }
            }
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            // Create only (no edit for simple logos usually, just delete and add)
            await contentService.createRecognition(data);
            const res = await contentService.getRecognition();
            setRecognition(res.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Partner Recognition Logostrip</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 bg-[#004fa2] text-white px-4 py-2 rounded-lg hover:bg-[#003d7a] transition-colors">
                    <Plus size={16} /> Add Partner Logo
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recognition.length === 0 ? (
                    <div className="col-span-full text-gray-500 italic py-4">No partner logos added yet.</div>
                ) : (
                    recognition.map(item => (
                        <div key={item.id} className="group relative bg-white border rounded-lg p-4 flex items-center justify-center h-32 hover:shadow-md transition-all">
                            <img
                                src={item.logo}
                                alt={item.name}
                                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                onError={(e) => { e.target.src = '/images/placeholder-logo.png'; }}
                            />
                            <button
                                onClick={() => handleDelete(item)}
                                className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                                title="Remove Logo"
                            >
                                <X size={14} />
                            </button>
                            <div className="absolute bottom-2 left-0 w-full text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs bg-gray-900/80 text-white px-2 py-1 rounded truncate max-w-full inline-block">
                                    {item.name}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="text-xl font-bold">Add Partner Logo</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Partner Name</label>
                                <input type="text" name="name" required className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20" placeholder="e.g. Google" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Logo URL</label>
                                <input type="text" name="logo" required className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-[#004fa2]/20" placeholder="/images/logos/google.png" />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] flex items-center gap-2">
                                    {saving && <Loader size={16} className="animate-spin" />} Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const PartnershipContentManagementPage = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('hero');
    const [loading, setLoading] = useState(true);

    // Data States
    const [heroData, setHeroData] = useState({});
    const [impactStats, setImpactStats] = useState([]);
    const [whyPartner, setWhyPartner] = useState({});
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
            const [hero, stats, why, storiesRes, recRes] = await Promise.all([
                contentService.getPartnershipHero(),
                contentService.getImpactStats(),
                contentService.getWhyPartner(),
                contentService.getPartnershipStories(),
                contentService.getRecognition()
            ]);
            setHeroData(hero.data);
            setImpactStats(stats.data);
            setWhyPartner(why.data);
            setStories(storiesRes.data);
            setRecognition(recRes.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleHeroSubmit = async (e) => {
        e.preventDefault();
        setSavingHero(true);
        await contentService.updatePartnershipHero(heroData);
        setSavingHero(false);
        dispatch(openConfirmDialog({ title: 'Success', message: 'Hero updated', confirmText: 'OK', hideCancelButton: true }));
    };

    const handleWhySubmit = async (e) => {
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
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
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
                            { id: 'stats', label: 'Impact Stats', icon: PieChart },
                            { id: 'why', label: 'Why Partner', icon: Info },
                            { id: 'stories', label: 'Success Stories', icon: BookOpen },
                            { id: 'recognition', label: 'Recognition', icon: Star },
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
                    {activeTab === 'hero' && <HeroForm data={heroData} onChange={(e) => setHeroData({ ...heroData, [e.target.name]: e.target.value })} onSubmit={handleHeroSubmit} saving={savingHero} />}
                    {activeTab === 'stats' && <ImpactStatsManager stats={impactStats} setStats={setImpactStats} />}
                    {activeTab === 'why' && <WhyPartnerForm data={whyPartner} onChange={(e) => setWhyPartner({ ...whyPartner, [e.target.name]: e.target.value })} onSubmit={handleWhySubmit} saving={savingWhy} />}
                    {activeTab === 'stories' && <StoriesManager stories={stories} setStories={setStories} dispatch={dispatch} />}
                    {activeTab === 'recognition' && <RecognitionManager recognition={recognition} setRecognition={setRecognition} dispatch={dispatch} />}
                </div>
            </div>
        </AdminLayout>
    );
};

export default PartnershipContentManagementPage;
