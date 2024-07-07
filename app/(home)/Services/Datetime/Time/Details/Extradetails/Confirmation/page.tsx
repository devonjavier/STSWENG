
'use client'

import React, {useCallback} from 'react'
import DateFormatter from "@/app/components/DateFormatter";
import Link from "next/link";

const Page = ({searchParams}:{
    searchParams: {
        dates: string,
        timeslot1: string,
        timeslot2: string,
        serviceid: string,
        maincustomerfirstname: string,
        maincustomermiddlename: string
        maincustomerlastname: string,
        needsparking: string,
        additionalrequests: string,
        additionalCustomers: string
    }
}) => {
    const time = [1,2,3,4,5];
    const addCust = JSON.parse(searchParams.additionalCustomers);

    var newdates = JSON.parse(searchParams.dates) // this gets the array of strings


    function parkingChecker(needsparking:string){
        if(needsparking == "true")
            return true;
        else
            return false;
    }

    const confirm = useCallback(() =>{
        
    }, []);

    // dates: searchParams.dates,
    //             timeslot1: searchParams.timeslot1,
    //             timeslot2: searchParams.timeslot2,
    //             serviceid: searchParams.serviceid,
    //             maincustomerfirstname: searchParams.maincustomerfirstname,
    //             maincustomermiddlename: searchParams.maincustomermiddlename,
    //             maincustomerlastname: searchParams.maincustomerlastname,
    //             needsparking: searchParams.needsparking,
    //             additionalrequests: searchParams.additionalrequests,
    //             additionalCustomers: searchParams.additionalCustomers

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
                    <div className="flex flex-col">
                        <span className='text-cusBlue font-bold mb-5  text-3xl'> Main Customer: </span>
                        <span className='text-cusBlue font-bold mb-5  text-xl'> First name: {searchParams.maincustomerfirstname}</span>
                        <span className='text-cusBlue font-bold mb-5  text-xl'> Middle name: {searchParams.maincustomermiddlename}</span>
                        <span className='text-cusBlue font-bold mb-5  text-xl'> Last name: {searchParams.maincustomerlastname}</span>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold  text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                        {addCust.map((customer:string, i:number) => (
                                <span className='text-cusBlue text-xl font-bold mb-5 ml-7  text-md' key={i}> {i+1}. {customer} </span>
                        ))}
                        
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold  text-2xl mr-16 my-6'> Parking Spot: {parkingChecker(searchParams.needsparking) ? "Will need" : "Will not needed"} </span>
                        <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Parking No: {searchParams.needsparking}</span>
                    </div>
                    <Link 
                    href={{
                        pathname:"/Services/Datetime/Details/Extradetails/Confirmation/Bookingstatus",
                        query: {
                            dates: searchParams.dates,
                            timeslot1: searchParams.timeslot1,
                            timeslot2: searchParams.timeslot2,
                            serviceid: searchParams.serviceid,
                            maincustomerfirstname: searchParams.maincustomerfirstname,
                            maincustomermiddlename: searchParams.maincustomermiddlename,
                            maincustomerlastname: searchParams.maincustomerlastname,
                            needsparking:parkingChecker(searchParams.needsparking),
                            additionalrequests:searchParams.additionalrequests,
                            additionalCustomers:JSON.stringify(searchParams.additionalCustomers)
                        }
                    }}>  
                    <button onClick={handleConfirm} 
                    className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Confirm Details </button> </Link>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <span className='text-cusBlue font-bold mb-2 text-2xl'> Reservation Details: </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Package Selection: Recording Studio  </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Date/s: <DateFormatter dateString={searchParams.dates}/> </span>
                    <span className='text-cusBlue font-bold mb-5 ml-7  text-md'> Time: {searchParams.timeslot1} - {searchParams.timeslot2}  </span>
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
