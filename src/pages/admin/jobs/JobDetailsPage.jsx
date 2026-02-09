import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { jobsData } from '../../../data/jobsData';
import {
    ChevronLeft,
    MapPin,
    CheckCircle,
    Target,
    Star,
    Edit,
    ExternalLink,
    Briefcase,
    AlertCircle,
    Users
} from 'lucide-react';

const JOB_TYPE_CONFIG = {
    'Full-time': { label: 'Full-time', color: 'bg-emerald-100 text-emerald-700' },
    'Part-time': { label: 'Part-time', color: 'bg-blue-100 text-blue-700' },
    'Contract': { label: 'Contract', color: 'bg-purple-100 text-purple-700' },
    'Internship': { label: 'Internship', color: 'bg-amber-100 text-amber-700' },
    'National Service': { label: 'National Service', color: 'bg-cyan-100 text-cyan-700' },
    'Remote': { label: 'Remote', color: 'bg-pink-100 text-pink-700' }
};

const JobDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const job = jobsData.find(j => j.id === parseInt(id));

    if (!job) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <AlertCircle size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Job Not Found</h2>
                    <button
                        onClick={() => navigate('/admin/jobs')}
                        className="text-[#004fa2] hover:underline font-medium"
                    >
                        Return to Jobs
                    </button>
                </div>
            </AdminLayout>
        );
    }

    const handleEdit = () => {
        navigate(`/admin/jobs/edit/${job.id}`);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto pb-8">
                {/* Header */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin/jobs')}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${JOB_TYPE_CONFIG[job.type]?.color || 'bg-gray-100'}`}>
                                    {job.type}
                                </span>
                                <span>•</span>
                                <span>{job.locations?.length} location(s)</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleEdit}
                            className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-2"
                        >
                            <Edit size={16} />
                            Edit
                        </button>
                        <a
                            href={`/jobs/${job.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-medium text-sm flex items-center gap-2"
                        >
                            <ExternalLink size={16} />
                            Public
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <p className="text-base text-gray-700 leading-relaxed">{job.description}</p>
                        </div>

                        {/* Two Column: Responsibilities & Qualifications */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Responsibilities */}
                            {job.responsibilities && job.responsibilities.length > 0 && (
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <CheckCircle size={18} className="text-[#004fa2]" />
                                        Responsibilities
                                    </h3>
                                    <ul className="space-y-3">
                                        {job.responsibilities.slice(0, 4).map((resp, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <span className="text-[#004fa2] font-bold">•</span>
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                        {job.responsibilities.length > 4 && (
                                            <li className="text-xs text-gray-500 font-medium">+{job.responsibilities.length - 4} more</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {/* Qualifications */}
                            {job.qualifications && job.qualifications.length > 0 && (
                                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Target size={18} className="text-[#004fa2]" />
                                        Qualifications
                                    </h3>
                                    <ul className="space-y-3">
                                        {job.qualifications.slice(0, 4).map((qual, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                                <span className="text-green-600 font-bold">✓</span>
                                                <span>{qual}</span>
                                            </li>
                                        ))}
                                        {job.qualifications.length > 4 && (
                                            <li className="text-xs text-gray-500 font-medium">+{job.qualifications.length - 4} more</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Job Description */}
                        {job.jobDescription && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Briefcase size={18} className="text-[#004fa2]" />
                                    Job Description
                                </h3>
                                <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line line-clamp-4">
                                    {job.jobDescription}
                                </p>
                            </div>
                        )}

                        {/* Perks */}
                        {job.perks && job.perks.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Star size={18} className="text-[#004fa2]" />
                                    Perks & Benefits
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {job.perks.slice(0, 5).map((perk, idx) => (
                                        <span key={idx} className="px-4 py-2 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">
                                            {perk}
                                        </span>
                                    ))}
                                    {job.perks.length > 5 && (
                                        <span className="px-2.5 py-1.5 text-gray-500 text-xs font-medium">+{job.perks.length - 5} more</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Locations */}
                        {job.locations && job.locations.length > 0 && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin size={18} className="text-[#004fa2]" />
                                    Locations
                                </h3>
                                <div className="space-y-3">
                                    {job.locations.map((loc, idx) => (
                                        <div key={idx} className="px-4 py-2.5 bg-gray-50 rounded-lg text-sm font-medium text-gray-800">
                                            {loc}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Job Info Card */}
                        <div className="bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl p-6 shadow-sm text-white">
                            <h3 className="text-lg font-bold mb-5">Job Information</h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-white/70 mb-2">Job Type</p>
                                    <p className="font-semibold text-base">{job.type}</p>
                                </div>
                                <div className="pt-4 border-t border-white/20">
                                    <p className="text-white/70 mb-2">Job ID</p>
                                    <p className="font-semibold text-base">{job.id}</p>
                                </div>
                                <div className="pt-4 border-t border-white/20">
                                    <p className="text-white/70 mb-2">Status</p>
                                    <p className="font-semibold capitalize text-base">{job.status || 'Active'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        {job.companyDescription && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-[#004fa2]" />
                                    About Us
                                </h3>
                                <p className="text-sm text-gray-700 leading-relaxed line-clamp-5">
                                    {job.companyDescription}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default JobDetailsPage;
