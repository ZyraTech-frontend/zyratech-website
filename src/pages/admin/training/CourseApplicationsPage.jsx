/**
 * Course Applications Management Page
 * Standalone page for managing course enrollment applications
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { openConfirmDialog, addNotification } from '../../../store/slices/uiSlice';
import trainingApplicationService from '../../../services/trainingApplicationService';
import api from '../../../services/api';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import RejectApplicationDialog from '../../../components/admin/training/RejectApplicationDialog';
import {
    Users,
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    ChevronLeft,
    ChevronRight,
    X,
    Mail,
    Phone,
    BookOpen,
    Calendar,
    Loader
} from 'lucide-react';

// Status configuration
const STATUS_CONFIG = {
    pending: { label: 'Pending Review', color: 'bg-amber-100 text-amber-700', icon: Clock },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-700', icon: BookOpen },
    completed: { label: 'Completed', color: 'bg-purple-100 text-purple-700', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle }
};

const StatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
    const Icon = config.icon;
    
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.color}`}>
            <Icon size={12} />
            {config.label}
        </span>
    );
};

const CourseApplicationsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userPermissions } = useAuth();

    // Permission checks
    const canManageEnrollments = userPermissions?.includes('enrollments') ?? false;
    const handlePermissionDenied = () => {
        dispatch(addNotification({
            type: 'error',
            title: 'Permission Required',
            message: 'You do not have permission to manage course enrollments.',
            description: 'Contact Super Admin at admin@zyratechhub.com',
            duration: 6000
        }));
    };
    
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState(null);
    
    const itemsPerPage = 10;
    
    // Fetch applications
    useEffect(() => {
        loadApplications();
    }, []);
    
    const loadApplications = async () => {
        try {
            setLoading(true);
            // Use the correct backend endpoint: /admin/enrollments
            const data = await trainingApplicationService.getAllApplications();
            const list = Array.isArray(data) ? data : (Array.isArray(data?.data) ? data.data : (data?.enrollments || []));
            setApplications(list);
            
            // Calculate total revenue from completed payments
            await calculateTotalRevenue();
        } catch (error) {
            console.error('Failed to load applications:', error);
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to load applications'
            }));
        } finally {
            setLoading(false);
        }
    };
    
    const calculateTotalRevenue = async () => {
        try {
            // Use api service instead of raw fetch to avoid URL issues
            const response = await api.get('/admin/transactions', {
                params: {
                    status: 'completed',
                    limit: 1000
                }
            });
            
            // Handle nested data structure: response.data.data
            const transactions = response.data?.data?.data || response.data?.data || [];
            
            console.log('💰 Fetched transactions:', transactions);
            console.log('📊 Response structure:', response.data);
            
            // Filter only training payments and sum them up
            const trainingPayments = transactions.filter(t => t.paymentType === 'training');
            console.log('🎓 Training payments:', trainingPayments.length);
            
            const total = trainingPayments.reduce((sum, payment) => {
                return sum + (parseFloat(payment.amount) || 0);
            }, 0);
            
            console.log('💵 Total revenue calculated:', total);
            
            setTotalRevenue(total);
        } catch (error) {
            console.error('Failed to calculate revenue:', error);
            setTotalRevenue(0);
        }
    };
    
    // Filter applications
    const filteredApplications = useMemo(() => {
        let result = [...applications];
        
        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(app => {
                const name = app.fullName || app.applicantName || '';
                const email = app.emailAddress || app.email || '';
                const course = app.courseTitle || app.courseName || '';
                const id = app.id || app.applicationId || '';
                
                return name.toLowerCase().includes(query) ||
                       email.toLowerCase().includes(query) ||
                       course.toLowerCase().includes(query) ||
                       id.toLowerCase().includes(query);
            });
        }
        
        // Status filter
        if (selectedStatus !== 'all') {
            result = result.filter(app => app.status === selectedStatus);
        }
        
        // Course filter
        if (selectedCourse !== 'all') {
            result = result.filter(app => (app.courseId || app.course?.id) === selectedCourse);
        }
        
        return result;
    }, [applications, searchQuery, selectedStatus, selectedCourse]);
    
    // Statistics
    const stats = useMemo(() => ({
        total: applications.length,
        pending: applications.filter(a => a.status === 'pending').length,
        approved: applications.filter(a => a.status === 'approved').length,
        rejected: applications.filter(a => a.status === 'rejected').length,
        completed: applications.filter(a => a.status === 'completed').length
    }), [applications]);
    
    // Pagination
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    // Unique courses for filter
    const uniqueCourses = useMemo(() => {
        const courseMap = new Map();
        applications.forEach(app => {
            const id = app.courseId || app.course?.id;
            const title = app.courseTitle || app.courseName || app.course?.title;
            if (id && title) {
                courseMap.set(id, title);
            }
        });
        return Array.from(courseMap.entries()).map(([id, title]) => ({ id, title }));
    }, [applications]);
    
    // Handlers
    const handleViewApplication = (application) => {
        navigate(`/admin/training/applications/${application.id || application.applicationId}`);
    };
    
    const handleApprove = (application) => {
        if (!canManageEnrollments) {
            handlePermissionDenied();
            return;
        }
        dispatch(openConfirmDialog({
            title: 'Approve Application',
            message: `Approve ${application.fullName || application.applicantName}'s application?`,
            confirmLabel: 'Approve',
            onConfirm: async () => {
                try {
                    const appId = application.id || application.applicationId;
                    await trainingApplicationService.updateApplicationStatus(appId, 'approved');
                    await loadApplications();
                    dispatch(addNotification({
                        type: 'success',
                        message: 'Application approved successfully'
                    }));
                } catch (error) {
                    dispatch(addNotification({
                        type: 'error',
                        message: 'Failed to approve application'
                    }));
                }
            }
        }));
    };
    
    const handleReject = async (application) => {
        if (!canManageEnrollments) {
            handlePermissionDenied();
            return;
        }
        try {
            const appId = application.id || application.applicationId;
            
            // Check payment status first
            const paymentStatus = await trainingApplicationService.checkPaymentStatus(appId);
            console.log('💰 Payment status:', paymentStatus);
            
            setSelectedApplication(application);
            setPaymentInfo(paymentStatus);
            setRejectDialogOpen(true);
        } catch (error) {
            console.error('Failed to check payment status:', error);
            dispatch(addNotification({
                type: 'error',
                message: 'Failed to check payment status. Please try again.'
            }));
        }
    };
    
    const handleConfirmReject = async (shouldRefund, reviewNotes) => {
        try {
            const appId = selectedApplication.id || selectedApplication.applicationId;
            
            await trainingApplicationService.updateApplicationStatus(
                appId,
                'rejected',
                { shouldRefund, reviewNotes }
            );
            
            await loadApplications();
            
            dispatch(addNotification({
                type: 'success',
                message: shouldRefund 
                    ? 'Application rejected and refund processed ✅'
                    : 'Application rejected'
            }));
            
            setRejectDialogOpen(false);
            setSelectedApplication(null);
            setPaymentInfo(null);
        } catch (error) {
            dispatch(addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to reject application'
            }));
            throw error; // Re-throw to keep dialog open
        }
    };
    
    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Users className="text-blue-600" size={22} />
                            </div>
                            Course Applications
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px]">
                            Review and manage course enrollment applications
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                        { label: 'Total Applications', value: stats.total, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                        { label: 'Pending Review', value: stats.pending, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                        { label: 'Approved', value: stats.approved, color: 'bg-green-50 text-green-700 border-green-200' },
                        { label: 'Completed', value: stats.completed, color: 'bg-purple-50 text-purple-700 border-purple-200' },
                        { label: 'Rejected', value: stats.rejected, color: 'bg-red-50 text-red-700 border-red-200' },
                        { 
                            label: 'Total Revenue', 
                            value: `GHS ${totalRevenue.toFixed(2)}`, 
                            color: 'bg-gray-50 text-gray-900 border-gray-200'
                        }
                    ].map((stat, idx) => (
                        <div key={idx} className={`${stat.color} rounded-lg border p-4`}>
                            <div className="text-2xl font-bold">
                                {stat.value}
                            </div>
                            <div className="text-xs mt-1 opacity-75">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search applications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                        </select>

                        {/* Course Filter */}
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        >
                            <option value="all">All Courses</option>
                            {uniqueCourses.map(course => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Applications Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader className="animate-spin text-blue-600" size={32} />
                        </div>
                    ) : paginatedApplications.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Users size={48} className="mx-auto mb-3 opacity-30" />
                            <p className="font-medium">No applications found</p>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Applicant</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Course</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Applied</th>
                                            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {paginatedApplications.map((app) => (
                                            <tr key={app.id || app.applicationId} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium text-gray-900">{app.fullName || app.applicantName}</div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                            <Mail size={12} />
                                                            {app.emailAddress || app.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {app.courseTitle || app.courseName || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={app.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {app.appliedDate || app.createdAt ? new Date(app.appliedDate || app.createdAt).toLocaleDateString() : 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleViewApplication(app)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                            title="View Details"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                        {app.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApprove(app)}
                                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                                    title="Approve"
                                                                >
                                                                    <CheckCircle size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReject(app)}
                                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                                    title="Reject"
                                                                >
                                                                    <XCircle size={18} />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <span className="text-sm font-medium">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                            disabled={currentPage === totalPages}
                                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            
            {/* Rejection Dialog */}
            {selectedApplication && (
                <RejectApplicationDialog
                    isOpen={rejectDialogOpen}
                    onClose={() => {
                        setRejectDialogOpen(false);
                        setSelectedApplication(null);
                        setPaymentInfo(null);
                    }}
                    onConfirm={handleConfirmReject}
                    paymentInfo={paymentInfo}
                    applicantName={selectedApplication.fullName || selectedApplication.applicantName}
                />
            )}
        </AdminLayout>
    );
};

export default CourseApplicationsPage;
