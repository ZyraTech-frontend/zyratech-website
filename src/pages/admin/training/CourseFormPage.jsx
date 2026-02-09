/**
 * Course Form Page (Add/Edit Course) - Multi-Step Wizard
 * Dedicated page for creating or editing training courses with step-by-step journey
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { getTrainingCourseById } from '../../../data/trainingCourses';
import {
    ChevronLeft,
    ChevronRight,
    Save,
    X,
    Plus,
    Trash2,
    GraduationCap,
    FileText,
    Clock,
    Users,
    DollarSign,
    Calendar,
    Award,
    Target,
    BookOpen,
    Layers,
    List,
    AlertCircle,
    Check
} from 'lucide-react';

// Category options
const CATEGORIES = [
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'internship', label: 'Internship' },
    { value: 'matured', label: 'Matured Professionals' }
];

// Level options
const LEVELS = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Beginner to Intermediate',
    'Beginner to Advanced',
    'All Levels'
];

// Format options
const FORMATS = [
    'Online',
    'Onsite',
    'Hybrid',
    'Online + Onsite',
    'Onsite/Online',
    'Flexible'
];

// Icon options
const ICON_OPTIONS = [
    { value: 'code', label: 'Code' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'target', label: 'Target' },
    { value: 'briefcase', label: 'Briefcase' },
    { value: 'database', label: 'Database' },
    { value: 'shield', label: 'Shield' },
    { value: 'cpu', label: 'CPU' },
    { value: 'smartphone', label: 'Smartphone' },
    { value: 'barChart', label: 'Bar Chart' },
    { value: 'globe', label: 'Globe' },
    { value: 'bookOpen', label: 'Book Open' },
    { value: 'building', label: 'Building' },
    { value: 'rocket', label: 'Rocket' }
];

// Badge options
const BADGE_OPTIONS = [
    { value: '', label: 'No Badge' },
    { value: 'Popular', label: 'Popular' },
    { value: 'Bestseller', label: 'Bestseller' },
    { value: 'New', label: 'New' },
    { value: 'Premium', label: 'Premium' },
    { value: 'Featured', label: 'Featured' }
];

// Step definitions
const STEPS = [
    { key: 'basic', title: 'Basic Info', icon: GraduationCap },
    { key: 'descriptions', title: 'Descriptions', icon: FileText },
    { key: 'schedule', title: 'Schedule & Pricing', icon: Clock },
    { key: 'capacity', title: 'Capacity & Contact', icon: Users },
    { key: 'content', title: 'Topics & Objectives', icon: Target },
    { key: 'review', title: 'Review', icon: Check }
];

const CourseFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEditing = Boolean(id);
    const existingCourse = isEditing ? getTrainingCourseById(parseInt(id)) : null;

    // Step state
    const [currentStep, setCurrentStep] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        // Basic Info
        title: '',
        category: 'basic',
        level: 'Beginner',
        iconKey: 'code',
        badge: '',

        // Descriptions
        description: '',
        longDescription: '',
        programOverview: '',
        heroInfoText: '',

        // Schedule & Pricing
        duration: '',
        schedule: '',
        format: 'Hybrid',
        deadline: '',
        price: '',
        originalPrice: '',

        // Capacity
        participants: '',
        instructor: '',
        certificate: '',

        // Ratings (optional - for display)
        rating: '',
        reviews: '',

        // Media
        heroImage: '',

        // Topics (comma-separated for simplicity)
        topicsText: '',

        // Programme Objectives
        programmeObjectives: [
            { title: '', description: '' }
        ]
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    // Load existing course data for editing
    useEffect(() => {
        if (isEditing && existingCourse) {
            setFormData({
                title: existingCourse.title || '',
                category: existingCourse.category || 'basic',
                level: existingCourse.level || 'Beginner',
                iconKey: existingCourse.iconKey || 'code',
                badge: existingCourse.badge || '',
                description: existingCourse.description || '',
                longDescription: existingCourse.longDescription || '',
                programOverview: existingCourse.programOverview || '',
                heroInfoText: existingCourse.heroInfoText || '',
                duration: existingCourse.duration || '',
                schedule: existingCourse.schedule || '',
                format: existingCourse.format || 'Hybrid',
                deadline: existingCourse.deadline || '',
                price: existingCourse.price || '',
                originalPrice: existingCourse.originalPrice || '',
                participants: existingCourse.participants || '',
                instructor: existingCourse.instructor || '',
                certificate: existingCourse.certificate || '',
                rating: existingCourse.rating?.toString() || '',
                reviews: existingCourse.reviews?.toString() || '',
                heroImage: existingCourse.heroImage || '',
                topicsText: existingCourse.topics?.join(', ') || '',
                programmeObjectives: existingCourse.programmeObjectives?.length > 0
                    ? existingCourse.programmeObjectives
                    : [{ title: '', description: '' }]
            });
        }
    }, [isEditing, existingCourse]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleObjectiveChange = (index, field, value) => {
        setFormData(prev => {
            const newObjectives = [...prev.programmeObjectives];
            newObjectives[index] = { ...newObjectives[index], [field]: value };
            return { ...prev, programmeObjectives: newObjectives };
        });
    };

    const addObjective = () => {
        setFormData(prev => ({
            ...prev,
            programmeObjectives: [...prev.programmeObjectives, { title: '', description: '' }]
        }));
    };

    const removeObjective = (index) => {
        if (formData.programmeObjectives.length <= 1) return;
        setFormData(prev => ({
            ...prev,
            programmeObjectives: prev.programmeObjectives.filter((_, i) => i !== index)
        }));
    };

    const validateStep = (stepIndex) => {
        const newErrors = {};
        const stepKey = STEPS[stepIndex]?.key;

        if (stepKey === 'basic') {
            if (!formData.title.trim()) newErrors.title = 'Course title is required';
        }

        if (stepKey === 'descriptions') {
            if (!formData.description.trim()) newErrors.description = 'Short description is required';
        }

        if (stepKey === 'schedule') {
            if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
            if (!formData.price.trim()) newErrors.price = 'Price is required';
        }

        if (stepKey === 'capacity') {
            if (!formData.instructor.trim()) newErrors.instructor = 'Instructor name is required';
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

        // Prepare the course data
        const courseData = {
            title: formData.title,
            category: formData.category,
            level: formData.level,
            iconKey: formData.iconKey,
            badge: formData.badge || undefined,
            description: formData.description,
            longDescription: formData.longDescription,
            programOverview: formData.programOverview,
            heroInfoText: formData.heroInfoText,
            heroImage: formData.heroImage || undefined,
            duration: formData.duration,
            schedule: formData.schedule,
            format: formData.format,
            deadline: formData.deadline,
            price: formData.price,
            originalPrice: formData.originalPrice || undefined,
            participants: formData.participants,
            instructor: formData.instructor,
            certificate: formData.certificate,
            rating: formData.rating ? parseFloat(formData.rating) : undefined,
            reviews: formData.reviews ? parseInt(formData.reviews, 10) : undefined,
            topics: formData.topicsText.split(',').map(t => t.trim()).filter(Boolean),
            programmeObjectives: formData.programmeObjectives.filter(obj => obj.title.trim() || obj.description.trim())
        };

        // Remove undefined values for cleaner data
        Object.keys(courseData).forEach(key => {
            if (courseData[key] === undefined) {
                delete courseData[key];
            }
        });

        console.log('Saving course:', courseData);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSaving(false);

        // Show success and navigate back
        dispatch(openConfirmDialog({
            title: isEditing ? 'Course Updated' : 'Course Created',
            message: isEditing
                ? `"${formData.title}" has been updated successfully.`
                : `"${formData.title}" has been created successfully.`,
            confirmText: 'OK',
            hideCancelButton: true,
            onConfirm: () => navigate('/admin/training')
        }));
    };

    const handleCancel = () => {
        if (formData.title || formData.description) {
            dispatch(openConfirmDialog({
                title: 'Discard Changes?',
                message: 'You have unsaved changes. Are you sure you want to leave?',
                isDangerous: true,
                confirmText: 'Discard',
                onConfirm: () => navigate('/admin/training')
            }));
        } else {
            navigate('/admin/training');
        }
    };

    // If editing and course not found
    if (isEditing && !existingCourse) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <AlertCircle size={48} className="text-red-500 mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Course Not Found</h2>
                    <p className="text-gray-500 mb-4">The course you're trying to edit doesn't exist.</p>
                    <button
                        onClick={() => navigate('/admin/training')}
                        className="text-[#004fa2] hover:underline font-medium"
                    >
                        Return to Training
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
                                Course Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="e.g., Full Stack Web Development"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                <select
                                    name="level"
                                    value={formData.level}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                                >
                                    {LEVELS.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                <select
                                    name="iconKey"
                                    value={formData.iconKey}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                                >
                                    {ICON_OPTIONS.map(icon => (
                                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Badge (Optional)</label>
                                <select
                                    name="badge"
                                    value={formData.badge}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                                >
                                    {BADGE_OPTIONS.map(badge => (
                                        <option key={badge.value} value={badge.value}>{badge.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 'descriptions':
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={2}
                                placeholder="Brief description for course cards (1-2 sentences)"
                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none ${errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                            <textarea
                                name="longDescription"
                                value={formData.longDescription}
                                onChange={handleInputChange}
                                rows={4}
                                placeholder="Comprehensive course description for the detail page"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Program Overview</label>
                            <textarea
                                name="programOverview"
                                value={formData.programOverview}
                                onChange={handleInputChange}
                                rows={3}
                                placeholder="High-level overview of the program"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Info Text</label>
                            <input
                                type="text"
                                name="heroInfoText"
                                value={formData.heroInfoText}
                                onChange={handleInputChange}
                                placeholder="Short tagline for the hero section"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image URL (Optional)</label>
                            <input
                                type="text"
                                name="heroImage"
                                value={formData.heroImage}
                                onChange={handleInputChange}
                                placeholder="e.g., /images/course-hero.png"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">Custom hero background image for the course detail page. Leave empty to use default.</p>
                        </div>
                    </div>
                );

            case 'schedule':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 12 weeks"
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.duration ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                />
                                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                                <input
                                    type="text"
                                    name="schedule"
                                    value={formData.schedule}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Weekdays 6PM-8PM"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                                <select
                                    name="format"
                                    value={formData.format}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                                >
                                    {FORMATS.map(format => (
                                        <option key={format} value={format}>{format}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                                <input
                                    type="text"
                                    name="deadline"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 31st January, 2026"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="e.g., GHS 3,500"
                                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                />
                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (Optional)</label>
                                <input
                                    type="text"
                                    name="originalPrice"
                                    value={formData.originalPrice}
                                    onChange={handleInputChange}
                                    placeholder="e.g., GHS 4,500"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'capacity':
                return (
                    <div className="space-y-8">
                        {/* Instructor & Capacity */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Users size={16} className="text-[#004fa2]" />
                                Course Capacity
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
                                    <input
                                        type="text"
                                        name="participants"
                                        value={formData.participants}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 15-20"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Instructor <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="instructor"
                                        value={formData.instructor}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Michael Afedi"
                                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all ${errors.instructor ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                                    />
                                    {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate</label>
                                    <input
                                        type="text"
                                        name="certificate"
                                        value={formData.certificate}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Professional DevOps Certificate"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="pt-6 border-t border-gray-100">
                            <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Award size={16} className="text-[#004fa2]" />
                                Ratings & Reviews (Optional)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating (1-5)</label>
                                    <input
                                        type="number"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 4.8"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Course rating displayed on cards (e.g., 4.8)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Number of Reviews</label>
                                    <input
                                        type="number"
                                        name="reviews"
                                        value={formData.reviews}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 127"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Total reviews count shown on course cards</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'content':
                return (
                    <div className="space-y-8">
                        {/* Topics */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Topics (comma-separated)
                            </label>
                            <input
                                type="text"
                                name="topicsText"
                                value={formData.topicsText}
                                onChange={handleInputChange}
                                placeholder="e.g., Docker, Kubernetes, AWS/Azure, Jenkins, Terraform"
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                            />
                            <p className="text-xs text-gray-500 mt-2">Separate topics with commas. These appear as tags on the course card.</p>
                        </div>

                        {/* Programme Objectives */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700">Programme Objectives</label>
                                <button
                                    type="button"
                                    onClick={addObjective}
                                    className="px-3 py-1.5 bg-[#004fa2]/10 text-[#004fa2] rounded-lg hover:bg-[#004fa2]/20 transition-colors font-medium text-sm flex items-center gap-1"
                                >
                                    <Plus size={16} />
                                    Add
                                </button>
                            </div>

                            <div className="space-y-4">
                                {formData.programmeObjectives.map((objective, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <span className="text-xs font-bold text-[#004fa2] bg-[#004fa2]/10 px-2 py-1 rounded">
                                                Objective {index + 1}
                                            </span>
                                            {formData.programmeObjectives.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeObjective(index)}
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                value={objective.title}
                                                onChange={(e) => handleObjectiveChange(index, 'title', e.target.value)}
                                                placeholder="Objective title"
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all bg-white"
                                            />
                                            <textarea
                                                value={objective.description}
                                                onChange={(e) => handleObjectiveChange(index, 'description', e.target.value)}
                                                placeholder="Objective description"
                                                rows={2}
                                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all resize-none bg-white"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'review':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-[#004fa2]/5 to-[#0066cc]/5 rounded-xl p-6 border border-[#004fa2]/10">
                            <h3 className="font-bold text-gray-900 text-lg mb-4">Review Your Course</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Course Title</p>
                                    <p className="font-semibold text-gray-900">{formData.title || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Category</p>
                                    <p className="font-semibold text-gray-900">{CATEGORIES.find(c => c.value === formData.category)?.label || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Level</p>
                                    <p className="font-semibold text-gray-900">{formData.level || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Duration</p>
                                    <p className="font-semibold text-gray-900">{formData.duration || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Price</p>
                                    <p className="font-semibold text-gray-900">{formData.price || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Instructor</p>
                                    <p className="font-semibold text-gray-900">{formData.instructor || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Format</p>
                                    <p className="font-semibold text-gray-900">{formData.format || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                                    <p className="font-semibold text-gray-900">{formData.deadline || '-'}</p>
                                </div>
                                {formData.rating && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Rating</p>
                                        <p className="font-semibold text-gray-900">⭐ {formData.rating} ({formData.reviews || 0} reviews)</p>
                                    </div>
                                )}
                                {formData.heroImage && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Hero Image</p>
                                        <p className="font-semibold text-gray-900 truncate">{formData.heroImage}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Description</p>
                                <p className="text-gray-700">{formData.description || '-'}</p>
                            </div>

                            {formData.topicsText && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-2">Topics</p>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.topicsText.split(',').map((topic, i) => (
                                            <span key={i} className="px-3 py-1 bg-[#004fa2]/10 text-[#004fa2] rounded-full text-sm font-medium">
                                                {topic.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {formData.programmeObjectives.some(obj => obj.title) && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-2">Programme Objectives</p>
                                    <ul className="space-y-2">
                                        {formData.programmeObjectives
                                            .filter(obj => obj.title)
                                            .map((obj, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{obj.title}</span>
                                                </li>
                                            ))
                                        }
                                    </ul>
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
    const StepIcon = currentStepData?.icon || GraduationCap;

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
                                {isEditing ? 'Edit Course' : 'Add New Course'}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEditing ? `Editing: ${existingCourse?.title}` : 'Create a new training course'}
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
                            {isSaving ? 'Saving...' : (isEditing ? 'Update Course' : 'Create Course')}
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

export default CourseFormPage;
