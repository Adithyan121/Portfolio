import React, { createContext, useContext, useState, useCallback } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import '../css/notification.css';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now() + Math.random();
        setNotifications(prev => [...prev, { id, message, type, duration }]);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        }
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.map(notif =>
            notif.id === id ? { ...notif, isExiting: true } : notif
        ));

        // Wait for animation to finish before actual removal
        setTimeout(() => {
            setNotifications(prev => prev.filter(notif => notif.id !== id));
        }, 300);
    }, []);

    // Helper functions for cleaner API
    const notify = {
        success: (msg, duration) => addNotification(msg, 'success', duration),
        error: (msg, duration) => addNotification(msg, 'error', duration),
        info: (msg, duration) => addNotification(msg, 'info', duration),
        warning: (msg, duration) => addNotification(msg, 'warning', duration),
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <div className="notification-container">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className={`notification-toast notification-${notif.type} ${notif.isExiting ? 'notification-exit' : ''}`}
                    >
                        <div className="notification-content">
                            <span className="notification-icon">
                                {notif.type === 'success' && <FaCheckCircle />}
                                {notif.type === 'error' && <FaExclamationCircle />}
                                {notif.type === 'info' && <FaInfoCircle />}
                                {notif.type === 'warning' && <FaExclamationTriangle />}
                            </span>
                            <span className="notification-message">{notif.message}</span>
                        </div>
                        <button
                            className="notification-close"
                            onClick={() => removeNotification(notif.id)}
                            aria-label="Close notification"
                        >
                            <FaTimes />
                        </button>
                        {notif.duration > 0 && (
                            <div
                                className="notification-progress"
                                style={{ animationDuration: `${notif.duration}ms` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </NotificationContext.Provider>
    );
};
