import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../../store/slices/uiSlice';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const NotificationSystem = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.ui.notifications); // Access notifications from the correct slice path.
    // NOTE: Check if your store structure is { ui: { notifications: [] } } or just { notifications: [] }. 
    // Based on AdminLayout.jsx, it is state.ui.notifications.

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
            {notifications.map((notification) => (
                <NotificationToast key={notification.id} notification={notification} dispatch={dispatch} />
            ))}
        </div>
    );
};

const NotificationToast = ({ notification, dispatch }) => {
    const { id, type, message, duration = 3000 } = notification;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                dispatch(removeNotification(id));
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [dispatch, id, duration]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <CheckCircle size={18} />;
            case 'error': return <AlertCircle size={18} />;
            case 'warning': return <AlertTriangle size={18} />;
            default: return <Info size={18} />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success': return 'bg-green-600 text-white shadow-green-900/20';
            case 'error': return 'bg-red-600 text-white shadow-red-900/20';
            case 'warning': return 'bg-amber-500 text-white shadow-amber-900/20';
            default: return 'bg-blue-600 text-white shadow-blue-900/20';
        }
    };

    return (
        <div
            className={`
                pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg 
                transform transition-all duration-300 ease-in-out animate-in slide-in-from-right-full fade-in
                max-w-md w-full md:w-auto min-w-[300px]
                ${getStyles()}
            `}
            role="alert"
        >
            <div className="mt-0.5 shrink-0 opacity-90">{getIcon()}</div>
            <div className="flex-1 text-sm font-medium leading-tight pt-0.5">{message}</div>
            <button
                onClick={() => dispatch(removeNotification(id))}
                className="shrink-0 opacity-70 hover:opacity-100 transition-opacity p-0.5 hover:bg-white/20 rounded"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default NotificationSystem;
