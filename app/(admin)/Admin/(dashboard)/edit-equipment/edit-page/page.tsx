'use client'

import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { fetchOneItem, updateItem } from '@/utils/supabase/data';
import React from 'react';

const Page = ({ searchParams } : {searchParams : {itemid : string, itemquantity : string}}) => {

    const equipmentId = searchParams.itemid;
    const [itemName, setItemName] = useState("");
    const [itemDetails, setItemDetails] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [itemImage, setItemImage] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [popupColor, setPopupColor] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const loadItemDetails = async () => {
            if (equipmentId) {
                const data = await fetchOneItem(parseInt(equipmentId));
                if (data && !data.error) {
                    const item = data[0];
                    setItemName(item.itemname);
                    setItemDetails(item.description);
                    setItemPrice(item.price);
                    setItemQuantity(item.quantity);
                    setItemImage(item.imageName);
                } else {
                    console.error(data.error);
                }
            }
        };

        loadItemDetails();
    }, [equipmentId]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (equipmentId) {
            await updateItem(
                parseInt(equipmentId),
                itemName,
                itemPrice,
                itemQuantity,
                itemDetails,
                itemImage
            );
            
            setPopupMessage('Equipment updated successfully!');
            setPopupColor('bg-green-500');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                window.location.reload();
            }, 1000);
        }
    };

    return(
        <Suspense fallback = {<div>Loading...</div>}>
            <div className="px-32 flex flex-col gap-8 mb-6 mt-20">
                <div>
                    <div className='text-4xl font-bold text-black'>
                    Edit Equipment Details
                    </div>
                    <span className="text-red-500 text-sm ml-1">*</span><span> indicates a required field.</span>
                </div>

                <form onSubmit={handleSubmit} className= 'grid grid-cols-2 gap-20'>
                    <div className='mt-5'>
                        <div className='text-2xl font-bold text-indigo-800 mb-5'>Item Name <span className="text-red-500 text-sm ml-1">*</span></div>
                        <input type="text" placeholder='Insert Current Item Name' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 mb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" value={itemName} onChange={(e) => setItemName(e.target.value)} required/>
                        <div className='text-2xl font-bold text-indigo-800 mb-5'>Item Details <span className="text-red-500 text-sm ml-1">*</span></div>
                        <input type="text" placeholder='Insert Current Item Details' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 mb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" value={itemDetails} onChange={(e) => setItemDetails(e.target.value)} required/>
                    </div>
                    <div className='mt-5 max-w-96'>
                        <div className='text-2xl font-bold text-indigo-800 mb-5'>Price <span className="text-red-500 text-sm ml-1">*</span></div>
                        <input type="number" placeholder='Insert Current Price' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 mb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" value={itemPrice}
                            onChange={(e) => {
                                const value = Math.max(0, Number(e.target.value));
                                setItemPrice(value);
                            }} required/>
                        <div className='text-2xl font-bold text-indigo-800 mb-5'>Quantity <span className="text-red-500 text-sm ml-1">*</span></div>
                        <input type="number" placeholder='Insert Current Quantity' className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 mb-20 hover:bg-gray-300 hover:text-gray-400 transition ease-in-out" value={itemQuantity} 
                            onChange={(e) => {
                                const value = Math.max(0, Number(e.target.value));
                                setItemQuantity(value);
                            }} required/>
                        <div className='text-2xl font-bold text-indigo-800 mb-5'>Upload Item Image</div>
                        <div className='mt-5'>
                            {itemImage ? (
                                <img src={itemImage} className="w-1/2 h-32 object-contain mb-5" />
                            ) : (
                                <span className="text-gray-400">No image uploaded</span>
                            )}
                        </div>
                        <input type="file" className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl" accept="image/*" onChange={handleImageUpload}/>
                    </div>
                    <div className='mt-5'>
                        <Link href='/Admin/edit-equipment' className='bg-gray-300 p-5 rounded-full text-black font-bold text-xl hover:text-gray-300 hover:bg-gray-400 transition ease-in-out'>Back</Link>
                    </div>
                    <div className='text-right max-w-96'>
                        <input type="submit" value='Save Changes' className='bg-indigo-800 p-5 rounded-full text-white font-bold text-xl hover:text-gray-400 hover:bg-purple-900 transition ease-in-out'/>
                    </div>
                </form>
                {showPopup && (
                    <div className={`fixed top-4 right-4 ${popupColor} text-white font-bold py-2 px-4 rounded shadow-lg`}>
                    {popupMessage}
                    </div>
                )}
            </div>
        </Suspense>
    );
}

export default Page;
