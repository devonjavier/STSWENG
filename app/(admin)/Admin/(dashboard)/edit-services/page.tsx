'use client'
import React, { useState, useEffect } from 'react';
import '../scrollbarStyle.css';
import { fetchEditServices } from '@/utils/supabase/data';
import { Service } from '@/utils/supabase/interfaces';
import { checkCookie, editServices, uploadPhoto } from '@/app/lib/actions';

export default function EditServiceDetails() {
  const [services, setServices] = useState<Service[]>([]);
  const [originalServices, setOriginalServices] = useState<Service[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupColor, setPopupColor] = useState('bg-green-500');

  useEffect(() => {
    const getServices = async () => {
      const authenticated = await checkCookie();

      if (!authenticated) {
        window.location.href = '/';
      } else {
        try {
          const data = await fetchEditServices();
          console.log(data);
          setServices(data);
          setOriginalServices(data);
          console.log("AAHHHH!", data[0].imageUrl.publicUrl);
        } catch (error) {
          console.error('Error fetching services:', error);
        }
      }
    };

    getServices();
  }, []);

  const handleInputChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices: any = [...services];

    if (field === 'price') {
      updatedServices[index][field] = parseInt(value, 10); // Parse as an integer
    } else {
      updatedServices[index][field] = value;
    }

    setServices(updatedServices);
  };

  const handlePhotoChange = async (index: number, file: File) => {
    // file -> plain obj
    const plainFile = {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
      data: await fileToData(file) 
    };

    const { success, photoUrl } = await uploadPhoto(plainFile);
    if (success) {
      const updatedServices = [...services];
      updatedServices[index].imageName = file.name;
      setServices(updatedServices);
    } else {
      console.error('Error uploading photo');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editServices(services);
      setPopupMessage('Services updated successfully!');
      setPopupColor('bg-green-500');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        window.location.reload();
      }, 3000); 
    } catch (error) {
      console.error('Error updating services:', error);
    }
  };

  const handleCancel = () => {
    setPopupMessage('Cancelling changes');
    setPopupColor('bg-rose-700');
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      window.location.reload();
    }, 3000); 
  };

  return (
    <div className='bg-gray-100'>
      <h1 className="text-4xl font-bold text-black mb-1.5 text-left ml-48 pt-8">Edit service details</h1>
      <span className="text-red-500 text-sm ml-48">*</span><span> indicates a required field.</span>
      <div className="w-full flex flex-col items-center p-4 pb-0 pt-2">
        <form onSubmit={handleSubmit} className="w-full max-w-screen space-y-6 pl-44 pr-64">
          <div className="max-h-[73vh] min-h-[73vh] overflow-y-auto max-w-full space-y-6 custom-scrollbar">
            {services.map((service, index) => (
              <div key={index} className="flex items-start space-x-12 mr-16">
                <div className="w-24 h-24 bg-gray-200 flex flex-col justify-center items-center">
                  <img src={service.imageUrl.publicUrl} alt={service.title} className="w-24 h-24 object-cover mb-2" />
                  <label className="bg-cusBlue text-white px-2 py-1 rounded cursor-pointer">
                    Change Photo
                    <input
                      type="file"
                      onChange={(e) => e.target.files && handlePhotoChange(index, e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>

                <ServiceCard
                  service={service}
                  onInputChange={(field, value) => handleInputChange(index, field, value)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button type="button" className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl mr-2 w-40" onClick={handleCancel}>Undo Changes</button>
            <button type="submit" className="bg-green-600 font-bold text-white px-4 py-2 rounded-3xl w-40">Save Changes</button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className={`fixed top-4 right-4 ${popupColor} text-white font-bold py-2 px-4 rounded shadow-lg`}>
          {popupMessage}
        </div>
      )}
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  onInputChange: (field: keyof Service, value: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onInputChange }) => {
  return (
    <div className="flex-1 w-max bg-white shadow p-1 rounded-lg">
      <div className="flex justify-between items-center mb-4 p-4 pb-0">
        <div className="flex-1 mr-4">
          <label className="block text-gray-700 flex items-center">
            Title <span className="text-red-500 text-sm ml-1">*</span>
          </label>
          <input
            type="text"
            value={service.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            className="h-10 text-black border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-96 pl-3"
            required
          />
        </div>
        <div className="flex-1 ml-4">
          <label className="block text-gray-700 flex items-center">
            Price per hour <span className="text-red-500 text-sm ml-1">*</span>
          </label>
          <input
            type="number"
            step="1" 
            value={service.price}
            onChange={(e) => onInputChange('price', e.target.value)}
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-72 pl-3"
            required
          />
        </div>
      </div>
      <div className="p-4"> 
        <label className="block text-gray-700 flex items-center">
          Description <span className="text-red-500 text-sm ml-1">*</span>
        </label>
        <textarea
          value={service.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          className="border text-black border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full h-48 pl-3"
          required
        />
      </div>
    </div>
  );
};

const fileToData = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
