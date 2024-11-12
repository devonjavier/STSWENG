'use client'

import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

const Page = () => {

    return(
        <div className="px-32 flex flex-col gap-8 mb-6 mt-20">
            <div>
                <div className='text-4xl font-bold text-black'>
                    Edit Equipment
                </div>
                <div>
                    Select an equipment to edit their details
                </div>
            </div>

            <div className= 'grid grid-cols-4 gap-4'>
                <Link href="/Admin/edit-equipment/edit-page">gay</Link>
                <span>gay</span>
            </div>
        </div>
    );
}

export default Page;