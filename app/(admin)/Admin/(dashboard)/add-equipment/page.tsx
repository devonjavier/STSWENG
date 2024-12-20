'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { addItem } from '@/app/lib/actions';
import { fetchItem } from '@/utils/supabase/data';
import items from '@/app/data/items.json';
import { useRouter } from 'next/navigation';
import { Items } from '@/utils/supabase/interfaces';

const Page = () => {
  // Use items.json as the initial value for equipment data
  const [equipmentList, setEquipmentList] = useState<Items[]>([]);
  const [itemname, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const getItem = async () => {
      try {
        const data = await fetchItem();
        setEquipmentList(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    getItem();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Assuming you might want to store the file locally or upload it to a server. For now, we'll use a placeholder image URL.
    const imageName = imgFile ? URL.createObjectURL(imgFile) : '/placeholder.png';

    const newItem = {
      itemid: equipmentList.length + 1,
      itemname,
      description,
      price: parseFloat(price),
      imageName,
      quantity: parseInt(quantity.toString(), 10) || 0,
    };

    // Add new equipment to the database
    addItem(newItem);

    // Redirect to the edit page after saving
    router.push('/Admin/edit-equipment');
  };

  return (
    <div className="px-32 flex flex-col gap-8 mb-6 mt-20">
      <h1 className="text-4xl font-bold text-black">Add Equipment</h1>

      <form className="grid grid-cols-2 gap-20" onSubmit={handleSubmit}>
        <div className="mt-5">
          <label className="text-2xl font-bold text-indigo-800 mb-5 block">Item Name</label>
          <input
            type="text"
            placeholder="Name"
            value={itemname}
            onChange={(e) => setName(e.target.value)}
            className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl"
            required
          />
          <label className="text-2xl font-bold text-indigo-800 mb-5 block">Item Details</label>
          <input
            type="text"
            placeholder="Short description about the item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl"
            required
          />
        </div>
        <div className="mt-5">
          <label className="text-2xl font-bold text-indigo-800 mb-5 block">Price</label>
          <input
            type="number"
            placeholder="Numbers only"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl"
            required
          />
          <label className="text-2xl font-bold text-indigo-800 mb-5 block">Quantity</label>
          <input
            type="number"
            placeholder="0"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl"
          />
          <label className="text-2xl font-bold text-indigo-800 mb-5 block">Upload Item Image</label>
          <input type="file" onChange={handleImageUpload} className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl" accept="image/*"/>
        </div>
        <div className="col-span-2 flex justify-between">
          <Link
            href="/Admin/edit-equipment"
            className="bg-gray-300 p-5 rounded-full text-black font-bold text-xl"
          >
            Back
          </Link>
          <button
            type="submit"
            className="bg-indigo-800 p-5 rounded-full text-white font-bold text-xl"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
