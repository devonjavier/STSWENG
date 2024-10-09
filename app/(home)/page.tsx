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
    <div className="relative bg-cover bg-center h-screen flex flex-col justify-end pb-16 pl-8 lg:pb-32 lg:pl-16 mx-auto" style={{ backgroundImage: "url('/home_bg.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Darkened the image bg */}
      <div className='lg:pt-96 lg:pl-20'>  
        <IntroText />
      </div>
    </div>
    <div className='bg-cusBlue '> 
      <div className='relative'>
        <Services />
      </div>
    </div>
      
    <div className='bg-white pt-5 lg:p-14 h-max flex flex-col justify-center relative pb-10 mb-0 mx-auto w-max'>
      <Team />
    </div>

    <div className='hidden lg:block flex justify-center lg:pb-20'>
      <Reviews />
    </div>
    <div className="relative bg-cover bg-center h-screen flex justify-center items-center" style={{ backgroundImage: "url('/home_collage.png')"}}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
      <HearTheDifferences />
    </div>
    </>
  )
}
