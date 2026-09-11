/**
 * Course Form Page (Add/Edit Course) - Multi-Step Wizard
 * Dedicated page for creating or editing training courses with step-by-step journey
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import { createCourse, updateCourse } from '../../../store/slices/coursesSlice';
import trainingService from '../../../services/trainingService';
import api from '../../../services/api';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
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
    Check,
    Upload,
    Image as ImageIcon,
    Trash,
    Loader2,
    Sparkles,
    ExternalLink
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

// Stock tech cover images for quick selection
const STOCK_COURSE_IMAGES = [
    { label: 'Software Eng', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Cloud & DevOps', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Cybersecurity', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Data Science & AI', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80' },
    { label: 'Mobile Apps', url: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=1200&auto=format&fit=crop&q=80' }
];

const CourseFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEditing = Boolean(id);
    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [isUploadingHeroImage, setIsUploadingHeroImage] = useState(false);
    const [imageUploadError, setImageUploadError] = useState('');
    const [showUrlInput, setShowUrlInput] = useState(false);

    // Step state
    const [currentStep, setCurrentStep] = useState(0);

    // Form state
    const [formData, setFormData] = useState({
        // Basic Info
        title: '',
        slug: '',
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

    // Load existing course data for editing from live backend
    useEffect(() => {
        if (isEditing && id) {
            setIsLoadingCourse(true);
            trainingService.getCourse(id)
                .then(res => {
                    const c = res?.course || res?.data || res;
                    if (c) {
                        setFormData({
                            title: c.title || '',
                            slug: c.slug || '',
                            category: c.category || 'basic',
                            level: c.level || 'Beginner',
                            iconKey: c.iconKey || 'code',
                            badge: c.badge || '',
                            description: c.description || '',
                            longDescription: c.longDescription || '',
                            programOverview: c.programOverview || '',
                            heroInfoText: c.heroInfoText || '',
                            duration: c.duration || '',
                            schedule: c.schedule || '',
                            format: c.format || 'Hybrid',
                            deadline: c.deadline || '',
                            price: c.price ? String(c.price).replace(/[^0-9.]/g, '') : '',
                            originalPrice: (c.discountPrice || c.originalPrice) ? String(c.discountPrice || c.originalPrice).replace(/[^0-9.]/g, '') : '',
                            participants: c.participants ? String(c.participants) : '',
                            instructor: c.instructor || (Array.isArray(c.instructors) ? c.instructors[0]?.name : '') || '',
                            certificate: c.certificate || '',
                            rating: c.rating ? String(c.rating) : '',
                            reviews: c.reviews ? String(c.reviews) : '',
                            heroImage: c.heroImage || c.image || '',
                            topicsText: Array.isArray(c.topics) ? c.topics.join(', ') : (Array.isArray(c.tools) ? c.tools.join(', ') : ''),
                            programmeObjectives: Array.isArray(c.programmeObjectives) && c.programmeObjectives.length > 0
                                ? c.programmeObjectives
                                : (Array.isArray(c.outcomes) ? c.outcomes.map(o => ({ title: o, description: '' })) : [{ title: '', description: '' }])
                        });
                    }
                })
                .catch(err => {
                    console.error('Failed to load course details:', err);
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to load course details from server'
                    }));
                })
                .finally(() => {
                    setIsLoadingCourse(false);
                });
        }
    }, [isEditing, id, dispatch]);

    // Convert current deadline text to YYYY-MM-DD for native date picker
    const deadlineAsIsoDate = useMemo(() => {
        if (!formData.deadline) return '';
        if (/^\d{4}-\d{2}-\d{2}$/.test(formData.deadline)) return formData.deadline;
        const cleaned = formData.deadline.replace(/(\d+)(st|nd|rd|th)/, '$1');
        const parsed = Date.parse(cleaned);
        if (!isNaN(parsed)) {
            const d = new Date(parsed);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }
        return '';
    }, [formData.deadline]);

    const handleDeadlineDateChange = (e) => {
        const isoValue = e.target.value;
        if (!isoValue) {
            setFormData(prev => ({ ...prev, deadline: '' }));
            return;
        }
        try {
            const [year, month, day] = isoValue.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            const dayNum = date.getDate();
            const suffix = (dayNum % 10 === 1 && dayNum !== 11) ? 'st'
                         : (dayNum % 10 === 2 && dayNum !== 12) ? 'nd'
                         : (dayNum % 10 === 3 && dayNum !== 13) ? 'rd' : 'th';
            const monthName = date.toLocaleString('default', { month: 'long' });
            const formatted = `${dayNum}${suffix} ${monthName}, ${year}`;
            setFormData(prev => ({ ...prev, deadline: formatted }));
        } catch {
            setFormData(prev => ({ ...prev, deadline: isoValue }));
        }
    };

    const handleHeroImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
            setImageUploadError('Please choose a JPG, PNG, or WebP image.');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setImageUploadError('Image size must be less than 10MB.');
            return;
        }

        setImageUploadError('');
        setIsUploadingHeroImage(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);

            let uploadedUrl = '';
            try {
                const res = await api.post('/admin/gallery/upload', uploadFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedUrl = res.data?.data?.url || res.data?.url;
            } catch (galleryErr) {
                // Fallback to avatar upload endpoint
                const res = await api.post('/auth/profile/avatar', uploadFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedUrl = res.data?.data?.avatar || res.data?.data?.avatarUrl || res.data?.avatar || res.data?.url;
            }

            if (uploadedUrl) {
                setFormData(prev => ({ ...prev, heroImage: uploadedUrl }));
                dispatch(addNotification({
                    type: 'success',
                    message: 'Course image uploaded successfully!'
                }));
            } else {
                throw new Error('Upload returned no URL');
            }
        } catch (err) {
            console.error('Image upload failed:', err);
            setImageUploadError(err.response?.data?.message || err.message || 'Image upload failed. You can paste an image URL directly.');
        } finally {
            setIsUploadingHeroImage(false);
            if (e.target) e.target.value = '';
        }
    };

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

        try {
            // Normalize price: backend Prisma field is a String (e.g. "GHS 2,800")
            const rawPrice = String(courseData.price || '').trim();
            const normalizedPrice = rawPrice.match(/[a-zA-Z]/)
                ? rawPrice  // already has currency label (e.g. "GHS 2,800")
                : rawPrice ? `GHS ${rawPrice}` : 'GHS 0';

            // Only send fields the backend UpdateCourseInput accepts
            const payload = {
                title: courseData.title,
                category: courseData.category,
                duration: courseData.duration,
                level: courseData.level,
                price: normalizedPrice,
                description: courseData.description,
                topics: courseData.topics,
                instructor: courseData.instructor,
                format: courseData.format,
            };

            // Strip undefined so backend validation stays clean
            Object.keys(payload).forEach(key => {
                if (payload[key] === undefined || payload[key] === '') {
                    delete payload[key];
                }
            });

            if (isEditing) {
                await dispatch(updateCourse({ id, data: payload })).unwrap();
                dispatch(addNotification({
                    type: 'success',
                    message: `Course "${formData.title}" updated successfully.`
                }));
            } else {
                await dispatch(createCourse(payload)).unwrap();
                dispatch(addNotification({
                    type: 'success',
                    message: `Course "${formData.title}" created successfully.`
                }));
            }

            navigate('/admin/training');
        } catch (err) {
            console.error('Failed to save course:', err);
            dispatch(addNotification({
                type: 'error',
                message: typeof err === 'string' ? err : 'Failed to save course. Please check all required fields.'
            }));
        } finally {
            setIsSaving(false);
        }
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

    // While loading the course for editing, show spinner
    if (isEditing && isLoadingCourse) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="w-10 h-10 border-4 border-[#004fa2]/20 border-t-[#004fa2] rounded-full animate-spin mb-3"></div>
                    <p className="text-sm font-medium text-gray-600">Loading course details...</p>
                </div>
            </AdminLayout>
        );
    }

    // Reusable image uploader component for Basic Info & Descriptions
    const renderImageUploader = () => (
        <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                    <ImageIcon size={16} className="text-[#004fa2]" />
                    Course Cover / Thumbnail Image (Optional)
                </span>
                {formData.heroImage && (
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, heroImage: '' }))}
                        className="text-xs text-red-500 hover:underline flex items-center gap-1"
                    >
                        <Trash2 size={12} />
                        Remove Cover
                    </button>
                )}
            </label>

            {/* Image Preview & Upload Area */}
            {formData.heroImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm mb-4">
                    <img
                        src={formData.heroImage}
                        alt="Course preview"
                        className="w-full h-44 object-cover"
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end justify-between p-4">
                        <div className="text-white text-xs truncate max-w-[70%]">
                            <p className="font-semibold text-white/95">Selected Course Cover</p>
                            <p className="text-white/70 truncate">{formData.heroImage}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="cursor-pointer px-3 py-1.5 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold rounded-lg shadow transition-all flex items-center gap-1.5">
                                <Upload size={13} />
                                <span>Change</span>
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp,image/jpg"
                                    onChange={handleHeroImageUpload}
                                    disabled={isUploadingHeroImage}
                                    className="hidden"
                                />
                            </label>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, heroImage: '' }))}
                                className="p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow transition-all"
                                title="Remove image"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-200 hover:border-[#004fa2] rounded-2xl p-6 text-center transition-all bg-gray-50/60 hover:bg-blue-50/20 mb-4 group">
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-3 text-[#004fa2] group-hover:scale-110 transition-transform">
                        {isUploadingHeroImage ? (
                            <Loader2 size={24} className="animate-spin text-[#004fa2]" />
                        ) : (
                            <Upload size={22} />
                        )}
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                        {isUploadingHeroImage ? 'Uploading course image...' : 'Click or drag & drop to choose course cover'}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">PNG, JPG, or WebP up to 10MB</p>
                    <label className={`inline-flex items-center gap-2 px-4 py-2 bg-[#004fa2] hover:bg-[#003d7e] text-white text-xs font-semibold rounded-xl shadow cursor-pointer transition-all ${isUploadingHeroImage ? 'opacity-60 pointer-events-none' : ''}`}>
                        <Upload size={14} />
                        <span>Choose from Computer</span>
                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/jpg"
                            onChange={handleHeroImageUpload}
                            disabled={isUploadingHeroImage}
                            className="hidden"
                        />
                    </label>
                </div>
            )}

            {imageUploadError && (
                <p className="text-red-500 text-xs mb-3 flex items-center gap-1.5">
                    <AlertCircle size={13} />
                    {imageUploadError}
                </p>
            )}

            {/* Quick Stock Image Selection */}
            <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                        <Sparkles size={13} className="text-[#004fa2]" />
                        Or pick a curated tech cover:
                    </span>
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                        className="text-xs text-[#004fa2] hover:underline"
                    >
                        {showUrlInput ? 'Hide URL input' : 'Enter URL manually'}
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {STOCK_COURSE_IMAGES.map((img) => (
                        <button
                            key={img.label}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, heroImage: img.url }))}
                            className={`relative rounded-lg overflow-hidden border text-left group p-1.5 transition-all ${formData.heroImage === img.url ? 'ring-2 ring-[#004fa2] border-transparent bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                        >
                            <img src={img.url} alt={img.label} className="w-full h-12 object-cover rounded mb-1" />
                            <p className="text-[11px] font-medium text-gray-700 truncate">{img.label}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Optional URL input toggle */}
            {showUrlInput && (
                <div className="mt-3">
                    <input
                        type="text"
                        name="heroImage"
                        value={formData.heroImage}
                        onChange={handleInputChange}
                        placeholder="Paste custom image URL (e.g., https://...)"
                        className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all"
                    />
                </div>
            )}
        </div>
    );

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

                        {/* Course Cover / Hero Image Upload directly in Basic Info */}
                        {renderImageUploader()}
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

                        {/* Course Cover / Hero Image */}
                        {renderImageUploader()}
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
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={15} className="text-[#004fa2]" />
                                        Application Deadline
                                    </span>
                                    {formData.deadline && (
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, deadline: '' }))}
                                            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </label>

                                {/* Date Input with Calendar Picker */}
                                <div className="relative mb-2.5">
                                    <input
                                        type="date"
                                        value={deadlineAsIsoDate}
                                        onChange={handleDeadlineDateChange}
                                        className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] transition-all font-medium text-gray-800 bg-white cursor-pointer"
                                    />
                                    <Calendar size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Formatted Display & Quick Presets */}
                                <div className="space-y-2">
                                    {formData.deadline && (
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-xs text-[#004fa2]">
                                            <span className="font-semibold">Selected:</span>
                                            <span className="font-medium">{formData.deadline}</span>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-[11px] text-gray-400 font-medium mr-1">Presets:</span>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, deadline: 'Rolling Admission' }))}
                                            className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${formData.deadline === 'Rolling Admission' ? 'bg-[#004fa2] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                                        >
                                            Rolling Admission
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const now = new Date();
                                                const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                                                const iso = `${endOfMonth.getFullYear()}-${String(endOfMonth.getMonth() + 1).padStart(2, '0')}-${String(endOfMonth.getDate()).padStart(2, '0')}`;
                                                handleDeadlineDateChange({ target: { value: iso } });
                                            }}
                                            className="px-2.5 py-1 text-xs rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                                        >
                                            End of Month
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const now = new Date();
                                                const nextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);
                                                const iso = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, '0')}-${String(nextMonth.getDate()).padStart(2, '0')}`;
                                                handleDeadlineDateChange({ target: { value: iso } });
                                            }}
                                            className="px-2.5 py-1 text-xs rounded-lg font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                                        >
                                            End of Next Month
                                        </button>
                                    </div>
                                </div>
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

                            {/* Course Cover Preview in Review */}
                            {formData.heroImage ? (
                                <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative h-48 bg-gray-100">
                                    <img
                                        src={formData.heroImage}
                                        alt="Course cover"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 text-white rounded-lg text-xs font-semibold backdrop-blur-sm flex items-center gap-1.5">
                                        <ImageIcon size={13} />
                                        <span>Course Cover</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(0)}
                                        className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold rounded-lg shadow transition-all flex items-center gap-1"
                                    >
                                        <Upload size={12} />
                                        Change Cover
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-6 p-4 rounded-xl border border-dashed border-gray-300 bg-white/60 flex items-center justify-between text-xs text-gray-600">
                                    <span className="flex items-center gap-1.5">
                                        <ImageIcon size={16} className="text-gray-400" />
                                        No custom cover chosen (a default cover will be shown)
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep(0)}
                                        className="text-[#004fa2] font-semibold hover:underline"
                                    >
                                        Choose Cover
                                    </button>
                                </div>
                            )}

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
                            className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? 'Edit Course' : 'Add New Course'}
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {isEditing ? `Editing: ${formData.title || '...'}` : 'Create a new training course'}
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
                                            className={`w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${isActive
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
                        <div className="w-6 h-6 md:w-8 md:h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
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
