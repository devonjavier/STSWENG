
'use client'

import React, {useEffect, useState} from 'react'
import DateFormatter from "@/app/components/DateFormatter";
import Link from "next/link";
import { fetchOneService } from '@/utils/supabase/data'
import { service } from '@/utils/supabase/interfaces'

const Page = ({searchParams}:{
    searchParams: {
        schedules: string,
        serviceid: string,

        maincustomerfirstname: string,
        maincustomermiddlename: string
        maincustomerlastname: string,

        phonenumber: string,
        emailaddress: string,
        countAdditionalCustomers:number,

        needsparking: string,
        additionalrequests: string,
        additionalCustomersfirstnames: string // JOSN
        additionalCustomersmiddlenames: string //JSON
        additionalCustomerslastnames: string //JSON
    }
}) => {

    const [selectedService, setSelectedService] = useState<string>(" ");

    const listofschedules = JSON.parse(searchParams.schedules);

    useEffect (()=>{

        const getService = async() => {
            try {
                const selectedservice = await fetchOneService(parseInt(searchParams.serviceid));
                //console.log(selectedservice[0].title);
                setSelectedService(selectedservice[0].title);
    
              } catch (error) {
                console.error('Error fetching services:', error);
              } finally {
            }
        };

        

        getService();
       
    },[]);
    
    function parkingChecker(needsparking:string){
        if(needsparking == "true")
            return true;
        else
            return false;
    }
    const listadditionalcustomersfirstnames = JSON.parse(searchParams.additionalCustomersfirstnames);
    const listadditionalcustomersmiddlenames = JSON.parse(searchParams.additionalCustomersmiddlenames);
    const listadditionalcustomerslastnames = JSON.parse(searchParams.additionalCustomerslastnames);

  return (
    <>
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
        <div>
            <div className='text-cusBlue text-6xl font-bold'>
                Book an Appointment
                <div>
            </div>
            </div>
            <div>
                Package &gt; Date & Time &gt; Details  &gt; <span className='text-cusBlue'>Confirmation</span> &gt; Booking Status
            </div>
        </div>
        <div className="flex flex-row">
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <div className="flex flex-col ">
                        <span className='text-cusBlue font-bold mb-5  text-3xl'> Main Customer: </span>
                        <div className='flex flex-col p-0 ml-12 my-0 mr-0'>
                            <span className='text-cusBlue font-bold mb-5  text-xl mar '> First name: {searchParams.maincustomerfirstname}</span>
                            <span className='text-cusBlue font-bold mb-5  text-xl'> Middle name: {searchParams.maincustomermiddlename}</span>
                            <span className='text-cusBlue font-bold mb-5  text-xl'> Last name: {searchParams.maincustomerlastname}</span>
                            <span className='text-cusBlue font-bold mb-5  text-xl'> Contact number: {searchParams.phonenumber}</span>
                            <span className='text-cusBlue font-bold mb-5  text-xl'> Email addres: {searchParams.emailaddress}</span>
                        </div>
                        
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold  text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                        <div className='flex flex-col p-0 ml-5 my-0 mr-0'>
                        {listadditionalcustomersfirstnames.map((firstName:string, i:number) => (
                            <span className='text-cusBlue text-xl font-bold mb-5 ml-7 text-md' key={i}>
                                Person {i+1}. {firstName} {listadditionalcustomersmiddlenames[i]} {listadditionalcustomerslastnames[i]}
                            </span>
                        ))}
                        </div>
                        
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold  text-2xl mr-16 my-6'> Parking Spot: {parkingChecker(searchParams.needsparking) ? "Will need" : "Will not need"} </span>
                    </div>
                    <Link 
                    href={{
                        pathname:"/Services/Datetime/Details/Extradetails/Confirmation/Bookingstatus",
                        query: {
                            schedules: searchParams.schedules,
                            serviceid: searchParams.serviceid,
                            maincustomerfirstname:  searchParams.maincustomerfirstname,
                            maincustomermiddlename:  searchParams.maincustomermiddlename,
                            maincustomerlastname:  searchParams.maincustomerlastname,
                            
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
                    <button  
                    className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Confirm Details </button> </Link>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <span className='text-cusBlue font-bold mb-2 text-2xl'> Reservation Details: </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Package Selection:: {selectedService}  </span>
                    <span className='text-cusBlue font-bold mb-2 ml-7  text-md'> Appointment schedules: </span>
                    <div className='flex flex-col mb-4'>
                        {listofschedules.map((schedule) => (
                                <span className='text-black font-bold mb-0 ml-12  text-md'> Date: {schedule.date} {schedule.selectedtime1} - {schedule.selectedtime2} </span>
                        ))}
                    </div>
                    
        
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Additional Requests:  </span>
                    <div className="flex flex-col ml-16">
                        <span className='text-cusBlue font-bold mb-5 text-md'> {searchParams.additionalrequests} </span>
                    </div>

                </div>

            </div>
            <div>

            </div>
        </div>
        
    </div>
    </>
  )
}

export default Page
