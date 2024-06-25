import '../../../../globals.css'
import React from 'react';
import AdminLayout from '../../../../components/AdminLayout';
import AdminSidebar from '../../../../components/AdminSidebar';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex-grow bg-white">

        <main className="flex-grow bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}


