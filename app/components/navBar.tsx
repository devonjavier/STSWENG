import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navBar = () => {
  return (
    <nav className="flex justify-between items-center bg-white py-2 px-4 shadow-xl">
      <div className="flex items-center h-max text-cusBlue text-md font-medium">
        <Link href="/" className="mr-8 flex items-center"><Image className='mr-8'
          src="/IndigoStudios.png"
          alt="Indigo Studios"
          width={40}
          height={24.66}
        /><div className='hover:text-gray-400 transition duration-300 ease-in-out delay-300'>Home</div></Link>
        <Link href="/Services" className="mr-8 hover:text-gray-400 transition duration-300 ease-in-out delay-300">Services</Link>
        <Link href="/About" className="mr-8 hover:text-gray-400 transition duration-300 ease-in-out delay-300">About</Link>
        <Link href="/Contact" className="mr-8 hover:text-gray-400 transition duration-300 ease-in-out delay-300">Contact</Link>
        <Link href="/Checkstatus" className="mr-8 hover:text-gray-400 transition duration-300 ease-in-out delay-300">Check Status</Link>
      </div>
      <div className="flex items-center">
      <Link href="/Services" className="btn bg-cusBlue hover:bg-purple-900 px-4 rounded-[10px] text-white text-lg font-medium transition duration-300 ease-in-out delay-300">
        Book a session
      </Link>
      </div>
    </nav>
  )
}


export default navBar