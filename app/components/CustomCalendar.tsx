import React from 'react'

import { useState } from 'react';
import Calendar from 'react-calendar'
import './calendar.css';

const CustomCalendar: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
  <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
    <h1 className="text-2xl mb-4">My Custom Calendar</h1>
    <div className="calendar-container mb-4">
        <Calendar onChange={(value) => setDate(value as Date)} value={date} />
    </div>
  </div>
  )
}

export default CustomCalendar
