/**
 * Testimonials Management Page (Admin)
 * Professional admin interface for managing customer testimonials
 */

import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { usePermissions } from '../../../hooks/usePermissions';
import {
    MessageCircle,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Grid,
    List,
    ChevronLeft,
    ChevronRight,
    X,
    Star,
    User,
    Quote,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    ExternalLink,
    ThumbsUp,
    Image,
    Video,
    Sparkles,
    Award,
    GraduationCap,
    Briefcase,
    Building,
    Users,
    Heart,
    StarHalf
} from 'lucide-react';

// Type/Source configuration
const TYPE_CONFIG = {
    'student': {
        label: 'Student',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: GraduationCap
    },
    'alumni': {
        label: 'Alumni',
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        icon: Award
    },
    'partner': {
        label: 'Partner',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: Building
    },
    'corporate': {
        label: 'Corporate',
        color: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        icon: Briefcase
    },
    'parent': {
        label: 'Parent',
        color: 'bg-pink-100 text-pink-700 border-pink-200',
        icon: Heart
    },
    'mentor': {
        label: 'Mentor',
        color: 'bg-amber-100 text-amber-700 border-amber-200',
        icon: Users
    }
};

// Mock testimonials data
const mockTestimonials = [
    {
        id: 1,
        name: 'Ama Mensah',
        role: 'Junior STEM Basics',
        type: 'student',
        quote: "I built my first circuit with recycled parts and it actually worked! The hands-on approach at Zyra Tech Hub made learning fun and practical.",
        rating: 5,
        avatar: '/images/testimonials/ama.jpg',
        featured: true,
        status: 'published',
        program: 'STEM Basics',
        date: '2024-12-15',
        likes: 45,
        verified: true
    },
    {
        id: 2,
        name: 'Kofi Asante',
        role: 'Maker: Hardware & Repair',
        type: 'student',
        quote: "The mentors are patient and the tools are amazing. I'm now repairing devices in my community and earning income from what I learned here.",
        rating: 5,
        avatar: '/images/testimonials/kofi.jpg',
        featured: true,
        status: 'published',
        program: 'Hardware Engineering',
        date: '2024-12-10',
        likes: 67,
        verified: true
    },
    {
        id: 3,
        name: 'Fatima Ibrahim',
        role: 'Coder: Software Foundations',
        type: 'student',
        quote: "I never thought I could code, but now I'm building apps to solve real problems. Zyra Tech Hub gave me the confidence and skills to pursue my tech dreams.",
        rating: 5,
        avatar: '/images/testimonials/fatima.jpg',
        featured: true,
        status: 'published',
        program: 'Software Development',
        date: '2024-12-08',
        likes: 89,
        verified: true
    },
    {
        id: 4,
        name: 'Emmanuel Osei',
        role: 'Web Development Graduate',
        type: 'alumni',
        quote: "After completing the web development program, I landed my first job within two months. The practical training and portfolio projects were exactly what employers wanted to see.",
        rating: 5,
        avatar: '/images/testimonials/emmanuel.jpg',
        featured: false,
        status: 'published',
        program: 'Web Development',
        date: '2024-11-28',
        likes: 56,
        verified: true
    },
    {
        id: 5,
        name: 'Abigail Owusu',
        role: 'Data Science Student',
        type: 'student',
        quote: "The data science curriculum is thorough and the instructors are industry professionals. I'm now analyzing real datasets and creating meaningful visualizations.",
        rating: 4,
        avatar: '/images/testimonials/abigail.jpg',
        featured: false,
        status: 'published',
        program: 'Data Science',
        date: '2024-11-20',
        likes: 34,
        verified: true
    },
    {
        id: 6,
        name: 'TechVision Ghana Ltd',
        role: 'Corporate Partner',
        type: 'partner',
        quote: "Our partnership with Zyra Tech Hub has given us access to talented interns who are well-prepared for the workplace. Their training standards exceed our expectations.",
        rating: 5,
        avatar: '/images/partners/techvision.jpg',
        featured: true,
        status: 'published',
        program: 'Corporate Partnership',
        date: '2024-11-15',
        likes: 28,
        verified: true
    },
    {
        id: 7,
        name: 'Mrs. Grace Adu',
        role: 'Parent',
        type: 'parent',
        quote: "My son's transformation since joining the robotics program has been remarkable. He's more confident, focused, and genuinely excited about learning technology.",
        rating: 5,
        avatar: '/images/testimonials/grace.jpg',
        featured: false,
        status: 'published',
        program: 'Robotics',
        date: '2024-11-10',
        likes: 41,
        verified: true
    },
    {
        id: 8,
        name: 'Daniel Mensah',
        role: 'IoT Intern',
        type: 'student',
        quote: "The IoT program connected me with real industry projects. I worked on an actual environmental monitoring system that's now deployed in schools.",
        rating: 5,
        avatar: null,
        featured: false,
        status: 'draft',
        program: 'IoT Development',
        date: '2024-11-05',
        likes: 12,
        verified: false
    },
    {
        id: 9,
        name: 'Dr. Samuel Boateng',
        role: 'Tech Mentor',
        type: 'mentor',
        quote: "Mentoring at Zyra Tech Hub has been incredibly rewarding. The students are eager to learn and the support system for mentors is excellent.",
        rating: 5,
        avatar: '/images/testimonials/samuel.jpg',
        featured: false,
        status: 'published',
        program: 'Mentorship Program',
        date: '2024-10-28',
        likes: 23,
        verified: true
    },
    {
        id: 10,
        name: 'Innovate Africa Corp',
        role: 'Strategic Partner',
        type: 'corporate',
        quote: "Zyra Tech Hub's commitment to quality education and innovation aligns perfectly with our CSR goals. We're proud to support their mission.",
        rating: 5,
        avatar: '/images/partners/innovate.jpg',
        featured: false,
        status: 'pending',
        program: 'Corporate Sponsorship',
        date: '2024-10-20',
        likes: 8,
        verified: false
    }
];

