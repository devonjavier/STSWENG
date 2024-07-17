'use client'
import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import './page.css'
import { FaChevronDown } from 'react-icons/fa';

const Page = ({ searchParams }: { searchParams: { serviceid: string } }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [maincustomerfirstname, setmaincustomerfirstname] = useState(" ");
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(" ");
    const [maincustomerlastname, setmaincustomerlastname] = useState(" ");
    const [phonenumber, setPhonenumber] = useState(" ");
    const [emailaddress, setEmailaddress] = useState(" ");
    const [additionalRequests, setadditionalRequests] = useState(" ");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState('');
    const packages = ["Package 1", "Package 2", "Package 3"];

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleSelectPackage = (item) => {
        setSelectedPackage(item);
        setIsOpen(false);
    };

    const additionalRequestChange = (value) => {
        console.log(value);
    };

    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };

    const mainCustomerFirstNameChange = useDebouncedCallback((term) => {
        setmaincustomerfirstname(term);
    }, 300);

    const mainCustomerMiddleNameChange = useDebouncedCallback((term) => {
        setmaincustomermiddlename(term);
    }, 300);

    const mainCustomerLastNameChange = useDebouncedCallback((term) => {
        setmaincustomerlastname(term);
    }, 300);

    const addtionalRequestChange = useDebouncedCallback((additionalreq) => {
        setadditionalRequests(additionalreq);
    }, 300);

    const phoneNumberChange = useDebouncedCallback((phone) => {
        setPhonenumber(phone);
    }, 300);

    const emailAddressChange = useDebouncedCallback((emailadd) => {
        setEmailaddress(emailadd);
    }, 300);

    return (
        <>
            <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
                <div>
                    <div className='text-cusBlue text-6xl font-bold'>
                        Book an Appointment
                    </div>
                    <div> Services &gt; <span className='text-cusBlue'>Details</span> &gt; ExtraDetails &gt; Date & Time &gt; Confirmation &gt; Booking Status </div>
                </div>
                <div className="flex flex-row">
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <span className='text-black drop-shadow-lg font-bold mb-5 text-lg'>Main Customer</span>
                            <div className='flex flex-col'>
                                <input id='customerfirstname' name='customername' placeholder="First Name" onChange={(e) => { mainCustomerFirstNameChange(e.target.value); }} className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                                <input id='customermiddlename' name='customername' placeholder="Middle Name" onChange={(e) => { mainCustomerMiddleNameChange(e.target.value); }} className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                                <input id='customerlastname' name='customername' placeholder="Last Name" onChange={(e) => { mainCustomerLastNameChange(e.target.value); }} className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                            </div>
                            <span className='text-black drop-shadow-lg font-bold mb-2 mt-6 text-lg'>Phone Number</span>
                            <div className='flex flex-col'>
                                <input placeholder="09XXXXXXXXX" onChange={(e) => { phoneNumberChange(e.target.value); }} className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                            </div>
                            <span className='text-black drop-shadow-lg font-bold mb-2 mt-6 text-lg'>Email Address</span>
                            <div className='flex flex-col'>
                                <input placeholder="@gmail.com" onChange={(e) => { emailAddressChange(e.target.value); }} className='text-black text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex mb-3' type="text" />
                            </div>
                            <Link href={{ pathname: "/Services/Details/Extradetails", query: { serviceid: searchParams.serviceid, maincustomerfirstname: maincustomerfirstname, maincustomermiddlename: maincustomermiddlename, maincustomerlastname: maincustomerlastname, phonenumber: phonenumber, emailaddress: emailaddress, needsparking: isChecked, additionalrequests: additionalRequests, } }}>
                                <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold">Next</button>
                            </Link>
                        </div>
                        <div className='flex flex-col ml-28'>
                            <div className='flex flex-col'>
                                <span className='text-black drop-shadow-lg font-bold mb-2 text-lg'>Additional Request/s</span>
                                <input id='additionalreq' name='additionalreq' onChange={(e) => { addtionalRequestChange(e.target.value); }} placeholder=" " className='text-black text-center text-2xl font-medium w-[480px] h-[250px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                            </div>
                            <div className='flex gap-4 mt-5'>
                                <span className='text-black drop-shadow-lg font-bold mb-2 text-lg'>Do you need parking?</span>
                                <div onClick={() => setIsChecked(!isChecked)} className={`toggle-switch ${isChecked ? 'checked' : ''}`}>
                                    <span className="slider"></span>
                                </div>
                            </div>
                            <div className='flex flex-row mt-5 relative'>
                                <span className='text-black drop-shadow-lg font-bold mb-2 text-lg mr-5 mt-2'>Additional Packages:</span>
                                <details className="dropdown relative" open={isOpen}>
                                    <summary className="dropdown-summary m-1 bg-white w-48 flex items-center justify-between cursor-pointer p-3 border rounded-lg shadow-sm transition duration-400 ease-in-out transform active:scale-110" onClick={(e) => toggleDropdown(e)}>
                                        <span className="text-left">{selectedPackage || 'Select Package'}</span>
                                        <span><FaChevronDown /></span>
                                    </summary>
                                    {isOpen && (
                                        <ul className="dropdown-menu2 absolute mt-1 p-2 shadow menu z-[1] bg-white rounded-lg w-48">
                                            {packages.map((item, index) => (
                                                <li key={index} className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectPackage(item)}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </details>
                            </div>
                            <div className='flex flex-row items-center'>
                                <span className='text-black drop-shadow-lg font-bold mb-2 text-lg mr-5'>How many hours?:</span>
                                <input id='hours' name='hours' onChange={(e) => { additionalRequestChange(e.target.value); }} placeholder="--" className='text-black text-center font-medium py-2.5 my-4 w-24 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" maxLength="2" onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) { e.preventDefault(); } }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;