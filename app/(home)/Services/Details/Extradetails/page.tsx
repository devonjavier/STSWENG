'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GenerateDivs from '@/app/components/GenerateDivs';


const Page = ({ searchParams }: {
    searchParams: {
        service: string,
        serviceType: string,
        maincustomerfirstname: string,
        maincustomermiddlename: string,
        maincustomerlastname: string,
        phonenumber: string,
        emailaddress: string,
        needsparking: string,
        additionalrequests: string,
        hours: number,
        additionalpackage: string
    }
}) => {
    useEffect(() => {
        console.log(searchParams.hours);
    });

    const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);
    const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);
    const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);
    const [countAdditionalCustomers, setcountAdditionalCustomers] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const validateAdditionalCustomerNames = () => {
        let tempErrors: string[] = [];
    
        for (let i = 0; i < countAdditionalCustomers; i++) {
            tempErrors[i] = tempErrors[i] || ""; // Ensure array entry exists
    
            if (!additionalCustomersFirstname[i] || !additionalCustomersFirstname[i].trim()) {
                tempErrors[i] += "FirstNameRequired ";
            } else if (!/^[a-zA-Z ]+$/.test(additionalCustomersFirstname[i])) {
                tempErrors[i] += "FirstNameInvalid ";
            }
            
            if (additionalCustomersMiddlename[i] && !/^[a-zA-Z ]+$/.test(additionalCustomersMiddlename[i])) {
                tempErrors[i] += "MiddleNameInvalid ";
            }

            if (!additionalCustomersLastname[i] || !additionalCustomersLastname[i].trim()) {
                tempErrors[i] += "LastNameRequired ";
            } else if (!/^[a-zA-Z ]+$/.test(additionalCustomersLastname[i])) {
                tempErrors[i] += "LastNameInvalid ";
            }
        }
    
        setErrors(tempErrors);
        return tempErrors.every(error => error === "");
    };
    

    const handleNextClick = (e:any) => {
        setSubmitted(true);

        if (!validateAdditionalCustomerNames()) {
            e.preventDefault();
        } 
    };

    return (
        <>
            <div className='px-4 lg:px-32 flex flex-col gap-8 mt-10 lg:mb-6 lg:mt-20'>
                <div>
                    <div className='text-cusBlue text-4xl lg:text-6xl font-bold'>
                        Book an Appointment
                    </div>
                    <div className='text-sm pt-2 lg:pt-0 lg:text-xl'>
                        Services&gt;  Details  &gt; <span className='text-cusBlue'>ExtraDetails</span> &gt; Date & Time &gt; Confirmation &gt; Booking Status
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col'>
                                <div className="flex flex-row mt-5 mb-3 items-center gap-5">
                                    <span className='text-black drop-shadow-lg font-bold  text-lg mr-16'> Additional Persons Involved </span>
                                    <button className='drop-shadow-2xl rounded-full bg-cusBlue  w-[45px] h-[45px]' onClick={() => setcountAdditionalCustomers(countAdditionalCustomers => Math.max(0, countAdditionalCustomers - 1))}> - </button>
                                    <span className='text-cusBlue font-bold text-lg mx-4'> {countAdditionalCustomers} </span>
                                    <button className='drop-shadow-2xl rounded-full bg-cusBlue w-[45px] h-[45px]' onClick={() => setcountAdditionalCustomers(countAdditionalCustomers => Math.min(9, countAdditionalCustomers + 1))} > + </button>
                                    
                                </div>
                                <GenerateDivs
                                    counter={countAdditionalCustomers}
                                    setadditionalCustomersFirst={setadditionalCustomersFirstname}
                                    setadditionalCustomersMiddle={setadditionalCustomersMiddlename}
                                    setadditionalCustomersLast={setadditionalCustomersLastname}
                                    errors={errors}
                                    submitted={submitted}
                                />
                            </div>
                            <Link
                                href={{
                                    pathname: "/Services/Details/Extradetails/Datetime",
                                    query: {
                                        service: searchParams.service,
                                        serviceType: searchParams.serviceType,
                                        maincustomerfirstname: searchParams.maincustomerfirstname,
                                        maincustomermiddlename: searchParams.maincustomermiddlename,
                                        maincustomerlastname: searchParams.maincustomerlastname,
                                        phonenumber: searchParams.phonenumber,
                                        emailaddress: searchParams.emailaddress,
                                        needsparking: searchParams.needsparking,
                                        additionalrequests: searchParams.additionalrequests,
                                        countAdditionalCustomers: countAdditionalCustomers,
                                        additionalCustomersfirstnames: JSON.stringify(additionalCustomersFirstname),
                                        additionalCustomersmiddlenames: JSON.stringify(additionalCustomersMiddlename),
                                        additionalCustomerslastnames: JSON.stringify(additionalCustomersLastname),
                                        hours: searchParams.hours,
                                        additionalpackage: searchParams.additionalpackage
                                    }
                                }}>
                                <button className="bg-cusBlue my-5 rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={handleNextClick}> Proceed to Date & Time </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;