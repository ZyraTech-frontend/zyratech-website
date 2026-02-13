/**
 * Partnership Form Page (Admin)
 * Multi-step wizard for creating or editing partnership records
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { getPartnershipTypes, getPartnershipStatuses, PARTNERSHIP_INTERESTS } from '../../../data/partnershipsData';
import partnersService from '../../../services/partnersService';
import {
    ChevronLeft,
    ChevronRight,
    Save,
    X,
    Building2,
    Users,
    Handshake,
    Globe,
    Mail,
    Phone,
    AlertCircle,
    Star,
    FileText,
    Check,
    Image as ImageIcon
} from 'lucide-react';

// Step definitions
const STEPS = [
    { key: 'organization', title: 'Organization Details', icon: Building2 },
    { key: 'contact', title: 'Contact Person', icon: Users },
    { key: 'partnership', title: 'Partnership Details', icon: Handshake },
    { key: 'review', title: 'Review', icon: Check }
];

const PartnershipFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isEditing = Boolean(id);

    // Step state
    const [currentStep, setCurrentStep] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationType: '',
        industry: '',
        website: '',
        country: '',
        contactName: '',
        position: '',
        email: '',
        phone: '',
        type: '',
        interests: [],
        timeline: '',
        message: '',
        value: '',
        logo: null,
        // Admin-only fields (Step 3)
        status: 'pending',
        startDate: '',
        endDate: '',
        description: '',
        benefits: '',
        featured: false
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchPartnership = async () => {
                try {
                    const { data } = await partnersService.getPartnershipById(id);
                    setFormData({
                        // Determine step 1 fields
                        organizationName: data.organization?.name || '',
                        organizationType: data.organization?.type || '',
                        industry: data.organization?.industry || '',
                        website: data.organization?.website || '',
                        country: data.organization?.country || '',
                        logo: data.organization?.logo || null,

                        // Determine step 2 fields
                        contactName: data.contact?.name || '',
                        position: data.contact?.role || '',
                        email: data.contact?.email || '',
                        phone: data.contact?.phone || '',

                        // Determine step 3 fields
                        type: data.type || '',
                        interests: data.interests || [],
                        timeline: data.timeline || '',
                        message: data.message || '',
                        value: data.value || '',

                        // Admin fields
                        status: data.status || 'pending',
                        startDate: data.startDate || '',
                        endDate: data.endDate || '',
                        description: data.description || '',
                        benefits: Array.isArray(data.benefits) ? data.benefits.join(', ') : (data.benefits || ''),
                        featured: data.featured || false
                    });
                } catch (error) {
                    console.error("Error fetching partnership", error);
                    // Could dispatch error notification here
                }
            };
            fetchPartnership();
        }
    }, [id]);

    const validateStep = (stepIdx) => {
        const stepKey = STEPS[stepIdx].key;
        const newErrors = {};

        if (stepIdx === 0) {
            if (!formData.organizationName.trim()) newErrors.organizationName = 'Organization name is required';
            if (!formData.organizationType.trim()) newErrors.organizationType = 'Organization type is required';
            if (!formData.country.trim()) newErrors.country = 'Country is required';
        }
        if (stepIdx === 1) {
            if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
            if (!formData.position.trim()) newErrors.position = 'Position is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        }
        if (stepIdx === 2) {
            if (!formData.type.trim()) newErrors.type = 'Partnership type is required';
            if (!formData.interests.length) newErrors.interests = 'Select at least one area of interest';
            if (!formData.timeline.trim()) newErrors.timeline = 'Timeline is required';
        }
        // Step 3 (admin-only) can be optional or add admin validation here if needed
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleInterestToggle = (interest) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // In a real app, you'd upload the file to storage/S3 here
            // For now, we'll simulate it by storing the filename
            // This allows the UI to show "Selected: filename.png"
            setFormData(prev => ({
                ...prev,
                logo: file.name
            }));
        }
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

        try {
            // Prepare the partnership data structure for service
            const partnershipData = {
                organization: {
                    name: formData.organizationName,
                    type: formData.organizationType,
                    industry: formData.industry,
                    website: formData.website,
                    country: formData.country,
                    logo: formData.logo
                },
                contact: {
                    name: formData.contactName,
                    role: formData.position,
                    email: formData.email,
                    phone: formData.phone
                },
                type: formData.type,
                status: formData.status,
                startDate: formData.startDate,
                endDate: formData.endDate,
                value: formData.value,
                description: formData.description,
                interests: formData.interests,
                timeline: formData.timeline,
                message: formData.message,
                featured: formData.featured,
                benefits: formData.benefits.split(',').map(b => b.trim()).filter(b => b),
                studentsPlaced: 0, // Default for now
                projectsCompleted: 0 // Default for now
            };

            if (isEditing) {
                await partnersService.updatePartnership(id, partnershipData);
            } else {
                await partnersService.createPartnership(partnershipData);
            }

            // Show success and navigate back
            dispatch(openConfirmDialog({
                title: isEditing ? 'Partnership Updated' : 'Partnership Created',
                message: isEditing
                    ? `"${formData.organizationName}" partnership has been updated successfully.`
                    : `"${formData.organizationName}" partnership has been created successfully.`,
                confirmText: 'OK',
                hideCancelButton: true,
                onConfirm: () => navigate('/admin/partnerships')
            }));
        } catch (error) {
            console.error('Error saving partnership:', error);
            // Can add error message handling here
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        if (formData.organizationName || formData.contactName || formData.description) {
            dispatch(openConfirmDialog({
                title: 'Discard Changes?',
                message: 'Are you sure you want to discard these changes?',
                confirmText: 'Discard',
                confirmClass: 'bg-red-600 hover:bg-red-700',
                onConfirm: () => navigate('/admin/partnerships')
            }));
        } else {
            navigate('/admin/partnerships');
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            {isEditing ? 'Edit Partnership' : 'Add New Partnership'}
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {isEditing ? 'Update partnership details' : 'Create a new partner record'}
                        </p>
                    </div>

                    {/* Step Indicators */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {STEPS.map((step, idx) => {
                                const StepIcon = step.icon;
                                const isActive = idx === currentStep;
                                const isCompleted = idx < currentStep;

                                return (
                                    <div key={step.key} className="flex flex-col items-center flex-1">
                                        <div className="flex items-center w-full">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${isActive
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : isCompleted
                                                        ? 'bg-green-500 text-white'
                                                        : 'bg-gray-200 text-gray-600'
                                                    }`}
                                            >
                                                {isCompleted ? <Check size={20} /> : <StepIcon size={20} />}
                                            </div>
                                            {idx < STEPS.length - 1 && (
                                                <div
                                                    className={`flex-1 h-1 mx-2 transition-all ${isCompleted ? 'bg-green-500' : 'bg-gray-200'
                                                        }`}
                                                />
                                            )}
                                        </div>
                                        <p className={`text-xs mt-2 text-center font-medium transition-all ${isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                                            }`}>
                                            {step.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Form Content */}
                    <form className="bg-white rounded-lg shadow">
                        <div className="p-8">
                            {/* Step 1: Organization Details */}
                            {currentStep === 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Building2 className="text-blue-600" size={24} />
                                        <h2 className="text-xl font-bold text-gray-900">Organization Details</h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Organization Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="organizationName"
                                            value={formData.organizationName}
                                            onChange={handleChange}
                                            placeholder="e.g. TechVision Ltd"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.organizationName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.organizationName && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.organizationName}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Organization Type *
                                            </label>
                                            <select
                                                name="organizationType"
                                                value={formData.organizationType}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none ${errors.organizationType ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            >
                                                <option value="">Select type</option>
                                                <option value="corporate">Corporate/Business</option>
                                                <option value="ngo">NGO/Non-Profit</option>
                                                <option value="educational">Educational Institution</option>
                                                <option value="government">Government Agency</option>
                                                <option value="startup">Startup/SME</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.organizationType && (
                                                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.organizationType}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Industry
                                            </label>
                                            <input
                                                type="text"
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleChange}
                                                placeholder="e.g. Software Development"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Website
                                            </label>
                                            <div className="relative">
                                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    placeholder="https://example.com"
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                placeholder="e.g. Ghana"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.country ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.country && (
                                                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.country}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Organization Logo
                                        </label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group relative">
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                                    <ImageIcon className="text-gray-400 group-hover:text-blue-600" size={24} />
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">Click to upload</span>
                                                    <span className="text-sm text-gray-500"> or drag and drop</span>
                                                </div>
                                                <p className="text-xs text-gray-400">SVG, PNG, JPG (max. 800x400px)</p>
                                                {formData.logo && (
                                                    <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <Check size={12} />
                                                        Selected: {formData.logo}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Contact Person */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Users className="text-blue-600" size={24} />
                                        <h2 className="text-xl font-bold text-gray-900">Contact Person</h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Contact Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="contactName"
                                            value={formData.contactName}
                                            onChange={handleChange}
                                            placeholder="e.g. Kwame Asante"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.contactName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.contactName && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.contactName}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Role/Position *
                                        </label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={formData.position}
                                            onChange={handleChange}
                                            placeholder="e.g. HR Director"
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.position ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        />
                                        {errors.position && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.position}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email *
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="email@example.com"
                                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+233 XX XXX XXXX"
                                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Partnership Goals (public form fields) */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Handshake className="text-blue-600" size={24} />
                                        <h2 className="text-xl font-bold text-gray-900">Partnership Goals</h2>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Partnership Type *
                                        </label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none ${errors.type ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                        >
                                            <option value="">Select partnership type</option>
                                            {getPartnershipTypes().map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        {errors.type && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.type}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Areas of Interest *
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {PARTNERSHIP_INTERESTS.map(interest => (
                                                <label key={interest} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value={interest}
                                                        checked={formData.interests.includes(interest)}
                                                        onChange={() => handleInterestToggle(interest)}
                                                        className="w-5 h-5 text-blue-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-700">{interest}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.interests && (
                                            <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                <AlertCircle size={14} />
                                                {errors.interests}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Timeline/Duration *
                                            </label>
                                            <input
                                                type="text"
                                                name="timeline"
                                                value={formData.timeline}
                                                onChange={handleChange}
                                                placeholder="e.g. 6 months, 1 year, ongoing"
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors.timeline ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.timeline && (
                                                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                                                    <AlertCircle size={14} />
                                                    {errors.timeline}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Value/Contribution
                                            </label>
                                            <input
                                                type="text"
                                                name="value"
                                                value={formData.value}
                                                onChange={handleChange}
                                                placeholder="e.g. GHS 150,000 or In-Kind"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Message/Goals
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Describe your partnership goals, expectations, or any specific requests..."
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            )}


                            {/* Step 4: Admin Review & Controls */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Check className="text-blue-600" size={24} />
                                        <h2 className="text-xl font-bold text-gray-900">Review & Admin Controls</h2>
                                    </div>

                                    {/* Review summary of public fields */}
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Organization</p>
                                            <p className="font-semibold text-gray-900">{formData.organizationName}</p>
                                            <p className="text-sm text-gray-600">{formData.industry}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Contact Person</p>
                                            <p className="font-semibold text-gray-900">{formData.contactName}</p>
                                            <p className="text-sm text-gray-600">{formData.position} • {formData.email}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Partnership Type</p>
                                            <p className="font-semibold text-gray-900 capitalize">{formData.type}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Areas of Interest</p>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.interests.map((interest, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                        {interest}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Timeline</p>
                                            <p className="text-sm text-gray-700">{formData.timeline}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="text-xs text-gray-500 mb-1">Message/Goals</p>
                                            <p className="text-sm text-gray-700">{formData.message}</p>
                                        </div>
                                    </div>

                                    {/* Admin-only fields */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Status *
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none"
                                            >
                                                {getPartnershipStatuses().map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Start Date
                                            </label>
                                            <input
                                                type="date"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                End Date
                                            </label>
                                            <input
                                                type="date"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Brief description of the partnership scope and goals..."
                                                rows={3}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Benefits (Comma separated)
                                        </label>
                                        <input
                                            type="text"
                                            name="benefits"
                                            value={formData.benefits}
                                            onChange={handleChange}
                                            placeholder="e.g. Employee Training, Internship Pipeline, Sponsorship"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        />
                                        <p className="text-gray-500 text-xs mt-2">
                                            Separate distinct benefits with commas
                                        </p>
                                    </div>
                                    <div className="pt-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={formData.featured}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-blue-600 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-700">Featured Partner</span>
                                                <Star size={16} className="text-amber-500 fill-amber-500" />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Form Footer */}
                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between rounded-b-lg">
                            <button
                                type="button"
                                onClick={currentStep === 0 ? handleCancel : handlePrev}
                                className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                            >
                                <ChevronLeft size={16} />
                                {currentStep === 0 ? 'Cancel' : 'Back'}
                            </button>

                            <div className="flex items-center gap-3">
                                {currentStep < STEPS.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                                    >
                                        Next
                                        <ChevronRight size={16} />
                                    </button>
                                )}

                                {currentStep === STEPS.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isSaving}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                                    >
                                        <Save size={16} />
                                        {isSaving ? 'Saving...' : isEditing ? 'Update Partnership' : 'Create Partnership'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default PartnershipFormPage;
