'use client'
import React, { useState } from 'react';
import '../scrollbarStyle.css';

interface FAQ {
  question: string;
  answer: string;
}

export default function EditFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      question: 'What are the payment methods?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis est, porttitor vitae dignissim sed, viverra eu',
    },
    {
      question: 'Is a parking spot provided?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis est, porttitor vitae dignissim sed, viverra eu',
    },
  ]);

  const handleInputChange = (index: number, field: keyof FAQ, value: string) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('FAQs:', faqs);
  };

  const handleDelete = (index: number) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const handleAddQuestion = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  return (
    <div className='bg-gray-100'>
      <div className="flex items-center justify-between ml-48 pt-8 mb-1.5 pr-48">
        <h1 className="text-4xl font-bold text-black">Edit FAQs</h1>
        <button
          type="button"
          className="bg-cusBlue font-bold text-white px-4 py-2 rounded-3xl w-40 mr-20"
          onClick={handleAddQuestion}
        >
          Add a question
        </button>
      </div>
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
          <label className="block text-gray-700 font-bold text-black">Question</label>
          <input
            type="text"
            value={faq.question}
            onChange={(e) => onInputChange('question', e.target.value)}
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full pl-3"
          />
        </div>
      </div>
      <div className="p-4">
        <label className="block text-gray-700 font-bold text-black">Answer</label>
        <textarea
          value={faq.answer}
          onChange={(e) => onInputChange('answer', e.target.value)}
          className="border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-full h-48 pl-3 pt-2"
        />
      </div>
      <div className="p-4 flex justify-end">
        <button type="button" className="bg-rose-700 font-bold text-white px-4 py-2 rounded-3xl w-40" onClick={onDelete}>Delete Question</button>
      </div>
    </div>
  );
};
