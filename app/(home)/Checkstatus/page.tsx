
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { fetchMultiplePerson, fetchOneAppointment, fetchOneCustomer, fetchOnePerson, fetchOneService, fetchSelectedSchedule, fetchSelectedSchedules, fetchServices } from '@/utils/supabase/data'
import { service } from '@/utils/supabase/interfaces'
import { useDebouncedCallback } from 'use-debounce';


export default function displayPage() {

    const [trackingNumber, setTrackingNumber] = useState<number>() 
    
    const [isChecked, setIsChecked] = useState(); // assume its false

    const [selectedService, setSelectedService] = useState();

    const [maincustomerfirstname, setmaincustomerfirstname] = useState(" "); // assume no customer
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(" "); // assume no customer
    const [maincustomerlastname, setmaincustomerlastname] = useState(" "); // assume no customer

    const [phonenumber, setPhonenumber] = useState(" "); // assume no customer
    const [emailaddress, setEmailaddress] = useState(" "); // assume no customer

    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no request\

    const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);// assume no addtional customer

    const [listofschedules,setlistofschedules] = useState<[]>([])
    
    const trackingNumberChange = ((term:number) => {
        setTrackingNumber(term);
    });

    const getService = async() =>{

        
        const getThatAppointment = await fetchOneAppointment(trackingNumber);
        //console.log(getThatAppointment[0].appointmentid); // this is the appointmentid

        const appid:number = getThatAppointment[0].appointmentid
        // main customer
        const mainCustomer = await fetchOneCustomer(appid, true);
        setadditionalRequests(getThatAppointment[0].additionalrequest);
        setIsChecked(getThatAppointment[0].isparkingspotneeded);
        //console.log(mainCustomer[0].personid);

        const selectedservice = await fetchOneService(parseInt(getThatAppointment[0].serviceid));
                //console.log(selectedservice[0].title);
        setSelectedService(selectedservice[0].title);


        const mainCustomerDetails = await fetchOnePerson(mainCustomer[0].personid);
        console.log(mainCustomerDetails[0].firstname);

        setmaincustomerfirstname(mainCustomerDetails[0].firstname);
        setmaincustomermiddlename(mainCustomerDetails[0].middlename)
        setmaincustomerlastname(mainCustomerDetails[0].lastname);
        setPhonenumber(mainCustomerDetails[0].contactnumber);
        setEmailaddress(mainCustomerDetails[0].emailaddress);

        const additionalCustomers = await fetchOneCustomer(appid, false);
        //const additionalCustomersDetails = await fetchMultiplePerson(additionalCustomers);
        
        let additionalcust  = []
        let additionalfirstnames = []
        let additionalmiddlenames = []
        let additionallastnames = []


        for(let detail of additionalCustomers){

            additionalcust = await fetchOnePerson(detail.personid);

            additionalfirstnames.push(additionalcust[0].firstname);
            additionalmiddlenames.push(additionalcust[0].middlename);
            additionallastnames.push(additionalcust[0].lastname);

        }

        setadditionalCustomersFirstname(additionalfirstnames);
        setadditionalCustomersMiddlename(additionalmiddlenames);
        setadditionalCustomersLastname(additionallastnames);

        const newSchedules:number[] = [];

        const getData = await fetchSelectedSchedule(appid);
        //const date = new Date(new Date(selectedsched.date).setDate(new Date(selectedsched.date).getDate() + 1)).toISOString()
        
        getData.forEach((one) => {
            
            console.log(one);
            newSchedules.push(one);
            console.log(newSchedules);
            
        });

        setlistofschedules(newSchedules);
        //console.log(listofschedules)
   
   
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
                                <span className='text-cusBlue font-bold mb-5  text-xl mar '> First name: {maincustomerfirstname} </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Middle name: {maincustomermiddlename} </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Last name: {maincustomerlastname} </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Contact number: {phonenumber} </span>
                                <span className='text-cusBlue font-bold mb-5  text-xl'> Email addres: {emailaddress} </span>
                            </div>
                            
                        </div>

                        <div className='flex flex-col'>
                            <span className='text-cusBlue font-bold  text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                            <div className='flex flex-col p-0 ml-5 my-0 mr-0'>
                            
                            {additionalCustomersFirstname.map((firstName:string, i:number) => (
                                <span className='text-cusBlue text-xl font-bold mb-5 ml-7 text-md' key={i}>
                                    Person {i+1}. {firstName} {additionalCustomersMiddlename[i]} {additionalCustomersLastname[i]}
                                </span>
                            ))}
                            
                            </div>
                            
                        </div>

                        <div className='flex flex-col'>
                            <span className='text-cusBlue font-bold  text-2xl mr-16 my-6'> Parking Spot: {isChecked ? "Will need" : "Will not need"} </span>
                        </div>
                        
                    </div>
                    
                    <div className='flex flex-col ml-28'>
                        <span className='text-cusBlue font-bold mb-2 text-2xl'> Reservation Details: </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Package Selection:: {selectedService}  </span>
                        <span className='text-cusBlue font-bold mb-2 ml-7  text-md'> Appointment schedules: </span>
                        <div className='flex flex-col mb-4'>
                            {listofschedules.map((schedule) => (
                                    <span className='text-black font-bold mb-0 ml-12  text-md'> Date: {schedule.date} {schedule.starttime} - {schedule.endtime} </span>
                            ))}
                        </div>
                        
            
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Additional Requests:  </span>
                        <div className="flex flex-col ml-16">
                            <span className='text-cusBlue font-bold mb-5 text-md'> {additionalRequests} </span>
                        </div>

                    </div>

                </div>
                <div>

                </div>
            </div>
        
        </>
    )
}




