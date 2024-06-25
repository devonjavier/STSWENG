import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow bg-white">
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="text-xl font-bold">Dashboard</div>
          <div className="text-sm">May 28, 2024 8:00 AM</div>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
