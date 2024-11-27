'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import {
    addOneAppointment,
    addCustomer,
    updateSchedule,
    fetchOneAdditionalServiceWithTitle,
    fetchtrackingnumber
} from '@/utils/supabase/data'
import Link from "next/link"
import { useRouter } from "next/navigation"

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined);
};

const Page = ({ searchParams }) => {
    let lastAppointmentTime;
    
    useEffect(()=>{
        lastAppointmentTime = localStorage.getItem('lastAppointmentTime');
        
    },[]);
    const router = useRouter();
    const theService = JSON.parse(searchParams.service);
    const [trackingNumber, setTrackingNumber] = useState(10000);
    let appointentid;
    const [isProcessed, setIsProcessed] = useState(false);
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(true);

    if (!isProcessed) {
        const currentTime = new Date().getTime();

        if (lastAppointmentTime && currentTime - parseInt(lastAppointmentTime) < 5 * 60 * 1000) {
            const remainingtime = currentTime - parseInt(lastAppointmentTime);

            const millisToMinutesAndSeconds = (millis) => {
                const totalMillisFrom10Minutes = 5 * 60 * 1000;
                const remainingMillis = totalMillisFrom10Minutes - millis;

                const minutes = Math.floor(remainingMillis / 60000);
                const seconds = Math.floor((remainingMillis % 60000) / 1000);

                return `${minutes} minutes and ${seconds} seconds`;
            }

            return (
                <>
                    <div className="flex flex-col p-6">
                        <span className="text-cusBlue text-4xl font-bold"> Please wait for another {millisToMinutesAndSeconds(remainingtime)} before setting another appointment. </span>
                        <Link href="/">  
                            <button className="bg-cusBlue btn hover:bg-indigo-900 rounded-3xl w-56 mt-8 h-20 text-xl text-white font-bold"> Back to Home </button>
                        </Link>
                    </div>
                </>
            );
        }

        const addAppointment = async () => {
            try {
                const gettrackingnumber = await fetchtrackingnumber();
                setTrackingNumber(gettrackingnumber);

                const dotheyneedparking = searchParams.needsparking === 'true';
                const totalprice = parseFloat(searchParams.mainprice) + parseFloat(searchParams.additionalprice) + parseFloat(searchParams.priceOfCart);

                const addtheAppointment = await addOneAppointment(
                    theService.serviceid,
                    dotheyneedparking,
                    gettrackingnumber,
                    searchParams.additionalrequests,
                    JSON.parse(searchParams.additionalpackage),
                    totalprice,
                    searchParams.newpassword
                );

                appointentid = addtheAppointment;

                const selectedschedules = JSON.parse(searchParams.schedules);
                await Promise.all(selectedschedules.map(selectedsched =>
                    updateSchedule(appointentid, selectedsched.scheduleid)
                ));

                await addCustomer(
                    searchParams.maincustomerfirstname,
                    searchParams.maincustomermiddlename,
                    searchParams.maincustomerlastname,
                    searchParams.phonenumber,
                    searchParams.emailaddress,
                    true
                );

                const fnames = JSON.parse(searchParams.additionalCustomersfirstnames);
                const mnames = JSON.parse(searchParams.additionalCustomersmiddlenames);
                const lnames = JSON.parse(searchParams.additionalCustomerslastnames);

                await Promise.all(fnames.map((fname, index) =>
                    addCustomer(
                        fname,
                        mnames[index],
                        lnames[index],
                        searchParams.phonenumber,
                        searchParams.emailaddress,
                        false
                    )
                ));

                fetch('/api/sendEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ searchParams, trackingNumber: gettrackingnumber, status: "pending" })
                });

                localStorage.setItem('lastAppointmentTime', currentTime.toString());

            } catch (error) {
                console.error('Error fetching services:', error);
            }finally{
                setLoading(false);
            }
        }

        addAppointment();
        setIsProcessed(true);
    }

    return (
        <>
        {loading ? (
        <>
            <div className='flex flex-col items-center mt-5'>
                <span className="text-gray-500 font-medium italic text-3xl"> Generating Appointment... </span>
            </div>
        </>
        )
            : (
        <>
            <div className='px-4 lg:px-32 flex flex-col gap-8 mt-10 lg:mb-6 lg:mt-20'>
                <div>
                    <div className='text-cusBlue text-4xl lg:text-6xl font-bold'>
                        Book an Appointment
                    </div>
                    <div className='text-sm pt-2 lg:pt-0 lg:text-xl'>
                        Services &gt; Details &gt; ExtraDetails &gt; Date & Time &gt; Confirmation &gt; Password Confirmation &gt; <span className='text-cusBlue'> Booking Status </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center w-1/2 lg:w-4/5 m-auto space-y-4">
                    <div className="self-start">
                        <Image src="/check_mark.png" alt="check-mark" width={500} height={220}/>
                    </div>

                    <div className="flex flex-col items-center ">
                        <div className="flex flex-col items-start lg:self-start text-center mb-5 mx-2  w-full">
                            <span className="font-bold text-3xl lg:text-6xl text-black self-start "> Submission Successful </span>
                            <span className="font-bold text-md lg:text-2xl text-black"> Please <Link href="/Checkstatus" className="text-cusBlue"> check status </Link> after a few hours for any updates </span>
                        </div>

                        <div className="flex flex-col border-2 border-black rounded-xl radius-md text-center mb-3 px-5 lg:px-32 py-5 gap-6 w-full">
                            <span className="text-2xl text-black font-bold"> Your Booking Reference Number is </span>
                            <span className="font-bold text-5xl text-black"> {trackingNumber} </span>

                        </div>
                        <div className="flex flex-col border-2 border-black rounded-xl radius-md text-start mb-3 px-5 lg:px-32 py-5 gap-6 w-full">
                            <span className="text-3xl text-black font-bold text-start"> Reminders: </span>
                            <span className="ml-2 lg:ml-8 font-semibold text-xl text-black"> Please note that your reservation will only be approved once the down payment of {((parseFloat(searchParams.mainprice)) + parseFloat((searchParams.additionalprice))) * .1} pesos is made. Kindly send proof of payment through any of our social media channels. </span>
                            <span>
                                <div className="ml-2 lg:ml-8 font-semibold text-xl text-black">Instagram: @indigostudiosph</div>
                                <div className="ml-2 lg:ml-8 font-semibold text-xl text-black">Facebook: facebook.com/indigostudiosph</div>
                            </span>
                        </div>
                        <Link href="/">  
                            <button className="bg-cusBlue btn hover:bg-indigo-900 rounded-3xl w-40 mt-6 lg:w-56 lg:h-14 text-md lg:text-xl mb-6 text-white font-bold"> Back to Home </button>
                        </Link>
                    </div>
                </div>
            </div>
            </> )}
        </>
    )
}

export default Page;