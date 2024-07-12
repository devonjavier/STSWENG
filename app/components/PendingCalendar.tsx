// PendingCalendar.tsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Link from 'next/link';
import './pendingcalendar.css';
import { findPendingReservations, findAppointedReservations } from '../lib/actions';

interface PendingCalendarProps {
  setArrFunc: React.Dispatch<React.SetStateAction<Date[]>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const PendingCalendar: React.FC<PendingCalendarProps> = ({ setArrFunc, setSelectedDate }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [pendingData, setPendingData] = useState<{ scheduleid: number, date: string, starttime: string, endtime: string, status: string }[]>([]);
  const [appointedData, setAppointedData] = useState<{ scheduleid: number, date: string, starttime: string, endtime: string, status: string }[]>([]);

  useEffect(() => {
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingReservations = await findPendingReservations();
        const appointedReservations = await findAppointedReservations();

        setPendingData(pendingReservations.data);
        setAppointedData(appointedReservations.data);

        console.log('Pending Reservations:', pendingReservations.data);
        console.log('Appointed Reservations:', appointedReservations.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const dateIndex = selectedDates.findIndex(selectedDate => selectedDate.toDateString() === date.toDateString());
    
    if (dateIndex !== -1) {
      setSelectedDates(selectedDates.filter((_, index) => index !== dateIndex));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const convertToDateObjects = (data: { scheduleid: number, date: string, starttime: string, endtime: string, status: string }[]) => {
    return data.map(item => new Date(item.date));
  };

  const pendingDates = convertToDateObjects(pendingData);
  const reservedDates = convertToDateObjects(appointedData);

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
