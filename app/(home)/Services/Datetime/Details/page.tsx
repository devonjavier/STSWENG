'use client'
import Link from 'next/link'
import { Component, Dispatch, SetStateAction, useState, useEffect} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import GenerateDivs  from '@/app/components/GenerateDivs';
import { fetchSelectedSchedules } from '@/utils/supabase/data';
import './page.css'
const Page = ({searchParams}:{
    searchParams: {
        schedules: string, // JSON
        serviceid: string
    }
}) => {

    const [selectedSchedules,setSelectedSchedules] = useState<[]>([])


    useEffect(()=>{}

    );
    
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

    const [phonenumber, setPhonenumber] = useState(" "); // assume no customer
    const [emailaddress, setEmailaddress] = useState(" "); // assume no customer

    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no request
    

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

    const phoneNumberChange = useDebouncedCallback((phone) => {
        setPhonenumber(phone);
    },300);

    const emailAddressChange = useDebouncedCallback((emailadd) => {
        setEmailaddress(emailadd);
    },300);


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
                Services &gt; Date & Time &gt; <span className='text-cusBlue'>Details </span> &gt; Confirmation &gt;  Booking Status 
            </div>
        </div>
        <div className="flex flex-row">

            <div className='flex flex-row'>
                <div className='flex flex-col'>
                     
                    <span className='text-black drop-shadow-lg  font-bold mb-5  text-lg'> Main Customer </span>
                    <div className='flex flex-col'>
                        <input id='customerfirstname' name='customername' placeholder = "First Name" 
                            onChange={(e)=>{
                                mainCustomerFirstNameChange(e.target.value);
                        }}
                        className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />

                        <input id='customermiddlename' name='customername' placeholder = "Middle Name" 
                            onChange={(e)=>{
                                mainCustomerMiddleNameChange(e.target.value);
                        }}
                        className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />

                        <input id='customerlastname' name='customername' placeholder = "Last Name" 
                            onChange={(e)=>{
                                mainCustomerLastNameChange(e.target.value);
                        }}
                        className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                    </div>

                
                    <span className='text-black drop-shadow-lg font-bold mb-2 mt-6  text-lg'> Phone Number </span>

                    <div className='flex flex-col'>
                        <input placeholder = "09XXXXXXXXX" 
                            onChange={(e)=>{
                                phoneNumberChange(e.target.value);
                        }}
                        className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                    </div>

                    <span className='text-black drop-shadow-lg  font-bold mb-2 mt-6  text-lg'> Email Address </span>
                    <div className='flex flex-col'>
                        <input placeholder = "@gmail.com" 
                            onChange={(e)=>{
                                emailAddressChange(e.target.value);
                        }}
                        className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                    </div>
                   
                    <Link 
                    href={{
                        pathname:"/Services/Datetime/Details/Extradetails",
                        query: {
                            schedules: searchParams.schedules,
                            serviceid: searchParams.serviceid,

                            maincustomerfirstname: maincustomerfirstname,
                            maincustomermiddlename: maincustomermiddlename,
                            maincustomerlastname: maincustomerlastname,

                            phonenumber: phonenumber,
                            emailaddress: emailaddress,

                            needsparking: isChecked,
                            additionalrequests: additionalRequests,
                        }
                    }}>  
                    
                    <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Next </button> </Link>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <div className='flex flex-col'>
                        <span className='text-black drop-shadow-lg font-bold mb-2 text-lg'> Additional Request/s</span>
                        <input id='additionalreq' name='additionalreq' 
                            onChange={(e)=>{
                                addtionalRequestChange(e.target.value);
                            }}
                        placeholder = " " className='text-black text-center text-2xl font-medium w-[480px] h-[250px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    </div>
                    <div className='flex gap-4'>
                        <span className='text-black drop-shadow-lg font-bold mb-2 text-lg'> Do you need parking? </span>
                        <div onClick={() => setIsChecked(!isChecked)} className={`toggle-switch ${isChecked ? 'checked' : ''}`}>
                            <span className="slider"></span>
                        </div> 
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