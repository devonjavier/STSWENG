import React from 'react'

const HearTheDifferences = () => {
  return (
    <div className='h-max w-max'>
        <div className='relative'>
        <div className='text-black text-5xl font-semibold absolute top-1/3 left-1/3 right-auto bottom-auto m-auto'>
            Hear the Difference
        </div>
        <div className='flex gap-6'>
            <div className='flex flex-col gap-8'>
                <div><img className = 'w-[480px] h-[225px] bg-zinc-300 rounded-[10px]' src="" alt="" /></div>
                <div className='flex gap-6'>
                    <div><img className = 'w-[280px] h-[281px] bg-zinc-300 rounded-[10px]' src="" alt="" /></div>
                    <div><img className = 'w-[180px] h-[281px] bg-zinc-300 rounded-[10px]' src="" alt="" /></div>
                </div>
            </div>
            <div><img className = 'w-[278px] h-[537px] bg-zinc-300 rounded-[10px]' src="" alt="" /></div>
            <div className='flex flex-col gap-5'> 
                <div><img className = 'w-[377px] h-[293px] bg-zinc-300 rounded-[10px]' src="" alt="" /></div>
                <div><img className = 'w-[377px] h-[225px] bg-zinc-300 rounded-[10px]' src="" alt="" /></div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HearTheDifferences