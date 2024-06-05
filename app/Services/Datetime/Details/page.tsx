'use client'
import Link from 'next/link'
import { createCustomer } from '@/app/lib/actions';
import { useState } from 'react';

const page = ({searchParams}:
    {
        searchParams:{
            dates:string
            timeslot1:string
            timeslot2:string
        }
    }
) => {

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
                Package &gt; Date & Time &gt; <span className='text-cusBlue'>Details  </span>&gt; Confirmation &gt; Booking Status
            </div>
        </div>
        <div className="flex flex-row">
            <form action={createCustomer}>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                     
                    <span className='text-cusBlue font-bold mb-5  text-lg'> Main Customer</span>
                    <input id='customername' name='customername'      placeholder = "Name (Autofill)" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    
                    <div className='flex flex-col'>
                        <div className="flex flex-row mt-5 mb-3 items-center">
                            <span className='text-cusBlue font-bold  text-lg mr-16'> Additional Persons Involved </span>
                            
                            <button className='rounded-full bg-cusBlue  w-[45px] h-[45px]'> - </button>
                            <input placeholder = "#" className='text-cusBlue text-center text-2xl font-medium w-[100px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                            <button className='rounded-full bg-cusBlue w-[45px] h-[45px]'> + </button>
                        </div>
                        <input id='additionalname1' name='additionalname1' placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                        <input id='additionalname2' name='additionalname2' placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                        <input id='additionalname3' name='additionalname3' placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />

                    </div>

                    <Link href="/Services/Datetime/Details" type="submit">  <button  className="bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold"> Proceed to Confirmation </button> </Link>

                </div>
                
                <div className='flex flex-col ml-28'>
                    <div className='flex flex-col'>
                        <span className='text-cusBlue font-bold mb-2 text-lg'> Additional Request/s</span>
                        <input id='additionalreq' name='additionalreq' placeholder = "----" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[250px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    </div>
                    <div>
                        <span className='text-cusBlue font-bold mb-2 text-lg'> Do you need parking? </span>
                        <input id='parking' name='parking' placeholder = "Yes/No" className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" />
                    </div>

                </div>

            </div>
            </form>
            
            <div>

            </div>
        </div>
        
    </div>
    </>
  )
}

export default page