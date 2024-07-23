'use client'
import React, { useState } from 'react';
import '../scrollbarStyle.css';
import { useEffect } from 'react';
import { fetchFAQs } from '@/utils/supabase/data';
import { checkCookie } from '@/app/lib/actions';
import { editFAQs } from '@/app/lib/actions';
import { FAQ } from '@/utils/supabase/interfaces';

export default function EditFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getFAQs = async () => {

      const authenticated = await checkCookie();

      if(!authenticated){
        window.location.href = '/'
      } else {
        try {
          const data = await fetchFAQs();
          setFaqs(data as FAQ[]);
  
          console.log(data);
        } catch(error) {
          console.error('Error fetching services:', error);
        }
      }
    }

    getFAQs();
  }, []);
  
  const handleInputChange = (index: number, field: keyof FAQ, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editFAQs(faqs);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000); 
    } catch (error) {
      console.error('Error updating services:', error);
    }
    console.log('FAQs:', faqs);
  };

  const handleDelete = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const handleAddQuestion = () => {
    setFaqs([...faqs, { id: '', question: '', answer: '' }]);
  };

  return (
    <div className='bg-gray-100'>
      <div className="flex items-center justify-between ml-48 pt-8 mb-1.5 pr-48">
        <h1 className="text-4xl font-bold text-black">Edit FAQs</h1>
        <button
          type="button"
          className="bg-cusBlue font-bold text-white px-4 py-2 rounded-3xl w-40 mr-20"
          onClick={handleAddQuestion}>
          Add a question
        </button>
      </div>
      <p className="text-xs text-red-500 mt-1 ml-48">* indicates a required field</p>
      <div className="w-full flex flex-col items-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-screen space-y-6 pl-44 pr-64">
          <div className="max-h-[73vh] min-h-[73vh] overflow-y-auto w-full  max-w-full space-y-6 custom-scrollbar">
            {faqs.map((faq, index) => (
              <div key={index} className="flex items-start space-x-12 mr-10">
                <FAQCard
                  faq={faq}   
                  onInputChange={(field, value) => handleInputChange(index, field, value)}
                  onDelete={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6 ">
            <button type="button" className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl mr-2 w-40">Cancel</button>
            <button type="submit" className="bg-green-600 font-bold text-white px-4 py-2 rounded-3xl w-40">Save Changes</button>
          </div>
        </form>
      </div>
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg">
          FAQs Updated Successfully!
        </div>
      )}
    </div>
  );
}

interface FAQCardProps {
  faq: FAQ;
  onInputChange: (field: keyof FAQ, value: string) => void;
  onDelete: () => void;
}

const FAQCard: React.FC<FAQCardProps> = ({ faq, onInputChange, onDelete }) => {
  return (
    <div className="flex-1 w-max bg-white shadow-xl p-1 rounded-lg">
      <div className="flex justify-between items-center mb-4 p-4 pb-0">
        <div className="flex-1 mr-4">
          <label className="block text-gray-700 font-bold text-black">Question<span className="text-red-500"> *</span></label> 
          <input
            type="text"
            value={faq.question}
            onChange={(e) => onInputChange('question', e.target.value)}
            className="h-10 text-black border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full pl-3"
            required
          />
        </div>
      </div>
      <div className="p-4">
        <label className="block text-gray-700 font-bold text-black">Answer<span className="text-red-500"> *</span></label>
        <textarea
          value={faq.answer}
          onChange={(e) => onInputChange('answer', e.target.value)}
          className="text-black border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full h-48 pl-3 pt-2"
          required
        />
      </div>
      <div className="p-4 flex justify-end">
        <button type="button" className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl w-40" onClick={onDelete}>Delete Question</button>
      </div>
    </div>
  );
};