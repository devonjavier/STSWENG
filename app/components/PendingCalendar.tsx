import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Link from 'next/link';
import './pendingcalendar.css';

// sample data
const pendingDates = [
  new Date(2024, 6, 12), // july 12, 2024
];

const reservedDates = [
  new Date(2024, 5, 23), // june 23, 2024
  new Date(2024, 6, 15), // july 15, 2024
  new Date(2024, 6, 16), // july 16, 2024
];

interface PendingCalendarProps {
  setArrFunc: React.Dispatch<React.SetStateAction<Date[]>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const PendingCalendar: React.FC<PendingCalendarProps> = ({ setArrFunc, setSelectedDate }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const dateIndex = selectedDates.findIndex(selectedDate => selectedDate.toDateString() === date.toDateString());
    
    if (dateIndex !== -1) {
      // remove if alr selected
      setSelectedDates(selectedDates.filter((_, index) => index !== dateIndex));
    } else {
      // add if not selected
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className='app'>
      <div className='calendar-container'>
        <Calendar
          minDate={new Date()}
          onClickDay={handleDateChange}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              if (pendingDates.some(d => d.toDateString() === date.toDateString())) {
                return 'highlight-pending';
              }
              if (reservedDates.some(d => d.toDateString() === date.toDateString())) {
                return 'highlight-reserved';
              }
            }
            return null;
          }}
          tileDisabled={({ date, view }) => {
            if (view === 'month') {
              return !(pendingDates.some(d => d.toDateString() === date.toDateString()) ||
                     reservedDates.some(d => d.toDateString() === date.toDateString()));
            }
            return false;
          }}
        />
        {pendingDates.map(date => (
          <Link key={date.toDateString()} href={`/details?date=${date.toISOString()}`} legacyBehavior>
            <a className="date-link" style={{ display: 'none' }}>Pending: {date.toDateString()}</a>
          </Link>
        ))}
        {reservedDates.map(date => (
          <Link key={date.toDateString()} href={`/details?date=${date.toISOString()}`} legacyBehavior>
            <a className="date-link" style={{ display: 'none' }}>Reserved: {date.toDateString()}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PendingCalendar;
