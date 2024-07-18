//page.tsx
'use client'
import React, { useCallback, useState } from 'react';
import PendingCalendar from '@/app/components/PendingCalendar';
import { useEffect } from 'react';
import { fetchCalendarData } from '@/utils/supabase/data';
import { pending_appointment } from '@/utils/supabase/interfaces'
import { acceptAppointment, rejectAppointment } from '@/app/lib/actions'

const Page = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointmentData, setAppointmentData] = useState<pending_appointment | null>(null);
  const [appointment, setAppointment] = useState<pending_appointment | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCalendarData(selectedDate);
        console.log("HEY YOU!", data)
        setAppointmentData(data);
        if (data && data.length > 0) {
          setAppointment(data[0]);
        }
      } catch (error) { 
        console.error(error);
      }
    }
    getData();
  }, [selectedDate])

  useEffect(() => {
    console.log("BYE BYE!", appointment);
  }, [appointment]);


  const handleAccept = useCallback(() => {
    acceptAppointment(appointment as pending_appointment);
  }, [appointment]);

  const handleReject =useCallback(() => {
    rejectAppointment(appointment as pending_appointment)
  }, [appointment]);

  return (
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
      <div className="flex">
        <PendingCalendar setArrFunc={setSelectedDates} setSelectedDate={setSelectedDate} />

        
        {selectedDate && (
          <div className="reservation-details ml-8 mt-6 p-4 border border-gray-300 rounded-lg w-2/3 h-shadow-lg bg-white text-black flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-left">Details</h2>
              
              <div className="flex justify-between mb-4">
                <div className="details p-2 border border-cusBlue rounded w-1/2 mr-2">
                  <p className="font-bold">Main customer:</p>
                  <div className="pl-4">
                    <p>{appointment?.name}</p>
                    <p>{appointment?.emailaddress}</p>
                    <p>{appointment?.contactnumber}</p>
                  </div>
              </div>
                
                <div className="details p-2 border border-cusBlue rounded w-1/2 ml-2">
                  <p className="font-bold">Additional persons involved:</p>
                  <div className="pl-4">
                    <p>Person 1: Name</p>
                    <p>Person 2: Name</p>
                    <p>Person 3: Name</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mb-4">
                <div className="details p-2 border border-cusBlue rounded w-1/2 mr-2">
                  <p className="font-bold">Parking</p>
                  <div className="pl-4">
                    <p>Parking Needed: {appointment?.isparkingspotneeded ? "Yes" : "No"}</p>
                  </div>
                </div>
                
                <div className="details p-2 border border-cusBlue rounded w-1/2 ml-2">
                  <p className="font-bold">Reservation Details:</p>
                  <div className="pl-4">
                    <p>Package Selected: {appointment?.title}</p>
                    <p>Date/s: {formatDate(selectedDate)}</p>
                    <p>Start Time: {appointment?.starttime}</p>
                    <p>End Time: {appointment?.endtime}</p>
                    <p>Additional request/s:</p>
                    {/* fill in data according to populating */}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <button className="bg-green-600 font-bold text-white px-4 py-2 rounded-3xl w-40" onClick = {handleAccept}>Accept</button>
              <button className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl mr-2 w-40" onClick = {handleReject}>Reject</button>
            </div>
          </div>
        )}
      </div>

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
