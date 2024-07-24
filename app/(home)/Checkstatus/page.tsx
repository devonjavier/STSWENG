'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { fetchMultiplePerson, fetchOneAppointment, fetchOneCustomer, fetchOnePerson, fetchOneService, fetchSelectedSchedule, fetchSelectedSchedules, fetchServices } from '@/utils/supabase/data'
import { useDebouncedCallback } from 'use-debounce';
import { schedule } from '@/utils/supabase/interfaces';
import Image from "next/image"

const formatDate = (dateString : any) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function DisplayPage() {

    const [trackingNumber, setTrackingNumber] = useState<number>(12) 
    const [isChecked, setIsChecked] = useState(false); // assume its false
    const [selectedService, setSelectedService] = useState("");
    const [selectedAdditionalService, setSelectedAdditionalService] = useState("None selected");

    const [maincustomerfirstname, setmaincustomerfirstname] = useState(" "); // assume no customer
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(" "); // assume no customer
    const [maincustomerlastname, setmaincustomerlastname] = useState(" "); // assume no customer
    const [phonenumber, setPhonenumber] = useState(" "); // assume no customer
    const [emailaddress, setEmailaddress] = useState(" "); // assume no customer
    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no request\
    const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);// assume no addtional customer
    const [listofschedules,setlistofschedules] = useState<schedule[]>([])
    const [status, setStatus] = useState<string>("/check_mark.png");
    const [statusMessage , setStatusMessage] = useState<string>(" ");
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [totalAmountDue, setTotalAmountDue] = useState(0)
    const [isError, setIsError] = useState(false); 
    const trackingNumberChange = ((term:number) => {
        setTrackingNumber(term);
    });

    
    const fetchStatus = async () => {
    try {
        const getThatAppointment = await fetchOneAppointment(trackingNumber);

        if (!getThatAppointment || !getThatAppointment.length) {
            setIsError(true);  
            return;
        } 

        setIsError(false); 
        const status = getThatAppointment[0].status;
        
        if (status === "Pending") {
            setStatus("/pending_mark.png");
            setStatusMessage("Appointment Pending");
        } else if (status === "Accepted") {
            setStatus("/check_mark.png");
            setStatusMessage("Appointment Accepted");
        } else if (status === "Rejected") {
            setStatus("/ekis_mark.png");
            setStatusMessage("Appointment Rejected");
        }

        const appid = getThatAppointment[0].appointmentid;
        const mainCustomer = await fetchOneCustomer(appid, true);
        if (!mainCustomer || !mainCustomer.length) {
            setIsError(true);
            throw new Error('Main customer not found'); 
        }

        const mainCustomerDetails = await fetchOnePerson(mainCustomer[0].personid);
        if (!mainCustomerDetails || !mainCustomerDetails.length) {
            setIsError(true);
            throw new Error('Main customer details not found'); 
        }

        setTotalAmountDue(getThatAppointment[0].totalamountdue);
        setadditionalRequests(getThatAppointment[0].additionalrequest);
        setIsChecked(getThatAppointment[0].isparkingspotneeded);

        const selectedservice = await fetchOneService(parseInt(getThatAppointment[0].serviceid));
        setSelectedService(selectedservice[0].title);

        if (!Object.is(getThatAppointment[0].additionalserviceid, null)) {
            const additionalservice = await fetchOneService(parseInt(getThatAppointment[0].additionalserviceid));
            setSelectedAdditionalService(additionalservice[0].title);
        } else {
            setSelectedAdditionalService("None Selected");
        }

        setmaincustomerfirstname(mainCustomerDetails[0].firstname);
        setmaincustomermiddlename(mainCustomerDetails[0].middlename);
        setmaincustomerlastname(mainCustomerDetails[0].lastname);
        setPhonenumber(mainCustomerDetails[0].contactnumber);
        setEmailaddress(mainCustomerDetails[0].emailaddress);

        const additionalCustomers = await fetchOneCustomer(appid, false);
        let additionalcust = [];
        let additionalfirstnames = [];
        let additionalmiddlenames = [];
        let additionallastnames = [];

        for (let detail of additionalCustomers) {
            additionalcust = await fetchOnePerson(detail.personid);
            additionalfirstnames.push(additionalcust[0].firstname);
            additionalmiddlenames.push(additionalcust[0].middlename);
            additionallastnames.push(additionalcust[0].lastname);
        }

        setadditionalCustomersFirstname(additionalfirstnames);
        setadditionalCustomersMiddlename(additionalmiddlenames);
        setadditionalCustomersLastname(additionallastnames);

        const newSchedules = await fetchSelectedSchedule(appid);
        setlistofschedules(newSchedules);

        setTimeout(() => {
            setIsContentVisible(true);
        }, 0);
    } catch (error) {
        console.error(error);
        setIsError(true);
    }
};

    const getStatus = async() => {
        if (isContentVisible) {
            setIsContentVisible(false);
            setTimeout(fetchStatus, 300); 
        } else {
            fetchStatus();
        }
    }

    useEffect(() => {}, [trackingNumber]); 

    return (
        <>
            <div className='flex flex-col mt-16 ml-48'>
                <span className='text-cusBlue font-bold mb-2 mt-6  text-7xl'> Check Status </span>
                <span className='text-gray-400 font-bold mb-6 text-xl'> Track your appointment here. </span>
                <span className='text-black font-bold mb-2  text-xl'> Reference Number: </span>
                <input placeholder="Input reference number" onChange={(e) => {trackingNumberChange(parseInt(e.target.value)); setIsError(false);  }}
                className={`text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] 
                border ${isError ? 'border-red-600' : 'border-indigo-800'} justify-between items-center inline-flex`} type="number" />
                {isError && <span className="text-red-600 text-lg"></span>} 
                <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={() => getStatus()}> Check status </button>
            </div>
            {isContentVisible && ( 
                <>
                    <div className='m-5'>
                        <hr />
                        <hr />
                        <hr />
                    </div>

                    <div className='flex flex-col items-center'>
                        <Image src={status} alt=" " width={80} height={80}/>
                        <span className="font-bold text-4xl text-black"> {statusMessage} </span>
                    </div>
                    
                    <div className="flex flex-row justify-center mb-6 p-5 w-2/3 m-auto">
                        <div className='flex flex-row w-full'>
                            <div className='flex flex-col w-full'>
                                <div className="flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl">
                                    <span className='text-black  font-bold mb-5  text-3xl'> Main Customer: </span>
                                    <div className='flex flex-col p-0 ml-12 my-0 mr-0'>
                                        <span className='text-black font-bold mb-5  text-xl mar '> Name: {maincustomerfirstname} {maincustomermiddlename} {maincustomerlastname}</span>
                                        <span className='text-black font-bold mb-5  text-xl'> Contact number: {phonenumber} </span>
                                        <span className='text-black font-bold mb-5  text-xl'> Email address: {emailaddress} </span>
                                    </div>
                                </div>

                                <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl'>
                                    <span className='text-black font-bold text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                                    <div className='flex flex-col p-0 my-0 mr-0'>
                                        {additionalCustomersFirstname.length === 0 ? (
                                            <span className='text-black text-xl font-semibold mb-5 ml-12 text-md'>None</span>
                                        ) : (
                                            additionalCustomersFirstname.map((firstName, i) => (
                                                <span className='text-black text-xl font-semibold mb-5 ml-12 text-md' key={i}>
                                                    Person {i+1}. {firstName} {additionalCustomersMiddlename[i]} {additionalCustomersLastname[i]}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl'>
                                    <span className='text-black  font-bold mb-5  text-3xl'> Parking Spot: {isChecked ? "Yes" : "No"} </span>
                                </div>
                            </div>
                            
                            <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl ml-4 w-full'>
                                <span className='text-black  font-bold mb-5  text-3xl'> Reservation Details: </span>
                                <span className='text-black font-bold mb-5 ml-7  text-2xl'> Package Selection: {selectedService}  </span>
                                <span className='text-black font-bold mb-5 ml-7  text-2xl'> Additional service: {selectedAdditionalService}  </span>
                                
                                <span className='text-black font-bold mb-5 ml-7  text-2xl'> Total Amount Due: {totalAmountDue}  </span>
                                <span className='text-black font-bold mb-2 ml-7  text-2xl'> Appointment schedules: </span>
                                <div className='flex flex-col mb-4'>
                                    {listofschedules.map((schedule) => (
                                        <span key={schedule.scheduleid} className='text-black font-bold  mb-5 ml-12  text-md'> Date: {formatDate(schedule.date)} 
                                            <div>
                                                Time: {schedule.starttime} - {schedule.endtime}
                                            </div>
                                        </span>
                                    ))}
                                </div>
                                <span className='text-black font-bold mb-5 ml-7  text-md'> Additional Requests:  </span>
                                <div className="flex flex-col ml-16">
                                    <span className='text-black font-bold mb-5 text-md'> {additionalRequests} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}