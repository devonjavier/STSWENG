import React from 'react'
import Link from 'next/link'

export const Team = () => {
  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-10'>
      <div className='text-cusBlue text-3xl sm:text-4xl md:text-5xl font-black pb-6 sm:pb-8 font-araboto'>
        The Team
      </div>
      <div className='flex justify-center'>
        <img 
          className='w-full max-w-[320px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1178px] h-auto bg-zinc-300 rounded-[10px]' 
          src="team.png" alt="Team photo" 
        />
      </div>
      <div className='bg-cusBlue w-full max-w-[320px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1178px] h-auto p-6 sm:p-8 md:p-10 rounded-[10px] py-8 sm:py-10 my-8 sm:my-10'>
        <div className='text-white text-2xl sm:text-3xl font-araboto font-semibold relative' style={{ bottom: '-30px' }}>
          Hear the difference at Indigo Studios PH
        </div>
        <div className='text-white text-lg sm:text-xl font-light mt-4 font-araboto relative' style={{ bottom: '-30px' }}>
          With our world-class in-house producers and engineers, we’ll <br className='hidden md:block' />bring your music to life. Book your session today!
        </div>
        <div className='mt-6 flex justify-end'>
          <Link href="/Services" className="btn bg-white hover:bg-gray-300 py-2 px-4 rounded-[10px] text-cusBlue text-lg sm:text-xl font-araboto font-medium transition duration-300 ease-in-out delay-300 relative" style={{ top: '-70px', right:'20px' }}>
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
