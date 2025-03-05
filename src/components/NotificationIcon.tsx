import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';

const NotificationIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef]);

  // Handle notification click
  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    // Navigate to specific content or just mark as read
  };

  // Get notification badge color based on type
  const getNotificationTypeColor = (type?: 'info' | 'success' | 'warning' | 'error') => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-600';
      default: return 'bg-indigo-600'; // info or undefined
    }
  };

  return (
    <div className="relative" ref={notificationRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 mr-3 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
      >
        <span className="sr-only">View notifications</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md z-30">
          <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => markAllAsRead()}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                    !notification.read ? 'bg-indigo-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    {!notification.read && (
                      <span className={`h-2 w-2 ${getNotificationTypeColor(notification.type)} rounded-full`}></span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="px-4 py-3 border-t border-gray-200 text-center">
            <a href="/notifications" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
