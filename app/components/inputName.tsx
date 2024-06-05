
'use client';

import Link from 'next/link';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams.toString())
        if (term) {
          params.set('query', term);
        } else {
          params.delete('query');
        }
    
        replace(`${pathname}?${params.toString()}`);

    },300);

    return (
    <div>
        <input placeholder={placeholder} className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" 
            onChange={(e)=>{
                handleSearch(e.target.value);
            }}
        />
        
    </div>
    )
  }
