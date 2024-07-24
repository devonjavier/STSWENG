import Link from 'next/link'
import Services from '../components/Home/Services'
import { IntroText } from '../components/Home/IntroText'
import { Team } from '../components/Home/Team'
import Reviews from '../components/Home/Reviews'
import HearTheDifferences from '../components/Home/HearTheDifferences'
import { createClient } from '@/utils/supabase/server'



export default async function Home() {
  return (
    <>
    <div className="bg-cover bg-center h-screen flex flex-col justify-end relative pb-32 pl-16 mx-auto" style={{ backgroundImage: "url('/home_bg.jpg')" }}> 
      <div className='pt-96 pl-20'>  
        <IntroText />
      </div>
    </div>
    <div className='bg-cusBlue '> 
      <div className='relative'>
        <Services />
      </div>
    </div>
    <div className='bg-white p-14 h-max flex flex-col justify-center relative pb-10 mb-0 mx-auto w-max'>
      <Team />
    </div>
    <div className='flex justify-center pb-20'>
      <Reviews />
    </div>
    <div className="bg-cover bg-center h-screen flex justify-center items-center" style={{ backgroundImage: "url('/home_collage.png')"}}>
      <HearTheDifferences />
    </div>
    </>
  )
}
