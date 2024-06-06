
'use client'

import Link from "next/link";

const page = ({searchParams}:{
    searchParams: {
        dates: string,
        timeslot1: string,
        timeslot2: string,
        maincustomername: string,
        needsparking: string,
        additionalrequests: string,
        additionalCustomers: string
    }
}) => {
    const time = [1,2,3,4,5];
    const addCust = JSON.parse(searchParams.additionalCustomers);

    function parkingChecker(needsparking:string){
        if(needsparking == "true")
            return true;
        else
            return false;
    }
  return (
    <>
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
        BOOKING SUCCESSFUL! 
    </div>
    </>
  )
}

export default page
