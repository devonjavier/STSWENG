'use client'
import React, { useState } from 'react';
import PendingCalendar from '@/app/components/PendingCalendar';

const Page = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
      <PendingCalendar setArrFunc={setSelectedDates} />

      <div className="legend flex mt-0">
          <div className="legend-item flex items-center mr-4">
            <span className="bg-yellow-400 inline-block w-4 h-4 mr-2"></span>
            <span className="font-bold text-black">Pending</span>
          </div>
          <div className="legend-item flex items-center">
            <span className="bg-green-700 inline-block w-4 h-4 mr-2"></span>
            <span className="font-bold text-black">Reserved</span>
          </div>
        </div>
    </div>
  );
}

export default Page;
