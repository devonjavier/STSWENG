'use client'

import Link from 'next/link'
import { fetchFAQs } from '@/utils/supabase/data';
import { useEffect, useState } from 'react';
import React from 'react';

interface QuestionAnswer {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [questionsAndAnswers,setquestionsAndAnswers] = useState([])

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  //fetch QandA from supabase
  useEffect(()=>{
    const getFAQs = async() => {
      const data = await fetchFAQs();
      setquestionsAndAnswers(data);
    }
    getFAQs();
  },[]);
  
  return (
    <div className="bg-white max-h-full">
      <div>
        <div className="flex flex-col lg:px-20 bg-white py-16">
          <h1 className="text-indigo-800 text-5xl font-bold self-start pb-5 pl-3">FAQs</h1>
          <p className="w-full lg:w-1/2 text-indigo-800 text-lg font-light pl-3">
            Have questions about our services or packages? Explore our FAQs for more information.
          </p>
        </div>
        <div className="flex flex-col justify-center items-start lg:px-96 lg:pb-20 w-full">
          <div className="flex flex-col gap-5 items-start w-full mb-5">
            {questionsAndAnswers.map((item, index) => (
              <div key={index} className="w-full">
                <div
                  onClick={() => handleToggle(index)}
                  className="btn text-white text-xl lg:text-2xl font-medium w-[320px] h-[50px] lg:w-[990px] lg:h-[68px] ml-4 mv-3 lg:mb-5 p-2.5 bg-indigo-900 rounded-[10px] justify-between items-center gap-2.5 inline-flex cursor-pointer hover:bg-purple-900"
                >
                  <span>{item['question']}</span>
                  <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''} text-lg`}>
                    &#9660;
                  </span>
                </div>
                {openIndex === index && (
                  <div className="bg-gray-200 text-black w-[320px] h-[50px] lg:w-[990px] lg:h-[68px] p-3 lg:p-5 rounded-[10px] mt-2 ml-4">
                    {item['answer']}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
            
            <div
                className="bg-cover bg-center h-screen flex flex-col justify-end relative lg:max-h-[620px] pb-24 pl-12 mx-auto"
                style={{ backgroundImage: "url('/contact_bg.jpg')" }}
            >
                <div className="flex flex-col ">
                    <h1 className="text-white text-4xl lg:text-5xl font-bold self-start">Can&apos;t find your question?</h1>
                    <p className="w-1/2 text-white text-lg font-light pt-4">
                    Don&apos;t hesitate to contact us through the following
                    </p>
                </div>

                <div className="flex pl-0 lg:pl-48 pb-2 pt-8">  
                    <a href="https://www.facebook.com/indigostudiosph" target="_blank" rel="noopener noreferrer">
                        <img className='w-[100px] h-[100px] object-fill rounded-[10px]' src="facebook.png" alt="facebook" />
                    </a>
                    <div>
                        <h1 className="text-white text-xl lg:text-4xl font-bold pt-6 mt-3">/IndigoStudiosPH</h1>
                    </div>
                </div>

                <div className="flex pl-48">
                    <a href="mailto:indigostudiosph@gmail.com">
                        <img className='hidden lg:block w-[120px] lgw-[100px] h-[100px] object-fill rounded-[10px]' src="email.png" alt="email" />
                    </a>
                    <div>
                        <h1 className="hidden lg:block text-white text-2xl lg:text-4xl font-bold pt-6">indigostudiosph@gmail.com</h1>
                    </div>
                </div>

                <div className="flex flex-col">
                    <Link href='/FAQs/SubmitTicket' className="hover:text-gray-400 transition duration-300 ease-in-out delay-300 text-white text-4xl lg:text-5xl font-bold self-start mt-6">
                    OR click here to send us a ticket!
                    </Link>
                    
                </div>
            </div>
        </div>
  );
};

export default FAQPage;
