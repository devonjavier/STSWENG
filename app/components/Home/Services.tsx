import React from 'react'

const Services = () => {
  return (
    <div className='flex flex-col items-center pb-9' id="Services">
        <div className='relative flex flex-col gap-2 items-center lg:items-start lg:justify-around pb-5 border-b-2 w-[300px] lg:w-[1184px] pt-24'>
          
          <div className='absolute left-0 top-10 text-white text-2xl lg:text-4xl font-semibold '>
            <div>Hourly-based Services</div>
          </div>

              <div className="lg:absolute left-0 w-[74px] h-[75px] lg:w-[105px] lg:h-[105px] bg-zinc-300 rounded-[10px] overflow-hidden">
                <img className="w-full h-full object-cover" src="service1.png" alt="service 1" />
              </div>

              <div className='flex flex-col text-center lg:text-justify lg:justify-end lg:pb-12 lg:pr-56 lg:ml-32'>
                <div className='text-white text-[20px] lg:text-[32px] font-medium italic'>
                  Regular Hourly Rate
                </div>
                <div className='text-white text-lg font-light italic'>
                  + ₱2,500 for Mix and Mastering
                </div>
              </div>

  
              <div className='lg:absolute right-0 text-white text-md lg:text-2xl font-semibold pt-2 text-right'>
                ₱1,000 per hour
              </div>

            
        </div>

        <div className='relative flex flex-col gap-2 items-center lg:items-start lg:justify-around pb-5 border-b-2 w-[300px] lg:w-[1184px] pt-8'>

              <div className="lg:absolute left-0 w-[74px] h-[75px] lg:w-[105px] lg:h-[105px] bg-zinc-300 rounded-[10px] overflow-hidden">
                <img className="w-full h-full object-cover" src="service2.png" alt="service 1" />
              </div>

              <div className='flex flex-col lg:justify-end lg:pb-12 lg:pr-56 lg:ml-32'>
                <div className='text-white text-[20px] lg:text-[32px] font-medium italic'>
                  RAW Audio Recording
                </div>
                <div className='text-white text-lg font-light italic'>
                  Ideal for customers that have their own engineers and editors
                </div>
              </div>

  
              <div className='lg:absolute right-0 text-white text-md lg:text-2xl font-semibold pt-2 text-right'>
                ₱1,500 per hour
              </div>
        </div>

        <div className='relative flex flex-col gap-2 items-center lg:items-start lg:justify-around pb-5 border-b-2 w-[300px] lg:w-[1184px] pt-24'>
          
          <div className='absolute left-0 top-10 text-white text-2xl lg:text-4xl font-semibold '>
            <div>Session-based Services</div>
          </div>

              <div className="lg:absolute left-0 w-[74px] h-[75px] lg:w-[105px] lg:h-[105px] marker:bg-zinc-300 rounded-[10px] overflow-hidden">
                <img className="w-full h-full object-cover" src="service3.png" alt="service 1" />
              </div>

              <div className='flex flex-col lg:justify-end lg:pb-12 lg:pr-56 lg:ml-32'>
                <div className='text-white text-[20px] lg:text-[32px] font-medium italic'>
                  Original Beat Production
                </div>
                <div className='text-white text-lg font-light italic'>
                Price is set to increase if production of the beat becomes difficult
                </div>
              </div>

  
              <div className='lg:absolute right-0 text-white text-md lg:text-2xl font-semibold pt-2 text-right'>
                ₱3000
              </div>
        </div>

        <div className='relative flex flex-col gap-2 items-center lg:items-start lg:justify-around pb-5 border-b-2 w-[300px] lg:w-[1184px] pt-8'>

              <div className="lg:absolute left-0 w-[74px] h-[75px] lg:w-[105px] lg:h-[105px] marker:bg-zinc-300 rounded-[10px] overflow-hidden">
                <img className="w-full h-full object-cover" src="service4.png" alt="service 1" />
              </div>

              <div className='flex flex-col lg:justify-end lg:pb-12 lg:pr-56 lg:ml-32'>
                <div className='text-white text-[20px] lg:text-[32px] font-medium italic'>
                Online Advanced Mix and Mastering
                </div>
                <div className='text-white text-lg font-light italic'>
                Includes free minor revisions, discounts for 2 or more tracks (discounts
                depends on the track’s difficulty)
                </div>
                <div className='text-white text-lg font-light italic'>
                + ₱200 for major revisions of tracks
                </div>
              </div>
              <div className='lg:absolute right-0 text-white text-md lg:text-2xl font-semibold pt-2 text-right'>
                ₱2800
              </div>
        </div>
       
      </div>


  )
}

export default Services