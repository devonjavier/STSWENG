'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { findDates, getCurrentStatus } from '@/app/lib/actions';
import '../../scrollbarStyle.css'; 
import { changeCalendarStatus } from '@/app/lib/actions';

const Page = () => {
  const searchParams = useSearchParams();
  const dates_selected = searchParams.get('dates') || '';
  const id = searchParams.get('id') || '';

  const parsed_dates = JSON.parse(dates_selected);

  const [timeSlotsData, setTimeSlotsData] = useState<{ [key: string]: { time: string, status: string }[] }>({});
  const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: boolean[] }>({});

  const handleDates = useCallback(async () => {
    try {
      const grouped_time_slots = await findDates(parsed_dates, dates_selected);

      const newTimeSlotsData: { [key: string]: { time: string, status: string }[] } = {};
      const newSelectedSlots: { [key: string]: boolean[] } = {};

      Object.keys(grouped_time_slots).forEach(date => {
        const timeSlots = grouped_time_slots[date].map(slot => ({
          time: `${slot.starttime} - ${slot.endtime}`,
          status: slot.status,
        }));
        newTimeSlotsData[date] = timeSlots;
        newSelectedSlots[date] = new Array(timeSlots.length).fill(false);
      });

      console.log('Grouped Time Slots:', grouped_time_slots);

      const currentStatus = await getCurrentStatus(parsed_dates, id);
      for (const date of Object.keys(currentStatus)) {
        newSelectedSlots[date] = currentStatus[date];
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
  }, [selectedSlots, timeSlotsData]);

  const sortedDates = Object.keys(timeSlotsData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

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
                className={`cursor-pointer p-2 mb-1 border rounded-3xl pl-5 text-white text-bold ${selectedSlots[date][index] ? 'bg-rose-700' : 'bg-green-600'} 
                ${slot.status === 'Pending' || slot.status === 'Appointed' ? 'bg-gray-400 cursor-not-allowed' : ''}`}
                onClick={() => (slot.status !== 'pending' && slot.status !== 'appointed') && handleSelectSlot(date, index)}
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
      </div>
      <button onClick={confirm} className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold">Confirm</button>
    </div>
  );
};

export default Page;