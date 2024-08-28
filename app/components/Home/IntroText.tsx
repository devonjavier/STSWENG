import Link from 'next/link'
import React from 'react'

export const IntroText = () => {
  return (
    <div className='relative flex flex-col'>
      
      <div className='text-white text-4xl sm:text-6xl md:text-7xl font-extrabold mb-5'>
        INDIGO STUDIOS PH
      </div>

      <p className='text-white text-base sm:text-lg md:text-xl font-medium mb-10 w-full sm:w-10/12 md:w-8/12 pr-8 lg:pr-0' >
        Hear the difference from the BEST high-end music production
        and recording studio in Parañaque, PH.
      </p>
      <div className='flex gap-4'>
        <div className="flex items-center">
          <Link href="/Services" className="btn bg-cusBlue hover:bg-purple-900 py-2 px-4 rounded-[10px] text-white text-sm sm:text-lg md:text-xl font-medium transition duration-300 ease-in-out delay-300">
            Book a session
          </Link>
        </div>
      </div>
    </div>
  )
}