// Status badge component
const StatusBadge = ({ status }) => {
    const statusStyles = {
        published: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
        draft: 'bg-gray-100 text-gray-600 border border-gray-200',
        pending: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
        archived: 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusStyles[status] || statusStyles.draft}`}>
            {status}
        </span>
    );
};

// Star rating component
const StarRating = ({ rating, size = 14 }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                />
            ))}
        </div>
    );
};

// Avatar component
const AvatarDisplay = ({ name, avatar, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-lg'
    };

    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    if (avatar) {
        return (
            <img
                src={avatar}
                alt={name}
                className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
                onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                }}
            />
        );
    }

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold ring-2 ring-white shadow-md`}>
            {initials}
        </div>
    );
};

const TestimonialsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuperAdmin } = usePermissions();

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [viewingTestimonial, setViewingTestimonial] = useState(null);

    const itemsPerPage = 6;

    // Get unique types
    const uniqueTypes = useMemo(() => {
        return [...new Set(mockTestimonials.map(t => t.type))];
    }, []);

    // Filter and search testimonials
    const filteredTestimonials = useMemo(() => {
        let result = [...mockTestimonials];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(query) ||
                t.quote.toLowerCase().includes(query) ||
                t.role.toLowerCase().includes(query) ||
                t.program?.toLowerCase().includes(query)
            );
        }

        // Type filter
        if (selectedType !== 'all') {
            result = result.filter(t => t.type === selectedType);
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(t => t.status === selectedStatus);
        }

        return result;
    }, [searchQuery, selectedType, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
    const paginatedTestimonials = filteredTestimonials.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => ({
        total: mockTestimonials.length,
        published: mockTestimonials.filter(t => t.status === 'published').length,
        pending: mockTestimonials.filter(t => t.status === 'pending').length,
        drafts: mockTestimonials.filter(t => t.status === 'draft').length,
        featured: mockTestimonials.filter(t => t.featured).length,
        avgRating: (mockTestimonials.reduce((acc, t) => acc + (t.rating || 0), 0) / mockTestimonials.length).toFixed(1),
        totalLikes: mockTestimonials.reduce((acc, t) => acc + (t.likes || 0), 0)
    }), []);

    // Handlers
    const handleDelete = (testimonial) => {
        dispatch(openConfirmDialog({
            title: 'Delete Testimonial',
            message: `Are you sure you want to delete the testimonial from "${testimonial.name}"? This action cannot be undone.`,
            isDangerous: true,
            onConfirm: () => {
                console.log('Deleting testimonial:', testimonial.id);
            }
        }));
    };

    const handleView = (testimonial) => {
        setViewingTestimonial(testimonial);
    };

    const handleEdit = (testimonial) => {
        navigate(`/admin/testimonials/edit/${testimonial.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/testimonials/new');
    };

    const handleToggleFeatured = (testimonial) => {
        console.log('Toggle featured:', testimonial.id, !testimonial.featured);
        // TODO: API call to toggle featured status
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedType('all');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <MessageCircle className="text-white" size={22} />
                            </div>
                            Testimonials Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage customer reviews and success stories
                        </p>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                    >
                        <Plus size={20} strokeWidth={2.5} />
                        Add Testimonial
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                    {/* Total */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <MessageCircle className="text-blue-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-600 mt-1">Total Reviews</p>
                    </div>

                    {/* Published */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-green-500 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('published'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.published}</p>
                        <p className="text-xs text-gray-600 mt-1">Published</p>
                    </div>

                    {/* Pending */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                                <Clock className="text-amber-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                        <p className="text-xs text-gray-600 mt-1">Pending Review</p>
                    </div>

                    {/* Drafts */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-gray-400 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('draft'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <AlertCircle className="text-gray-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.drafts}</p>
                        <p className="text-xs text-gray-600 mt-1">Drafts</p>
                    </div>

                    {/* Featured */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                                <Sparkles className="text-purple-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.featured}</p>
                        <p className="text-xs text-gray-600 mt-1">Featured</p>
                    </div>

                    {/* Avg Rating */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center">
                                <Star className="text-amber-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.avgRating}</p>
                        <p className="text-xs text-gray-600 mt-1">Avg Rating</p>
                    </div>

                    {/* Total Likes */}
                    <div className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-l-pink-500 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center">
                                <ThumbsUp className="text-pink-600" size={16} />
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalLikes}</p>
                        <p className="text-xs text-gray-600 mt-1">Total Likes</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, quote, role, or program..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                            />
                        </div>

                        {/* Type Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedType}
                                onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[140px]"
                            >
                                <option value="all">All Types</option>
                                {uniqueTypes.map(type => (
                                    <option key={type} value={type}>{TYPE_CONFIG[type]?.label || type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white min-w-[130px]"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="pending">Pending</option>
                            <option value="draft">Draft</option>
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid'
                                        ? 'bg-white text-[#004fa2] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list'
                                        ? 'bg-white text-[#004fa2] shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List size={18} />
                            </button>
                        </div>

                        {/* Reset Filters */}
                        {(searchQuery || selectedType !== 'all' || selectedStatus !== 'all') && (
                            <button
                                onClick={resetFilters}
                                className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <X size={16} />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {/* Testimonials Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedTestimonials.map((testimonial) => {
                            const typeConfig = TYPE_CONFIG[testimonial.type] || TYPE_CONFIG['student'];
                            const TypeIcon = typeConfig.icon;

                            return (
                                <div
                                    key={testimonial.id}
                                    className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 group ${testimonial.featured ? 'border-amber-200 ring-1 ring-amber-100' : 'border-gray-100'
                                        }`}
                                >
                                    {/* Featured Badge */}
                                    {testimonial.featured && (
                                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1 text-center">
                                            ⭐ Featured Testimonial
                                        </div>
                                    )}

                                    {/* Card Content */}
                                    <div className="p-5">
                                        {/* Header: Avatar, Name, Type */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <AvatarDisplay name={testimonial.name} avatar={testimonial.avatar} size="md" />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900 truncate">{testimonial.name}</h3>
                                                    {testimonial.verified && (
                                                        <CheckCircle className="text-blue-500 shrink-0" size={14} />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 truncate">{testimonial.role}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${typeConfig.color}`}>
                                                        <TypeIcon size={10} />
                                                        {typeConfig.label}
                                                    </span>
                                                </div>
                                            </div>
                                            <StatusBadge status={testimonial.status} />
                                        </div>

                                        {/* Quote */}
                                        <div className="relative mb-4">
                                            <Quote className="absolute -top-1 -left-1 text-gray-200" size={24} />
                                            <p className="text-sm text-gray-600 leading-relaxed pl-5 line-clamp-3">
                                                {testimonial.quote}
                                            </p>
                                        </div>

                                        {/* Rating & Stats */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                            <StarRating rating={testimonial.rating} />
                                            <div className="flex items-center gap-3 text-xs text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <ThumbsUp size={12} />
                                                    {testimonial.likes}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {testimonial.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Footer */}
                                    <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleView(testimonial)}
                                                className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(testimonial)}
                                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleFeatured(testimonial)}
                                                className={`p-2 rounded-lg transition-colors ${testimonial.featured
                                                        ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                                                        : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                                                    }`}
                                                title={testimonial.featured ? 'Remove from Featured' : 'Add to Featured'}
                                            >
                                                <Star size={16} className={testimonial.featured ? 'fill-amber-500' : ''} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(testimonial)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {testimonial.program}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* List View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Person</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quote</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {paginatedTestimonials.map((testimonial) => {
                                    const typeConfig = TYPE_CONFIG[testimonial.type] || TYPE_CONFIG['student'];

                                    return (
                                        <tr key={testimonial.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <AvatarDisplay name={testimonial.name} avatar={testimonial.avatar} size="sm" />
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="font-semibold text-gray-900">{testimonial.name}</p>
                                                            {testimonial.featured && (
                                                                <Star className="text-amber-500 fill-amber-500" size={12} />
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600 line-clamp-2 max-w-[250px]">
                                                    "{testimonial.quote}"
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${typeConfig.color}`}>
                                                    {typeConfig.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StarRating rating={testimonial.rating} size={12} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={testimonial.status} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleView(testimonial)}
                                                        className="p-2 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(testimonial)}
                                                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(testimonial)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Empty State */}
                {filteredTestimonials.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No testimonials found</h3>
                        <p className="text-sm text-gray-500 mb-4">
                            Try adjusting your search or filter criteria
                        </p>
                        <button
                            onClick={resetFilters}
                            className="px-4 py-2 text-sm text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors font-medium"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">
                            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredTestimonials.length)}</span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredTestimonials.length}</span> testimonials
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium transition-all ${currentPage === page
                                            ? 'bg-[#004fa2] text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Testimonial Modal */}
            {viewingTestimonial && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="text-white" size={22} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Testimonial Details</h2>
                                    <p className="text-blue-100 text-xs">{viewingTestimonial.program}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewingTestimonial(null)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="space-y-5">
                                {/* Author Info */}
                                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                                    <AvatarDisplay name={viewingTestimonial.name} avatar={viewingTestimonial.avatar} size="lg" />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xl font-bold text-gray-900">{viewingTestimonial.name}</h3>
                                            {viewingTestimonial.verified && (
                                                <CheckCircle className="text-blue-500" size={18} />
                                            )}
                                            {viewingTestimonial.featured && (
                                                <Star className="text-amber-500 fill-amber-500" size={18} />
                                            )}
                                        </div>
                                        <p className="text-gray-500">{viewingTestimonial.role}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${TYPE_CONFIG[viewingTestimonial.type]?.color}`}>
                                                {TYPE_CONFIG[viewingTestimonial.type]?.label}
                                            </span>
                                            <StatusBadge status={viewingTestimonial.status} />
                                        </div>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="bg-gray-50 rounded-xl p-5 relative">
                                    <Quote className="absolute top-4 left-4 text-gray-200" size={32} />
                                    <p className="text-lg text-gray-700 leading-relaxed pl-8 italic">
                                        "{viewingTestimonial.quote}"
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center justify-center gap-2">
                                    <StarRating rating={viewingTestimonial.rating} size={24} />
                                    <span className="text-lg font-bold text-gray-900 ml-2">{viewingTestimonial.rating}/5</span>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <ThumbsUp className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingTestimonial.likes}</p>
                                        <p className="text-xs text-gray-500">Likes</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <Calendar className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingTestimonial.date}</p>
                                        <p className="text-xs text-gray-500">Date Added</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                                        <CheckCircle className="mx-auto text-gray-400 mb-2" size={20} />
                                        <p className="text-lg font-bold text-gray-900">{viewingTestimonial.verified ? 'Yes' : 'No'}</p>
                                        <p className="text-xs text-gray-500">Verified</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setViewingTestimonial(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        setViewingTestimonial(null);
                                        handleEdit(viewingTestimonial);
                                    }}
                                    className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Edit size={14} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleToggleFeatured(viewingTestimonial)}
                                    className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium text-sm flex items-center gap-1.5"
                                >
                                    <Star size={14} className={viewingTestimonial.featured ? 'fill-white' : ''} />
                                    {viewingTestimonial.featured ? 'Unfeature' : 'Feature'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Testimonial Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                    {editingTestimonial ? <Edit className="text-white" size={20} /> : <Plus className="text-white" size={20} />}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                    </h2>
                                    <p className="text-gray-500 text-xs">
                                        {editingTestimonial ? 'Update testimonial information' : 'Create a new customer testimonial'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => { setShowModal(false); setEditingTestimonial(null); }}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="text-amber-500" size={32} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
                                <p className="text-sm text-gray-500 max-w-md mx-auto">
                                    The testimonial editor form will be available once the backend API is ready.
                                    Currently, testimonials are managed via the <code className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">Testimonials.jsx</code> data file.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => { setShowModal(false); setEditingTestimonial(null); }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default TestimonialsManagementPage;
