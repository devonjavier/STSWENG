import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { Rubik } from 'next/font/google';
import { handleLogout } from '@/app/lib/actions'



const rubik = Rubik({ subsets: ['latin'] });

const Sidebar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logout = useCallback(() => {
    handleLogout();
  }, []);


  return (
    <div className={`min-h-[100vh] w-64 bg-cusBlue text-white p-5 font-medium relative ${rubik.className}`}>
      <div className="flex flex-col items-center mb-10">
        <img src="/IndigoStudios.png" alt="Indigo Studios Logo" className="w-24 h-24 mb-4" />
      </div>
      
      <nav className="flex flex-col ml-16">
        <Link href="/Admin/pending-reservations" className="mb-4 text-lg hover:text-purple-300 transition duration-300 ease-in-out pb-8">Calendar Reservations</Link>
        <Link href="/Admin/all-reservations" className="mb-4 text-lg hover:text-purple-300 transition duration-300 ease-in-out pb-8">View all Reservations</Link>
        <Link href="/Admin/edit-calendar" className="mb-4 text-lg hover:text-purple-300 transition duration-300 ease-in-out pb-8">Edit Calendar</Link>

        <div className="relative">
          <button 
            onClick={toggleDropdown} 
            className="text-lg text-left hover:text-purple-300 transition duration-300 ease-in-out pb-2 focus:outline-none">
            Edit website details
          </button>
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Link href="/Admin/edit-services" className="block px-4 py-2 text-base text-white hover:text-purple-300 transition duration-300 ease-in-out rounded-3xl">Services</Link>
            <Link href="/Admin/edit-faqs" className="block px-4 py-2 text-base text-white hover:text-purple-300 transition duration-300 ease-in-out rounded-3xl">FAQs</Link>
          </div>
        </div>
      </nav>

      <div className="absolute bottom-20 left-20">
        <Link href="/" onClick={logout} className="text-lg hover:text-purple-300 transition duration-300 ease-in-out">
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
