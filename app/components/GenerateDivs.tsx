import React from 'react';

interface GenerateDivsProps {
  counter: number;
  setadditionalCustomers: React.Dispatch<React.SetStateAction<string[]>>;
}

const GenerateDivs: React.FC<GenerateDivsProps> = ({ counter, setadditionalCustomers }) => {
  
  const divs: JSX.Element[] = [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setadditionalCustomers(prevCustomers => {
      const updatedCustomers = [...prevCustomers];
      updatedCustomers[index] = value;
      return updatedCustomers;
    });
  };

  for (let i = 0; i < counter; i++) {
    divs.push(
      <input
        key={`additionalcustomer-${i}`}
        onChange={(e) => handleInputChange(e, i)}
        id={`additionalcustomer-${i}`}
        name={`additionalcustomer-${i}`}
        placeholder=" ? "
        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex'
        type="text"
      />
    );
  }

  return <div className='flex flex-col'>{divs}</div>;
};

export default GenerateDivs;
