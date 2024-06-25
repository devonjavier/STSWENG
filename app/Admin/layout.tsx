import React from 'react';
import AdminLayout from '../components/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}
