import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
      <footer className="bg-cusBlue p-6">
        <div className="flex flex-row justify-around text-white text-xl font-medium">
          <div className="flex mb-4 flex-col">
            <Link href="" className="mr-4 hover:text-gray-200 ">FACEBOOK</Link>
            <Link href="" className="mr-4 hover:text-gray-200">TWITTER</Link>
            <Link href="" className="mr-4 hover:text-gray-200">SPOTIFY</Link>
          </div> 
          
          <div className="flex mb-4 flex-col">
            <Link href="" className="mr-4 hover:text-gray-200">ADDRESS</Link>
            <Link href="" className="mr-4 hover:text-gray-200">STREET CITY</Link>
            <Link href="" className="mr-4 hover:text-gray-200">PHILIPPINES</Link>
          </div>
          <div className="flex flex-col">
            <Link href="" className="mr-4 hover:text-gray-200">CONTACT US</Link>
            <Link href="" className="mr-4 hover:text-gray-200">NUMBER</Link>
            <Link href="" className="mr-4 hover:text-gray-200">EMAIL</Link>
          </div>
        </div>
      </footer>
    )
  }

export default Footer