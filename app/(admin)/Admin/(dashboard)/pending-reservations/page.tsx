'use client'
import React, { useState } from 'react';
import PendingCalendar from '@/app/components/PendingCalendar';

const Page = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
      <PendingCalendar setArrFunc={setSelectedDates} />
    </div>
  );
}

export default Page;
