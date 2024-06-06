'use client'
import Link from 'next/link'
import React, {useState} from 'react';
import Calendar from '@/app/components/CustomCalendar'; 
import Dropdown from '@/app/components/Dropdown/Dropdown';

const Page = () => {
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedTimeslot1, setSelectedTimeslot1] = useState<string>();
    const [selectedTimeslot2, setSelectedTimeslot2] = useState<string>();

    const time = [];
    const startTime = 9 * 60; // 0900am
    const endTime = 21 * 60 + 30; // 0930pm
    
    for (let minutes = startTime; minutes <= endTime; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMins = mins === 0 ? '00' : mins;
      time.push(`${formattedHours}:${formattedMins}${period}`);
    }

    const datesString = JSON.stringify(selectedDates);

    return (
      <>
        <div className='px-4 md:px-8 lg:px-32 flex flex-col gap-8 mb-6 mt-20'>
          <div>
            <div className='text-cusBlue text-4xl md:text-6xl font-bold'>
              Book an Appointment
            </div>
            <div className='mt-2 md:mt-4'>
              Package &gt; <span className='text-cusBlue'>Date & Time</span> &gt; Details &gt; Confirmation &gt; Booking Status
            </div>
          </div>

          <div className='flex flex-col lg:flex-row'>
            <div className='flex flex-col lg:mr-32 mb-8 lg:mb-0'>
              <Calendar setArrFunc={setSelectedDates} />

              <Link
                href={{
                  pathname: "/Services/Datetime/Details",
                  query: {
                    dates: datesString,
                    timeslot1: selectedTimeslot1,
                    timeslot2: selectedTimeslot2,
                  },
                }}
              >
                <button className="bg-cusBlue rounded-3xl w-full md:w-56 h-11 mt-8 text-white font-bold">Proceed to Details</button>
              </Link>
            </div>

            <div className="flex flex-col">
              <span className="text-cusBlue text-3xl font-bold mb-4">Select a time</span>
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex flex-col md:mr-20'>
                  <span className='font-bold text-black'>Start</span>
                  <Dropdown items={time} setTime={setSelectedTimeslot1} />
                </div>
                <div className='flex flex-col md:mr-20'>
                  <span className='font-bold text-black'>End</span>
                  <Dropdown items={time} setTime={setSelectedTimeslot2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Page;
