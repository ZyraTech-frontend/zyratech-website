/**
 * useActivityLogger Hook
 * Provides a convenient logAction() function that automatically captures the
 * current admin user's info from Redux state.
 *
 * Usage in any admin page:
 *   const { logAction } = useActivityLogger();
 *   
 *   // After performing an action:
 *   logAction({
 *       type: 'content_created',
 *       description: `Created new blog post: "${title}"`,
 *       details: { contentType: 'Blog Post', contentId: id }
 *   });
 */

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import activityLogService from '../services/activityLogService';

export const useActivityLogger = () => {
    const user = useSelector((state) => state.auth.user);

    /**
     * Log an admin action with auto-captured user info
     * 
     * @param {Object} params
     * @param {string} params.type - Activity type key (e.g. 'content_created', 'content_updated', 'content_deleted')
     * @param {string} params.description - Human-readable description
     * @param {string} [params.severity='info'] - 'info' | 'success' | 'warning' | 'error'
     * @param {Object} [params.details] - Extra details
     * @param {Object} [params.metadata] - Extra metadata
     */
    const logAction = useCallback(({ type, description, severity = 'info', details = {}, metadata = {} }) => {
        if (!user) {
            console.warn('useActivityLogger: No authenticated user found, skipping log.');
            return null;
        }

        return activityLogService.logAction({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            type,
            severity,
            description,
            details,
            metadata
        });
    }, [user]);

    return { logAction };
};

export default useActivityLogger;
