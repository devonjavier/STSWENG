'use client'

import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

const Page = () => {

    return(
        <div className="px-32 flex flex-col gap-8 mb-6 mt-20">
            <div>
                <div className='text-4xl font-bold text-black'>
                    Add Equipment
                </div>
            </div>

            <form className= 'grid grid-cols-2 gap-20'>
                <div className='mt-5'>
                    <div className='text-2xl font-bold text-indigo-800 mb-5'>Item Name</div>
                    <input type="text" placeholder='Name' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 mb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" required/>
                    <div className='text-2xl font-bold text-indigo-800 mb-5'>Item Details</div>
                    <input type="text" placeholder='Short description about the item' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 pb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" required/>
                </div>
                <div className='mt-5 max-w-96'>
                    <div className='text-2xl font-bold text-indigo-800 mb-5'>Price</div>
                    <input type="text" placeholder='Numbers only' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 mb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" required/>
                    <div className='text-2xl font-bold text-indigo-800 mb-5'>Upload Item Image</div>
                    <Link href=''>
                        <div className='rounded-lg p-5 bg-gray-200 text-center hover:bg-gray-400 hover:text-gray-400 transition ease-in-out'>
                            <span className='font-bold text-black text-xl'>Upload Image Here</span>
                            <div className='text-gray-600'>Supports: JPG, PNG</div>
                        </div>
                    </Link>    
                </div>
                <div className='mt-5'>
                    <Link href='/Admin/edit-equipment' className='bg-gray-300 p-5 rounded-full text-black font-bold text-xl hover:text-gray-300 hover:bg-gray-400 transition ease-in-out'>Back</Link>
                </div>
                <div className='text-right max-w-96'>
                    <input type="submit" value='Save Changes' className='bg-indigo-800 p-5 rounded-full text-white font-bold text-xl hover:text-gray-400 hover:bg-purple-900 transition ease-in-out'/>
                </div>
            </form>
        </div>
    );
}

export default Page;