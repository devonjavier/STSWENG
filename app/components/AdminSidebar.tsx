import React from 'react';
import Link from 'next/link';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'] });

const Sidebar: React.FC = () => {
  return (
    <div className={`h-screen w-64 bg-purple-800 text-white p-5 ${rubik.className}`}>
      <div className="flex flex-col items-center mb-10">
        <img src="/IndigoStudios.png" alt="Indigo Studios Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-2xl font-bold">Indigo Studios</h1>
      </div>
      <nav className="flex flex-col">
        <Link href="./pending-reservations" className="mb-4 text-lg hover:text-purple-300">Pending Reservations</Link>
        <Link href="./upcoming-reservations" className="mb-4 text-lg hover:text-purple-300">Upcoming Reservations</Link>
        <Link href="./all-reservations" className="mb-4 text-lg hover:text-purple-300">View all Reservations</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
