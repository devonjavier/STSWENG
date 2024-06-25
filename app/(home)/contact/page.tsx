import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
       <div className='bg-cusBlue max-h-full'>
       <div>
        <div className='flex flex-col px-32 bg-white pb-10 pt-28'>
            <div>
                <div className='text-indigo-800 text-5xl font-bold place-self-center'>Get in Touch</div>
            </div>
            <div className='flex w-full justify-between'>
                <div className='w-1/2 text-indigo-800 text-2xl font-light pb-28'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  felis est, porttitor vitae dignissim sed, viverra eu ex. </div>
                <div className='justify-self-end'>
                    <Link className='btn text-white text-2xl font-medium w-[250px] h-[65px] p-2.5 bg-indigo-800 rounded-[50px] justify-center items-center gap-2.5 inline-flex' href="">View FAQs</Link>
                </div>
            </div>
            <div className='flex flex-col items-center justify-center gap-6 w-full'>
                <div className='flex gap-4 '>
                    <div><input className = "w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex "type="text" /></div>
                    <div><input className = "w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex "type="text" /></div>
                </div>
                <div className='flex flex-col items-end gap-6'>
                    <textarea className = "w-[980px] h-[231px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex" />
                    <div className='self-end'><Link className='btn text-white text-2xl font-medium w-[250px] h-[65px] p-2.5 bg-indigo-800 rounded-[50px] justify-center items-center gap-2.5 inline-flex' href="">Submit</Link></div>
                    </div>
                
            </div>
        </div>
        <div></div>
       </div>
        <div className='flex flex-col justify-center items-center px-32 py-10'>
            <div className='text-white text-5xl font-bold self-start pb-5'>FAQs</div>
            <div className='flex flex-col gap-2.5 items-center'>
                <Link href="" className='btn text-white text-2xl font-medium w-[980px] h-[68px] p-2.5 bg-indigo-900 rounded-[20px] justify-center items-center gap-2.5 inline-flex'>Question</Link>
                <Link href="" className='btn text-white text-2xl font-medium w-[980px] h-[68px] p-2.5 bg-indigo-900 rounded-[20px] justify-center items-center gap-2.5 inline-flex'>Question</Link>
                <Link href="" className='btn text-white text-2xl font-medium w-[980px] h-[68px] p-2.5 bg-indigo-900 rounded-[20px] justify-center items-center gap-2.5 inline-flex'>Question</Link>
                <Link href="" className='btn text-white text-2xl font-medium w-[980px] h-[68px] p-2.5 bg-indigo-900 rounded-[20px] justify-center items-center gap-2.5 inline-flex'>Question</Link>
                <Link href="" className='btn text-white text-2xl font-medium w-[980px] h-[68px] p-2.5 bg-indigo-900 rounded-[20px] justify-center items-center gap-2.5 inline-flex'>Question</Link>
            </div>
        </div>
       </div>
    </>
  )
}

export default page