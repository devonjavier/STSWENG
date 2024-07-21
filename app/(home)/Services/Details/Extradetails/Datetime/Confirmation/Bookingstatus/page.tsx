
'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { addOneAppointment, addCustomer, updateSchedule, fetchOneAdditionalServiceWithTitle, fetchtrackingnumber} from '@/utils/supabase/data'
import Link from "next/link"
import { tracingChannel } from "diagnostics_channel"

const Page = ({searchParams}:{
    searchParams: {
        schedules: string,

        service: string,
        serviceType:string,

        maincustomerfirstname: string,
        maincustomermiddlename: string,
        maincustomerlastname: string,

        phonenumber: string,
        emailaddress: string,
        countAdditionalCustomers: number,

        needsparking: string,
        additionalrequests: string,
        additionalCustomersfirstnames: string, // JSON
        additionalCustomersmiddlenames: string, // JSON
        additionalCustomerslastnames: string, // JSON
        hours:number,
        additionalpackage:string
    }
}) => {
    const theService = JSON.parse(searchParams.service);
    const [trackingNumber, setTrackingNumber] = useState(10000);

    let appointentid;
    const [isProcessed, setIsProcessed] = useState(false);

    if(!isProcessed){
        const addAppointment = async() =>{
            try {
                const gettrackingnumber = await fetchtrackingnumber();
                setTrackingNumber(gettrackingnumber);

                let dotheyneedparking: boolean;
                
                if(searchParams.needsparking == 'true') 
                    dotheyneedparking = true
                else
                    dotheyneedparking = false

                const addtheAppointment = await addOneAppointment(
                    theService.serviceid,
                    dotheyneedparking,
                    gettrackingnumber,
                    searchParams.additionalrequests,
                    JSON.parse(searchParams.additionalpackage)
                );

                appointentid = addtheAppointment;

                let updating = []
                let count = 0

                const selectedschedules = JSON.parse(searchParams.schedules)

                for (const selectedsched of selectedschedules) {
                    updating[count] = await updateSchedule(
                        appointentid,
                        selectedsched.scheduleid,
                    );

                    count = count + 1;
                }

                const addMainCustomer = await addCustomer(
                    searchParams.maincustomerfirstname,
                    searchParams.maincustomermiddlename,
                    searchParams.maincustomerlastname,
                    searchParams.phonenumber,
                    searchParams.emailaddress,
                    true
                );

                let fnames: string[] = []
                let mnames: string[] = []
                let lnames: string[] = []
                let addAdditionalCustomer: any[] = []

                JSON.parse(searchParams.additionalCustomersfirstnames).map((name:string,index:number)=>{
                    fnames[index] = name;
                })

                JSON.parse(searchParams.additionalCustomersmiddlenames).map((name:string,index:number)=>{
                    mnames[index] = name;
                })

                JSON.parse(searchParams.additionalCustomerslastnames).map((name:string,index:number)=>{
                    lnames[index] = name;
                })

                let i;
                
                for(i=0;i<searchParams.countAdditionalCustomers;i++){
                    addAdditionalCustomer[i] = await addCustomer(
                        fnames[i],
                        mnames[i],
                        lnames[i],
                        searchParams.phonenumber,
                        searchParams.emailaddress,
                        false
                    );
                }

                } catch (error) {
                console.error('Error fetching services:', error);
        }
        }

        console.log(trackingNumber);

        addAppointment(); 
        setIsProcessed(true);

    }

    
    function parkingChecker(needsparking:string){
        if(needsparking == "true")
            return true;
        else
            return false;
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
                Services &gt; Date & Time &gt; Details  &gt; Confirmation &gt;<span className='text-cusBlue'> Booking Status</span> 
            </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/5 m-auto">
            <div className="self-start">
                <Image src="/check_mark.png" alt="check-mark" width={500} height={220}/>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-start self-start mb-5">
                    <span className="font-bold text-6xl text-black self-start "> Submission Successful </span>
                    <span className="font-bold text-2xl text-black"> Please <Link href = "/Checkstatus" className="text-cusBlue"> check status </Link> after a few hours for any updates </span>
                </div>
                <div className="flex flex-col border-2 border-black rounded-xl radius-md text-center mb-3 px-32 py-5 gap-6 w-full">
                    <span className="text-2xl text-black font-bold"> Your Booking Reference Number is </span>
                    <span className="font-bold text-5xl text-black"> {trackingNumber} </span>
                </div>
                <div className="flex flex-col border-2 border-black rounded-xl radius-md text-start mb-3 px-32 py-5 gap-6">
                    <span className="text-3xl text-black font-bold text-start"> Reminders: </span>
                    <span className="ml-8 font-semibold text-xl text-black"> Please note that your reservation will only be approved once the down payment is made. Kindly send proof of payment through any of our social media channels. </span>
                    <span>
                        <div className="ml-8 font-semibold text-xl text-black">Instagram: @indigostudiosph</div>
                        <div className="ml-8 font-semibold text-xl text-black">Facebook: facebook.com/indigostudiosph</div>
                    </span>
                </div>
            <div>
            </div>
            <Link 
                    href={{
                        pathname:"/",
                    }}>  
            <button className="bg-cusBlue btn hover:bg-indigo-900 rounded-3xl w-56 mt-8 h-20 text-xl text-white font-bold"> Back to Home </button> </Link>
            </div>
    

        </div>
        
    </div>
    </>
  )
}

export default Page
