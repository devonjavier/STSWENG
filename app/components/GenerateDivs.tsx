import React from 'react';

interface GenerateDivsProps {
  counter: number;
  setadditionalCustomersFirst: React.Dispatch<React.SetStateAction<string[]>>;
  setadditionalCustomersMiddle: React.Dispatch<React.SetStateAction<string[]>>;
  setadditionalCustomersLast: React.Dispatch<React.SetStateAction<string[]>>;
}

const GenerateDivs: React.FC<GenerateDivsProps> = ({ counter, setadditionalCustomersFirst, setadditionalCustomersMiddle, setadditionalCustomersLast }) => {
  
  const div: JSX.Element[] = [];

  const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setadditionalCustomersFirst(prevCustomers => {
      const updatedCustomers = [...prevCustomers];
      updatedCustomers[index] = value;
      return updatedCustomers;
    });
  };

  const handleMiddlenameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setadditionalCustomersMiddle(prevCustomers => {
      const updatedCustomers = [...prevCustomers];
      updatedCustomers[index] = value;
      return updatedCustomers;
    });
  };

  const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    setadditionalCustomersLast(prevCustomers => {
      const updatedCustomers = [...prevCustomers];
      updatedCustomers[index] = value;
      return updatedCustomers;
    });
  };

  for (let i = 0; i < counter; i++) {
    div.push(
      <> 
      <div className='flex flex-row text-center'>
      
      
      <span className='text-cusBlue text-xl mr-4'> Person {i + 1}: </span>

      <input
        onChange={(e) => handleFirstnameChange(e, i)}
        placeholder=" First name "
        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex'
        type="text" />
        
        <input
          onChange={(e) => handleMiddlenameChange(e, i)}
          placeholder=" Middle name "
          className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex'
          type="text" />
      
      <input
        onChange={(e) => handleLastnameChange(e, i)}
        placeholder=" Lastname "
        className='text-cusBlue text-center text-2xl font-medium w-[480px] h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex'
        type="text"/>

      </div>
      </>

    );
  }

  return (
  <div className='flex flex-col'>
    {div} 
  </div>

);
  
  
};

export default GenerateDivs;
