import Link from 'next/link'
import React from 'react'

export const IntroText = () => {
  return (
    <div className=' relative flex flex-col'>
    <div className='text-cusBlue text-6xl font-extrabold mb-5'>
      INDIGO STUDIOS PH
    </div>
      <p className='text-cusBlue text-xl font-light mb-10 w-8/12'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis 
      est, porttitor vitae dignissim sed, viverra eu ex. Vestibulum  tellus quam, </p>
      <div className='flex gap-4'>
    <div className="flex items-center">
      <Link href="/Services" className="btn bg-cusBlue hover:bg-purple-900 py-2 px-4 rounded text-white text-xl font-medium">Book a session</Link>
    </div>
    <div className="flex items-center">
      <Link href="#Services" className="btn bg-white hover:bg-gray-300 py-2 px-4 rounded text-black text-xl font-medium box-border border border-cusBlue">View Services</Link>
    </div>
  </div>
    </div>
  )
}
