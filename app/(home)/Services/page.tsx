'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { fetchImage, fetchServices } from '@/utils/supabase/data'
import { allService } from '@/utils/supabase/interfaces'
import { serialize } from 'v8';

export default function DisplayPage() {
    const [completeServices, setCompleteServices] = useState([]);
    const [loading, setLoading] = useState(true)
    const [image,setImage] = useState<string[]>([]);

    useEffect(() => {
        const getServices = async () => {
          try {
            const services = await fetchServices();
            setCompleteServices(services.filter((service:any) => service != undefined));

            let images = []
            services.map((data: any, i: any)=>{

                images[i] = async () =>{
                    let currentImage = await fetchImage((data.service).imageName);
                    console.log(currentImage.publicUrl);
                    setImage(image =>[...image,currentImage.publicUrl]);
                }

                images[i]();
            })
            

            const image1 = await fetchImage('service.png');
        
          } catch (error) {
            console.error('Error fetching services:', error);
          } finally {
            setLoading(false);
          }
        };

        getServices();
        
        
    }, []);

    console.log(completeServices);

    return (
        <>
            <div className='px-4 md:px-32 flex flex-col gap-4 md:gap-8 mb-6 mt-10 md:mt-20'>
                <div>
                    <div className='text-cusBlue text-4xl md:text-6xl font-bold'>
                        Book an Appointment
                    </div>
                    <div>
                        <span className='text-cusBlue'>Services </span>&gt; Details &gt; ExtraDetails &gt; Date & Time &gt; Confirmation &gt; Booking Status
                    </div>
                </div>
                
                {loading ? (
                <>
                    <div className='flex flex-col items-center'>
                        <span className="font-semibold text-4xl text-gray mt-14"> LOADING SERVICES... </span>
                    </div>
                </>
                ) : (
                    <>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 gap-y-10'>
                    
                    {completeServices ? (
                        completeServices.map((object:any, i:number) => {
                            const { service, serviceType } = object; // one object = service and serviceType
                            const serviceString = JSON.stringify(service);
                            const serviceTypeString = JSON.stringify(serviceType);
                            return (
                                <Link
                                    href={{
                                        pathname: '/Services/Details',
                                        query: { service: serviceString, serviceType:serviceTypeString}
                                    }}
                                    key={service.serviceid} 
                                >
                                    
                                    <div>
                                        <img
                                            className="w-full h-48 md:h-64 rounded-3xl shadow mb-5"
                                            src={image[i]}
                                            alt={service.title}
                                        />
                                    </div>
                                    <div className='text-black text-2xl md:text-3xl font-bold italic'>{service.title}</div>
                                    <div className='w-full text-cusBlue text-xl md:text-2xl font-light'>{service.description}</div>
                             
                                </Link>
                            );
                        })
                    ) : (
                        <p>No services available.</p>
                    )}
                </div>
                    </>
                )
                }
                
            </div>
        </>
    )
}
