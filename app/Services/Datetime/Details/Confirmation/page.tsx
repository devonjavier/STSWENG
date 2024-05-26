
'use client'
import Link from 'next/link'

import Calendar from '@/app/components/CustomCalendar'; 
import Dropdown from '@/app/components/Dropdown/Dropdown';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const page = () => {
    const time = [1,2,3,4,5];
  return (
    <>
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
        <div>
            <div className='text-cusBlue text-6xl font-bold'>
                Book an Appointment
                <div>
            </div>
            </div>
            <div>
                Package &gt; Date & Time &gt; Details  &gt; <span className='text-cusBlue'>Confirmation</span> &gt; Booking Status
            </div>
        </div>
        <div className="flex flex-row">
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <div className="flex flex-col">
                        <span className='text-cusBlue font-bold mb-5  text-2xl'> Main Customer: </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Name: Name: Autofill </span>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold  text-2xl mr-16 my-6'> Additional Persons Involved: </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Person 1 Name: </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Person 2 Name:  </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Person 3 Name:  </span>

                    </div>

                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold  text-2xl mr-16 my-6'> Parking: </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Parking Need: No.  </span>
                    </div>
                    <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Confirm Details </button>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <span className='text-cusBlue font-bold mb-2 text-2xl'> Reservation Details: </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Package Selection: Recording Studio  </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Date/s: May 26, 2024  </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Time: 10 AM  </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Additional Requests:  </span>
                    <div className="flex flex-col ml-16">
                        <span className='text-cusBlue font-bold mb-5 text-md'> Additional Request 1  </span>
                        <span className='text-cusBlue font-bold mb-5 text-md'> Additional Request 2  </span>
                        <span className='text-cusBlue font-bold mb-5 text-md'> Additional Request 3  </span>
                    </div>

                </div>

            </div>
            <div>

            </div>
        </div>
        
    </div>
    </>
  )
}

export default page