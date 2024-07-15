
'use client'

import Image from "next/image"
import { useEffect, useState } from "react"
import { fetchSchedule, addPeople, addOneAppointment, addCustomer, updateSchedule} from '@/utils/supabase/data'
import Link from "next/link"
import { tracingChannel } from "diagnostics_channel"

const Page = ({searchParams}:{
    searchParams: {
        schedules: string, // LISTOF ALL SCHEDS
        serviceid: string,

        maincustomerfirstname: string,
        maincustomermiddlename: string
        maincustomerlastname: string,

        phonenumber: string,
        emailaddress: string,

        countAdditionalCustomers:number,
        needsparking: string,
        additionalrequests: string,
        additionalCustomersfirstnames: string // JOSN
        additionalCustomersmiddlenames: string //JSON
        additionalCustomerslastnames: string //JSON
    }
}) => {

    const randomNumber = Math.random() * 9999;

    const [trackingNumber, setTrackingNumber] = useState(Math.round(randomNumber));
    //const [theAppointentid, setTheAppointentid] = useState();
    let appointentid;
    const [isProcessed, setIsProcessed] = useState(false);

    if(!isProcessed){
        const addAppointment = async() =>{
            try {
                let dotheyneedparking: boolean;
                
                if(searchParams.needsparking == 'true') 
                    dotheyneedparking = true
                else
                    dotheyneedparking = false

                const addtheAppointment = await addOneAppointment(
                    searchParams.serviceid,
                    dotheyneedparking,
                    trackingNumber,
                    searchParams.additionalrequests
                );

                appointentid = addtheAppointment;
                console.log(addtheAppointment);

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


                console.log(appointentid)

                } catch (error) {
                console.error('Error fetching services:', error);
        }
        }

        const addPerson = async() =>{
            try {
                // insert all customers to people
                // add customers
                const addMainCustomer = await addCustomer(
                    searchParams.maincustomerfirstname,
                    searchParams.maincustomermiddlename,
                    searchParams.maincustomerlastname,
                    searchParams.phonenumber,
                    searchParams.emailaddress,
                    true
                );

                console.log(addMainCustomer);

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

        //console.log(appointentid);
        console.log(trackingNumber);
        // add the appointment to Appointment
        addAppointment(); 
        
        // add all customers to People
        addPerson();
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
                Package &gt; Date & Time &gt; Details  &gt; Confirmation &gt;<span className='text-cusBlue'> Booking Status</span> 
            </div>
        </div>
        <div className="flex flex-col items-center">
            <Image src="/check_mark.png" alt="check-mark" width={150} height={130}/>
            <span className="font-bold text-4xl text-black my-3"> Submission Successful </span>

            <div className="flex flex-col border-2 border-black rounded-xl radius-md py-5 px-7 text-center mb-3">
                <span className="text-2xl text-black"> Your Booking Reference Number is </span>
                <span className="font-bold text-4xl text-black"> {trackingNumber} </span>
            </div>

            <div>
                <span className="font-bold text-black"> Please <span className="text-cusBlue"> check status </span> after a few hours for any updates </span>
            </div>
            <Link 
                    href={{
                        pathname:"/",
                    }}>  
            <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Back to Home </button> </Link>
        </div>
        
    </div>
    </>
  )
}

export default Page
