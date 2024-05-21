import Image from 'next/image'
import Link from 'next/link'
import Images from './components/Home/Images'
import Services from './components/Home/Services'
import { IntroText } from './components/Home/IntroText'
import { Team } from './components/Home/Team'
import Testimonials from './components/Home/Testimonials'
import HearTheDifferences from './components/Home/HearTheDifferences'
export default function Home() {
  return (
    <>
    <div className='bg-white p-2 h-96 flex flex-col justify-end relative pb-10 mb-5 w-8/12 mx-auto'>
      <IntroText />
    </div>
    <div className='flex justify-center mb-20'>
      <Images />
    </div>
    <div className='bg-cusBlue '> 
      <div className='relative'>
        <Services />
      </div>
    </div>
    <div className='bg-white p-14 h-max flex flex-col justify-center relative pb-10 mb-0 mx-auto w-max'>
      <Team />
    </div>
    <div className='flex justify-center'>
      <Testimonials />
    </div>
    <div className='flex justify-center mb-20'>
      <HearTheDifferences />
    </div>
    </>
  )
}
