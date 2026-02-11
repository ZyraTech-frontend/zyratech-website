/**
 * Enrollment Form Page (Admin)
 * Dedicated form page for adding/editing enrollments
 * Fields match the public CourseApplicationForm
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { trainingCourses } from '../../../data/trainingCourses';
import {
    GraduationCap,
    ArrowLeft,
    Save,
    User,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    Calendar,
    CreditCard,
    FileText,
    AlertCircle,
    CheckCircle,
    Globe,
    Linkedin,
    Settings,
    Upload
} from 'lucide-react';

// Education levels (matching public form)
const EDUCATION_LEVELS = [
    'JHS / SHS',
    'Diploma',
    'Undergraduate',
    'Graduate',
    'Other'
];

// Cohorts (matching public form)
const COHORTS = [
    'January to April',
    'April to July',
    'July to October'
];

// Learning modes (matching public form)
const LEARNING_MODES = [
    'Online',
    'Onsite',
    'Hybrid'
];

// Mock enrollments for edit mode lookup
const mockEnrollments = [
    {
        id: 'ENR-2024-001',
        fullName: 'Kwame Asante',
        email: 'kwame.asante@example.com',
        phone: '+233 24 123 4567',
        country: 'Ghana',
        currentLocation: 'Accra',
        educationLevel: 'Graduate',
        preferredCohort: 'January to April',
        learningMode: 'Hybrid',
        courseId: 1,
        motivationStatement: 'I want to transition into DevOps to enhance my cloud computing skills.',
        linkedinUrl: 'https://linkedin.com/in/kwameasante',
        websiteUrl: '',
        cvFileName: 'kwame_cv.pdf',
        status: 'approved',
        enrolledDate: '2024-12-15T10:30:00Z',
        startDate: '2024-01-15',
        progress: 65,
        paymentStatus: 'paid',
        notes: 'Strong technical background'
    },
    {
        id: 'ENR-2024-002',
        fullName: 'Ama Mensah',
        email: 'ama.mensah@example.com',
        phone: '+233 20 987 6543',
        country: 'Ghana',
        currentLocation: 'Kumasi',
        educationLevel: 'Undergraduate',
        preferredCohort: 'April to July',
        learningMode: 'Online',
        courseId: 3,
        motivationStatement: '',
        linkedinUrl: '',
        websiteUrl: '',
        cvFileName: '',
        status: 'in_progress',
        enrolledDate: '2024-12-10T14:15:00Z',
        startDate: '2024-01-08',
        progress: 42,
        paymentStatus: 'paid',
        notes: 'Motivated self-learner'
    }
];

const EnrollmentFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        // Personal Details (Step 1 in public form)
        fullName: '',
        email: '',
        phone: '',
        // Background (Step 2 in public form)
        country: '',
        currentLocation: '',
        educationLevel: '',
        // Preferences (Step 3 in public form)
        preferredCohort: '',
        learningMode: '',
        courseId: '',
        // Professional Info (Step 4 in public form - for advanced courses)
        motivationStatement: '',
        linkedinUrl: '',
        websiteUrl: '',
        cvFileName: '',
        // Admin-only fields
        status: 'pending',
        startDate: '',
        paymentStatus: 'pending',
        notes: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Check if selected course requires extra fields
    const selectedCourse = useMemo(() => {
        return trainingCourses.find(c => c.id.toString() === formData.courseId);
    }, [formData.courseId]);

    const requiresExtraFields = useMemo(() => {
        const category = selectedCourse?.category || 'basic';
        return ['intermediate', 'advanced', 'internship', 'matured'].includes(category);
    }, [selectedCourse]);

    // Load enrollment data in edit mode
    useEffect(() => {
        if (isEditMode && id) {
            const enrollment = mockEnrollments.find(e => e.id === id);
            if (enrollment) {
                setFormData({
                    fullName: enrollment.fullName,
                    email: enrollment.email,
                    phone: enrollment.phone,
                    country: enrollment.country,
                    currentLocation: enrollment.currentLocation,
                    educationLevel: enrollment.educationLevel,
                    preferredCohort: enrollment.preferredCohort,
                    learningMode: enrollment.learningMode,
                    courseId: enrollment.courseId.toString(),
                    motivationStatement: enrollment.motivationStatement || '',
                    linkedinUrl: enrollment.linkedinUrl || '',
                    websiteUrl: enrollment.websiteUrl || '',
                    cvFileName: enrollment.cvFileName || '',
                    status: enrollment.status,
                    startDate: enrollment.startDate || '',
                    paymentStatus: enrollment.paymentStatus,
                    notes: enrollment.notes || ''
                });
            }
        }
    }, [id, isEditMode]);

    const validateForm = () => {
        const errors = {};
        // Personal Details
        if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format';
        }
        if (!formData.phone.trim()) errors.phone = 'Phone is required';
        // Background
        if (!formData.country.trim()) errors.country = 'Country is required';
        if (!formData.currentLocation.trim()) errors.currentLocation = 'Location is required';
        if (!formData.educationLevel) errors.educationLevel = 'Select education level';
        // Preferences
        if (!formData.preferredCohort) errors.preferredCohort = 'Select a cohort';
        if (!formData.learningMode) errors.learningMode = 'Select learning mode';
        if (!formData.courseId) errors.courseId = 'Please select a course';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const enrollmentData = {
            id: isEditMode ? id : `ENR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
            // Student submitted data (matching public form)
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            currentLocation: formData.currentLocation,
            educationLevel: formData.educationLevel,
            preferredCohort: formData.preferredCohort,
            learningMode: formData.learningMode,
            // Course
            courseId: parseInt(formData.courseId),
            courseTitle: selectedCourse?.title || '',
            courseCategory: selectedCourse?.category || 'basic',
            // Professional info (for advanced courses)
            motivationStatement: formData.motivationStatement,
            linkedinUrl: formData.linkedinUrl,
            websiteUrl: formData.websiteUrl,
            cvFileName: formData.cvFileName,
            // Admin fields
            status: formData.status,
            enrolledDate: isEditMode ? undefined : new Date().toISOString(),
            startDate: formData.startDate || null,
            progress: isEditMode ? undefined : 0,
            paymentStatus: formData.paymentStatus,
            notes: formData.notes
        };

        console.log(isEditMode ? 'Updating enrollment:' : 'Creating enrollment:', enrollmentData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        setIsSubmitting(false);
        setShowSuccess(true);

        // Redirect after showing success
        setTimeout(() => {
            navigate('/admin/enrollments');
        }, 1500);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto pb-8">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        to="/admin/enrollments"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-[#004fa2] transition-colors mb-4 text-sm"
                    >
                        <ArrowLeft size={16} />
                        Back to Enrollments
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                            <GraduationCap className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditMode ? 'Edit Enrollment' : 'Add New Enrollment'}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {isEditMode ? `Editing ${id}` : 'Manually enroll a student in a course'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={20} />
                        <p className="text-green-700 font-medium">
                            Enrollment {isEditMode ? 'updated' : 'created'} successfully! Redirecting...
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Details Card (Step 1 in public form) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <User size={18} className="text-[#004fa2]" />
                            Personal Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleChange('fullName', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all ${formErrors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        placeholder="Enter student's full name"
                                    />
                                </div>
                                {formErrors.fullName && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.fullName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all ${formErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        placeholder="student@example.com"
                                    />
                                </div>
                                {formErrors.email && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.email}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all ${formErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        placeholder="+233 24 123 4567"
                                    />
                                </div>
                                {formErrors.phone && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.phone}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Background Card (Step 2 in public form) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-[#004fa2]" />
                            Background
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => handleChange('country', e.target.value)}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all ${formErrors.country ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                    placeholder="Ghana"
                                />
                                {formErrors.country && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.country}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Current Location (City/Town) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        value={formData.currentLocation}
                                        onChange={(e) => handleChange('currentLocation', e.target.value)}
                                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all ${formErrors.currentLocation ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                        placeholder="Koforidua, Accra, Kumasi..."
                                    />
                                </div>
                                {formErrors.currentLocation && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.currentLocation}
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Education Level <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.educationLevel}
                                    onChange={(e) => handleChange('educationLevel', e.target.value)}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all bg-white ${formErrors.educationLevel ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                >
                                    <option value="">Select education level</option>
                                    {EDUCATION_LEVELS.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                                {formErrors.educationLevel && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.educationLevel}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preferences Card (Step 3 in public form) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Settings size={18} className="text-[#004fa2]" />
                            Preferences
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Preferred Cohort <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.preferredCohort}
                                    onChange={(e) => handleChange('preferredCohort', e.target.value)}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all bg-white ${formErrors.preferredCohort ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                >
                                    <option value="">Select cohort</option>
                                    {COHORTS.map(cohort => (
                                        <option key={cohort} value={cohort}>{cohort}</option>
                                    ))}
                                </select>
                                {formErrors.preferredCohort && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.preferredCohort}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Learning Mode <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.learningMode}
                                    onChange={(e) => handleChange('learningMode', e.target.value)}
                                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all bg-white ${formErrors.learningMode ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                >
                                    <option value="">Select mode</option>
                                    {LEARNING_MODES.map(mode => (
                                        <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                                {formErrors.learningMode && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <AlertCircle size={12} />
                                        {formErrors.learningMode}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Course Selection Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen size={18} className="text-[#004fa2]" />
                            Course Selection
                        </h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Select Course <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.courseId}
                                onChange={(e) => handleChange('courseId', e.target.value)}
                                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all bg-white ${formErrors.courseId ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            >
                                <option value="">Choose a course...</option>
                                {trainingCourses.map(course => (
                                    <option key={course.id} value={course.id}>
                                        {course.title} ({course.category}) - {course.price}
                                    </option>
                                ))}
                            </select>
                            {formErrors.courseId && (
                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    {formErrors.courseId}
                                </p>
                            )}
                        </div>

                        {/* Course Preview */}
                        {selectedCourse && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="font-semibold text-gray-900">{selectedCourse.title}</h3>
                                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-500">Duration:</span>
                                        <p className="font-medium text-gray-900">{selectedCourse.duration}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Level:</span>
                                        <p className="font-medium text-gray-900 capitalize">{selectedCourse.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Price:</span>
                                        <p className="font-medium text-gray-900">{selectedCourse.price}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Format:</span>
                                        <p className="font-medium text-gray-900">{selectedCourse.format || 'Hybrid'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Professional Info Card (Step 4 in public form - for advanced courses) */}
                    {requiresExtraFields && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                                <FileText size={18} className="text-[#004fa2]" />
                                Professional Info
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">Required for {selectedCourse?.category} level courses</p>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Motivation Statement
                                    </label>
                                    <textarea
                                        value={formData.motivationStatement}
                                        onChange={(e) => handleChange('motivationStatement', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all resize-none"
                                        placeholder="Why does this student want to join this course?"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            LinkedIn URL
                                        </label>
                                        <div className="relative">
                                            <Linkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="url"
                                                value={formData.linkedinUrl}
                                                onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                                placeholder="https://linkedin.com/in/..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Website / Portfolio URL
                                        </label>
                                        <div className="relative">
                                            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input
                                                type="url"
                                                value={formData.websiteUrl}
                                                onChange={(e) => handleChange('websiteUrl', e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        CV/Resume Filename
                                    </label>
                                    <div className="relative">
                                        <Upload className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            value={formData.cvFileName}
                                            onChange={(e) => handleChange('cvFileName', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                            placeholder="e.g., john_doe_cv.pdf"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Enter the filename of the uploaded CV (actual file upload handled via backend)</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Admin-Only Fields Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Calendar size={18} className="text-[#004fa2]" />
                            Admin Controls
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Enrollment Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all bg-white"
                                >
                                    <option value="pending">Pending Review</option>
                                    <option value="approved">Approved</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="withdrawn">Withdrawn</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Payment Status
                                </label>
                                <div className="relative">
                                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <select
                                        value={formData.paymentStatus}
                                        onChange={(e) => handleChange('paymentStatus', e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all bg-white"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="partial">Partial Payment</option>
                                        <option value="refunded">Refunded</option>
                                        <option value="partial_refund">Partial Refund</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.startDate}
                                    onChange={(e) => handleChange('startDate', e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Admin Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all resize-none"
                                placeholder="Internal notes (prerequisites verified, corporate sponsor, special requirements, etc.)..."
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <Link
                            to="/admin/enrollments"
                            className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-lg hover:from-[#003d7a] hover:to-[#004fa2] transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    {isEditMode ? 'Update Enrollment' : 'Create Enrollment'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default EnrollmentFormPage;
