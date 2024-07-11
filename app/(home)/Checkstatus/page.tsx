
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { fetchOneAppointment, fetchServices } from '@/utils/supabase/data'
import { service } from '@/utils/supabase/interfaces'
import { useDebouncedCallback } from 'use-debounce';


export default function displayPage() {

    const [trackingNumber, setTrackingNumber] = useState<number>() 
    
    const [isChecked, setIsChecked] = useState(false); // assume its false

    const [maincustomerfirstname, setmaincustomerfirstname] = useState(" "); // assume no customer
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(" "); // assume no customer
    const [maincustomerlastname, setmaincustomerlastname] = useState(" "); // assume no customer

    const [phonenumber, setPhonenumber] = useState(" "); // assume no customer
    const [emailaddress, setEmailaddress] = useState(" "); // assume no customer

    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no request
    const [additionalCustomers, setadditionalCustomers] = useState<string[]>([]);// assume no addtional customer

    const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);// assume no addtional customer

    const trackingNumberChange = ((term:number) => {
        setTrackingNumber(term);
    });

    const getService = async() =>{
        const getThatAppointment = await fetchOneAppointment(trackingNumber);
        console.log((getThatAppointment[0])['appointmentid']);
    }

    
    useEffect(() => {
        
    }, [trackingNumber]); // if the tracking number changes

    return (
        <>
            <div className='flex flex-col mt-16 ml-16'>
            <span className='text-cusBlue font-bold mb-2 mt-6  text-7xl'> Check Status </span>
            <span className='text-black font-bold mb-2 mt-6  text-xl'> Track your appointment here. </span>
            <span className='text-black font-bold mb-2 mt-6  text-2xl'> Reference Number </span>
            <input placeholder = "Input tracking number" 
                            onChange={(e)=>{
                                trackingNumberChange(parseInt(e.target.value));
                            }}
                        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
            <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={() => getService()}> Check status </button>
            </div>
            <div className="flex flex-row ml-16 mt-5 mr-96 mb-6 border-2 p-5">
                <div className='flex flex-row'>
                    <div className='flex flex-col'>
                        <div className="flex flex-col ">
                            <span className='text-cusBlue font-bold mb-5  text-3xl'> Main Customer: </span>
                            <div className='flex flex-col p-0 ml-12 my-0 mr-0'>
                                <span className='text-cusBlue font-bold mb-5  text-xl mar '> First name: </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Middle name: </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Last name: </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Contact number: </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Email addres: </span>
                            </div>
                            
                        </div>

                        <div className='flex flex-col'>
                            <span className='text-cusBlue font-bold  text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                            <div className='flex flex-col p-0 ml-5 my-0 mr-0'>
                                <span className='text-cusBlue text-xl font-bold mb-5 ml-7 text-md'>
                                    Person 
                                </span>

                            </div>
                            
                        </div>

                        <div className='flex flex-col'>
                            <span className='text-cusBlue font-bold  text-2xl mr-16 my-6'> Parking Spot: 1234 ? "Will need" : "Will not need" </span>
                        </div>
                        
                    </div>
                    
                    <div className='flex flex-col ml-28'>
                        <span className='text-cusBlue font-bold mb-2 text-2xl'> Reservation Details: </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Package Selection::   </span>
                        <span className='text-cusBlue font-bold mb-2 ml-7  text-md'> Appointment schedules: </span>
                        <div className='flex flex-col mb-4'>
                            <span className='text-black font-bold mb-0 ml-12  text-md'> Date:  </span>
                        </div>
                        
            
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Additional Requests:  </span>
                        <div className="flex flex-col ml-16">
                            <span className='text-cusBlue font-bold mb-5 text-md'>  </span>
                        </div>

                    </div>

                </div>
                <div>

                </div>
            </div>
        
        </>
    )
}




