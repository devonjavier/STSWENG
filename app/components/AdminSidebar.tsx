import React from 'react';
import Link from 'next/link';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'] });

const Sidebar: React.FC = () => {
  return (
    <div className={`h-screen w-64 bg-cusBlue text-white p-5 ${rubik.className}`}>
      <div className="flex flex-col items-center mb-10">
        <img src="/IndigoStudios.png" alt="Indigo Studios Logo" className="w-24 h-24 mb-4" />
      </div>
      
      <nav className="flex flex-col ml-16">
        <Link href="./pending-reservations" className="mb-4 text-lg hover:text-purple-300 pb-8">Pending Reservations</Link>
        <Link href="./upcoming-reservations" className="mb-4 text-lg hover:text-purple-300 pb-8">Upcoming Reservations</Link>
        <Link href="./all-reservations" className="mb-4 text-lg hover:text-purple-300 pb-8">View all Reservations</Link>
        <Link href="./all-reservations" className="mb-4 text-lg hover:text-purple-300 pb-8">Edit website details</Link>
      </nav>

      <div className="pt-72 mb-6 ml-16">
        <Link href="./logout" className="text-lg hover:text-purple-300">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
