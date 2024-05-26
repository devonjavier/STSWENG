
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
                Package &gt; Date & Time &gt; <span className='text-cusBlue'>Details  </span>&gt; Confirmation &gt; Booking Status
            </div>
        </div>
        <div className="flex flex-row">
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <span className='text-cusBlue font-bold mb-5  text-lg'> Main Customer</span>
                    <input placeholder = "Name (Autofill)" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    

                    <div className='flex flex-col'>
                        <div className="flex flex-row mt-5 mb-3 items-center">
                            <span className='text-cusBlue font-bold  text-lg mr-16'> Additional Persons Involved </span>
                            
                            <button className='rounded-full bg-cusBlue  w-[45px] h-[45px]'> - </button>
                            <span className='mx-6'> 8 </span>
                            <button className='rounded-full bg-cusBlue w-[45px] h-[45px]'> + </button>
                        </div>
                        <input placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                        <input placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                        <input placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />

                    </div>

                    <Link href="/Services/Datetime/Details/Confirmation">  <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Proceed to Confirmation </button> </Link>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold mb-2 text-lg'> Additional Request/s</span>
                        <input placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[250px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    </div>
                    <div>
                        <span className='text-cusBlue font-bold mb-2 text-lg'> Do you need parking? </span>
                        <span> Slider </span>
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