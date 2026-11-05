/**
 * Activity Log Detail Page
 * Dedicated page for viewing full activity log details
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../../../components/admin/layout/AdminLayout';
import activityLogService from '../../../services/activityLogService';
import {
    Activity,
    ArrowLeft,
    User,
    Calendar,
    Monitor,
    Globe,
    MapPin,
    Copy,
    Server,
    Smartphone,
    Info,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    LogIn,
    LogOut,
    Shield,
    FileText,
    Edit,
    Trash2,
    Plus,
    Settings,
    Mail,
    CreditCard,
    GraduationCap,
    Briefcase,
    Key,
    UserPlus,
    UserMinus,
    FileEdit,
    FilePlus,
    FileX
} from 'lucide-react';

// Activity type configuration
const ACTIVITY_TYPE_CONFIG = {
    'login': { label: 'Login', color: 'bg-green-100 text-green-700', icon: LogIn, category: 'auth' },
    'logout': { label: 'Logout', color: 'bg-gray-100 text-gray-700', icon: LogOut, category: 'auth' },
    'login_failed': { label: 'Failed Login', color: 'bg-red-100 text-red-700', icon: XCircle, category: 'auth' },
    'password_reset': { label: 'Password Reset', color: 'bg-amber-100 text-amber-700', icon: Key, category: 'auth' },
    'user_created': { label: 'User Created', color: 'bg-blue-100 text-blue-700', icon: UserPlus, category: 'users' },
    'user_updated': { label: 'User Updated', color: 'bg-cyan-100 text-cyan-700', icon: Edit, category: 'users' },
    'user_deleted': { label: 'User Deleted', color: 'bg-red-100 text-red-700', icon: UserMinus, category: 'users' },
    'role_changed': { label: 'Role Changed', color: 'bg-purple-100 text-purple-700', icon: Shield, category: 'users' },
    'content_created': { label: 'Content Created', color: 'bg-green-100 text-green-700', icon: FilePlus, category: 'content' },
    'content_updated': { label: 'Content Updated', color: 'bg-blue-100 text-blue-700', icon: FileEdit, category: 'content' },
    'content_deleted': { label: 'Content Deleted', color: 'bg-red-100 text-red-700', icon: FileX, category: 'content' },
    'content_published': { label: 'Content Published', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle, category: 'content' },
    'enrollment_created': { label: 'New Enrollment', color: 'bg-indigo-100 text-indigo-700', icon: GraduationCap, category: 'enrollments' },
    'payment_received': { label: 'Payment Received', color: 'bg-emerald-100 text-emerald-700', icon: CreditCard, category: 'payments' },
    'refund_processed': { label: 'Refund Processed', color: 'bg-orange-100 text-orange-700', icon: CreditCard, category: 'payments' },
    'settings_changed': { label: 'Settings Changed', color: 'bg-gray-100 text-gray-700', icon: Settings, category: 'system' },
    'error_logged': { label: 'Error Logged', color: 'bg-red-100 text-red-700', icon: AlertCircle, category: 'system' }
};

// Severity levels
const SEVERITY_CONFIG = {
    'info': { label: 'Info', color: 'bg-blue-500', icon: Info },
    'success': { label: 'Success', color: 'bg-green-500', icon: CheckCircle },
    'warning': { label: 'Warning', color: 'bg-amber-500', icon: AlertCircle },
    'error': { label: 'Error', color: 'bg-red-500', icon: XCircle }
};

const formatFullTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

const ActivityLogDetailPage = () => {
    const { logId } = useParams();
    const navigate = useNavigate();
    const [log, setLog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogDetail = async () => {
            try {
                setLoading(true);
                const { logs } = await activityLogService.getLogs({ limit: 1000 });
                const foundLog = logs.find(l => l.id === logId);
                
                if (foundLog) {
                    setLog(foundLog);
                } else {
                    setError('Activity log not found');
                }
            } catch (err) {
                console.error('[ActivityLogDetailPage] Error fetching log:', err);
                setError('Failed to load activity log');
            } finally {
                setLoading(false);
            }
        };

        fetchLogDetail();
    }, [logId]);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#004fa2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading activity details...</p>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    if (error || !log) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <XCircle className="text-red-600" size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{error || 'Log not found'}</h3>
                        <Link
                            to="/admin/activity-logs"
                            className="inline-flex items-center gap-2 text-[#004fa2] hover:underline font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to Activity Logs
                        </Link>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    const typeConfig = ACTIVITY_TYPE_CONFIG[log.type] || { label: log.type, color: 'bg-gray-100 text-gray-700', icon: Activity };
    const TypeIcon = typeConfig.icon;
    const SeverityIcon = SEVERITY_CONFIG[log.severity]?.icon || Info;
    const severityColor = SEVERITY_CONFIG[log.severity]?.color || 'bg-gray-500';
    const isSystem = log.user.id === 'SYSTEM';

    return (
        <AdminLayout>
            <div className="space-y-6 pb-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <Link
                            to="/admin/activity-logs"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#004fa2] font-medium mb-3 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Back to Activity Logs
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004fa2] to-[#0066cc] rounded-xl flex items-center justify-center">
                                <Activity className="text-white" size={22} />
                            </div>
                            Activity Details
                        </h1>
                        <p className="text-sm text-gray-500 mt-1 ml-[52px] font-mono">
                            {log.id}
                        </p>
                    </div>
                    <button
                        onClick={() => copyToClipboard(JSON.stringify(log, null, 2))}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium text-sm"
                    >
                        <Copy size={16} />
                        Copy JSON
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 space-y-6">
                        {/* Type & Severity */}
                        <div className="flex items-center flex-wrap gap-3">
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${typeConfig.color}`}>
                                <TypeIcon size={16} />
                                {typeConfig.label}
                            </span>
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-white ${severityColor}`}>
                                <SeverityIcon size={16} />
                                {SEVERITY_CONFIG[log.severity]?.label || log.severity}
                            </span>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                            <p className="text-lg text-gray-900 font-medium">{log.description}</p>
                        </div>

                        {/* User Info */}
                        <div className="bg-gray-50 rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
                                <User size={16} />
                                Performed By
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold ${isSystem ? 'bg-gray-500' : 'bg-gradient-to-br from-[#004fa2] to-[#0066cc]'}`}>
                                    {isSystem ? <Server size={24} /> : log.user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-semibold text-gray-900 truncate">{log.user.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{log.user.email}</p>
                                </div>
                                <span className="shrink-0 whitespace-nowrap px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                                    {log.user.role}
                                </span>
                            </div>
                        </div>

                        {/* Timestamp */}
                        <div className="bg-gray-50 rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-gray-500 mb-3 flex items-center gap-2">
                                <Calendar size={16} />
                                Timestamp
                            </h3>
                            <p className="text-base text-gray-900 font-medium">{formatFullTimestamp(log.timestamp)}</p>
                        </div>

                        {/* Technical Details */}
                        <div className="bg-gray-50 rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-gray-500 mb-4 flex items-center gap-2">
                                <Monitor size={16} />
                                Technical Details
                            </h3>
                            <div className="space-y-4">
                                {/* Device Information */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Device & Browser</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(log.deviceType || log.details?.device) && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <Monitor size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <span className="text-xs text-gray-500 block mb-0.5">Device</span>
                                                    <span className="text-sm text-gray-900 font-medium">{log.deviceType || log.details?.device || 'Unknown'}</span>
                                                </div>
                                            </div>
                                        )}
                                        {log.deviceModel && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <Smartphone size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <span className="text-xs text-gray-500 block mb-0.5">Model</span>
                                                    <span className="text-sm text-gray-900 font-medium">{log.deviceModel}</span>
                                                </div>
                                            </div>
                                        )}
                                        {(log.osName || log.osVersion) && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <Monitor size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <span className="text-xs text-gray-500 block mb-0.5">Operating System</span>
                                                    <span className="text-sm text-gray-900 font-medium">{log.osName} {log.osVersion}</span>
                                                </div>
                                            </div>
                                        )}
                                        {(log.browserName || log.browserVersion || log.details?.browser) && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <Globe size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <span className="text-xs text-gray-500 block mb-0.5">Browser</span>
                                                    <span className="text-sm text-gray-900 font-medium">
                                                        {log.browserName && log.browserVersion
                                                            ? `${log.browserName} ${log.browserVersion}`
                                                            : log.details?.browser || 'Unknown'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Location Information */}
                                <div className="space-y-3 pt-4 border-t border-gray-200">
                                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Location & Network</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(log.city || log.region || log.country || log.details?.location) && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <MapPin size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <span className="text-xs text-gray-500 block mb-0.5">Location</span>
                                                    <span className="text-sm text-gray-900 font-medium">
                                                        {log.city && log.region && log.country
                                                            ? `${log.city}, ${log.region}, ${log.country}`
                                                            : log.details?.location || 'Unknown'}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        {log.isp && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <Globe size={18} className="text-gray-400 mt-0.5" />
                                                <div>
                                                    <span className="text-xs text-gray-500 block mb-0.5">ISP</span>
                                                    <span className="text-sm text-gray-900 font-medium">{log.isp}</span>
                                                </div>
                                            </div>
                                        )}
                                        {(log.ipAddress || log.details?.ip) && (
                                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-100">
                                                <Globe size={18} className="text-gray-400 mt-0.5" />
                                                <div className="flex-1">
                                                    <span className="text-xs text-gray-500 block mb-0.5">IP Address</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-sm text-gray-900 font-medium">{log.ipAddress || log.details?.ip}</span>
                                                        <button 
                                                            onClick={() => copyToClipboard(log.ipAddress || log.details?.ip)} 
                                                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                                            title="Copy IP address"
                                                        >
                                                            <Copy size={14} className="text-gray-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Metadata */}
                        {Object.entries(log.details).filter(([key]) => !['ip', 'device', 'browser', 'location'].includes(key)).length > 0 && (
                            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                                <h3 className="text-sm font-semibold text-blue-800 mb-4 flex items-center gap-2">
                                    <Info size={16} />
                                    Additional Information
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(log.details)
                                        .filter(([key]) => !['ip', 'device', 'browser', 'location'].includes(key))
                                        .map(([key, value]) => (
                                            <div key={key} className="flex items-center justify-between bg-white p-3 rounded-lg border border-blue-100">
                                                <span className="text-sm text-blue-600 capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="text-sm text-blue-900 font-semibold">{value}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ActivityLogDetailPage;
