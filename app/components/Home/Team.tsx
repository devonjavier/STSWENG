import React from 'react'
import Link from 'next/link'

export const Team = () => {
  return (
    <div>
      <div className='text-cusBlue text-5xl font-bold pb-8'>The Team</div>
      <div className='flex'>
        <img 
          className='w-[1178px] h-[372px] bg-zinc-300 rounded-[10px]' src="team.png" alt="Team photo" 
        />
      </div>
      <div className='bg-cusBlue w-[1178px] h-[250px] p-8 rounded-[10px] py-10 my-14'>
        <div className='text-white text-3xl font-semibold'>
          Hear the difference at Indigo Studios PH
        </div>
        <div className='text-white text-xl font-light mt-4'>
          With our world-class in-house producers and engineers, we’ll <br />bring your music to life. Book your session today!
        </div>
        <div>
        <Link href="/Services" className="flex items-center btn absolute right-24 bg-white hover:bg-gray-300 py-2 px-4 rounded-[10px] text-cusBlue text-xl font-medium transition duration-300 ease-in-out delay-300">Book a session</Link>
        </div>
      </div>
    </div>
  )
}
