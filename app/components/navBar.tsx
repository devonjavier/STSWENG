import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navBar = () => {
  return (
    <nav className="flex justify-between items-center bg-zinc-300 py-3 px-4">
      <div className="flex items-center h-max text-black text-xl font-medium">
        <Link href="/" className="mr-4 flex items-center"><Image className='mr-4'
          src="/IndigoStudios.png"
          alt="Indigo Studios"
          width={40}
          height={24.66}
        /><div className='hover:text-gray-700'>Home</div></Link>
        <Link href="/" className="mr-4 hover:text-gray-700">Services</Link>
        <Link href="/" className="mr-4 hover:text-gray-700">About</Link>
        <Link href="/contact" className="mr-4 hover:text-gray-700">Contact</Link>
      </div>
      <div className="flex items-center">
        <Link href="/" className="btn bg-cusBlue hover:bg-purple-900 py-0 px-4 rounded text-white p-2 text-xl font-medium border-0">Book a session</Link>
      </div>
    </nav>
  )
}

export default navBar