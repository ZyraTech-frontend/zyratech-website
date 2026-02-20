/**
 * Activity Log Service
 * Centralized audit trail — records every admin action with the admin's name, role, and details.
 * Stored in localStorage so the super admin can see who did what across sessions.
 *
 * In production, this would be backed by a database API. For now, localStorage serves
 * as a persistent mock store.
 */

const STORAGE_KEY = 'zyratech_activity_logs';
const MAX_LOGS = 500; // Keep last 500 logs to prevent localStorage overflow

/**
 * Get stored activity logs from localStorage
 */
const getStoredLogs = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error('Error reading activity logs:', e);
        return [];
    }
};

/**
 * Save activity logs to localStorage
 */
const saveLogs = (logs) => {
    try {
        // Keep only the most recent MAX_LOGS entries
        const trimmed = logs.slice(0, MAX_LOGS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
        console.error('Error saving activity logs:', e);
    }
};

/**
 * Generate a unique log ID
 */
const generateLogId = () => {
    return `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};

/**
 * Detect basic device/browser info from the user agent
 */
const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let device = 'Desktop';
    let browser = 'Unknown';

    // Device detection
    if (/Mobi|Android/i.test(ua)) device = 'Mobile';
    else if (/Tablet|iPad/i.test(ua)) device = 'Tablet';
    else if (/Laptop/i.test(ua)) device = 'Laptop';

    // Browser detection
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = `Chrome`;
    else if (ua.includes('Firefox')) browser = `Firefox`;
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = `Safari`;
    else if (ua.includes('Edg')) browser = `Edge`;

    return { device, browser };
};


const activityLogService = {
    /**
     * Log an admin action
     * 
     * @param {Object} params
     * @param {Object} params.user - The admin performing the action { id, name, email, role }
     * @param {string} params.type - Activity type (matches ACTIVITY_TYPE_CONFIG keys in ActivityLogsPage)
     *   Supported types: 'login', 'logout', 'login_failed', 'password_reset',
     *   'user_created', 'user_updated', 'user_deleted', 'role_changed',
     *   'content_created', 'content_updated', 'content_deleted', 'content_published',
     *   'enrollment_created', 'payment_received', 'refund_processed',
     *   'settings_changed', 'backup_created', 'error_logged', 'notification_sent'
     * @param {string} params.severity - 'info' | 'success' | 'warning' | 'error'
     * @param {string} params.description - Human-readable description of the action
     * @param {Object} [params.details] - Additional details (contentType, contentId, etc.)
     * @param {Object} [params.metadata] - Extra metadata for search/filtering
     * @returns {Object} The created log entry
     */
    logAction: ({ user, type, severity = 'info', description, details = {}, metadata = {} }) => {
        if (!user || !type || !description) {
            console.warn('activityLogService.logAction: missing required fields (user, type, description)');
            return null;
        }

        const { device, browser } = getDeviceInfo();

        const logEntry = {
            id: generateLogId(),
            type,
            severity,
            user: {
                id: user.id || 'UNKNOWN',
                name: user.name || 'Unknown Admin',
                email: user.email || '',
                role: user.role === 'super_admin' ? 'Super Admin' :
                    user.role === 'admin' ? 'Admin' :
                        user.role === 'editor' ? 'Editor' :
                            user.role || 'Unknown'
            },
            description,
            details: {
                device,
                browser,
                location: 'Accra, Ghana', // Would be IP-based in production
                ...details
            },
            timestamp: new Date().toISOString(),
            metadata
        };

        // Prepend to logs (newest first)
        const logs = getStoredLogs();
        logs.unshift(logEntry);
        saveLogs(logs);

        return logEntry;
    },

    /**
     * Get all activity logs, with optional filtering
     * 
     * @param {Object} [params] - Filter parameters
     * @param {string} [params.type] - Filter by activity type  
     * @param {string} [params.severity] - Filter by severity
     * @param {string} [params.category] - Filter by category
     * @param {string} [params.userId] - Filter by user ID
     * @param {string} [params.search] - Search in description, user name, email
     * @param {string} [params.dateRange] - 'today' | 'week' | 'month' | 'all'
     * @returns {Array} Filtered activity logs
     */
    getLogs: (params = {}) => {
        let logs = getStoredLogs();

        if (params.type) {
            logs = logs.filter(log => log.type === params.type);
        }

        if (params.severity) {
            logs = logs.filter(log => log.severity === params.severity);
        }

        if (params.userId) {
            logs = logs.filter(log => log.user.id === params.userId);
        }

        if (params.search) {
            const q = params.search.toLowerCase();
            logs = logs.filter(log =>
                log.description.toLowerCase().includes(q) ||
                log.user.name.toLowerCase().includes(q) ||
                log.user.email.toLowerCase().includes(q) ||
                log.id.toLowerCase().includes(q)
            );
        }

        if (params.dateRange && params.dateRange !== 'all') {
            const now = new Date();
            let cutoff;
            switch (params.dateRange) {
                case 'today':
                    cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    cutoff = null;
            }
            if (cutoff) {
                logs = logs.filter(log => new Date(log.timestamp) >= cutoff);
            }
        }

        return logs;
    },

    /**
     * Get a single log entry by ID
     */
    getLogById: (id) => {
        const logs = getStoredLogs();
        return logs.find(log => log.id === id) || null;
    },

    /**
     * Get log statistics
     */
    getStats: () => {
        const logs = getStoredLogs();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return {
            total: logs.length,
            today: logs.filter(l => new Date(l.timestamp) >= today).length,
            warnings: logs.filter(l => l.severity === 'warning').length,
            errors: logs.filter(l => l.severity === 'error').length,
            logins: logs.filter(l => l.type === 'login').length,
            failedLogins: logs.filter(l => l.type === 'login_failed').length
        };
    },

    /**
     * Get recent logs (for dashboard widgets)
     * @param {number} [limit=10] - Number of recent logs to return
     */
    getRecentLogs: (limit = 10) => {
        const logs = getStoredLogs();
        return logs.slice(0, limit);
    },

    /**
     * Get logs by a specific admin user
     * @param {string} userId - The admin's user ID
     */
    getLogsByUser: (userId) => {
        const logs = getStoredLogs();
        return logs.filter(log => log.user.id === userId);
    },

    /**
     * Clear all logs (super admin only, for maintenance)
     */
    clearLogs: () => {
        localStorage.removeItem(STORAGE_KEY);
    },

    /**
     * Export logs as JSON for download
     */
    exportLogs: () => {
        const logs = getStoredLogs();
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `activity-logs-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};

export default activityLogService;
