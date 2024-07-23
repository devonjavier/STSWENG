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

interface ReservationData {
  scheduleid: number;
  date: string;
  starttime: string;
  endtime: string;
  status: string;
}

const useFetchReservations = () => {
  const [pendingData, setPendingData] = useState<ReservationData[]>([]);
  const [appointedData, setAppointedData] = useState<ReservationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingReservations = await findPendingReservations();
        const appointedReservations = await findAppointedReservations();

        setPendingData(pendingReservations.data);
        setAppointedData(appointedReservations.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return { pendingData, appointedData };
};

const groupByDate = (data: ReservationData[]) => {
  const grouped: { [key: string]: ReservationData[] } = {};
  data.forEach(item => {
    const dateStr = new Date(item.date).toDateString();
    if (!grouped[dateStr]) {
      grouped[dateStr] = [];
    }
    grouped[dateStr].push(item);
  });
  return grouped;
};

const PendingCalendar: React.FC<PendingCalendarProps> = ({ setArrFunc, setSelectedDate }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const { pendingData, appointedData } = useFetchReservations();

  useEffect(() => {
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const dateIndex = selectedDates.findIndex(selectedDate => selectedDate.toDateString() === date.toDateString());
    if (dateIndex !== -1) {
      setSelectedDates(selectedDates.filter((_, index) => index !== dateIndex));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const pendingDates = groupByDate(pendingData);
  const reservedDates = groupByDate(appointedData);

  return (
    <div className='app'>
      <div className='calendar-container'>
        <Calendar
          minDate={new Date()}
          onClickDay={handleDateChange}
          tileClassName={({ date, view }) => {
            if (view === 'month') {
              if (pendingDates[date.toDateString()]) {
                return 'highlight-pending';
              }
              if (reservedDates[date.toDateString()]) {
                return 'highlight-reserved';
              }
            }
            return null;
          }}
          tileDisabled={({ date, view }) => {
            if (view === 'month') {
              return !(pendingDates[date.toDateString()] || reservedDates[date.toDateString()]);
            }
            return false;
          }}
        />
        {Object.keys(pendingDates).map(dateStr => (
          <Link key={`pending-${dateStr}`} href={`/details?date=${new Date(dateStr).toISOString()}`} legacyBehavior>
            <a className="date-link" style={{ display: 'none' }}>Pending: {dateStr}</a>
          </Link>
        ))}
        {Object.keys(reservedDates).map(dateStr => (
          <Link key={`reserved-${dateStr}`} href={`/details?date=${new Date(dateStr).toISOString()}`} legacyBehavior>
            <a className="date-link" style={{ display: 'none' }}>Reserved: {dateStr}</a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PendingCalendar;
