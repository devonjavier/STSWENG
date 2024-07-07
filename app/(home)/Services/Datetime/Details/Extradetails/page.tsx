'use client'
import Link from 'next/link'
import { Component, Dispatch, SetStateAction, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import GenerateDivs  from '@/app/components/GenerateDivs';

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
        additionalrequests: string
    }
}) => {
    
    function getadditionalCustomers(count: number){
        const additionalCustomers = []
        // Update the customer array at the specified index
        for (let i = 0; i < count; i++) {
           const temp = document.getElementById(`additionalcustomer-${i}`);
            additionalCustomers.push(temp);
        }
        
        return additionalCustomers;
    };

    const [additionalCustomers, setadditionalCustomers] = useState<string[]>([]);// assume no addtional customer

    const [countAdditionalCustomers, setcountAdditionalCustomers] = useState(0);

    function checker(dates:string){
        var format;
        format = JSON.parse(dates)
        // console.log(format);
        console.log(typeof format[0])
    }

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
            Package &gt; Date & Time &gt; <span className='text-cusBlue'>Details </span> &gt; Confirmation &gt;  Booking Status 
            </div>
        </div>
        <div className="flex flex-row">

            <div className='flex flex-row'>
                <div className='flex flex-col'>
                     
                   
                    <div className='flex flex-col'>
                        <div className="flex flex-row mt-5 mb-3 items-center">
                            <span className='text-cusBlue font-bold  text-lg mr-16'> Additional Persons Involved </span>
                            <button className='rounded-full bg-cusBlue  w-[45px] h-[45px]' onClick={() => setcountAdditionalCustomers(countAdditionalCustomers - 1)}> - </button>
                            <span className='text-cusBlue font-bold mb-5  text-lg mx-4'> {countAdditionalCustomers} </span>
                            <button className='rounded-full bg-cusBlue w-[45px] h-[45px]' onClick={() => setcountAdditionalCustomers(countAdditionalCustomers + 1)} > + </button>
                        </div>

                        <GenerateDivs counter={countAdditionalCustomers} setadditionalCustomers={setadditionalCustomers} />

                    </div>

                    <Link 
                    href={{
                        pathname:"/Services/Datetime/Details/Extradetails/Confirmation",
                        query: {
                            dates: searchParams.dates,
                            timeslot1: searchParams.timeslot1,
                            timeslot2: searchParams.timeslot2,
                            serviceid: searchParams.serviceid,
                            maincustomerfirstname:  searchParams.maincustomerfirstname,
                            maincustomermiddlename:  searchParams.maincustomermiddlename,
                            maincustomerlastname:  searchParams.maincustomerlastname,
                            needsparking: searchParams.needsparking,
                            additionalrequests: searchParams.additionalrequests,
                            additionalCustomers:JSON.stringify(additionalCustomers)
                        }
                    }}>  
                    
                    <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Proceed to Confirmation </button> </Link>

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
