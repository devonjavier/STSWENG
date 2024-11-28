'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Calendar from '@/app/components/CustomCalendar';
import DropdownWrapper from '@/app/components/Dropdown/DropdownWrapper';
import { fetchSchedules } from '@/utils/supabase/data';

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
        countAdditionalCustomers: string,
        additionalCustomersfirstnames: string,
        additionalCustomersmiddlenames: string,
        additionalCustomerslastnames: string,
        hours: number,
        additionalpackage: string,
        cartItems : string
    }
}) => {
    const [schedules, setSchedules] = useState<[]>([]);
    const [selectedSchedules, setselectedSchedules] = useState<any[]>([]); // Changed type to `any[]`
    const [ablebutton, setAbleButton] = useState(true); // Default to true since all fields need to be filled
    const [loading, setLoading] = useState(true);

    const getSchedule = async () => {
        try {
            const fetchedSchedules = await fetchSchedules();
            const newSelectedDates = fetchedSchedules.map((schedule: { scheduleid: any; date: any; starttime: any; endtime: any; status: any }) => ({
                scheduleid: schedule.scheduleid,
                date: schedule.date,
                starttime: schedule.starttime,
                endtime: schedule.endtime,
                status: schedule.status
            }));
            setSchedules(newSelectedDates);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSchedule();
    }, []);

    useEffect(() => {
        const allSelected = selectedSchedules.every(schedule => schedule.selectedtime1 && schedule.selectedtime2);
        setAbleButton(!allSelected);
    }, [selectedSchedules]);

    console.log('Hours value before passing to DropdownWrapper:', searchParams.hours);

    return (
        <>
            <div className='px-4 lg:px-32 flex flex-col gap-8 mt-10 lg:mb-6 lg:mt-20'>
            <div>
                    <div className='text-cusBlue text-4xl lg:text-6xl font-bold'>
                        Book an Appointment
                    </div>
                    <div className='text-sm pt-2 lg:pt-0 lg:text-xl'>
                        Services&gt;  Details  &gt; ExtraDetails &gt; <span className='text-cusBlue'> Date & Time</span> &gt; Confirmation &gt; Password Confirmation &gt; Booking Status
                    </div>
                </div>
                <div>
                    <div></div>
                    {loading ? (
                    <>
                        <div className='flex flex-col items-center'>
                            <span className="text-gray-500 font-medium italic text-3xl"> Loading Available Schedules... </span>
                        </div>
                    </>
                    ) : (
                    <>
                    
                    <div className='flex flex-col lg:flex-row'>
                        <div className='flex flex-col mr-4'>
                            <Calendar setArrFunc={setselectedSchedules} schedules={schedules} />
                            <Link href={{
                                pathname: "/Services/Details/Extradetails/Datetime/Confirmation",
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
                                    countAdditionalCustomers: searchParams.countAdditionalCustomers,
                                    additionalCustomersfirstnames: searchParams.additionalCustomersfirstnames,
                                    additionalCustomersmiddlenames: searchParams.additionalCustomersmiddlenames,
                                    additionalCustomerslastnames: searchParams.additionalCustomerslastnames,
                                    schedules: JSON.stringify(selectedSchedules),
                                    hours: searchParams.hours,
                                    additionalpackage: searchParams.additionalpackage,
                                    cartItems : searchParams.cartItems
                                }
                            }}>
                                <button disabled={ablebutton} className={`hidden lg:block rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold ${ablebutton ? 'bg-gray-400' : 'bg-cusBlue'}`}>
                                    Proceed to Confirmation
                                </button>
                            </Link>
                        </div>
                        <div className='flex flex-col'>
                            <DropdownWrapper selectedDates={selectedSchedules} setSelectedDates={setselectedSchedules} schedules={schedules} hours={searchParams.hours} items={[]} />
                        </div>

                        <Link href={{
                                pathname: "/Services/Details/Extradetails/Datetime/Confirmation",
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
                                    countAdditionalCustomers: searchParams.countAdditionalCustomers,
                                    additionalCustomersfirstnames: searchParams.additionalCustomersfirstnames,
                                    additionalCustomersmiddlenames: searchParams.additionalCustomersmiddlenames,
                                    additionalCustomerslastnames: searchParams.additionalCustomerslastnames,
                                    schedules: JSON.stringify(selectedSchedules),
                                    hours: searchParams.hours,
                                    additionalpackage: searchParams.additionalpackage,
                                    cartItems: searchParams.cartItems

                                }
                            }}>
                                <button disabled={ablebutton} className={`lg:hidden my-5 rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold ${ablebutton ? 'bg-gray-400' : 'bg-cusBlue'}`}>
                                    Proceed to Confirmation
                                </button>
                            </Link>
                    </div>
                    </>
                )}
                </div>
            </div>
        </>
    );
}

export default Page;
