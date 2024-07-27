'use client'
import React, { useCallback, useState, useEffect } from 'react';
import PendingCalendar from '@/app/components/PendingCalendar';
import { fetchCalendarData } from '@/utils/supabase/data';
import { pending_appointment } from '@/utils/supabase/interfaces';
import { acceptAppointment, checkCookie, rejectAppointment } from '@/app/lib/actions';
import '../scrollbarStyle.css';

const Page = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [appointments, setAppointments] = useState<pending_appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<pending_appointment | null>(null);
  const [proofOfPayment, setProofOfPayment] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [showConfirmAccept, setShowConfirmAccept] = useState(false);
  const [loading, setLoading] = useState<boolean>(false); 

  const formatTimeToAMPM = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading state to true
      const authenticated = await checkCookie();
      if (!authenticated) {
        window.location.href = '/';
      } else {
        try {
          if (selectedDate) {
            const data = await fetchCalendarData(selectedDate);

            // Simulate a delay before setting the appointments
            setTimeout(() => {
              setAppointments(data);
              setSelectedAppointment(null);
              setLoading(false); // Set loading state to false
            }, 500); // Adjust delay as needed (e.g., 500ms)
          }
        } catch (error) {
          console.error(error);
          setLoading(false); // Ensure loading state is turned off on error
        }
      }
    };
    getData();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedAppointment) {
      setProofOfPayment(selectedAppointment.status === 'Appointed');
    }
  }, [selectedAppointment]);

  const sendEmail = async (appointment: pending_appointment, status: string) => {
    const searchParams = {
      schedules: JSON.stringify([{
        date: appointment.date,
        starttime: appointment.starttime,
        endtime: appointment.endtime,
      }]),

      serviceType: appointment.title,
      maincustomerfirstname: appointment.name.split(' ')[0],
      maincustomerlastname: appointment.name.split(' ')[1] || '',

      phonenumber: appointment.contactnumber,
      emailaddress: appointment.emailaddress,
      
      needsparking: appointment.isparkingspotneeded ? 'true' : 'false',
      additionalrequests: appointment.additionalreq,
      additionalpackage: JSON.stringify([]),

      selectedServicetitle: appointment.title,
    };
    
    console.log("SEE!:", searchParams)

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchParams, trackingNumber: appointment.trackingnumber, status:status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error sending email:', response);
      } else {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleAccept = useCallback(() => {
    if (selectedAppointment && selectedAppointment.status !== 'Appointed') {
      setShowConfirmAccept(true);
    }
  }, [selectedAppointment]);

  const confirmAccept = useCallback(async () => {
    if (selectedAppointment) {
      try {
        await acceptAppointment(selectedAppointment);
        setShowConfirmAccept(false);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1500);

        // Send email after accepting the appointment
        console.log("SENDING:", selectedAppointment)
        await sendEmail(selectedAppointment, 'accepted');
        window.location.reload();
      } catch (error) {
        console.error('Error accepting appointment:', error);
      }
    }
  }, [selectedAppointment]);

  const cancelAccept = useCallback(() => {
    setShowConfirmAccept(false);
  }, []);

  const handleReject = useCallback(() => {
    if (selectedAppointment) {
      setShowConfirmReject(true);
    }
  }, [selectedAppointment]);

  const confirmReject = useCallback(async () => {
    if (selectedAppointment) {
      try {
        await rejectAppointment(selectedAppointment);
        setShowConfirmReject(false);
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 1500);

        // Send email after rejecting the appointment
        await sendEmail(selectedAppointment, 'rejected');
        window.location.reload();
      } catch (error) {
        console.error('Error rejecting appointment:', error);
      }
    }
  }, [selectedAppointment]);

  const cancelReject = useCallback(() => {
    setShowConfirmReject(false);
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProofOfPayment(event.target.checked);
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

    const sortedAppointments = Object.values(combined).sort((a, b) => {
      const startTimeA = new Date(`2000-01-01T${a.starttime}`);
      const startTimeB = new Date(`2000-01-01T${b.starttime}`);
      return startTimeA.getTime() - startTimeB.getTime();
    });

    return sortedAppointments;
  };

  const combinedAppointments = getCombinedAppointments();

  return (
    <div className='px-32 flex flex-col gap-8 pt-20 pb-[5vh] max-h-[91.8vh] overflow-y-auto custom-scrollbar'>
      <div className="flex">
        <PendingCalendar setArrFunc={setSelectedDates} setSelectedDate={setSelectedDate} />
        
        {selectedDate && (
          <div className="ml-8 mt-6 p-4 border border-gray-300 rounded-lg w-2/3 drop-shadow-2xl bg-white text-black flex flex-col overflow-h-auto">
            <h2 className="text-xl font-bold mb-4 text-left">
              Appointments on {formatDate(selectedDate)}
            </h2>
            {loading ? (
              <div className="flex items-center justify-center pb-12 h-full">
                <p className="text-xl font-bold">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {combinedAppointments.map((appointment, index) => (
                  <button
                    key={`${appointment.appointmentid}-${index}`} // Ensure keys are unique
                    className={`p-2 border border-gray-300 rounded-lg ${
                      selectedAppointment?.appointmentid === appointment.appointmentid ? 'bg-cusBlue text-white font-bold' : 
                      appointment.status === 'Pending' ? 'bg-yellow-400 text-black' : 
                      appointment.status === 'Appointed' ? 'bg-green-700 text-black' : 'bg-white'
                    }`}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    {appointment.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
  
      {selectedAppointment && (
        <div className="reservation-details mt-6 p-4 border border-gray-300 rounded-lg w-full drop-shadow-2xl bg-white text-black flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4 text-left">
              Details for Customer {selectedAppointment.name}
              <p className="text-xs text-red-500 mt-2">* indicates a required field</p>
            </h2>
  
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
                  {selectedAppointment.additionalPersonNames.length > 0 ? (
                    selectedAppointment.additionalPersonNames.map((name, index) => (
                      <p key={index}>Person {index + 1}: {name}</p>
                    ))
                  ) : (
                    <p>No additional persons</p>
                  )}
                </div>
              </div>
            </div>
  
            <div className="flex justify-between mb-4">
              <div className="details p-2 border border-cusBlue rounded w-full">
                <p className="font-bold">Reservation Details:</p>
                <div className="pl-4 flex justify-between">
                  <div className="w-1/2">
                    <p>Package Selected: {selectedAppointment.title}</p>
                    <p>Date/s: {selectedDate ? formatDate(selectedDate) : 'No date selected'}</p>
                    <p>Start Time: {formatTimeToAMPM(selectedAppointment.starttime)}</p>
                    <p>End Time: {formatTimeToAMPM(selectedAppointment.endtime)}</p>
                  </div>
                  <div className="w-1/2 flex flex-col items-start">
                    <p>Additional request/s: {selectedAppointment.additionalreq}</p>
                    <div className="mt-2">
                      <p className="font-semibold">Amount Due: ₱{selectedAppointment.totalamountdue ? Number(selectedAppointment.totalamountdue).toFixed(2) : '0.00'}</p>
                    </div>
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
  
              <div className="details p-2 border border-cusBlue rounded w-1/2 ml-2">
                <p className="font-bold">
                  Proof of Payment:
                  <span className="text-red-500"> *</span>
                </p>
                <div className="py-2">
                  <label className="flex items-center">
                    <input type="checkbox" checked={proofOfPayment} onChange={handleCheckboxChange} className="mr-2" />
                    Proof of Payment
                  </label>
                </div>
              </div>
            </div>
          </div>
  
          <div className="flex justify-between mt-4">
            <button className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl w-40" onClick={handleReject}>Reject</button>
            <button 
              className={`font-bold text-white px-4 py-2 rounded-3xl w-40 ${selectedAppointment.status === 'Appointed' ? 'bg-gray-400 cursor-not-allowed' : proofOfPayment ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
              onClick={handleAccept}
              disabled={selectedAppointment.status === 'Appointed' || !proofOfPayment}
            >
              Accept
            </button>
          </div>
        </div>
      )}
  
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg">
          Calendar Updated Successfully!
        </div>
      )}
  
      {showConfirmReject && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold text-black mb-4">Confirm Rejection</h3>
          <p className="text-black">Are you sure you want to reject this appointment?</p>
          <div className="flex justify-end mt-4">
            <button 
              className="bg-rose-700 text-white px-4 py-2 rounded mr-2"
              onClick={confirmReject}>
              Yes
            </button>
            <button 
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={cancelReject}>
              No
            </button>
          </div>
        </div>
      )}
  
      {showConfirmAccept && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold text-black mb-4">Confirm Acceptance</h3>
          <p className="text-black">Are you sure you want to accept this appointment?</p>
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              onClick={cancelAccept}>
              No
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={confirmAccept}>
              Yes
            </button>
          </div>
        </div>
      )}
  
      <div className="legend flex mt-0 relative">
        <div className="legend-item flex items-center mr-4 group relative">
          <span className="bg-yellow-400 inline-block w-4 h-4 mr-2"></span>
          <span className="font-bold text-black">Pending</span>
        </div>
        <div className="legend-item flex items-center group relative">
          <span className="bg-green-700 inline-block w-4 h-4 mr-2"></span>
          <span className="font-bold text-black">Reserved</span>
          <span className="ml-2 cursor-pointer relative">
            ?
            <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg w-max max-w-xs hidden group-hover:block z-10">
              Cells on the calendar will only turn green once ALL appointments within that day are appointed.
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Page;
