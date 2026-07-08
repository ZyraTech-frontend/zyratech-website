/**
 * Project Form Page (Admin)
 * For creating and editing portfolio projects
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { projectsData, getProjectById } from '../../../data/projectsData';
import {
    ArrowLeft,
    Save,
    X,
    Plus,
    Trash2,
    AlertCircle
} from 'lucide-react';

const CATEGORIES = [
    'Transportation',
    'Software',
    'Environment',
    'Agriculture',
    'Business Solutions',
    'Education',
    'Healthcare',
    'FinTech'
];

const STATUSES = ['Active', 'In Progress', 'Completed', 'Paused', 'Archived'];

const ProjectFormPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isSuperAdmin } = usePermissions();

    const [formData, setFormData] = useState({
        title: '',
        category: 'Software',
        description: '',
        status: 'Active',
        image: '',
        link: '',
        featured: false,
        technologies: [],
        team: 1,
        startDate: new Date().toISOString().split('T')[0],
        progress: 0
    });

    const [technologiesInput, setTechnologiesInput] = useState('');
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    // Initialize form for editing
    useEffect(() => {
        if (id) {
            const project = getProjectById(parseInt(id));
            if (project) {
                setFormData(project);
                setTechnologiesInput(project.technologies.join(', '));
            }
        }
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : value)
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle technologies input
    const handleTechnologiesChange = (e) => {
        setTechnologiesInput(e.target.value);
        if (errors.technologies) {
            setErrors(prev => ({ ...prev, technologies: '' }));
        }
    };

    const handleAddTechnology = (tech) => {
        if (tech && !formData.technologies.includes(tech)) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, tech]
            }));
            setTechnologiesInput('');
        }
    };

    const handleRemoveTechnology = (index) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter((_, i) => i !== index)
        }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Project title is required';
        }
        
        if (!formData.description.trim()) {
            newErrors.description = 'Project description is required';
        }

        if (!formData.image.trim()) {
            newErrors.image = 'Project image URL is required';
        }

        if (formData.technologies.length === 0) {
            newErrors.technologies = 'At least one technology is required';
        }

        if (formData.team < 1) {
            newErrors.team = 'Team size must be at least 1';
        }

        if (formData.progress < 0 || formData.progress > 100) {
            newErrors.progress = 'Progress must be between 0 and 100';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitError('');

        if (!validateForm()) {
            setSubmitError('Please fix the errors below');
            return;
        }

        // Prepare data for submission
        const projectData = {
            ...formData,
            technologies: formData.technologies
        };

        // Log the data (in a real app, this would be an API call)
        console.log('Submitting project:', projectData);
        
        // Show success message
        alert(`Project "${formData.title}" ${id ? 'updated' : 'created'} successfully!`);
        navigate('/admin/projects');
    };

    const handleCancel = () => {
        if (Object.keys(errors).length > 0 || submitError) {
            dispatch(openConfirmDialog({
                title: 'Discard Changes',
                message: 'Are you sure you want to discard your changes?',
                onConfirm: () => navigate('/admin/projects')
            }));
        } else {
            navigate('/admin/projects');
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-3 md:space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-2 md:p-4 rounded-xl border border-gray-100 shadow-sm mb-4 gap-3">
                    <div className="flex items-center gap-3">
                        <button onClick={handleCancel} className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0">
                            <ArrowLeft className="text-gray-600" size={18} />
                        </button>
                        <div>
                            <h1 className="text-[11px] md:text-base font-bold text-gray-900 leading-tight">
                                {id ? 'Edit Project' : 'Create New Project'}
                            </h1>
                            <p className="text-[10px] text-gray-500">
                                {id ? 'Update project details and information' : 'Add a new portfolio project'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {submitError && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg">
                                <AlertCircle className="text-red-600" size={16} />
                                <span className="text-xs text-red-700 font-medium">{submitError}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Title */}
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter project title"
                                    className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white ${
                                        errors.title ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.title && <p className="text-[10px] text-red-600 mt-1">{errors.title}</p>}
                            </div>

                            {/* Category & Status */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white"
                                >
                                    {STATUSES.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter project description"
                                    rows="3"
                                    className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none bg-gray-50 hover:bg-white focus:bg-white ${
                                        errors.description ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.description && <p className="text-[10px] text-red-600 mt-1">{errors.description}</p>}
                            </div>

                            {/* Image URL & Link */}
                            <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                        Image URL *
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.webp"
                                        className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white ${
                                            errors.image ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    {errors.image && <p className="text-[10px] text-red-600 mt-1">{errors.image}</p>}
                                    
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 mt-3">
                                        Project Link
                                    </label>
                                    <input
                                        type="text"
                                        name="link"
                                        value={formData.link}
                                        onChange={handleChange}
                                        placeholder="https://example.com/project"
                                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white"
                                    />
                                </div>
                                {formData.image && (
                                    <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-50">
                                        <img decoding="async" src={formData.image} alt="Preview" className="w-full h-full object-cover" loading="lazy" />
                                    </div>
                                )}
                            </div>

                            {/* Technologies */}
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Technologies *
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={technologiesInput}
                                        onChange={handleTechnologiesChange}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddTechnology(technologiesInput.trim());
                                            }
                                        }}
                                        placeholder="Type tech and press Enter"
                                        className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleAddTechnology(technologiesInput.trim())}
                                        className="px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors flex items-center gap-1 text-xs font-semibold shrink-0"
                                    >
                                        <Plus size={14} /> Add
                                    </button>
                                </div>
                                
                                {formData.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {formData.technologies.map((tech, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-100"
                                            >
                                                <span className="text-xs font-semibold">{tech}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTechnology(index)}
                                                    className="hover:text-red-500 transition-colors"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {errors.technologies && <p className="text-[10px] text-red-600 mt-1">{errors.technologies}</p>}
                            </div>

                            {/* Team, Start Date, Progress */}
                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Team Size *
                                </label>
                                <input
                                    type="number"
                                    name="team"
                                    value={formData.team}
                                    onChange={handleChange}
                                    min="1"
                                    max="100"
                                    className={`w-full px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white ${
                                        errors.team ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.team && <p className="text-[10px] text-red-600 mt-1">{errors.team}</p>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                    Progress (%) *
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        name="progress"
                                        value={formData.progress}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className={`w-20 px-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-gray-50 hover:bg-white focus:bg-white ${
                                            errors.progress ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-[#004fa2] h-2 rounded-full transition-all"
                                            style={{ width: `${formData.progress}%` }}
                                        />
                                    </div>
                                </div>
                                {errors.progress && <p className="text-[10px] text-red-600 mt-1">{errors.progress}</p>}
                            </div>
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 mt-2 hover:border-[#004fa2]/30 transition-colors">
                            <input
                                type="checkbox"
                                name="featured"
                                id="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#004fa2] rounded border-gray-300 focus:ring-[#004fa2]"
                            />
                            <div>
                                <label htmlFor="featured" className="text-xs font-bold text-gray-700 cursor-pointer uppercase tracking-wide">
                                    Mark as Featured
                                </label>
                                <p className="text-[10px] text-gray-500">Highlighted on the portfolio overview</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 justify-end pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#004fa2] text-white text-xs font-semibold rounded-lg hover:bg-[#003d7a] transition-all shadow-sm"
                            >
                                <Save size={14} />
                                {id ? 'Update Project' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProjectFormPage;

