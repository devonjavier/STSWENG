'use client'
import React, { useCallback, useState } from 'react';
import PendingCalendar from '@/app/components/PendingCalendar';
import { useEffect } from 'react';
import { fetchCalendarData } from '@/utils/supabase/data';
import { pending_appointment } from '@/utils/supabase/interfaces'
import { acceptAppointment, rejectAppointment } from '@/app/lib/actions'
import '../scrollbarStyle.css';

const Page = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<pending_appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<pending_appointment | null>(null);
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (selectedDate) {
          const data = await fetchCalendarData(selectedDate);
          setAppointments(data);
          setSelectedAppointment(null);
        }
      } catch (error) { 
        console.error(error);
      }
    }
    getData();
  }, [selectedDate])

  useEffect(() => {
    console.log("Selected appointment changed:", selectedAppointment);
  }, [selectedAppointment]);

  const handleAccept = useCallback(() => {
    if (selectedAppointment) {
      acceptAppointment(selectedAppointment);     // changes Schedule table status
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1500); 
    }
  }, [selectedAppointment]);

  const handleReject = useCallback(() => {
    if (selectedAppointment) {
      rejectAppointment(selectedAppointment);     // changes Schedule table status
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1500); 
    }
  }, [selectedAppointment]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProofOfPayment(event.target.files[0]);
    }
  };

  const getCombinedAppointments = () => {
    const combined = appointments.reduce((acc, curr) => {
      const { appointmentid, starttime, endtime } = curr;
  
      if (!acc[appointmentid]) {
        acc[appointmentid] = { ...curr };
      } else {
        acc[appointmentid].starttime = acc[appointmentid].starttime < starttime ? acc[appointmentid].starttime : starttime;
        acc[appointmentid].endtime = acc[appointmentid].endtime > endtime ? acc[appointmentid].endtime : endtime;
      }
  
      return acc;
    }, {} as { [key: string]: pending_appointment });
  

    //sorts it
    const sortedAppointments = Object.values(combined).sort((a, b) => {

      const startTimeA = new Date(`2000-01-01T${a.starttime}`);
      const startTimeB = new Date(`2000-01-01T${b.starttime}`);
  
      return startTimeA.getTime() - startTimeB.getTime();
    });
  
    return sortedAppointments;
  };
  

  const combinedAppointments = getCombinedAppointments();

  return (
    <div className='px-32 flex flex-col gap-8 pt-20 pb-32 max-h-[91.8vh] overflow-y-auto custom-scrollbar'>
      <div className="flex">
        <PendingCalendar setArrFunc={setSelectedDates} setSelectedDate={setSelectedDate} />
        
        {selectedDate && (
          <div className="ml-8 mt-6 p-4 border border-gray-300 rounded-lg w-2/3 h-shadow-lg bg-white text-black flex flex-col overflow-h-auto">
            <h2 className="text-xl font-bold mb-4 text-left">Appointments on {formatDate(selectedDate)}</h2>
            <div className="flex flex-col gap-2">
              {combinedAppointments.map((appointment) => (
                <button
                  key={appointment.appointmentid}
                  className={`p-2 border border-gray-300 rounded-lg ${
                    selectedAppointment?.appointmentid === appointment.appointmentid ? 'bg-blue-100' : 'bg-white'
                  }`}
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  {appointment.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedAppointment && (
        <div className="reservation-details mt-6 p-4 border border-gray-300 rounded-lg w-full h-shadow-lg bg-white text-black flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-left">Details for Customer {selectedAppointment.name}</h2>

            <div className="flex justify-between mb-4">
              <div className="details p-2 border border-cusBlue rounded w-1/2 mr-2">
                <p className="font-bold">Main customer:</p>
                <div className="pl-4">
                  <p>{selectedAppointment.name}</p>
                  <p><a href={`mailto:${selectedAppointment.emailaddress}`} className="text-gray-500 font-xs italic">
                    {selectedAppointment.emailaddress}
                  </a></p>
                  <p>{selectedAppointment.contactnumber}</p>
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
              <div className="details p-2 border border-cusBlue rounded w-full">
              <p className="font-bold">Reservation Details:</p>
                <div className="pl-4 flex justify-between">
                  <div className="w-1/2">
                    <p>Package Selected: {selectedAppointment.title}</p>
                    <p>Date/s: {formatDate(selectedDate)}</p>
                    <p>Start Time: {selectedAppointment.starttime}</p>
                    <p>End Time: {selectedAppointment.endtime}</p>
                  </div>

                  <div className="flex items-start text-center w-1/2">
                    <p>Additional request/s: {selectedAppointment.additionalreq}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-4">
              <div className="details p-2 border border-cusBlue rounded w-1/2 mr-2">
                <p className="font-bold">Parking</p>
                <div className="pl-4">
                  <p>Parking Needed: {selectedAppointment.isparkingspotneeded ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="details p-2 border border-cusBlue rounded w-1/2 mr-2">
                <p className="font-bold">Proof of Payment:</p>
                <div className="py-2">
                  <label className="custom-file-upload w-2/5 justify-center flex bg-white text-cusBlue font-bold px-4 py-2 rounded-xl
                                    border border-gray-300 cursor-pointer">
                    Upload a File
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                  {proofOfPayment && <p className='text-cusBlue font-bold'>File selected: {proofOfPayment.name}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl w-40" onClick={handleReject}>Reject</button>
            <button className="bg-green-600 font-bold text-white px-4 py-2 rounded-3xl w-40" onClick={handleAccept}>Accept</button>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg">
          Calendar Updated Successfully!
        </div>
      )}

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
