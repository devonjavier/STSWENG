
'use client'
import Link from 'next/link'
import React, {useEffect, useState} from 'react';
import Calendar from '@/app/components/CustomCalendar'; 
import DropdownWrapper from '@/app/components/Dropdown/DropdownWrapper';
import { fetchSchedule } from '@/utils/supabase/data'
import { schedule } from '@/utils/supabase/interfaces'

const Page = ({searchParams}:{
    searchParams: {
        id: string
    }
}) => {

    const [selectedDates, setselectedDates] = useState<[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSchedule = async () => {
          try {
            const schedules = await fetchSchedule();

            //const sched = JSON.stringify(schedules);
            
            const newSelectedDates = schedules.map((schedule) => ({
                date: schedule.date,
                selectedtime1: schedule.starttime,
                selectedtime2: schedule.endtime
            }));
        
            setselectedDates(newSelectedDates);

            console.log(selectedDates);

            

          } catch (error) {
            console.error('Error fetching services:', error);
          } finally {
            setLoading(false);
          }
        };

        getSchedule();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const time = [];

    const startTime = 9 * 60; // 0900am
    const endTime = 21 * 60 + 30; //0930pm
    
    for (let minutes = startTime; minutes <= endTime; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMins = mins === 0 ? '00' : mins;
      time.push(`${formattedHours}:${formattedMins}${period}`);
    }
    //const datesStrings = JSON.stringify(datesstring);

    function checker(dates: Date){
        console.log(dates);
    }

    const handleClick = () =>{
        selectedDates.forEach(obj => {
            checker(obj.date); // Accessing the 'date' property of each object
        });
    }
    
  return (
    <>
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
    <div>
        <div className='text-cusBlue text-6xl font-bold'>
            Book an Appointment
            <div>
        </div>
        </div>
        <div className="flex flex-col">
            <div>
                Package &gt; <span className='text-cusBlue'>Date & Time </span> &gt; Details &gt; Confirmation &gt; Booking Status
            </div>
            ------
            <div>
                <span className='text-cusBlue'> Dates </span> &gt; Time slots 
            </div>
             
        </div>
    </div>

    <div>
        <div>

        </div>
        <div className='flex flex-row items-center'>

            <div className='flex flex-col mr-32'>


                <Calendar setArrFunc={setselectedDates}/>

                <Link href={
                {
                    pathname:"/Services/Datetime/Details",
                    query:{
                        //dates: datesStrings,
                        //timeslot1: selectedTimeslot1,
                        //timeslot2: selectedTimeslot2,
                        serviceid: searchParams.id
                    }

                }}> <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Proceed </button> </Link>

            </div> 

        </div>
    </div>
    
    </div>
    </>
  )
}

export default Page
function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}

