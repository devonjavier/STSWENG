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
        additionalpackage: string
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

    return (


        <>
            <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
                <div>
                    <div className='text-cusBlue text-6xl font-bold'>
                        Book an Appointment
                        <div></div>
                    </div>
                    <div>
                        Services &gt; Details &gt; ExtraDetails &gt; <span className='text-cusBlue'>Date & Time </span> &gt; Confirmation &gt; Booking Status
                    </div>
                </div>
                <div>
                    <div></div>
                    {loading ? (
                    <>
                        <div className='flex flex-col items-center'>
                            <span className="font-bold text-2xl text-gray mt-14"> LOADING AVAILABLE SCHEDULES... </span>
                        </div>
                    </>
                    ) : (
                    <>
                    
                    <div className='flex flex-row'>
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
                                    additionalpackage: searchParams.additionalpackage
                                }
                            }}>
                                <button disabled={ablebutton} className={`rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold ${ablebutton ? 'bg-gray-400' : 'bg-cusBlue'}`}>
                                    Proceed to Confirmation
                                </button>
                            </Link>
                        </div>
                        <div className='flex flex-col'>
                            <DropdownWrapper selectedDates={selectedSchedules} setSelectedDates={setselectedSchedules} schedules={schedules} hours={searchParams.hours} items={[]} />
                        </div>
                    </div>
                    </>
                )}
                </div>
            </div>
        </>
    );
}

export default Page;