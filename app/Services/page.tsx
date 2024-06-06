
import Link from 'next/link'
import React from 'react'
import { createClient } from '@/utils/supabase/server'

export default async function displayPage() {

    const supabase = createClient();
    const { data: services } = await supabase.from('Service').select()

    // console.log(await supabase.from('Service').select());

    return (
      <>
      <div className='px-32 flex flex-col gap-8 mb-6 mt-20'>
      <div>
          <div className='text-cusBlue text-6xl font-bold'>
              Book an Appointment
          </div>
          <div>
              <span className='text-cusBlue'>Package </span>&gt; Date & Time &gt; Details &gt; Confirmation
          </div>
      </div>
      
      <div className='grid grid-cols-2 gap-20 gap-y-10'>
          {services ? (
              services.map(service => (
                <Link href="/Services/Datetime" key={service.serviceid}>
                  <div><img className="w-full h-64 rounded-3xl shadow mb-5" src="" alt="" /></div>
                  <div className='text-black text-3xl font-bold'>{service.title}</div>
                  <div className='w-full text-cusBlue text-2xl font-light'><span className="font-bold">₱3500/3hr</span> in-person session with basic mix and mastering inclusion, where an...</div>
                </Link>
              ))
            ) : (
              <p>No services available. </p>
            )}
  
          {/* <Link href="/Services/Datetime">
              <div><img className = "w-full h-64 rounded-3xl shadow mb-5" src="" alt="" /></div>
              <div className='text-black text-3xl font-bold'>Recording Session</div>
              <div className='w-full text-cusBlue text-2xl font-light'><span className="font-bold">₱3500/3hr</span> in-person session with basic mix and mastering inclusion, where an...</div>
          </Link>
          <Link href="/Services/Datetime">
              <div><img className = "w-full h-64 rounded-3xl shadow mb-5" src="" alt="" /></div>
              <div className='text-black text-3xl font-bold'>Mix & Mastering</div>
              <div className='w-full text-cusBlue text-2xl font-light'>Online mix and mastering with free minor revisions for <span className="font-bold">₱2800</span> that provides...</div>
          </Link>
          <Link href="/Services/Datetime">
              <div><img className = "w-full h-64 rounded-3xl shadow mb-5" src="" alt="" /></div>
              <div className='text-black text-3xl font-bold'>RAW Audio Recording</div>
              <div className='w-full text-cusBlue text-2xl font-light'><span className="font-bold">₱1500/hr</span> RAW audio recording.</div>
          </Link>
          <Link href="/Services/Datetime">
              <div><img className = "w-full h-64 rounded-3xl shadow mb-5" src="" alt="" /></div>
              <div className='text-black text-3xl font-bold'>Beat / Instrumental Production </div>
              <div className='w-full text-cusBlue text-2xl font-light'>Original beat production for <span className="font-bold">₱3000</span>.</div>
          </Link> */}
  
      </div>
      <div>
          <Link className = "btn text-cusBlue text-2xl font-medium w-64 h-16 p-2.5 bg-white rounded-3xl border border-cusBlue justify-center items-center gap-2.5 inline-flex " href="">
              View All
          </Link>
      </div>
      </div>
      </>
    )
}





