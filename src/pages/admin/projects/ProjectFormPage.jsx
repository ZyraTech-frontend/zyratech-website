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
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="text-gray-600" size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {id ? 'Edit Project' : 'Create New Project'}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {id ? 'Update project details and information' : 'Add a new project to your portfolio'}
                        </p>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Error Message */}
                        {submitError && (
                            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="text-red-600" size={20} />
                                <span className="text-sm text-red-700">{submitError}</span>
                            </div>
                        )}

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter project title"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                                    errors.title ? 'border-red-500' : 'border-gray-200'
                                }`}
                            />
                            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                        </div>

                        {/* Category & Status Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category *
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status *
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                >
                                    {STATUSES.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter project description"
                                rows="4"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none ${
                                    errors.description ? 'border-red-500' : 'border-gray-200'
                                }`}
                            />
                            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                                    errors.image ? 'border-red-500' : 'border-gray-200'
                                }`}
                            />
                            {errors.image && <p className="text-sm text-red-600 mt-1">{errors.image}</p>}
                            {formData.image && (
                                <img src={formData.image} alt="Preview" className="mt-3 h-32 object-cover rounded-lg border border-gray-200" />
                            )}
                        </div>

                        {/* Link */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Link
                            </label>
                            <input
                                type="text"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                placeholder="https://example.com/project"
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                            />
                        </div>

                        {/* Technologies */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Technologies *
                            </label>
                            <div className="flex gap-2 mb-3">
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
                                    placeholder="Type technology and press Enter"
                                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleAddTechnology(technologiesInput.trim())}
                                    className="px-4 py-2.5 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors flex items-center gap-2"
                                >
                                    <Plus size={18} />
                                    Add
                                </button>
                            </div>
                            
                            {/* Technology tags */}
                            {formData.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-[#004fa2]/10 text-[#004fa2] rounded-full border border-[#004fa2]/20"
                                        >
                                            <span className="text-sm font-medium">{tech}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTechnology(index)}
                                                className="hover:text-[#003d7a]"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {errors.technologies && <p className="text-sm text-red-600 mt-2">{errors.technologies}</p>}
                        </div>

                        {/* Team, Start Date, Progress Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Team Size (members) *
                                </label>
                                <input
                                    type="number"
                                    name="team"
                                    value={formData.team}
                                    onChange={handleChange}
                                    min="1"
                                    max="100"
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                                        errors.team ? 'border-red-500' : 'border-gray-200'
                                    }`}
                                />
                                {errors.team && <p className="text-sm text-red-600 mt-1">{errors.team}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date *
                                </label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Progress (%) *
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        name="progress"
                                        value={formData.progress}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${
                                            errors.progress ? 'border-red-500' : 'border-gray-200'
                                        }`}
                                    />
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-[#004fa2] to-[#0066cc] h-2 rounded-full transition-all"
                                            style={{ width: `${formData.progress}%` }}
                                        />
                                    </div>
                                </div>
                                {errors.progress && <p className="text-sm text-red-600 mt-1">{errors.progress}</p>}
                            </div>
                        </div>

                        {/* Featured Checkbox */}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-4 h-4 text-[#004fa2] rounded focus:ring-2 focus:ring-[#004fa2]/20 cursor-pointer"
                            />
                            <div>
                                <label htmlFor="featured" className="text-sm font-medium text-gray-700 cursor-pointer">
                                    Mark as Featured
                                </label>
                                <p className="text-xs text-gray-500 mt-0.5">Featured projects will be highlighted on the portfolio</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-lg hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                            >
                                <Save size={18} />
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
