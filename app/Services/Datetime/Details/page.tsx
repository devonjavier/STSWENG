'use client'
import Link from 'next/link'
import { Component, Dispatch, SetStateAction, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import GenerateDivs  from '@/app/components/GenerateDivs';

const Page = ({searchParams}:{
    searchParams: {
        dates: string, // JSON
        timeslot1: string,
        timeslot2: string
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

    const [isChecked, setIsChecked] = useState(false); // assume its false
    const [maincustomername, setmaincustomername] = useState(" "); // assume no customer
    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no customer
    const [additionalCustomers, setadditionalCustomers] = useState<string[]>([]);// assume no addtional customer

    const handleCheckboxChange = (e:any) => {
        setIsChecked(e.target.checked);
        console.log(isChecked)
    };

    const mainCustomerNameChange = useDebouncedCallback((term) => {
        setmaincustomername(term);
    },300);

    const addtionalRequestChange = useDebouncedCallback((additionalreq) => {
        setadditionalRequests(additionalreq);
    },300);

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
                Package &gt; Date & Time &gt; <span className='text-cusBlue'>Details  </span>&gt; Confirmation &gt; Booking Status
            </div>
        </div>
        <div className="flex flex-row">

            <div className='flex flex-row'>
                <div className='flex flex-col'>
                     
                    <span className='text-cusBlue font-bold mb-5  text-lg'> Main Customer</span>
                    <input id='customername' name='customername' placeholder = "Name" 
                        onChange={(e)=>{
                            mainCustomerNameChange(e.target.value);
                        }}
                    className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    
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
                        pathname:"/Services/Datetime/Details/Confirmation",
                        query: {
                            dates: searchParams.dates,
                            timeslot1: searchParams.timeslot1,
                            timeslot2: searchParams.timeslot2,
                            maincustomername: maincustomername,
                            needsparking:isChecked,
                            additionalrequests:additionalRequests,
                            additionalCustomers:JSON.stringify(additionalCustomers)
                        }
                    }}>  
                    
                    <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Proceed to Confirmation </button> </Link>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold mb-2 text-lg'> Additional Request/s</span>
                        <input id='additionalreq' name='additionalreq' 
                            onChange={(e)=>{
                                addtionalRequestChange(e.target.value);
                            }}
                        placeholder = " " className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[250px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    </div>
                    <div>
                        <span className='text-cusBlue font-bold mb-2 text-lg'> Do you need parking? </span>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
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
