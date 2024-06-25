'use client'

import React, { useState } from 'react';

// Service card interface
interface Service {
  title: string;
  price: string;
  description: string;
}

export default function EditServiceDetails() {
  const [services, setServices] = useState<Service[]>([
    {
      title: 'Recording',
      price: '1,000.00',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis est, porttitor vitae dignissim sed, viverra eu',
    },
    {
      title: 'Mastering',
      price: '2,000.00',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis est, porttitor vitae dignissim sed, viverra eu',
    },
    {
        title: 'Dog',
        price: '3,000.00',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis est, porttitor vitae dignissim sed, viverra eu',
    },
  ]);

  const handleInputChange = (index: number, field: keyof Service, value: string) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Services:', services);
  };

  return (
    <div className='bg-gray-100'>
        <h1 className="text-2xl font-bold text-black mb-1.5 text-left ml-48 pt-8">Edit service details</h1>
        <div className="w-full flex flex-col items-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-screen space-y-6 px-64">
            <div className="max-h-[75vh] overflow-y-auto max-w-full space-y-6">
            {services.map((service, index) => (
                <div key={index} className="flex items-start space-x-12">
                <div className="w-24 h-24 bg-gray-200 flex flex-col justify-center items-center">
                    <img src="/random.png" alt="Service" className="w-24 h-24 object-cover mb-2" />
                    <button className="bg-purple-600 text-white px-2 py-1 rounded">Change Photo</button>
                </div>

                <ServiceCard
                    service={service}   
                    onInputChange={(field, value) => handleInputChange(index, field, value)}
                />
                </div>
            ))}
            </div>

            <div className="flex justify-center mt-6">
            <button type="button" className="bg-red-600 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
        </form>
        </div>
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
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={service.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-96 pl-3"
          />
        </div>
        <div className="flex-1 ml-4">
          <label className="block text-gray-700">Price per hour</label>
          <input
            type="text"
            value={service.price}
            onChange={(e) => onInputChange('price', e.target.value)}
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-72 pl-3"
          />
        </div>
      </div>
      <div className="p-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={service.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          className="border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full h-48 pl-3"
        />
      </div>
    </div>
  );
};
