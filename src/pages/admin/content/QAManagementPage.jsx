import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import contentService from '../../../services/contentService';
import Loader from '../../../components/admin/shared/LoadingSpinner';
import {
    Save, Plus, Trash2, HelpCircle, ArrowUp, ArrowDown, ExternalLink, List
} from 'lucide-react';

const QAManagementPage = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [data, setData] = useState({
        hero: {},
        intro: { howItWorks: {}, standards: { items: [] } },
        tools: [],
        features: [],
        faq: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await contentService.getQA();
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch QA data:", error);
            setLoading(false);
        }
    };

    const handleSave = async (section) => {
        setSaving(true);
        try {
            await contentService.updateQA(section, data[section]);
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

    const handleDeepNestedChange = (section, subSection, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subSection]: {
                    ...prev[section][subSection],
                    [field]: value
                }
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

    // Special handler for Feature Content (array of strings)
    const handleFeatureContentChange = (featureIndex, contentIndex, value) => {
        const newFeatures = [...data.features];
        newFeatures[featureIndex].content[contentIndex] = value;
        setData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeatureContent = (featureIndex) => {
        const newFeatures = [...data.features];
        newFeatures[featureIndex].content.push('');
        setData(prev => ({ ...prev, features: newFeatures }));
    };

    const deleteFeatureContent = (featureIndex, contentIndex) => {
        const newFeatures = [...data.features];
        newFeatures[featureIndex].content.splice(contentIndex, 1);
        setData(prev => ({ ...prev, features: newFeatures }));
    };

    if (loading) return <AdminLayout><Loader /></AdminLayout>;

    return (
        <AdminLayout>
            <div className="space-y-6 pb-20">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Quality Assurance Management</h1>
                </div>

                <div className="flex gap-2 border-b border-gray-200 overflow-x-auto pb-1">
                    {['hero', 'intro', 'tools', 'features', 'faq'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-[#004fa2] text-[#004fa2]' : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* HERO TAB */}
                {activeTab === 'hero' && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                        <Input label="Title" value={data.hero.title} onChange={(e) => handleNestedChange('hero', 'title', e.target.value)} />
                        <TextArea label="Description" value={data.hero.description} onChange={(e) => handleNestedChange('hero', 'description', e.target.value)} />
                        <Input label="Image URL" value={data.hero.image} onChange={(e) => handleNestedChange('hero', 'image', e.target.value)} />
                        <SaveButton onClick={() => handleSave('hero')} saving={saving} />
                    </div>
                )}

                {/* INTRO TAB (How It Works & Standards) */}
                {activeTab === 'intro' && (
                    <div className="space-y-8">
                        {/* How It Works */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <h2 className="text-lg font-semibold border-b pb-2">How Do We Work?</h2>
                            <Input label="Title" value={data.intro.howItWorks.title} onChange={(e) => handleDeepNestedChange('intro', 'howItWorks', 'title', e.target.value)} />
                            <TextArea label="Description" value={data.intro.howItWorks.description} onChange={(e) => handleDeepNestedChange('intro', 'howItWorks', 'description', e.target.value)} />
                        </div>

                        {/* Standards */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <h2 className="text-lg font-semibold border-b pb-2">Our Quality Standards</h2>
                            <Input label="Title" value={data.intro.standards.title} onChange={(e) => handleDeepNestedChange('intro', 'standards', 'title', e.target.value)} />
                            <TextArea label="Description" value={data.intro.standards.description} onChange={(e) => handleDeepNestedChange('intro', 'standards', 'description', e.target.value)} />

                            <div className="mt-4 space-y-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase">Certificates / Standards</h3>
                                {data.intro.standards.items.map((item, idx) => (
                                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                        <button onClick={() => {
                                            const newItems = [...data.intro.standards.items];
                                            newItems.splice(idx, 1);
                                            setData(prev => ({ ...prev, intro: { ...prev.intro, standards: { ...prev.intro.standards, items: newItems } } }));
                                        }} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </button>
                                        <TextArea label="Description" value={item.text} onChange={(e) => {
                                            const newItems = [...data.intro.standards.items];
                                            newItems[idx] = { ...newItems[idx], text: e.target.value };
                                            setData(prev => ({ ...prev, intro: { ...prev.intro, standards: { ...prev.intro.standards, items: newItems } } }));
                                        }} />
                                        <Input label="Result / Status" value={item.result} onChange={(e) => {
                                            const newItems = [...data.intro.standards.items];
                                            newItems[idx] = { ...newItems[idx], result: e.target.value };
                                            setData(prev => ({ ...prev, intro: { ...prev.intro, standards: { ...prev.intro.standards, items: newItems } } }));
                                        }} />
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newItems = [...data.intro.standards.items, { text: '', result: '' }];
                                    setData(prev => ({ ...prev, intro: { ...prev.intro, standards: { ...prev.intro.standards, items: newItems } } }));
                                }} className="flex items-center gap-2 text-[#004fa2] text-sm font-medium hover:underline">
                                    <Plus size={16} /> Add Standard
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <SaveButton onClick={() => handleSave('intro')} saving={saving} />
                        </div>
                    </div>
                )}

                {/* TOOLS TAB */}
                {activeTab === 'tools' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {data.tools.map((tool, index) => (
                                <div key={tool.id || index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group">
                                    <button onClick={() => deleteItem('tools', index)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 border rounded flex items-center justify-center bg-gray-50">
                                            <img src={tool.logo} alt="" className="w-6 h-6 object-contain" />
                                        </div>
                                        <Input label="Tool Name" value={tool.name} onChange={(e) => handleArrayChange('tools', index, 'name', e.target.value)} />
                                    </div>
                                    <Input label="Logo URL" value={tool.logo} onChange={(e) => handleArrayChange('tools', index, 'logo', e.target.value)} />
                                    <Input label="Color Class (Tailwind)" value={tool.color} onChange={(e) => handleArrayChange('tools', index, 'color', e.target.value)} />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <button onClick={() => addItem('tools', { name: 'New Tool', logo: '', color: 'border-gray-300' })} className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline">
                                <Plus size={18} /> Add Tool
                            </button>
                            <SaveButton onClick={() => handleSave('tools')} saving={saving} />
                        </div>
                    </div>
                )}

                {/* FEATURES TAB (Alternating Sections) */}
                {activeTab === 'features' && (
                    <div className="space-y-8">
                        {data.features.map((feature, fIndex) => (
                            <div key={feature.id || fIndex} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => deleteItem('features', fIndex)} className="text-gray-400 hover:text-red-500 p-1">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <h3 className="font-semibold text-lg mb-4 text-gray-800">Section {fIndex + 1}</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div className="space-y-4">
                                        <Input label="Title" value={feature.title} onChange={(e) => handleArrayChange('features', fIndex, 'title', e.target.value)} />
                                        <Input label="Image URL" value={feature.image} onChange={(e) => handleArrayChange('features', fIndex, 'image', e.target.value)} />
                                        <div className="flex items-center gap-2">
                                            <label className="text-sm font-medium text-gray-700">Image Position:</label>
                                            <select
                                                value={feature.imagePosition}
                                                onChange={(e) => handleArrayChange('features', fIndex, 'imagePosition', e.target.value)}
                                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
                                            >
                                                <option value="left">Left</option>
                                                <option value="right">Right</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Bullet Points</label>
                                        {feature.content.map((point, cIndex) => (
                                            <div key={cIndex} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={point}
                                                    onChange={(e) => handleFeatureContentChange(fIndex, cIndex, e.target.value)}
                                                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm"
                                                />
                                                <button onClick={() => deleteFeatureContent(fIndex, cIndex)} className="text-gray-400 hover:text-red-500">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => addFeatureContent(fIndex)} className="text-xs text-[#004fa2] hover:underline flex items-center gap-1 mt-1">
                                            <Plus size={12} /> Add Point
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <button onClick={() => addItem('features', { title: 'New Feature', content: [''], image: '', imagePosition: 'right' })} className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline">
                                <Plus size={18} /> Add Feature Section
                            </button>
                            <SaveButton onClick={() => handleSave('features')} saving={saving} />
                        </div>
                    </div>
                )}

                {/* FAQ TAB */}
                {activeTab === 'faq' && (
                    <div className="space-y-6">
                        {data.faq.map((item, index) => (
                            <div key={item.id || index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                                <button onClick={() => deleteItem('faq', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 size={18} />
                                </button>
                                <div className="space-y-4">
                                    <Input label="Question" value={item.question} onChange={(e) => handleArrayChange('faq', index, 'question', e.target.value)} />
                                    <TextArea label="Answer" value={item.answer} onChange={(e) => handleArrayChange('faq', index, 'answer', e.target.value)} />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between items-center">
                            <button onClick={() => addItem('faq', { question: '', answer: '' })} className="flex items-center gap-2 text-[#004fa2] font-medium hover:underline">
                                <Plus size={18} /> Add FAQ Item
                            </button>
                            <SaveButton onClick={() => handleSave('faq')} saving={saving} />
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

export default QAManagementPage;
