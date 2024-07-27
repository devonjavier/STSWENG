'use client'
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { findDates, getCurrentStatus } from '@/app/lib/actions';
import '../../scrollbarStyle.css'; 
import { changeCalendarStatus } from '@/app/lib/actions';
import { TimeSlot } from '@/utils/supabase/interfaces';

const PageContent = () => {
  const searchParams = useSearchParams();
  const dates_selected = searchParams.get('dates') || '';
  const id = searchParams.get('id') || '';

  const parsed_dates = JSON.parse(dates_selected);

  const [timeSlotsData, setTimeSlotsData] = useState<{ [key: string]: TimeSlot[] }>({});
  const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: boolean[] }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);  // Added loading state

  const handleDates = useCallback(async () => {
    setLoading(true);  // Start loading
    try {
      const grouped_time_slots = await findDates(parsed_dates, dates_selected);

      const newTimeSlotsData: { [key: string]: TimeSlot[] } = {};
      const newSelectedSlots: { [key: string]: boolean[] } = {};

      Object.keys(grouped_time_slots).forEach(date => {
        const timeSlots = grouped_time_slots[date].map((slot: any) => ({
          time: `${slot.starttime} - ${slot.endtime}`,
          status: slot.status,
        }));
        newTimeSlotsData[date] = timeSlots;
        newSelectedSlots[date] = new Array(timeSlots.length).fill(false);
      });

      console.log('Grouped Time Slots:', grouped_time_slots);

      const currentStatus: { [key: string]: boolean[] } = await getCurrentStatus(parsed_dates, id);
      for (const date of Object.keys(currentStatus)) {
        newSelectedSlots[date] = currentStatus[date as keyof { [key: string]: boolean[] }];
      }

      setTimeSlotsData((prevTimeSlotsData) => {
        if (JSON.stringify(prevTimeSlotsData) !== JSON.stringify(newTimeSlotsData)) {
          return newTimeSlotsData;
        }
        return prevTimeSlotsData;
      });

      setSelectedSlots((prevSelectedSlots) => {
        if (JSON.stringify(prevSelectedSlots) !== JSON.stringify(newSelectedSlots)) {
          return newSelectedSlots;
        }
        return prevSelectedSlots;
      });

    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);  // End loading
    }
  }, [parsed_dates, dates_selected]);

  useEffect(() => {
    handleDates();
  }, []);

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

  const confirm = useCallback(() => {
    const filteredSelectedSlots = Object.keys(selectedSlots).reduce((acc, date) => {
      acc[date] = selectedSlots[date].filter((_, index) => {
        const slotStatus = timeSlotsData[date][index].status;
        return slotStatus !== 'Pending' && slotStatus !== 'Appointed';
      });
      return acc;
    }, {} as { [key: string]: boolean[] });

    const filteredTimeSlotsData = Object.keys(timeSlotsData).reduce((acc, date) => {
      acc[date] = timeSlotsData[date].filter(slot => {
        return slot.status !== 'Pending' && slot.status !== 'Appointed';
      });
      return acc;
    }, {} as { [key: string]: { time: string, status: string }[] });

    console.log('Filtered Selected Slots:', filteredSelectedSlots);
    console.log('Filtered Time Slots Data:', filteredTimeSlotsData);
    changeCalendarStatus(filteredSelectedSlots, filteredTimeSlotsData);

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }, [selectedSlots, timeSlotsData]);

  const sortedDates = Object.keys(timeSlotsData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="p-4 max-h-[91.8vh] overflow-x-auto">
      <div className="flex items-center mb-1">
        <h2 className="text-4xl font-bold text-black">Edit Calendar</h2>
        <div className="flex ml-6 mt-4 space-x-4">
          <div className="legend-item flex items-center">
            <span className="bg-green-600 inline-block w-4 h-4 mr-2"></span>
            <span className="font-bold text-black">Available</span>
          </div>
          <div className="legend-item flex items-center">
            <span className="bg-rose-700 inline-block w-4 h-4 mr-2"></span>
            <span className="font-bold text-black">Unavailable</span>
          </div>
          <div className="legend-item flex items-center mr-4">
            <span className="bg-gray-400 inline-block w-4 h-4 mr-2"></span>
            <span className="font-bold text-black">Pending/Appointed</span>
          </div>
        </div>
      </div>
      <p className="mb-4">Select Dates &gt; Select Timeslots</p>
      {loading ? (  // Show loading indicator while fetching data
        <div className="flex items-center justify-center h-screen">
          <p className="text-3xl font-bold text-gray-700">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {sortedDates.map((date) => (
            <div key={date} className="p-2 border rounded drop-shadow-xl max-h-[72vh] min-h-[72vh] w-80 overflow-y-auto custom-scrollbar">
              <h3 className="text-xl text-cusBlue text-center font-bold mb-2">{date}</h3>
              {timeSlotsData[date].map((slot, index) => (
                <div
                  key={index}
                  className={`p-2 mb-1 border rounded-3xl pl-5 text-white text-bold 
                    ${slot.status === 'Pending' || slot.status === 'Appointed' ? 'bg-gray-400 cursor-not-allowed' : 
                      selectedSlots[date][index] ? 'bg-rose-700 cursor-pointer' : 'bg-green-600 cursor-pointer'}`}
                  onClick={() => (slot.status !== 'Pending' && slot.status !== 'Appointed') && handleSelectSlot(date, index)}
                >
                  {slot.time}
                </div>
              ))}
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedSlots[date].every(Boolean)}
                    onChange={() => handleSelectAll(date)}
                  />
                  Set all unavailable
                </label>
              </div>
            </div>
          ))}
          {showPopup && (
            <div className="fixed top-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg">
              Timeslots Updated Successfully!
            </div>
          )}
        </div>
      )}
      <button onClick={confirm} className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold">Confirm</button>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PageContent />
  </Suspense>
);

export default Page;
