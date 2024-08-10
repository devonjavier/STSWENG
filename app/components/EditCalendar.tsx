import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

interface Schedule {
  date: Date;
  status: string | null;
}

interface CustomCalendarProps {
  setArrFunc: Dispatch<{ date: Date }[]>;
  schedules: Schedule[];
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ setArrFunc, schedules }) => {
  const [selectedDates, setSelectedDates] = useState<{ date: Date }[]>([]);

  const handleDateChange = (date: Date) => {
    const dateIndex = selectedDates.findIndex(selectedDate => selectedDate.date.toDateString() === date.toDateString());
  
    if (dateIndex !== -1) {
      setSelectedDates(selectedDates.filter((_, index) => index !== dateIndex));
    } else {
      setSelectedDates([...selectedDates, { date: date }]);
    }
  };

  useEffect(() => {
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]);

  // Function to disable dates before today
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to accurately compare dates
    return date < today;
  };

  return (
    <div className='app'>
      <div className='calendar-container'>
        <div className='border-4 rounded-3xl p-8 drop-shadow-md'>
        <Calendar
          minDate={new Date()}
          onClickDay={handleDateChange}
          tileDisabled={({ date, view }) => view === 'month' && isPastDate(date)}
          tileClassName={({ date, view }) => {
            const isSelected = selectedDates.some(selectedDate => selectedDate.date.toDateString() === date.toDateString());
            return isSelected && view === 'month' ? 'highlight' : null;
          }}
        />
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;
