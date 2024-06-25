'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow bg-white">
        <div className="bg-gray-200 p-4 flex justify-between items-center h-20">
          <div className="block text-2xl font-medium ml-20">Dashboard</div>
          <div className="block text-xl font-medium mr-20 text-right">
            <span className="block">{formatDate(currentTime)}</span>
            <span>{formatTime(currentTime)}</span>
          </div>
          {/* placeholder time */}
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

