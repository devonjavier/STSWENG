import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';

const CustomCalendar: React.FC = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateChange = (date: Date) => {
    const dateIndex = selectedDates.findIndex(selectedDate => selectedDate.toDateString() === date.toDateString());
    
    if (dateIndex !== -1) {
      // remove date if already selected
      setSelectedDates(selectedDates.filter((_, index) => index !== dateIndex));
    } else {
      // add date if not selected
      setSelectedDates([...selectedDates, date]);
    }
  };

    
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
      {selectedDates.length > 0 ? (
        <p className='text-center'>
          <span className='bold'>Selected Dates:</span>{' '}
          {selectedDates.map(date => date.toDateString()).join(', ')}
        </p>
      ) : (
        <p className='text-center'>
          <span className='bold'>No dates selected.</span>
        </p>
      )}
    </div>
  );
}

export default CustomCalendar;
