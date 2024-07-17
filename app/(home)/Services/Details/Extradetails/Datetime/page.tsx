'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import Calendar from '@/app/components/CustomCalendar';
import DropdownWrapper from '@/app/components/Dropdown/DropdownWrapper';
import { fetchSchedules } from '@/utils/supabase/data';

const Page = ({ searchParams }: {
    searchParams: {
        serviceid: string,
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
        hours:number,
        additionalpackage:string
    }
}) => {
    const [schedules, setSchedules] = useState<[]>([]);
    const [selectedSchedules, setselectedSchedules] = useState<[]>([]);
    const [ablebutton, setAbleButton] = useState(false);

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
        console.log(searchParams.hours);
        console.log(searchParams.additionalpackage);
        getSchedule();
        if (selectedSchedules.length !== 0) {
            setAbleButton(false);
        }
        else {
            setAbleButton(true);
        }
    }, [selectedSchedules]);

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
                        Services &gt; Details &gt; ExtraDetails &gt; <span className='text-cusBlue'>Date & Time </span> &gt; Confirmation &gt; Booking Status
                    </div>
                </div>
                <div>
                    <div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='flex flex-col mr-4'>
                            <Calendar setArrFunc={setselectedSchedules} schedules={schedules} />

                            <Link href={{
                                pathname: "/Services/Details/Extradetails/Datetime/Confirmation",
                                query: {
                                    serviceid: searchParams.serviceid,
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
                                    schedules: JSON.stringify(selectedSchedules)
                                }
                            }}>
                                <button disabled={ablebutton} className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold">
                                    Proceed to Confirmation
                                </button>
                            </Link>
                        </div>
                        <div className='flex flex-col'>
                            <DropdownWrapper items={[]} setArrFunc={setselectedSchedules} selectedDates={selectedSchedules} setSelectedDates={setselectedSchedules} schedules={schedules} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page