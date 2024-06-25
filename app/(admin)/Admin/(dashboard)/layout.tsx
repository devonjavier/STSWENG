import '../../../globals.css'
import React from 'react';
import AdminLayout from '../../../components/AdminLayout';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex-grow bg-white">
        <AdminLayout>
        <main className="flex-grow bg-white">
          {children}
        </main>
        </AdminLayout>
      </body>
    </html>
  );
}


