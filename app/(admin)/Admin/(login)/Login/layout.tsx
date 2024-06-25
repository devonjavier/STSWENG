import '../../../../globals.css'
import React from 'react';

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


