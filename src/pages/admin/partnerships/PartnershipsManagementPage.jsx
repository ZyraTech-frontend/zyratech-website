/**
 * Partnerships Management Page (Admin)
 * Manage partnership applications and public partnerships
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import partnersService from '../../../services/partnersService';
import {
    Handshake,
    Search,
    Filter,
    Eye,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Plus,
    Grid3x3,
    List,
    RefreshCw,
    Mail,
    Globe
} from 'lucide-react';

// Status badge component
const StatusBadge = ({ status }) => {
    const statusConfig = {
        'active': { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
        'pending': { label: 'Pending', color: 'bg-amber-100 text-amber-800', icon: Clock },
        'inactive': { label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
    };
    
    const config = statusConfig[status] || statusConfig['pending'];
    const Icon = config.icon;

    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
            <Icon size={12} />
            {config.label}
        </span>
    );
};

const PartnershipsManagementPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State management
    const [partnerships, setPartnerships] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState('grid');
    const [viewingPartnership, setViewingPartnership] = useState(null);

    // Fetch partnerships on component mount
    useEffect(() => {
        fetchPartnerships();
    }, []);

    const fetchPartnerships = async () => {
        try {
            setIsLoading(true);
            // Fetch admin partnerships (all applications/partnerships)
            const response = await partnersService.getAdminPartnerships({ limit: 100 });
            setPartnerships(response.data || []);
        } catch (error) {
            console.error('Error fetching partnerships:', error);
            dispatch(addNotification({
                type: 'error',
                message: error.userMessage || 'Failed to load partnerships. Please try again.',
                duration: 4000
            }));
            setPartnerships([]);
        } finally {
            setIsLoading(false);
        }
    };

    const itemsPerPage = viewMode === 'table' ? 10 : 12;

    // Filter partnerships
    const filteredPartnerships = useMemo(() => {
        let result = [...partnerships];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                (p.id && p.id.toLowerCase().includes(query)) ||
                (p.name && p.name.toLowerCase().includes(query)) ||
                (p.organizationName && p.organizationName.toLowerCase().includes(query)) ||
                (p.contact && p.contact.toLowerCase().includes(query)) ||
                (p.description && p.description.toLowerCase().includes(query))
            );
        }

        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(p => p.status === selectedStatus);
        }

        return result;
    }, [partnerships, searchQuery, selectedStatus]);

    // Pagination
    const totalPages = Math.ceil(filteredPartnerships.length / itemsPerPage);
    const paginatedPartnerships = filteredPartnerships.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Statistics
    const stats = useMemo(() => {
        return {
            total: partnerships.length,
            active: partnerships.filter(p => p.status === 'active').length,
            pending: partnerships.filter(p => p.status === 'pending').length,
            inactive: partnerships.filter(p => p.status === 'inactive').length
        };
    }, [partnerships]);

    // Handlers
    const handleRefresh = () => {
        fetchPartnerships();
    };

    const handleAddNew = () => {
        navigate('/admin/partnerships/new');
    };

    const handleView = (partnership) => {
        setViewingPartnership(partnership);
    };

    const handleEdit = (partnership) => {
        navigate(`/admin/partnerships/edit/${partnership.id}`);
    };

    const handleDelete = (partnership) => {
        dispatch(openConfirmDialog({
            title: 'Delete Partnership',
            message: `Are you sure you want to delete "${partnership.name || partnership.organizationName}"? This action cannot be undone.`,
            confirmLabel: 'Delete',
            confirmClass: 'bg-red-600 hover:bg-red-700',
            onConfirm: async () => {
                try {
                    await partnersService.deletePartnership(partnership.id);
                    setPartnerships(partnerships.filter(p => p.id !== partnership.id));
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Partnership deleted successfully.',
                        duration: 3000
                    }));
                } catch (error) {
                    dispatch(addNotification({
                        type: 'error',
                        message: error.userMessage || 'Failed to delete partnership.',
                        duration: 3000
                    }));
                }
            }
        }));
    };

    const handleStatusChange = async (partnership, newStatus) => {
        try {
            await partnersService.updatePartnershipStatus(partnership.id, newStatus);
            setPartnerships(partnerships.map(p =>
                p.id === partnership.id ? { ...p, status: newStatus } : p
            ));
            dispatch(addNotification({
                type: 'success',
                message: `Partnership status updated to ${newStatus}.`,
                duration: 3000
            }));
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.userMessage || 'Failed to update partnership status.',
                duration: 3000
            }));
        }
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedStatus('all');
        setCurrentPage(1);
    };

    return (
        <AdminLayout>
            <div className="space-y-4 md:space-y-6 pb-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center shadow-md">
                                <Handshake className="text-white" size={22} />
                            </div>
                            Partnerships Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Manage partnership applications and create public partnerships
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => { setViewMode('grid'); setCurrentPage(1); }}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'grid'
                                    ? 'bg-white text-[#004fa2] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <Grid3x3 size={16} />
                                Grid
                            </button>
                            <button
                                onClick={() => { setViewMode('table'); setCurrentPage(1); }}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'table'
                                    ? 'bg-white text-[#004fa2] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <List size={16} />
                                Table
                            </button>
                        </div>

                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                        >
                            <RefreshCw size={16} />
                        </button>
                        <button
                            onClick={handleAddNew}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#004fa2] to-[#0066cc] text-white rounded-xl hover:from-[#003d7a] hover:to-[#004fa2] transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm"
                        >
                            <Plus size={18} />
                            <span className="hidden sm:inline">Add Partnership</span>
                        </button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('all'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Handshake className="text-blue-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Total Partnerships</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('active'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center">
                                <CheckCircle className="text-green-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Active</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('pending'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                                <Clock className="text-amber-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Pending Review</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
                        onClick={() => { setSelectedStatus('inactive'); setCurrentPage(1); }}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                                <AlertCircle className="text-red-600" size={18} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Inactive</p>
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
                                placeholder="Search by name, organization, or contact..."
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm transition-all"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="text-gray-400" size={18} />
                            <select
                                value={selectedStatus}
                                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                                className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004fa2]/20 focus:border-[#004fa2] text-sm bg-white"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Reset Filters */}
                        {(searchQuery || selectedStatus !== 'all') && (
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

                {/* Partnerships Grid/Table */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-100">
                        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-[#004fa2] animate-spin mb-4" />
                        <p className="text-gray-600 font-medium">Loading partnerships...</p>
                    </div>
                ) : paginatedPartnerships.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-100">
                        <Handshake className="text-gray-300" size={48} />
                        <p className="text-gray-600 font-medium mt-4">No partnerships found</p>
                        <p className="text-gray-500 text-sm mt-2">Create your first partnership or applications will appear here</p>
                        <button
                            onClick={handleAddNew}
                            className="mt-4 px-6 py-2.5 bg-[#004fa2] text-white rounded-xl hover:bg-[#003d7a] transition-all font-medium text-sm"
                        >
                            Create Partnership
                        </button>
                    </div>
                ) : viewMode === 'grid' ? (
                    /* Grid View */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedPartnerships.map((partnership) => (
                            <div
                                key={partnership.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Card Header */}
                                <div className="p-4 bg-gray-50 border-b border-gray-100">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-lg font-bold shadow-md flex-shrink-0">
                                                {(partnership.name || partnership.organizationName || '?').split(' ').slice(0, 2).map(n => n[0]).join('')}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-bold text-gray-900 group-hover:text-[#004fa2] transition-colors truncate">
                                                    {partnership.name || partnership.organizationName}
                                                </h3>
                                                <p className="text-xs text-gray-500 truncate">{partnership.partnershipType}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-4 space-y-4">
                                    <div>
                                        <StatusBadge status={partnership.status} />
                                    </div>

                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {partnership.description}
                                    </p>

                                    {partnership.website && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Globe className="text-gray-400" size={14} />
                                            <a href={partnership.website} target="_blank" rel="noopener noreferrer" className="text-[#004fa2] hover:underline truncate">
                                                {partnership.website}
                                            </a>
                                        </div>
                                    )}

                                    {partnership.contact && (
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Mail className="text-gray-400" size={14} />
                                            <a href={`mailto:${partnership.contact}`} className="text-[#004fa2] hover:underline truncate">
                                                {partnership.contact}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Card Footer */}
                                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleView(partnership)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="View Details"
                                        >
                                            <Eye size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(partnership)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                    <select
                                        value={partnership.status}
                                        onChange={(e) => handleStatusChange(partnership, e.target.value)}
                                        className="text-xs px-2 py-1 border border-gray-200 rounded bg-white focus:outline-none focus:ring-1 focus:ring-[#004fa2]"
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Organization</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Website</th>
                                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedPartnerships.map((partnership) => (
                                        <tr key={partnership.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#004fa2] to-[#0066cc] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                        {(partnership.name || partnership.organizationName || '?').split(' ').slice(0, 2).map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{partnership.name || partnership.organizationName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{partnership.partnershipType}</td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={partnership.status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {partnership.contact ? (
                                                    <a href={`mailto:${partnership.contact}`} className="text-[#004fa2] hover:underline">
                                                        {partnership.contact}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                {partnership.website ? (
                                                    <a href={partnership.website} target="_blank" rel="noopener noreferrer" className="text-[#004fa2] hover:underline truncate block max-w-xs">
                                                        {partnership.website}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(partnership)}
                                                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(partnership)}
                                                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPartnerships.length)} of {filteredPartnerships.length}
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                                        currentPage === page
                                            ? 'bg-[#004fa2] text-white'
                                            : 'border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Partnership Details Modal (Read-Only View) */}
            {viewingPartnership && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 px-6 py-4 border-b border-gray-100 bg-white flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Partnership Application Details</h2>
                            <button
                                onClick={() => setViewingPartnership(null)}
                                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Organization Info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 text-lg">Organization Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Organization Name</label>
                                        <p className="mt-1 text-gray-900 font-medium">{viewingPartnership.name || viewingPartnership.organizationName || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Type</label>
                                        <p className="mt-1 text-gray-900 font-medium">{viewingPartnership.partnershipType || '-'}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Website</label>
                                        <p className="mt-1 text-gray-900">
                                            {viewingPartnership.website ? (
                                                <a href={viewingPartnership.website} target="_blank" rel="noopener noreferrer" className="text-[#004fa2] hover:underline">
                                                    {viewingPartnership.website}
                                                </a>
                                            ) : (
                                                '-'
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                        <div className="mt-1">
                                            <StatusBadge status={viewingPartnership.status} />
                                        </div>
                                    </div>
                                </div>
                                {viewingPartnership.description && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Description</label>
                                        <p className="mt-1 text-gray-700 whitespace-pre-wrap">{viewingPartnership.description}</p>
                                    </div>
                                )}
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4 border-t pt-6">
                                <h3 className="font-semibold text-gray-900 text-lg">Contact Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Contact Email</label>
                                        <p className="mt-1 text-gray-900">
                                            <a href={`mailto:${viewingPartnership.contact}`} className="text-[#004fa2] hover:underline">
                                                {viewingPartnership.contact || '-'}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Actions */}
                            <div className="border-t pt-6 flex items-center justify-between">
                                <p className="text-xs text-gray-500">Read-only view. Application data cannot be edited.</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewingPartnership(null)}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                                    >
                                        Close
                                    </button>
                                    <select
                                        value={viewingPartnership.status}
                                        onChange={(e) => {
                                            handleStatusChange(viewingPartnership, e.target.value);
                                            setViewingPartnership(null);
                                        }}
                                        className="px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#004fa2] text-sm font-medium"
                                    >
                                        <option value="active">Mark Active</option>
                                        <option value="pending">Mark Pending</option>
                                        <option value="inactive">Mark Inactive</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default PartnershipsManagementPage;
