import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navBar = () => {
  return (
    <nav className="flex justify-between items-center bg-zinc-300 py-3 px-4">
      <div className="flex items-center h-[24.66px] text-black text-2xl font-medium">
        <Link href="/" className="mr-4 flex items-center"><Image className='mr-4'
          src="/IndigoStudios.png"
          alt="Indigo Studios"
          width={50}
          height={24.66}
        /><div className='hover:text-red-50'>Home</div></Link>
        <Link href="/" className="mr-4">Services</Link>
        <Link href="/" className="mr-4">About</Link>
        <Link href="/" className="mr-4">Contact</Link>
      </div>
      <div className="flex items-center">
        <Link href="/" className="bg-cusBlue hover:bg-purple-700 py-2 px-4 rounded text-white text-2xl font-medium">Book a session</Link>
      </div>
    </nav>
  )
}

export default navBar