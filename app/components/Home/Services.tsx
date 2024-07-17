import React from 'react'

const Services = () => {
  return (
    <div className='flex flex-col items-center pb-16' id="Services">
        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-24'>
        <div className='absolute left-0 top-10 text-white text-4xl font-semibold flex flex-row'>
        <div>Services</div>
        </div>
          <div className='absolute left-0'>
            <img className = 'w-[105px] h-[105px] bg-zinc-300 rounded-[10px]'src="" alt="asa" />
          </div>
          <div className='flex flex-col justify-end pb-12 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Recording</div>
            <div className='w-[682px] text-white text-lg font-light'>Ideal for customers that have their own engineers and editors</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
            ₱1,500 per <br />hour
          </div>
        </div>


        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-8'>
          <div className='absolute left-0'>
            <img className = 'w-[105px] h-[105px] bg-zinc-300 rounded-[10px]'src="" alt="asa" />
          </div>
          <div className='flex flex-col justify-end pb-12 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Live performance recording</div>
            <div className='w-[682px] text-white text-lg font-light'>Includes video recording</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
            ₱5,000 per <br />session
          </div>
        </div>


        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-24'>
        <div className='absolute left-0 top-10 text-white text-4xl font-semibold flex flex-row'>
        <div>Packages</div>
        </div>
          <div className='absolute left-0'>
            <img className = 'w-[105px] h-[105px] bg-zinc-300 rounded-[10px]'src="" alt="asa" />
          </div>
          <div className='flex flex-col justify-end pb-3 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>3 hour in-person session</div>
            <div className='w-[682px] text-white text-lg font-light'>Includes basic mix and mastering</div>
            <div className='w-[682px] text-white text-lg font-light italic'>+ ₱500 for multitrack stems <br />
            + ₱800 for video shooting and/or editing <br />
            + ₱600 for every additional hour</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
          from ₱3,500 per <br />3 hr session
          </div>


        </div>
        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-8'>
          <div className='absolute left-0'>
            <img className = 'w-[105px] h-[105px] bg-zinc-300 rounded-[10px]'src="" alt="asa" />
          </div>
          <div className='flex flex-col justify-end pb-3 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Online advanced mix and mastering</div>
            <div className='w-[682px] text-white text-lg font-light'>Includes free minor revisions, discounts for 2 or more tracks (around <br />
            20% depending on the track’s difficulty)</div>
            <div className='w-[682px] text-white text-lg font-light italic'>+ ₱200 for major revisions of tracks</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
            from ₱2,800
          </div>
        </div>
             
        <div className='relative flex gap-2 justify-around pb-8 border-b-2 w-[1184px] pt-8'>
          <div className='absolute left-0'>
            <img className = 'w-[105px] h-[105px] bg-zinc-300 rounded-[10px]'src="" alt="asa" />
          </div>
          <div className='flex flex-col justify-end pb-3 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Original beat production/arrangement</div>
            <div className='w-[682px] text-white text-lg font-light'>May increase by ₱2,000 - ₱3,000 depending on difficulty</div>
            <div className='w-[682px] text-white text-lg font-light italic'>*requires the company’s collaboration agreement contract</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
          from ₱12,000<br />per session
          </div>
        </div>


        <div className='relative flex gap-2 justify-around pb-8 border-b-2 w-[1184px] pt-8'>
          <div className='absolute left-0'>
            <img className = 'w-[105px] h-[105px] bg-zinc-300 rounded-[10px]'src="" alt="asa" />
          </div>
          <div className='flex flex-col justify-end pb-3 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Full song production</div>
            <div className='w-[682px] text-white text-lg font-light'>Includes beat, lyric writing, and recording</div>
            <div className='w-[682px] text-white text-lg font-light italic'>*requires the company’s collaboration agreement contract</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
          from ₱20,000
          </div>
        </div>
       
      </div>


  )
}

export default Services