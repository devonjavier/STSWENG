import Image from 'next/image'
import Link from 'next/link'
import Images from '../components/Home/Images'
import Services from '../components/Home/Services'
import { IntroText } from '../components/Home/IntroText'
import { Team } from '../components/Home/Team'
import Testimonials from '../components/Home/Testimonials'
import HearTheDifferences from '../components/Home/HearTheDifferences'
// import { createClient } from '@/utils/supabase/server'



export default async function Home() {
  return (
    <>
    <div className="bg-cover bg-center h-screen flex flex-col justify-end relative pb-32 pl-16 mx-auto" style={{ backgroundImage: "url('/home_bg.jpg')" }}>
      <div className="p-2 flex-grow flex flex-col justify-end pl-4 mt-[-2rem]">        
      <IntroText />
      </div>
    </div>
    <div className='bg-cusBlue '>
      <div className='relative'>
        <Services />
      </div>
    </div>
    <div className='bg-white p-14 h-max flex flex-col justify-center relative pt-8 pb-10 mb-0 mx-auto w-max'>
      <Team />
    </div>
    <div className='flex justify-center'>
      <Testimonials />
    </div>
    <div className="bg-cover bg-center h-screen flex justify-center items-center" style={{ backgroundImage: "url('/home_collage.png')"}}>
          <HearTheDifferences />
    </div>
    </>
  )
}
