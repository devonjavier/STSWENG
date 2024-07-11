'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { findDates } from '@/app/lib/actions';
import '../../scrollbarStyle.css'; 
import { changeCalendarStatus } from '@/app/lib/actions';

const Page = () => {
  const searchParams = useSearchParams();
  const dates_selected = searchParams.get('dates') || '';
  const id = searchParams.get('id') || '';

  const parsed_dates = JSON.parse(dates_selected);

  const [timeSlotsData, setTimeSlotsData] = useState<{ [key: string]: string[] }>({});
  const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: boolean[] }>({});

  const handleDates = useCallback(async () => {
    try {
      const grouped_time_slots = await findDates(parsed_dates, dates_selected);

      const newTimeSlotsData: { [key: string]: string[] } = {};
      const newSelectedSlots: { [key: string]: boolean[] } = {};

      Object.keys(grouped_time_slots).forEach(date => {
        const timeSlots = grouped_time_slots[date].map(slot => `${slot.starttime} - ${slot.endtime}`);
        newTimeSlotsData[date] = timeSlots;
        newSelectedSlots[date] = new Array(timeSlots.length).fill(false);
      });

      console.log('Grouped Time Slots:', grouped_time_slots)

      setTimeSlotsData((prevTimeSlotsData) => {
        // Only update state if data has changed
        if (JSON.stringify(prevTimeSlotsData) !== JSON.stringify(newTimeSlotsData)) {
          return newTimeSlotsData;
        }
        return prevTimeSlotsData;
      });

      setSelectedSlots((prevSelectedSlots) => {
        // Only update state if data has changed
        if (JSON.stringify(prevSelectedSlots) !== JSON.stringify(newSelectedSlots)) {
          return newSelectedSlots;
        }
        return prevSelectedSlots;
      });

    } catch (error) {
      console.error('Error fetching services:', error);
    }
  },  [parsed_dates, dates_selected]);
  // added dependency array dates_selected

  useEffect(() => {
    handleDates();
  }, []);
  // empty dependency

  const handleSelectAll = (date: string) => {
    const allSelected = selectedSlots[date].every(Boolean);
    setSelectedSlots((prev) => ({
      ...prev,
      [date]: new Array(prev[date].length).fill(!allSelected),
    }));
  };

  const handleSelectSlot = (date: string, index: number) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [date]: prev[date].map((selected, i) => (i === index ? !selected : selected)),
    }));
  };

  // sorts the dates
  const sortedDates = Object.keys(timeSlotsData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const confirm = useCallback(() => {
    changeCalendarStatus(selectedSlots, timeSlotsData);
  }, []);
  return (
    <div className="p-4 max-h-[91.8vh] overflow-x-auto">
      <h2 className="text-4xl font-bold text-black">Edit Calendar</h2>
      <p className="mb-4">Select Dates &gt; Select Timeslots</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {sortedDates.map((date) => (
          <div key={date} className="p-2 border rounded shadow max-h-[72vh] min-h-[72vh] w-80 overflow-y-auto custom-scrollbar">
            <h3 className="text-xl text-cusBlue text-center font-bold mb-2">{date}</h3>
            {timeSlotsData[date].map((slot, index) => (
              <div
                key={index}
                className={`cursor-pointer p-2 mb-1 border rounded-3xl pl-5 text-white text-bold ${selectedSlots[date][index] ? 'bg-rose-700' : 'bg-green-600'}`}
                onClick={() => handleSelectSlot(date, index)}>
                {slot}
              </div>
            ))}
            <div className="mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedSlots[date].every(Boolean)}
                  onChange={() => handleSelectAll(date)} />
                Set all unavailable
              </label>
            </div>  
          </div>
        ))}
      </div>
      <button onClick={confirm} className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold">Confirm</button>
    </div>
  );
};

export default Page;



// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { findDates } from '@/app/lib/actions';
// import '../../scrollbarStyle.css'; 
// import { time } from 'console';

// const generateTimeSlots = (startTime: number, endTime: number): string[] => {
//   const timeSlots: string[] = [];
//   for (let minutes = startTime; minutes < endTime; minutes += 30) {
//     const startHours = Math.floor(minutes / 60);
//     const startMins = minutes % 60;
//     const endHours = Math.floor((minutes + 30) / 60);
//     const endMins = (minutes + 30) % 60;

