import Link from 'next/link'
import React from 'react'

export const IntroText = () => {
  return (
  <div className=' relative flex flex-col '>
    <div className='text-white text-7xl font-extrabold mb-5'>
      INDIGO STUDIOS PH
    </div>
      <p className='text-white text-xl font-light mb-10 w-8/12'>Hear the difference from the BEST high-end music production 
      and recording studio in Parañaque, PH.  </p>
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
