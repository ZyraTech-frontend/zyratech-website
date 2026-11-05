/**
 * Activity Log Service - API Integration
 * Fetches activity logs from the backend API with enhanced device and location tracking.
 * 
 * API Endpoint: GET https://api.zyratechhub.com/api/admin/logs/
 * Authentication: Bearer token required
 * Permission: super_admin_only
 */

import axios from 'axios';

// Activity Logs API base URL (different from main API)
const ACTIVITY_LOGS_API_BASE = 'https://api.zyratechhub.com/api/admin/logs';

/**
 * Get the authentication token
 */
const getAuthToken = () => {
    return localStorage.getItem('adminToken') || localStorage.getItem('token') || null;
};

/**
 * Create axios instance for activity logs API
 */
const createApiClient = () => {
    const token = getAuthToken();
    return axios.create({
        baseURL: ACTIVITY_LOGS_API_BASE,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    });
};

/**
 * Transform backend log to match frontend format
 */
const transformLog = (backendLog) => {
    return {
        id: backendLog.id,
        type: mapActionToType(backendLog.action),
        severity: backendLog.status === 'error' ? 'error' : getSeverityFromAction(backendLog.action),
        user: {
            id: backendLog.userId || 'SYSTEM',
            name: backendLog.user?.name || 'System',
            email: backendLog.user?.email || 'system@zyratechhub.com',
            role: 'Admin',
            avatar: backendLog.user?.avatar || backendLog.user?.profilePicture || null
        },
        description: generateDescription(backendLog),
        
        // NEW: Device & Location fields from backend (at root level)
        deviceType: backendLog.deviceType,
        deviceModel: backendLog.deviceModel,
        deviceBrand: backendLog.deviceBrand,
        osName: backendLog.osName,
        osVersion: backendLog.osVersion,
        browserName: backendLog.browserName,
        browserVersion: backendLog.browserVersion,
        
        country: backendLog.country,
        region: backendLog.region,
        city: backendLog.city,
        postalCode: backendLog.postalCode,
        latitude: backendLog.latitude,
        longitude: backendLog.longitude,
        timezone: backendLog.timezone,
        isp: backendLog.isp,
        ipAddress: backendLog.ipAddress,
        
        // Legacy details object for backward compatibility
        details: {
            ip: backendLog.ipAddress,
            device: backendLog.deviceType || 'Unknown',
            browser: backendLog.browserName ? ` `.trim() : 'Unknown',
            location: backendLog.city && backendLog.region && backendLog.country 
                ? `, , ` 
                : 'Unknown',
            entity: backendLog.entity,
            entityId: backendLog.entityId,
            changes: backendLog.changes,
            userAgent: backendLog.userAgent
        },
        
        timestamp: backendLog.createdAt,
        metadata: {
            action: backendLog.action,
            entity: backendLog.entity,
            entityId: backendLog.entityId,
            errorMessage: backendLog.errorMessage
        }
    };
};

/**
 * Map backend action to frontend activity type
 */
const mapActionToType = (action) => {
    const mapping = {
        'LOGIN': 'login',
        'LOGOUT': 'logout',
        'CHANGE_PASSWORD': 'password_reset',
        'UPDATE_USER': 'user_updated',
        'ACTIVATE_USER': 'user_created',
        'DEACTIVATE_USER': 'user_deleted',
        'UPDATE_PERMISSIONS': 'role_changed',
        'CREATE_COURSE': 'content_created',
        'UPDATE_COURSE': 'content_updated',
        'DELETE_COURSE': 'content_deleted',
        'CREATE_PROJECT': 'content_created',
        'UPDATE_PROJECT': 'content_updated',
        'DELETE_PROJECT': 'content_deleted',
        'PAYMENT_RECEIVED': 'payment_received',
        'PAYMENT_REFUNDED': 'refund_processed',
        'UPDATE_SETTINGS': 'settings_changed'
    };
    return mapping[action] || 'system';
};

/**
 * Get severity level from action
 */
const getSeverityFromAction = (action) => {
    if (action.includes('DELETE') || action.includes('DEACTIVATE')) return 'warning';
    if (action.includes('CREATE') || action.includes('ACTIVATE')) return 'success';
    if (action.includes('UPDATE') || action.includes('CHANGE')) return 'info';
    return 'info';
};

/**
 * Generate human-readable description from backend log
 */
const generateDescription = (log) => {
    const user = log.user?.name || 'System';
    const action = log.action.toLowerCase().replace(/_/g, ' ');
    const entity = log.entity || '';
    
    return ` performed  on `.trim();
};

const activityLogService = {
    /**
     * Get activity logs from backend API
     */
    getLogs: async (params = {}) => {
        try {
            const api = createApiClient();
            
            const queryParams = {
                page: params.page || 1,
                limit: params.limit || 50,
                ...(params.action && { action: params.action }),
                ...(params.entity && { entity: params.entity }),
                ...(params.userId && { userId: params.userId })
            };
            
            console.log('[activityLogService] Fetching logs from API:', queryParams);
            
            const response = await api.get('/', { params: queryParams });
            
            if (response.data.success) {
                const logs = response.data.data.data.map(transformLog);
                const pagination = response.data.data.pagination;
                
                console.log('[activityLogService] Received', logs.length, 'logs from API');
                
                return { logs, pagination };
            } else {
                return { logs: [], pagination: { total: 0, pages: 0, page: 1, limit: 50 } };
            }
        } catch (error) {
            console.error('[activityLogService] Error fetching logs:', error.response?.data || error.message);
            return {
                logs: [],
                pagination: { total: 0, pages: 0, page: 1, limit: 50 },
                error: error.response?.data?.message || error.message
            };
        }
    },

    getStats: async () => {
        try {
            const { logs } = await activityLogService.getLogs({ limit: 100 });
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            return {
                total: logs.length,
                today: logs.filter(l => new Date(l.timestamp) >= today).length,
                warnings: logs.filter(l => l.severity === 'warning').length,
                errors: logs.filter(l => l.severity === 'error').length,
                logins: logs.filter(l => l.type === 'login').length,
                failedLogins: logs.filter(l => l.metadata?.errorMessage && l.type === 'login').length
            };
        } catch (error) {
            return { total: 0, today: 0, warnings: 0, errors: 0, logins: 0, failedLogins: 0 };
        }
    },

    getRecentLogs: async (limit = 10) => {
        try {
            const { logs } = await activityLogService.getLogs({ limit });
            return logs;
        } catch (error) {
            return [];
        }
    },

    getLogsByUser: async (userId) => {
        try {
            const { logs } = await activityLogService.getLogs({ userId, limit: 100 });
            return logs;
        } catch (error) {
            return [];
        }
    },

    exportLogs: async () => {
        try {
            const { logs } = await activityLogService.getLogs({ limit: 100 });
            const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `activity-logs-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('[activityLogService] Error exporting logs:', error);
        }
    },

    logAction: ({ user, type, severity, description, details, metadata }) => {
        console.log('[activityLogService] logAction called (backend handles this now)');
        return null;
    }
};

export default activityLogService;