//     const formattedStartHours = startHours.toString().padStart(2, '0');
//     const formattedStartMins = startMins.toString().padStart(2, '0');
//     const formattedEndHours = endHours.toString().padStart(2, '0');
//     const formattedEndMins = endMins.toString().padStart(2, '0');

//     timeSlots.push(`${formattedStartHours}:${formattedStartMins} - ${formattedEndHours}:${formattedEndMins}`);
//   }
//   return timeSlots;
// };

// // static data
// const timeSlotsData = {
//   'May 13': generateTimeSlots(9 * 60, 21 * 60 + 30), // 09:00 am to 09:30 pm
//   'May 14': generateTimeSlots(9 * 60, 21 * 60 + 30),
//   'May 15': generateTimeSlots(9 * 60, 21 * 60 + 30),
//   'May 16': generateTimeSlots(9 * 60, 21 * 60 + 30),
//   'May 17': generateTimeSlots(9 * 60, 21 * 60 + 30),
// };

// type DateKeys = keyof typeof timeSlotsData;
// type SelectedSlots = {
//   [key in DateKeys]: boolean[];
// };

// const Page = () => {
//   const searchParams = useSearchParams();
//   const dates_selected = searchParams.get('dates') || '';
//   const id = searchParams.get('id') || '';

//   const parsed_dates = JSON.parse(dates_selected);

//   const [timeSlotsData, setTimeSlotsData] = useState<{ [key: string]: string[] }>({});
//   const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: boolean[] }>({});

//   useEffect(() => {
//     const handleDates = async () => {
//       try {
//         const grouped_time_slots = await findDates(parsed_dates);
        
//         const newTimeSlotsData: { [key: string]: string[] } = {};
//         const newSelectedSlots: { [key: string]: boolean[] } = {};

//         Object.keys(grouped_time_slots).forEach(date => {
//           const timeSlots = grouped_time_slots[date].map(slot => `${slot.starttime} - ${slot.endtime}`);
//           newTimeSlotsData[date] = timeSlots;
//           newSelectedSlots[date] = new Array(timeSlots.length).fill(false);
//         });

//         setTimeSlotsData(newTimeSlotsData);
//         setSelectedSlots(newSelectedSlots);


//       } catch(error) {
//         console.error('Error fetching services:', error);
//       }
//     }

//     handleDates();
//   })


//   const handleSelectAll = (date: DateKeys) => {
//     const allSelected = selectedSlots[date].every(Boolean);
//     setSelectedSlots((prev) => ({
//       ...prev,
//       [date]: new Array(prev[date].length).fill(!allSelected),
//     }));
//   };

//   const handleSelectSlot = (date: DateKeys, index: number) => {
//     setSelectedSlots((prev) => ({
//       ...prev,
//       [date]: prev[date].map((selected, i) => (i === index ? !selected : selected)),
//     }));
//   };

//   return (

//     <div className="p-4 max-h-[91.8vh] overflow-x-auto">
        
      
//       <h2 className="text-4xl font-bold text-black">Edit Calendar</h2>
//       <p className="mb-4">Select Dates &gt; Select Timeslots</p>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         {Object.keys(timeSlotsData).map((date) => (
//           <div key={date} className="p-2 border rounded shadow max-h-[72vh] min-h-[72vh] w-80 overflow-y-auto custom-scrollbar">
//             <h3 className="text-xl text-cusBlue text-center font-bold mb-2">{date}</h3>
//             {timeSlotsData[date as DateKeys].map((slot, index) => (
//               <div
//                 key={index}
//                 className={`cursor-pointer p-2 mb-1 border rounded-3xl pl-5 text-white text-bold ${selectedSlots[date as DateKeys][index] ? 'bg-rose-700' : 'bg-green-600'}`}
//                 onClick={() => handleSelectSlot(date as DateKeys, index)}>
//                 {slot}
//               </div>
//             ))}
//             <div className="mt-2">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selectedSlots[date as DateKeys].every(Boolean)}
//                   onChange={() => handleSelectAll(date as DateKeys)} />
//                 Set all unavailable
//               </label>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold">Confirm</button>
//     </div>
//   );
// };

// export default Page;
