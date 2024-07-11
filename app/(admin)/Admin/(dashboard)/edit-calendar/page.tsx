'use client'
import Link from 'next/link'
import React, { useState } from 'react';
import Calendar from '@/app/components/CustomCalendar';

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
    const [selectedDates, setSelectedDates] = useState<{ date: Date }[]>([]);
    const datesString = JSON.stringify(selectedDates.map(obj => ({
        date: formatDateToLocal(obj.date)
    })));

    function checker(dates: Date) {
        console.log(dates);
    }

    const handleClick = () => {
        selectedDates.forEach(obj => {
            checker(obj.date); // accessing the 'date' property of each object
        });
    }

    // this func fixes the offset of one day for selected dates
    function formatDateToLocal(date: Date) {
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0]; 
    }

    return (
        <>
            <ul>
                {selectedDates.map((obj, index) => (
                    <li key={index}>
                        {obj.date.toDateString()}
                    </li>
                ))}
            </ul>
            <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
                <div>
                    <div className='text-4xl font-bold text-black'>
                        Edit Calendar
                    </div>
                    <div>
                        Select Dates &gt; <span className='text-cusBlue'> Select Timeslots </span>
                    </div>
                </div>
                <div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col mr-32'>
                            <Calendar setArrFunc={setSelectedDates} />

                            <Link href={{
                                pathname: "./edit-calendar/time-slots",
                                query: {
                                    dates: datesString,
                                    serviceid: searchParams.id
                                }
                            }}>
                                <button 
                                    className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"
                                    onClick={handleClick}
                                >
                                    Proceed
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;
