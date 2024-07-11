
'use client'

import Image from "next/image"
import { useEffect } from "react"
import { fetchSchedule, addPeople, addOneAppointment, addCustomer} from '@/utils/supabase/data'

const Page = ({searchParams}:{
    searchParams: {
        schedules: string,
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
    useEffect(()=>{

        const addAppointment = async() =>{
            try {
                let dotheyneedparking: boolean;
                
                if(searchParams.needsparking == 'true') 
                    dotheyneedparking = true
                else
                    dotheyneedparking = false

                const addtheAppointment = await addOneAppointment(
                    searchParams.serviceid,
                    dotheyneedparking
                );

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
        // add the appointment to Appointment
        addAppointment();
        // add all customers to People
        addPerson();

    },[]);
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
                <span className="font-bold text-4xl text-black"> 5ZX3CAF </span>
            </div>

            <div>
                <span className="font-bold text-black"> Please <span className="text-cusBlue"> check status </span> after a few hours for any updates </span>
            </div>
            <button className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Back to Home </button>
        </div>
        
    </div>
    </>
  )
}

export default Page
