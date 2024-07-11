'use client'
import Link from 'next/link'
import { Component, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import GenerateDivs  from '@/app/components/GenerateDivs';

const Page = ({searchParams}:{
    searchParams: {
        schedules: string,
        serviceid: string,

        maincustomerfirstname: string,
        maincustomermiddlename: string
        maincustomerlastname: string,

        phonenumber: string,
        emailaddress: string,

        needsparking: string,
        additionalrequests: string
    }
}) => {

    useEffect(() => {
        console.log(searchParams.phonenumber);
        console.log(searchParams.emailaddress);
    });
    
    function getadditionalCustomers(count: number){
        const additionalCustomers = []
        // Update the customer array at the specified index
        for (let i = 0; i < count; i++) {
           const temp = document.getElementById(`additionalcustomer-${i}`);
            additionalCustomers.push(temp);
        }
        
        return additionalCustomers;
    };

    const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);// assume no addtional customer

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

                        <GenerateDivs counter={countAdditionalCustomers} setadditionalCustomersFirst={setadditionalCustomersFirstname} 
                        setadditionalCustomersMiddle={setadditionalCustomersMiddlename}
                        setadditionalCustomersLast={setadditionalCustomersLastname}
                        />

                    </div>

                    <Link 
                    href={{
                        pathname:"/Services/Datetime/Details/Extradetails/Confirmation",
                        query: {
                            schedules: searchParams.schedules,
                            serviceid: searchParams.serviceid,
                            maincustomerfirstname:  searchParams.maincustomerfirstname,
                            maincustomermiddlename:  searchParams.maincustomermiddlename,
                            maincustomerlastname:  searchParams.maincustomerlastname,
                            
                            phonenumber: searchParams.phonenumber,
                            emailaddress: searchParams.emailaddress,

                            needsparking: searchParams.needsparking,
                            additionalrequests: searchParams.additionalrequests,

                            countAdditionalCustomers: countAdditionalCustomers,

                            additionalCustomersfirstnames: JSON.stringify(additionalCustomersFirstname),
                            additionalCustomersmiddlenames: JSON.stringify(additionalCustomersMiddlename),
                            additionalCustomerslastnames: JSON.stringify(additionalCustomersLastname)
                            
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
