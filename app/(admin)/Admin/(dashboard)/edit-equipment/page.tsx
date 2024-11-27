'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import items from '@/app/data/items.json';
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect } from 'react';

type EquipmentItem = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  quantity: number;
};

const Page = () => {
  // Load equipment data from local storage or initialize with items.json
  const [equipmentList, setEquipmentList] = useLocalStorage<EquipmentItem[]>('equipmentData', items);

  useEffect(() => {
    // To make sure items.json is loaded into local storage on first visit if it's not already there
    if (equipmentList.length === 0) {
      setEquipmentList(items);
    }
  }, []);

  return (
    <div className="px-32 flex flex-col gap-8 mb-6 mt-20">
      <div>
        <h1 className="text-4xl font-bold text-black">Edit Equipment</h1>
        <p className="text-lg text-gray-600">Select an equipment to edit its details</p>
      </div>

      {/* Equipment List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {equipmentList.map((item) => (
          <div key={item.id} className="max-w-xs h-full bg-gray-100 shadow-md rounded-lg overflow-hidden flex flex-col">
            <img
              src={item.imgUrl}
              alt={item.name}
              className="w-full h-36 object-cover border-gray"
            />
            <div className="flex flex-col bg-gray-100 justify-between p-4 flex-grow">
              <div className="text-black flex justify-between items-baseline mb-2">
                <span className="text-md font-semibold">{item.name}</span>
                <span className="text-gray-500 text-xs">
                  {formatCurrency(item.price)}
                </span>
              </div>
              <div className="text-gray-500 mb-2 text-sm">
                {item.description}
              </div>
              <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
              <div className="mt-auto flex items-center justify-center">
              <Link href={`/Admin/edit-equipment/edit-page?id=${item.id}`} className="bg-indigo-800 p-4 mt-4 rounded-lg text-white font-bold hover:bg-indigo-600 transition w-full text-center">Edit Equipment</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
