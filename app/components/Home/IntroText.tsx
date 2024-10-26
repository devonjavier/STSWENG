import Link from 'next/link'
import React from 'react'

export const IntroText = () => {
  return (
    <div className='relative flex flex-col'>
      
      <div className='flex flex-col items-center justify-center text-center text-white text-4xl sm:text-6xl md:text-7xl mb-5 font-araboto font-light relative' style={{ top: '-150px', left:'-70px' }}>
        Experience Sonic Perfection<br />with Parañaque&apos;s Top Music Studio
      </div>

      {/*
      <p className='text-white text-base sm:text-lg md:text-xl font-medium mb-10 w-full sm:w-10/12 md:w-8/12 pr-8 lg:pr-0' >
        Hear the difference from the BEST high-end music production
        and recording studio in Parañaque, PH.
      </p>
      */}

      <div className='flex justify-center space-x-12 relative' style={{ top: '-120px', left:'-70px' }}>
        <div className="flex items-center">
          <Link href="/Services" className="btn bg-white hover:bg-gray-300 py-2 px-4 rounded-[10px] text-[#4B27A8] text-sm sm:text-lg md:text-xl font-araboto font-bold transition duration-300 ease-in-out delay-300">
            Book Now
          </Link>
        </div>

        <div className="flex items-center">
          <Link href="/Services" className="text-[#D3D3D3] text-sm sm:text-lg md:text-xl font-araboto font-light transition duration-300 ease-in-out delay-300">
            Learn More &rarr;
          </Link>
        </div>

      </div>
    </div>
  )
}

