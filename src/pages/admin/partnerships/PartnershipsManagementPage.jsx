/**
 * Partnerships Management Page (Admin)
 * Premium professional admin interface for managing partner organizations and collaborations
 * Features: Grid/Table view toggle, advanced filters, quick actions, detailed modals
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import { PARTNERSHIP_TYPES, PARTNERSHIP_STATUSES, getPartnershipTypes, getPartnershipStatuses } from '../../../data/partnershipsData';
// import { usePermissions } from '../../../hooks/usePermissions'; // Will be used for permission-based feature visibility
import partnersService from '../../../services/partnersService';
import {
    Handshake,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    Download,
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Calendar,
    Mail,
    Phone,
    Globe,
    MapPin,
    Building,
    Building2,
    GraduationCap,
    Briefcase,
    Users,
    Plus,
    ExternalLink,
    Star,
    TrendingUp,
    FileText,
    Award,
    Target,
    Zap,
    Send,
    MoreVertical,
    Grid3x3,
    List,
    Check,
    XCircle,
    RefreshCw
} from 'lucide-react';


// Type icon mapping for visual display
const TYPE_ICONS = {
    'corporate': Building2,
    'academic': GraduationCap,
    'training': Award,
    'technology': Zap,
    'ngo': Users,
    'government': Building
};

// Status icon mapping for visual display
const STATUS_ICONS = {
    'active': CheckCircle,
    'pending': Clock,
    'negotiating': Target,
    'expired': AlertCircle,
    'paused': Clock
};



// Format date
const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

// Status badge component
const StatusBadge = ({ status }) => {
    const config = PARTNERSHIP_STATUSES[status] || PARTNERSHIP_STATUSES['pending'];
    const Icon = STATUS_ICONS[status] || Clock;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${config.colorClass}`}>
            <Icon size={10} />
            {config.label}
        </span>
    );
};

const PartnershipsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { isSuperAdmin } = usePermissions(); // Will be used for permission-based feature visibility

    // State management
    const [partnerships, setPartnerships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPartnerships = async () => {
            try {
                const response = await partnersService.getAllPartnerships();
                setPartnerships(response.data);
            } catch (error) {
                console.error('Failed to fetch partnerships:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPartnerships();
    }, []);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewingPartnership, setViewingPartnership] = useState(null);
    const itemsPerPage = 8;

    // Filter partnerships
    const filteredPartnerships = useMemo(() => {
        let result = [...partnerships];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.id.toLowerCase().includes(query) ||
                p.organization.name.toLowerCase().includes(query) ||
                p.contact.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            if (selectedStatus === 'featured') {
                result = result.filter(p => p.featured);
            } else {
                result = result.filter(p => p.status === selectedStatus);
            }
        }

        // Type filter
        if (selectedType !== 'all') {
            result = result.filter(p => p.type === selectedType);
        }

        return result;
    }, [partnerships, searchQuery, selectedStatus, selectedType]);

    // Pagination
    const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);
    const paginatedPartnerships = filteredPartnerships.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        const totalStudents = partnerships.reduce((acc, p) => acc + p.studentsPlaced, 0);
        const totalProjects = partnerships.reduce((acc, p) => acc + p.projectsCompleted, 0);

        return {
            total: partnerships.length,
            active: partnerships.filter(p => p.status === 'active').length,
            pending: partnerships.filter(p => p.status === 'pending').length,
            negotiating: partnerships.filter(p => p.status === 'negotiating').length,
            expired: partnerships.filter(p => p.status === 'expired').length,
            featured: partnerships.filter(p => p.featured).length,
            studentsPlaced: totalStudents,
            projectsCompleted: totalProjects
        };
    }, [partnerships]);

    // Handlers
    const handleView = (partnership) => {
        setViewingPartnership(partnership);
    };

    const handleEdit = (partnership) => {
        navigate(`/admin/partnerships/edit/${partnership.id}`);
    };

    const handleAddNew = () => {
        navigate('/admin/partnerships/new');
    };

    const handleDelete = (partnership) => {
        dispatch(openConfirmDialog({
            title: 'Delete Partnership',
            message: `Are you sure you want to delete the partnership with "${partnership.organization.name}"? This action cannot be undone.`,
            isDangerous: true,
            confirmLabel: 'Delete Partnership',
            onConfirm: async () => {
                try {
                    await partnersService.deletePartnership(partnership.id);
                    setPartnerships(prev => prev.filter(p => p.id !== partnership.id));
                } catch (error) {
                    console.error('Error deleting partnership:', error);
                }
            }
        }));
    };

    const handleToggleFeatured = async (partnership) => {
        try {
            await partnersService.toggleFeatured(partnership.id);
            setPartnerships(prev => prev.map(p => p.id === partnership.id ? { ...p, featured: !p.featured } : p));
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };

    // Commented out until backend integration is ready
    // const handleApprove = (partnership) => {
    //     dispatch(openConfirmDialog({
    //         title: 'Approve Partnership',
    //         message: `Approve partnership with "${partnership.organization.name}"?`,
    //         confirmLabel: 'Approve',
    //         confirmClass: 'bg-green-600 hover:bg-green-700',
    //         onConfirm: () => {
    //             console.log('Approving partnership:', partnership.id);
    //             // API call would go here
    //         }
    //     }));
    // };

    // const handleActivate = (partnership) => {
    //     console.log('Activating partnership:', partnership.id);
    //     // API call would go here
    // };

    // const handleArchive = (partnership) => {
    //     dispatch(openConfirmDialog({
    //         title: 'Archive Partnership',
    //         message: `Archive partnership with "${partnership.organization.name}"?`,
    //         onConfirm: () => {
    //             console.log('Archiving partnership:', partnership.id);
    //             // API call would go here
    //         }
    //     }));
    // };

    const handleExport = () => {
        console.log('Exporting partnerships...');
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setSelectedType('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Page Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm gap-3 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg shrink-0 text-blue-600">
                            <Handshake size={18} />
                        </div>
                        <div>
                            <h1 className="text-sm md:text-base font-bold text-gray-900 leading-tight">Partnerships Management</h1>
                            <p className="text-[10px] text-gray-500">Manage partner organizations and collaboration agreements</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button onClick={handleExport} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-all shadow-sm text-[11px] font-semibold">
                            <Download size={14} /> Export
                        </button>
                        <button onClick={handleAddNew} className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-all shadow-sm text-[11px] font-semibold">
                            <Plus size={14} /> Add Partner
                        </button>
                    </div>
                </div>

                {/* Quick Status Bar */}
                <div className="flex flex-wrap text-[11px] gap-2 mb-4">
                    {[
                        { label: 'All', id: 'all', count: stats.total, active: selectedStatus === 'all' },
                        { label: 'Live', id: 'active', count: stats.active, active: selectedStatus === 'active' },
                        { label: 'Pending', id: 'pending', count: stats.pending, active: selectedStatus === 'pending' },
                        { label: 'Negotiating', id: 'negotiating', count: stats.negotiating, active: selectedStatus === 'negotiating' },
                        { label: 'Expired', id: 'expired', count: stats.expired, active: selectedStatus === 'expired' },
                        { label: 'Featured', id: 'featured', count: stats.featured, active: selectedStatus === 'featured', isStar: true }
                    ].map(st => (
                        <button
                            key={st.id}
                            onClick={() => { setSelectedStatus(st.id); setCurrentPage(1); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all ${st.active ? 'bg-[#004fa2] text-white border-[#004fa2]' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                        >
                            {st.isStar && <Star size={10} className={st.active ? "text-white" : "text-amber-500 fill-amber-500"} />}
                            {st.label} <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${st.active ? 'bg-white/20' : 'bg-gray-100'}`}>{st.count}</span>
                        </button>
                    ))}
                    
                    <div className="flex items-center gap-3 ml-auto px-2 opacity-80 text-[10px] font-bold uppercase tracking-wider text-gray-500 hidden sm:flex">
                        <span className="flex items-center gap-1"><Users size={12}/> {stats.studentsPlaced} Placed</span>
                        <span className="flex items-center gap-1"><Briefcase size={12}/> {stats.projectsCompleted} Projects</span>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-2 mb-4">
                    <div className="col-span-2 md:col-span-6 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search by organization, contact..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full pl-8 pr-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none transition-all"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-3 relative">
                        <select
                            value={selectedStatus}
                            onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="negotiating">Negotiating</option>
                            <option value="expired">Expired</option>
                            <option value="paused">Paused</option>
                            <option value="featured">⭐ Featured</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-3 relative flex gap-2">
                        <select
                            value={selectedType}
                            onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
                            className="w-full px-3 py-2 text-[11px] bg-white border border-gray-100 shadow-sm rounded-xl focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] outline-none appearance-none transition-all"
                        >
                            <option value="all">All Types</option>
                            {getPartnershipTypes().map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>

                        {(searchQuery || selectedStatus !== 'all' || selectedType !== 'all') && (
                            <button onClick={resetFilters} className="bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 h-[34px] px-3 rounded-xl transition-colors shadow-sm flex items-center justify-center shrink-0">
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Partnerships List Grid */}
                <div className="flex flex-col gap-2">
                    {paginatedPartnerships.map((partnership) => {
                        const typeData = PARTNERSHIP_TYPES[partnership.type];
                        const TypeIcon = TYPE_ICONS[partnership.type] || Building2;
                        const isFeatured = partnership.featured;

                        return (
                            <div key={partnership.id} onClick={() => handleView(partnership)} className={`bg-white rounded-xl shadow-sm border ${isFeatured ? 'border-amber-200 bg-amber-50/10' : 'border-gray-100'} flex flex-col xl:flex-row p-3 gap-3 hover:border-[#004fa2] transition-colors cursor-pointer relative overflow-hidden group`}>
                                {/* Left Indicator */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${isFeatured ? 'bg-amber-400' : (PARTNERSHIP_STATUSES[partnership.status]?.colorClass.includes('green') ? 'bg-green-500' : 'bg-gray-300')}`}></div>
                                
                                {/* Identity Layout */}
                                <div className="flex items-start gap-3 w-full xl:w-5/12">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0">
                                        {partnership.organization.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1 mb-0.5">
                                            <h3 className="text-xs font-bold text-gray-900 truncate">
                                                {partnership.organization.name}
                                            </h3>
                                            {isFeatured && <Star size={10} className="text-amber-500 fill-amber-500 shrink-0" />}
                                        </div>
                                        <p className="text-[10px] text-gray-500 truncate mb-1.5">{partnership.organization.industry}</p>
                                        <div className="flex items-center flex-wrap gap-1.5 mt-auto">
                                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold border ${typeData.colorClass}`}>
                                                <TypeIcon size={8} /> {typeData.label}
                                            </span>
                                            <StatusBadge status={partnership.status} />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Description Layout */}
                                <div className="hidden xl:block w-px bg-gray-100 my-1 mx-2"></div>
                                <div className="flex-1 flex flex-col justify-center min-w-0">
                                    <p className="text-[10px] text-gray-600 line-clamp-2 pr-4">{partnership.description}</p>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <span className="flex items-center gap-1 text-[9px] font-mono text-gray-500 bg-gray-50 px-1.5 rounded"><Calendar size={8}/> {formatDate(partnership.startDate)} - {formatDate(partnership.endDate)}</span>
                                        <span className="flex items-center gap-1 text-[9px] font-mono text-gray-500 bg-gray-50 px-1.5 rounded"><Users size={8}/> {partnership.studentsPlaced} Placed</span>
                                    </div>
                                </div>

                                {/* Actions Container */}
                                <div className="flex items-center justify-end gap-1 shrink-0 border-t xl:border-t-0 xl:border-l xl:pl-3 pt-2 xl:pt-0 border-gray-50 ml-auto xl:w-min">
                                    <button onClick={(e) => { e.stopPropagation(); handleToggleFeatured(partnership); }} className="p-1.5 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"><Star size={14} className={isFeatured ? 'fill-amber-500 text-amber-500' : ''} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleEdit(partnership); }} className="p-1.5 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded-lg transition-colors"><Edit size={14} /></button>
                                    <button onClick={(e) => { e.stopPropagation(); handleDelete(partnership); }} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredPartnerships.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Handshake className="text-gray-400" size={36} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No partnerships found</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            {searchQuery || selectedStatus !== 'all' || selectedType !== 'all'
                                ? "No partnerships match your current filters. Try adjusting your search criteria."
                                : "Start building relationships by adding your first partnership."}
                        </p>
                        <div className="flex items-center justify-center gap-3">
                            {(searchQuery || selectedStatus !== 'all' || selectedType !== 'all') && (
                                <button
                                    onClick={resetFilters}
                                    className="px-5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors font-medium flex items-center gap-2"
                                >
                                    <X size={16} />
                                    Clear Filters
                                </button>
                            )}
                            <button
                                onClick={handleAddNew}
                                className="px-5 py-2.5 text-sm bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white hover:from-[#003d7a] hover:to-[#004fa2] rounded-xl transition-all font-medium flex items-center gap-2"
                            >
                                <Plus size={16} />
                                Add First Partnership
                            </button>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {filteredPartnerships.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-100 gap-3 mt-4">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                            Showing <span className="text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                            <span className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredPartnerships.length)}</span> of{' '}
                            <span className="text-gray-900">{filteredPartnerships.length}</span>
                        </p>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-[24px] h-6 flex items-center justify-center rounded text-[10px] font-bold transition-all ${currentPage === page
                                            ? 'bg-[#004fa2] text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-1 text-gray-400 hover:text-[#004fa2] hover:bg-blue-50 rounded transition-colors disabled:opacity-40"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Partnership Modal */}
            {viewingPartnership && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Modal Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-[#004fa2] to-[#0066cc] flex items-center justify-between">
                            <div className="flex items-center gap-2 md:gap-3 min-w-0">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-[10px] md:text-sm font-bold shrink-0">
                                    {viewingPartnership.organization.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                                </div>
                                <div className="min-w-0">
                                    <h2 className="text-sm md:text-base font-bold text-white truncate">{viewingPartnership.organization.name}</h2>
                                    <p className="text-blue-100 text-[10px] font-mono truncate">{viewingPartnership.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-2 shrink-0">
                                <button
                                    onClick={() => handleToggleFeatured(viewingPartnership)}
                                    className="p-1.5 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <Star size={16} className={viewingPartnership.featured ? 'fill-amber-400 text-amber-400' : ''} />
                                </button>
                                <button
                                    onClick={() => setViewingPartnership(null)}
                                    className="p-1.5 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-140px)] md:max-h-[calc(85vh-140px)] custom-scrollbar">
                            <div className="space-y-4 md:space-y-5">
                                {/* Status & Type */}
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${PARTNERSHIP_TYPES[viewingPartnership.type].colorClass}`}>
                                        {React.createElement(TYPE_ICONS[viewingPartnership.type] || Building2, { size: 10 })}
                                        {PARTNERSHIP_TYPES[viewingPartnership.type].label}
                                    </span>
                                    <StatusBadge status={viewingPartnership.status} />
                                    {viewingPartnership.featured && (
                                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-[10px] font-bold">
                                            ⭐ Featured
                                        </span>
                                    )}
                                </div>

                                {/* Organization Info */}
                                <div className="bg-gray-50 rounded-xl p-3 md:p-4">
                                    <h3 className="text-[11px] font-bold text-gray-500 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                                        <Building2 size={12} /> Org Details
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p className="text-[10px] text-gray-400">Industry</p>
                                            <p className="font-semibold text-gray-900 text-xs truncate pr-2">{viewingPartnership.organization.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Website</p>
                                            <a href={viewingPartnership.organization.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#004fa2] hover:underline text-xs truncate flex items-center gap-1">
                                                Visit <ExternalLink size={10} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Person */}
                                <div className="bg-gray-50 rounded-xl p-3 md:p-4">
                                    <h3 className="text-[11px] font-bold text-gray-500 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                                        <Users size={12} /> Contact Point
                                    </h3>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white font-bold text-xs shrink-0">
                                            {viewingPartnership.contact.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 text-xs truncate">{viewingPartnership.contact.name}</p>
                                            <p className="text-[10px] text-gray-500 truncate">{viewingPartnership.contact.role}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                        <div className="flex items-center gap-1.5 truncate">
                                            <Mail className="text-gray-400 shrink-0" size={12} />
                                            <a href={`mailto:${viewingPartnership.contact.email}`} className="text-[#004fa2] hover:underline truncate">
                                                {viewingPartnership.contact.email}
                                            </a>
                                        </div>
                                        {viewingPartnership.contact.phone && (
                                            <div className="flex items-center gap-1.5 truncate">
                                                <Phone className="text-gray-400 shrink-0" size={12} />
                                                <span className="text-gray-600 truncate">{viewingPartnership.contact.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Description</h3>
                                    <p className="text-[11px] text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">{viewingPartnership.description}</p>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <h3 className="text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Benefits</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {viewingPartnership.benefits.map((benefit, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-semibold border border-blue-100">
                                                {benefit}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats & Dates */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                    <div className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                                        <p className="text-lg font-bold text-[#004fa2]">{viewingPartnership.studentsPlaced}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase">Placed</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                                        <p className="text-lg font-bold text-[#004fa2]">{viewingPartnership.projectsCompleted}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase">Projects</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                                        <p className="text-[11px] font-bold text-gray-900 mt-1">{formatDate(viewingPartnership.startDate)}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">Start Date</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                                        <p className="text-[11px] font-bold text-gray-900 mt-1">{formatDate(viewingPartnership.endDate)}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase mt-1">End Date</p>
                                    </div>
                                </div>
                                
                                {/* Value */}
                                <div className="bg-green-50 rounded-xl p-3 border border-green-100 text-center md:text-left flex flex-col md:flex-row items-center justify-between mt-2 gap-2">
                                    <p className="text-[11px] font-bold text-green-700 uppercase tracking-wider">Partnership Value</p>
                                    <p className="text-base font-black text-green-800 bg-white px-3 py-1 rounded-lg border border-green-200">{viewingPartnership.value}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 py-3 border-t border-gray-100 flex flex-wrap-reverse sm:flex-nowrap items-center justify-between bg-gray-50 gap-2 shrink-0">
                            <button
                                onClick={() => setViewingPartnership(null)}
                                className="w-full sm:w-auto px-4 py-2 text-gray-600 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors font-medium text-[11px] flex items-center justify-center shadow-sm"
                            >
                                Close
                            </button>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <button
                                    onClick={() => window.open(`mailto:${viewingPartnership.contact.email}`, '_blank')}
                                    className="flex-1 sm:flex-none px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Mail size={12} /> Contact
                                </button>
                                <button
                                    onClick={() => {
                                        setViewingPartnership(null);
                                        handleEdit(viewingPartnership);
                                    }}
                                    className="flex-1 sm:flex-none px-3 py-2 bg-[#004fa2] text-white rounded-lg hover:bg-[#003d7a] transition-colors font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                                >
                                    <Edit size={12} /> Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add/Edit Partnership Modal */}
            {/* Modal removed - now using dedicated form page at /admin/partnerships/new and /admin/partnerships/edit/:id */}
        </AdminLayout>
    );
};

export default PartnershipsManagementPage;
