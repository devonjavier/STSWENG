import React, { useState, useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

interface CustomCalendarProps {
  setArrFunc: Dispatch<Date[]>; // Define the correct type for setArrFunc
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ setArrFunc }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateChange = (date: Date) => {
    const dateIndex = selectedDates.findIndex(selectedDate => selectedDate.toDateString() === date.toDateString());
    
    if (dateIndex !== -1) {
      // Remove date if already selected
      setSelectedDates(selectedDates.filter((_, index) => index !== dateIndex));
    } else {
      // Add date if not selected
      setSelectedDates([...selectedDates, date]);
    }
  };

  useEffect(() => {
    // Call setArrFunc with selectedDates whenever it changes
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]); // Include setArrFunc in the dependency array

  return (
    <div className='app'>
      <span className="text-cusBlue text-3xl font-bold">Select Date</span>
      <div className='calendar-container'>
        <Calendar
          minDate={new Date()}
          onClickDay={handleDateChange}
          tileClassName={({ date, view }) => {
            const isSelected = selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString());
            return isSelected && view === 'month' ? 'highlight' : null;
          }}
        />
      </div>
      
    </div>
  );
}

export default CustomCalendar;
