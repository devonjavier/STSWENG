'use client'
import Link from 'next/link'
import { Component, Dispatch, SetStateAction, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import GenerateDivs  from '@/app/components/GenerateDivs';

const Page = ({searchParams}:{
    searchParams: {
        dates: string, // JSON
        timeslot1: string,
        timeslot2: string,
        serviceid: string
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

    const [maincustomerfirstname, setmaincustomerfirstname] = useState(" "); // assume no customer
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(" "); // assume no customer
    const [maincustomerlastname, setmaincustomerlastname] = useState(" "); // assume no customer

    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no request
    const [additionalCustomers, setadditionalCustomers] = useState<string[]>([]);// assume no addtional customer

    const handleCheckboxChange = (e:any) => {
        setIsChecked(e.target.checked);
        console.log(isChecked)
    };

    const mainCustomerFirstNameChange = useDebouncedCallback((term) => {
        setmaincustomerfirstname(term);
    },300);

    const mainCustomerMiddleNameChange = useDebouncedCallback((term) => {
        setmaincustomermiddlename(term);
    },300);

    const mainCustomerLastNameChange = useDebouncedCallback((term) => {
        setmaincustomerlastname(term);
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
                Package &gt; Date & Time &gt; Details  &gt; Confirmation &gt; <span className='text-cusBlue'> Booking Status </span>
            </div>
        </div>
        <div className="flex flex-row">

            <div className='flex flex-row'>
                <div className='flex flex-col'>
                     
                    <span className='text-cusBlue font-bold mb-5  text-lg'> Main Customer </span>
                    <div className='flex flex-col'>
                        <input id='customerfirstname' name='customername' placeholder = "First Name" 
                            onChange={(e)=>{
                                mainCustomerFirstNameChange(e.target.value);
                        }}
                        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />

                        <input id='customermiddlename' name='customername' placeholder = "Middle Name" 
                            onChange={(e)=>{
                                mainCustomerMiddleNameChange(e.target.value);
                        }}
                        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />

                        <input id='customerlastname' name='customername' placeholder = "Last Name" 
                            onChange={(e)=>{
                                mainCustomerLastNameChange(e.target.value);
                        }}
                        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                    </div>
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
                            serviceid: searchParams.serviceid,
                            maincustomerfirstname: maincustomerfirstname,
                            maincustomermiddlename: maincustomermiddlename,
                            maincustomerlastname: maincustomerlastname,
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
