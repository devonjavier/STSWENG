'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { fetchOneService, fetchSelectedSchedules } from '@/utils/supabase/data';

const Page = ({ searchParams }) => {
  const [selectedService, setSelectedService] = useState("");
  const [listOfSchedules, setListOfSchedules] = useState([]);

  useEffect(() => {
    const getService = async () => {
      try {
        const selectedService = await fetchOneService(parseInt(searchParams.serviceid));
        setSelectedService(selectedService[0].title);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const getSelectedSchedules = async () => {
      const selectedSchedules = JSON.parse(searchParams.schedules);
      const newSchedules = [];

      for (const selectedSched of selectedSchedules) {
        const getData = await fetchSelectedSchedules(selectedSched.date, selectedSched.selectedtime1, selectedSched.selectedtime2);

        getData.forEach((one) => {
          if (one.status === 'Available') {
            newSchedules.push(one);
          }
        });
      }

      setListOfSchedules(newSchedules);
    };

    getService();
    getSelectedSchedules();
  }, [searchParams]);

  const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const parkingChecker = (needsParking) => needsParking === "true";

  const listAdditionalCustomersFirstNames = JSON.parse(searchParams.additionalCustomersfirstnames);
  const listAdditionalCustomersMiddleNames = JSON.parse(searchParams.additionalCustomersmiddlenames);
  const listAdditionalCustomersLastNames = JSON.parse(searchParams.additionalCustomerslastnames);

  return (
    <>
      <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
        <div>
          <div className='text-cusBlue text-6xl font-bold'>
            Book an Appointment
            <div></div>
          </div>
          <div>
            Services &gt; Date & Time &gt; Details &gt; <span className='text-cusBlue'>Confirmation</span> &gt; Booking Status
          </div>
        </div>
        <div className="flex flex-row">
          <div className='flex flex-row'>
            <div className='flex flex-col'>
              <div className="flex flex-col border-2 border-indigo-800 rounded-lg p-4">
                <span className='text-black font-bold mb-5 text-3xl drop-shadow-2xl'> Main Customer: </span>
                <div className='flex flex-col p-0 ml-8 my-0 mr-0'>
                  <span className='text-black font-semibold mb-5  text-xl'> Name: {searchParams.maincustomerfirstname} {searchParams.maincustomermiddlename} {searchParams.maincustomerlastname}</span>
                  <span className='text-black font-semibold mb-5  text-xl'> Contact number: {searchParams.phonenumber}</span>
                  <span className='text-black font-semibold mb-5  text-xl'> Email address: {searchParams.emailaddress}</span>
                </div>
              </div>

              <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl'>
                <span className='text-black font-bold text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                <div className='flex flex-col p-0 my-0 mr-0'>
                  {listAdditionalCustomersFirstNames.length === 0 ? (
                    <span className='text-black text-xl font-semibold mb-5 ml-8 text-md'>None</span>
                  ) : (
                    listAdditionalCustomersFirstNames.map((firstName, i) => (
                      <span className='text-black text-xl font-semibold mb-5 ml-8 text-md' key={i}>
                        Person {i + 1}. {firstName} {listAdditionalCustomersMiddleNames[i]} {listAdditionalCustomersLastNames[i]}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 pb-8'>
                <span className='text-black font-bold  text-2xl mr-16 my-6 mb-4 mt-0 drop-shadow-2xl'> Parking: </span>
                <div className='ml-8 font-semibold text-black text-xl'> Parking Needed: {parkingChecker(searchParams.needsparking) ? "Yes" : "No"}</div>
              </div>
              <Link 
                href={{
                  pathname: "/Services/Datetime/Details/Extradetails/Confirmation/Bookingstatus",
                  query: {
                    schedules: JSON.stringify(listOfSchedules),
                    serviceid: searchParams.serviceid,
                    maincustomerfirstname: searchParams.maincustomerfirstname,
                    maincustomermiddlename: searchParams.maincustomermiddlename,
                    maincustomerlastname: searchParams.maincustomerlastname,
                    phonenumber: searchParams.phonenumber,
                    emailaddress: searchParams.emailaddress,
                    countAdditionalCustomers: searchParams.countAdditionalCustomers,
                    needsparking: searchParams.needsparking,
                    additionalrequests: searchParams.additionalrequests,
                    additionalCustomersfirstnames: searchParams.additionalCustomersfirstnames,
                    additionalCustomersmiddlenames: searchParams.additionalCustomersmiddlenames,
                    additionalCustomerslastnames: searchParams.additionalCustomerslastnames
                  }
                }}>
                <button className="bg-cusBlue btn hover:bg-indigo-900 rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Confirm Details </button>
              </Link>
            </div>

            <div className='flex flex-col ml-20 border-2 border-indigo-800 rounded-lg p-5 h-fit'>
              <span className='text-black font-bold mb-2 text-2xl'> Reservation Details: </span>
              <span className='text-black font-bold mb-5 text-md'> Package Selected: {selectedService} </span>
              <span className='text-black font-bold mb-2 text-md'> Appointment schedules: </span>
              <div className='flex flex-col'>
                {listOfSchedules.map((schedule) => (
                  <span key={schedule.scheduleid} className='text-black font-bold mb-5 text-md'>
                    Date: {formatDateString(schedule.date)}
                    <div>Time: {schedule.starttime} - {schedule.endtime}</div>
                  </span>
                ))}
              </div>
              <span className='text-black font-bold mb-5 text-md'> Additional Requests: </span>
              <div className="flex flex-col">
                <span className='text-black font-bold mb-5 text-md'> {searchParams.additionalrequests} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
