/**
 * Project Details Page (Admin)
 * For viewing and managing a specific project
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import { getProjectById } from '../../../data/projectsData';
import {
    ArrowLeft,
    Edit,
    Trash2,
    ExternalLink,
    Calendar,
    Users,
    Zap,
    Target,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const ProjectDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isSuperAdmin } = usePermissions();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load project data
    useEffect(() => {
        if (id) {
            const foundProject = getProjectById(parseInt(id));
            setProject(foundProject);
            setLoading(false);
        }
    }, [id]);

    const handleEdit = () => {
        navigate(`/admin/projects/edit/${project.id}`);
    };

    const handleDelete = () => {
        dispatch(openConfirmDialog({
            title: 'Delete Project',
            message: `Are you sure you want to delete "${project.title}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                // TODO: Implement actual delete via API
                console.log('Deleting project:', project.id);
                navigate('/admin/projects');
            }
        }));
    };

    const handleViewPublic = () => {
        window.open(project.link, '_blank');
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <p className="text-gray-600">Loading...</p>
                </div>
            </AdminLayout>
        );
    }

    if (!project) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <AlertCircle className="mx-auto mb-3 text-gray-400" size={40} />
                        <p className="text-gray-600 mb-4">Project not found</p>
                        <button
                            onClick={() => navigate('/admin/projects')}
                            className="px-4 py-2 text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            Back to Projects
                        </button>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    // Get status color
    const getStatusColor = (status) => {
        const colors = {
            'Active': 'bg-green-100 text-green-700 border-green-200',
            'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
            'Completed': 'bg-cyan-100 text-cyan-700 border-cyan-200',
            'Paused': 'bg-gray-100 text-gray-700 border-gray-200',
            'Archived': 'bg-gray-400 text-white border-gray-400'
        };
        return colors[status] || colors['Active'];
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/admin/projects')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="text-gray-600" size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                            <p className="text-sm text-gray-500 mt-1">{project.category}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {project.link && (
                            <button
                                onClick={handleViewPublic}
                                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                            >
                                <ExternalLink size={18} />
                                View Public
                            </button>
                        )}
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                        >
                            <Edit size={18} />
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-4 py-2.5 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium"
                        >
                            <Trash2 size={18} />
                            Delete
                        </button>
                    </div>
                </div>

                {/* Project Image & Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <div className="rounded-xl overflow-hidden border border-gray-200">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>

                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{project.description}</p>
                        </div>

                        {/* Technologies */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Technologies Used</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 bg-[#004fa2]/10 text-[#004fa2] rounded-full border border-[#004fa2]/20 text-sm font-medium"
                                    >
                                        {tech}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900">Project Progress</h2>
                                <span className="text-2xl font-bold text-[#004fa2]">{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-[#004fa2] to-[#0066cc] h-3 rounded-full transition-all"
                                    style={{ width: `${project.progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Status</p>
                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border font-medium text-sm ${getStatusColor(project.status)}`}>
                                <CheckCircle size={16} />
                                {project.status}
                            </div>
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                            <div className="bg-purple-50 rounded-xl p-5 shadow-sm border border-purple-200">
                                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">★ Featured</p>
                                <p className="text-sm text-purple-700">This project is highlighted on the portfolio</p>
                            </div>
                        )}

                        {/* Team Info */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Team</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#004fa2]/10 rounded-lg flex items-center justify-center">
                                    <Users className="text-[#004fa2]" size={20} />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{project.team}</p>
                                    <p className="text-xs text-gray-600">Team Members</p>
                                </div>
                            </div>
                        </div>

                        {/* Start Date */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Started</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Calendar className="text-green-600" size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                                    <p className="text-xs text-gray-600">Project Start</p>
                                </div>
                            </div>
                        </div>

                        {/* Project Link */}
                        {project.link && (
                            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Link</p>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#004fa2] hover:underline font-medium break-all"
                                >
                                    {project.link}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProjectDetailsPage;
