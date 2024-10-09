'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const isActiveLink = (path: string) => pathname === path
  
  return (
    <nav className="relative z-50 bg-white py-2 px-4 shadow-md">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/IndigoStudios.png"
            alt="Indigo Studios"
            width={40}
            height={24.66}
            className="mr-2 md:mr-8"
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleDropdown}
          className="md:hidden lg:hidden text-cusBlue focus:outline-none"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>

        {/* Navigation Links */}
        <div className={`hidden md:flex md:flex-1 justify-start space-x-8 text-cusBlue text-sm md:text-md font-medium`}>
          <Link href="/" className={`transition duration-300 ease-in-out delay-300 ${isActiveLink('/') ? 'text-[#7E01B0]' : 'hover:text-gray-400'}`}>
            Home
          </Link>
          <Link href="/Services" className={`transition duration-300 ease-in-out delay-300 ${isActiveLink('/Services') ? 'text-[#7E01B0]' : 'hover:text-gray-400'}`}>
            Services
          </Link>
          <Link href="/About" className={`transition duration-300 ease-in-out delay-300 ${isActiveLink('/About') ? 'text-[#7E01B0]' : 'hover:text-gray-400'}`}>
            About
          </Link>
          <Link href="/FAQs" className={`transition duration-300 ease-in-out delay-300 ${isActiveLink('/FAQs') ? 'text-[#7E01B0]' : 'hover:text-gray-400'}`}>
            FAQs
          </Link>
          <Link href="/Checkstatus" className={`transition duration-300 ease-in-out delay-300 ${isActiveLink('/Checkstatus') ? 'text-[#7E01B0]' : 'hover:text-gray-400'}`}>
            Check Status
          </Link>
        </div>

        {/* Book a Session Button */}
        <div className="hidden md:flex items-center">
          <Link href="/Services" className="btn bg-cusBlue hover:bg-purple-900 px-3 md:px-4 py-1 md:py-2 rounded-[10px] text-white text-sm md:text-lg font-medium transition duration-300 ease-in-out delay-300">
            Book a session
          </Link>
        </div>
      </div>

      {/* Navigation Links - Dropdown for Mobile */}
      <div className={`mt-4 md:hidden ${isOpen ? 'flex' : 'hidden'} flex-col space-y-2 text-cusBlue text-sm font-medium`}>
        <Link href="/" className="hover:text-gray-400 transition duration-300 ease-in-out delay-300">
          Home
        </Link>
        <Link href="/Services" className="hover:text-gray-400 transition duration-300 ease-in-out delay-300">
          Services
        </Link>
        <Link href="/About" className="hover:text-gray-400 transition duration-300 ease-in-out delay-300">
          About
        </Link>
        <Link href="/FAQs" className="hover:text-gray-400 transition duration-300 ease-in-out delay-300">
          FAQs
        </Link>
        <Link href="/Checkstatus" className="hover:text-gray-400 transition duration-300 ease-in-out delay-300">
          Check Status
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
