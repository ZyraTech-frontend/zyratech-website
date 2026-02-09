/**
 * Job Form Page (Add/Edit Job) - Multi-Step Wizard
 * Dedicated page for creating or editing job listings with step-by-step journey
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { jobsData } from '../../../data/jobsData';
import {
    ChevronLeft,
    ChevronRight,
    Save,
    X,
    Plus,
    Trash2,
    Briefcase,
    FileText,
    MapPin,
    Users,
    Target,
    Zap,
    List,
    AlertCircle,
    Check
} from 'lucide-react';

// Job type options
const JOB_TYPES = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Internship', label: 'Internship' },
    { value: 'National Service', label: 'National Service' },
    { value: 'Remote', label: 'Remote' }
];

// Step definitions
const STEPS = [
    { key: 'basic', title: 'Basic Info', icon: Briefcase },
    { key: 'description', title: 'Job Description', icon: FileText },
    { key: 'details', title: 'Responsibilities & Qualifications', icon: List },
    { key: 'locations', title: 'Locations & Perks', icon: MapPin },
    { key: 'review', title: 'Review', icon: Check }
];

function getJobById(id) {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return null;
    return jobsData.find(job => job.id === numericId) || null;
}

const JobFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEditing = Boolean(id);
    const existingJob = isEditing ? getJobById(parseInt(id)) : null;

    // Step state
    const [currentStep, setCurrentStep] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        // Basic Info
        title: '',
        type: 'Full-time',
        description: '',

        // Job Description
        jobDescription: '',
        companyDescription: '',

        // Responsibilities and Qualifications (comma-separated for simplicity)
        responsibilitiesText: '',
        qualificationsText: '',

        // Locations and Perks (comma-separated)
        locationsText: '',
        perksText: ''
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Load existing job data for editing
    useEffect(() => {
        if (isEditing && existingJob) {
            setFormData({
                title: existingJob.title || '',
                type: existingJob.type || 'Full-time',
                description: existingJob.description || '',
                jobDescription: existingJob.jobDescription || '',
                companyDescription: existingJob.companyDescription || '',
                responsibilitiesText: existingJob.responsibilities?.join('\n') || '',
                qualificationsText: existingJob.qualifications?.join('\n') || '',
                locationsText: existingJob.locations?.join(', ') || '',
                perksText: existingJob.perks?.join('\n') || ''
            });
        }
    }, [isEditing, existingJob]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validateStep = (stepIndex) => {
        const newErrors = {};
        const stepKey = STEPS[stepIndex]?.key;

        if (stepKey === 'basic') {
            if (!formData.title.trim()) newErrors.title = 'Job title is required';
        }

        if (stepKey === 'description') {
            if (!formData.jobDescription.trim()) newErrors.jobDescription = 'Job description is required';
        }

        if (stepKey === 'details') {
            if (!formData.responsibilitiesText.trim()) newErrors.responsibilitiesText = 'At least one responsibility is required';
            if (!formData.qualificationsText.trim()) newErrors.qualificationsText = 'At least one qualification is required';
        }

        if (stepKey === 'locations') {
            if (!formData.locationsText.trim()) newErrors.locationsText = 'At least one location is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        // Validate all steps
        let hasErrors = false;
        for (let i = 0; i < STEPS.length - 1; i++) {
            if (!validateStep(i)) {
                hasErrors = true;
                setCurrentStep(i);
                break;
            }
        }

        if (hasErrors) return;

        setIsSaving(true);

        // Prepare the job data
        const jobData = {
            title: formData.title,
            type: formData.type,
            description: formData.description,
            jobDescription: formData.jobDescription,
            companyDescription: formData.companyDescription,
            responsibilities: formData.responsibilitiesText.split('\n').map(r => r.trim()).filter(Boolean),
            qualifications: formData.qualificationsText.split('\n').map(q => q.trim()).filter(Boolean),
            locations: formData.locationsText.split(',').map(l => l.trim()).filter(Boolean),
            perks: formData.perksText.split('\n').map(p => p.trim()).filter(Boolean)
        };

        console.log('Saving job:', jobData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);

        // Show success and navigate back
        dispatch(openConfirmDialog({
            title: isEditing ? 'Job Updated' : 'Job Created',
            message: isEditing
                ? `"${formData.title}" has been updated successfully.`
                : `"${formData.title}" has been posted successfully.`,
            confirmText: 'OK',
            hideCancelButton: true,
            onConfirm: () => navigate('/admin/jobs')
        }));
    };

    const handleCancel = () => {
        if (formData.title || formData.description) {
            dispatch(openConfirmDialog({
                title: 'Discard Changes?',
                message: 'You have unsaved changes. Are you sure you want to leave?',
                isDangerous: true,
                confirmText: 'Discard',
                onConfirm: () => navigate('/admin/jobs')
            }));
        } else {
            navigate('/admin/jobs');
        }
    };

    // If editing and job not found
    if (isEditing && !existingJob) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <AlertCircle size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Job Not Found</h2>
                    <p className="text-gray-500 mb-4">The job you're trying to edit doesn't exist.</p>
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

    // Render step content
    const renderStepContent = () => {
        const stepKey = STEPS[currentStep]?.key;

        switch (stepKey) {
            case 'basic':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Senior Software Engineer"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                            >
                                {JOB_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Brief overview of the position (shown on job listings)"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none"
                            />
                        </div>
                    </div>
                );

            case 'description':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="Detailed job description and overview"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none ${errors.jobDescription ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Description (Optional)</label>
                            <textarea
                                name="companyDescription"
                                value={formData.companyDescription}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="Information about ZyraTech and what we do"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none"
                            />
                        </div>
                    </div>
                );

            case 'details':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Key Responsibilities <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="responsibilitiesText"
                                value={formData.responsibilitiesText}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="One responsibility per line. e.g.&#10;Develop and maintain software solutions&#10;Collaborate with team members&#10;Contribute to code reviews"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none ${errors.responsibilitiesText ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.responsibilitiesText && <p className="text-red-500 text-sm mt-1">{errors.responsibilitiesText}</p>}
                            <p className="text-xs text-gray-500 mt-2">Enter each responsibility on a new line</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Required Qualifications <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="qualificationsText"
                                value={formData.qualificationsText}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="One qualification per line. e.g.&#10;Bachelor's degree in Computer Science&#10;2+ years of experience&#10;Strong problem-solving skills"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none ${errors.qualificationsText ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.qualificationsText && <p className="text-red-500 text-sm mt-1">{errors.qualificationsText}</p>}
                            <p className="text-xs text-gray-500 mt-2">Enter each qualification on a new line</p>
                        </div>
                    </div>
                );

            case 'locations':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Locations <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="locationsText"
                                value={formData.locationsText}
                                onChange={handleInputChange}
                                placeholder="e.g., Accra, Takoradi, Kumasi"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.locationsText ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.locationsText && <p className="text-red-500 text-sm mt-1">{errors.locationsText}</p>}
                            <p className="text-xs text-gray-500 mt-2">Separate locations with commas</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Perks & Benefits (Optional)</label>
                            <textarea
                                name="perksText"
                                value={formData.perksText}
                                onChange={handleInputChange}
                                rows={5}
                                placeholder="One perk per line. e.g.&#10;Competitive salary&#10;Health insurance&#10;Flexible work hours&#10;Professional development budget"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">Enter each perk on a new line</p>
                        </div>
                    </div>
                );

            case 'review':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-[#004fa2]/5 to-[#0066cc]/5 rounded-xl p-6 border border-[#004fa2]/10">
                            <h3 className="font-bold text-gray-900 text-lg mb-4">Review Your Job Listing</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Job Title</p>
                                    <p className="font-semibold text-gray-900">{formData.title || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Job Type</p>
                                    <p className="font-semibold text-gray-900">{formData.type || '-'}</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-2">Description</p>
                                <p className="text-sm text-gray-700 bg-white rounded-lg p-3">{formData.description || '-'}</p>
                            </div>

                            {formData.locationsText && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-2">Locations</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.locationsText.split(',').map((loc, i) => (
                                            <span key={i} className="px-3 py-1 bg-[#004fa2]/10 text-[#004fa2] rounded-full text-sm font-medium">
                                                {loc.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {formData.responsibilitiesText && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-2">Key Responsibilities ({formData.responsibilitiesText.split('\n').filter(r => r.trim()).length})</p>
                                    <ul className="space-y-1">
                                        {formData.responsibilitiesText.split('\n').filter(r => r.trim()).slice(0, 3).map((resp, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                <Check size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                {resp.trim()}
                                            </li>
                                        ))}
                                        {formData.responsibilitiesText.split('\n').filter(r => r.trim()).length > 3 && (
                                            <li className="text-sm text-gray-500">+{formData.responsibilitiesText.split('\n').filter(r => r.trim()).length - 3} more</li>
                                        )}
                                    </ul>
                                </div>
                            )}

                            {formData.perksText && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-2">Perks & Benefits ({formData.perksText.split('\n').filter(p => p.trim()).length})</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.perksText.split('\n').filter(p => p.trim()).slice(0, 3).map((perk, i) => (
                                            <span key={i} className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full">
                                                <Zap size={10} className="inline mr-1" />
                                                {perk.trim()}
                                            </span>
                                        ))}
                                        {formData.perksText.split('\n').filter(p => p.trim()).length > 3 && (
                                            <span className="text-xs text-gray-500">+{formData.perksText.split('\n').filter(p => p.trim()).length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const currentStepData = STEPS[currentStep];
    const StepIcon = currentStepData?.icon || Briefcase;

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleCancel}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Job' : 'Post New Job'}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEditing ? `Editing: ${existingJob?.title}` : 'Create a new job listing'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleCancel}
                        className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                        <X size={18} />
                        Cancel
                    </button>
                </div>

                {/* Step Indicator */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center justify-between overflow-x-auto pb-2">
                        {STEPS.map((step, idx) => {
                            const Icon = step.icon;
                            const isActive = idx === currentStep;
                            const isCompleted = idx < currentStep;

                            return (
                                <div key={step.key} className="flex items-center">
                                    <button
                                        onClick={() => {
                                            if (isCompleted) setCurrentStep(idx);
                                        }}
                                        disabled={!isCompleted && !isActive}
                                        className={`flex flex-col items-center gap-1 min-w-[80px] ${isCompleted ? 'cursor-pointer' : ''}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive
                                                    ? 'bg-[#004fa2] text-white'
                                                    : isCompleted
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}
                                        >
                                            {isCompleted ? <Check size={18} /> : <Icon size={18} />}
                                        </div>
                                        <span
                                            className={`text-xs font-medium whitespace-nowrap ${isActive ? 'text-[#004fa2]' : isCompleted ? 'text-green-600' : 'text-gray-400'
                                                }`}
                                        >
                                            {step.title}
                                        </span>
                                    </button>

                                    {idx < STEPS.length - 1 && (
                                        <div
                                            className={`w-8 h-0.5 mx-1 ${idx < currentStep ? 'bg-green-500' : 'bg-gray-200'
                                                }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                            <StepIcon className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{currentStepData?.title}</h2>
                            <p className="text-sm text-gray-500">Step {currentStep + 1} of {STEPS.length}</p>
                        </div>
                    </div>

                    {renderStepContent()}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${currentStep === 0
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <ChevronLeft size={18} />
                        Previous
                    </button>

                    {currentStep === STEPS.length - 1 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d80] hover:to-[#004fa2] transition-all font-medium shadow-md disabled:opacity-50"
                        >
                            <Save size={18} />
                            {isSaving ? 'Saving...' : (isEditing ? 'Update Job' : 'Post Job')}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d80] hover:to-[#004fa2] transition-all font-medium shadow-md"
                        >
                            Next
                            <ChevronRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default JobFormPage;
