import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
    <div>
        <div className='text-cusBlue text-6xl font-bold'>
            Book an Appointment
        </div>
        <div>
            Package &gt; <span className='text-cusBlue'>Date & Time </span> &gt; Details &gt; Confirmation
        </div>
    </div>

    <div>
        <div>

        </div>
        <div className='flex row'>
            <div >
                <span className='text-cusBlue font-bold'> Select a time </span>
                // put calendar here
            </div>  
            <div className='flex row'>
                <div>
                    Start
                </div>
                <div>
                    End
                </div>

            </div>

        </div>
    </div>
    
    </div>
    </>
  )
}

export default page