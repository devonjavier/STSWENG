import React from 'react'

const Services = () => {
  return (
    <div className='flex flex-col items-center pb-16' id="Services">
        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-24'>
        <div className='absolute left-0 top-10 text-white text-4xl font-semibold flex flex-row'>
        <div>Hourly-based Services</div>
        </div>
          <div className="absolute left-0 w-[105px] h-[105px] bg-zinc-300 rounded-[10px] overflow-hidden">
            <img className="w-full h-full object-cover" src="service1.png" alt="service 1" />
          </div>
          <div className='flex flex-col justify-end pb-12 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Regular Hourly Rate</div>
            <div className='w-[682px] text-white text-lg font-light italic'>+ ₱2,500 for Mix and Mastering</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
            ₱1,000 per <br />hour
          </div>
        </div>


        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-8'>
          <div className="absolute left-0 w-[105px] h-[105px] bg-zinc-300 rounded-[10px] overflow-hidden">
            <img className="w-full h-full object-cover" src="service2.png" alt="service 1" />
          </div>
          <div className='flex flex-col justify-end pb-12 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>RAW Audio Recording</div>
            <div className='w-[682px] text-white text-lg font-light'>Ideal for customers that have their own engineers and editors</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
            ₱1,500 per <br />hour
          </div>
        </div>


        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-24'>
        <div className='absolute left-0 top-10 text-white text-4xl font-semibold flex flex-row'>
        <div>Session-based Services</div>
        </div>
          <div className="absolute left-0 w-[105px] h-[105px] bg-zinc-300 rounded-[10px] overflow-hidden">
            <img className="w-full h-full object-cover" src="service3.png" alt="service 1" />
          </div>
          <div className='flex flex-col justify-end pb-14 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Original Beat Production</div>
            <div className='w-[682px] text-white text-lg font-light'>Price is set to increase if production of the beat becomes difficult</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-0 text-right'>₱3,000<br /></div>
        </div>

        <div className='relative flex gap-2 justify-around pb-5 border-b-2 w-[1184px] pt-8'>
          <div className="absolute left-0 w-[105px] h-[105px] bg-zinc-300 rounded-[10px] overflow-hidden">
            <img className="w-full h-full object-cover" src="service4.png" alt="service 1" />
          </div>
          <div className='flex flex-col justify-end pb-3 pr-56'>
            <div className='text-white text-[32px] self-start text-2xl font-medium italic'>Online Advanced Mix and Mastering</div>
            <div className='w-[682px] text-white text-lg font-light'>Includes free minor revisions, discounts for 2 or more tracks (discounts <br />
            depends on the track’s difficulty)</div>
            <div className='w-[682px] text-white text-lg font-light italic'>+ ₱200 for major revisions of tracks</div>
          </div>
          <div className='absolute right-0 text-white text-2xl font-semibold pt-2 text-right'>
            ₱2,800
          </div>
        </div>
       
      </div>


  )
}

export default Services