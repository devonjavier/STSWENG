
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
            Package &gt; <span className='text-cusBlue'>Date & Time </span> &gt; Details &gt; Confirmation &gt; Booking Status
        </div>
    </div>

    <div>
        <div>

        </div>
        <div className='flex flex-row'>

            <div className='flex flex-col mr-96'>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
                <Link href="/Services/Datetime/Details"> <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Proceed to Details </button> </Link>
            </div>  

            
            <div className="flex flex-col">
                <span className='text-cusBlue font-bold'> Select a time </span>
                <div className='flex flex-row'>
                    <div className='flex flex-col mr-20 '>
                        <span className='font-bold text-black'> Start </span>
                        <Dropdown items={time} />
                    </div>
                    <div className='flex flex-col mr-20 '>
                    <span className='font-bold text-black' > End </span>
                        <Dropdown items={time} />
                    </div>

                    </div>
                </div>
        </div>
    </div>
    
    </div>
    </>
  )
}

export default page