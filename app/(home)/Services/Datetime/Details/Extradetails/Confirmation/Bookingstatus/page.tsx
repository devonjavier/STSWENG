
'use client'

import Image from "next/image"

const Page = ({searchParams}:{
    searchParams: {
        dates: string,
        timeslot1: string,
        timeslot2: string,
        serviceid: string,
        maincustomername: string,
        needsparking: string,
        additionalrequests: string,
        additionalCustomers: string
    }
}) => {
    const time = [1,2,3,4,5];
    const addCust = JSON.parse(searchParams.additionalCustomers);

    var newdates = JSON.parse(searchParams.dates) // this gets the array of strings


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
