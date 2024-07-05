import React, { Dispatch, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface DropdownProps {
  items: Array<string>;
  dateIndex: number;
  selectedDates: {date: Date, selectedtime1: string, selectedtime2: string}[];
  setSelectedDates: Dispatch<{date: Date, selectedtime1: string, selectedtime2: string}[]>;
}

interface DropdownWrapperProps {
  items: string[]
  setArrFunc: Dispatch<{date: Date, selectedtime1: string, selectedtime2: string}[]>;
  selectedDates: {date: Date, selectedtime1: string, selectedtime2: string}[];
  setSelectedDates: Dispatch<{date: Date, selectedtime1: string, selectedtime2: string}[]>;
}

const Dropdown: React.FC<DropdownProps> = ({ items, dateIndex, selectedDates, setSelectedDates }) => {
  const [isStartOpen, setIsStartOpen] = useState<boolean>(false);
  const [isEndOpen, setIsEndOpen] = useState<boolean>(false);

  const toggleStartMenu = () => {
    setIsStartOpen(!isStartOpen);
  };

  const toggleEndMenu = () => {
    setIsEndOpen(!isEndOpen);
  };

  const handleSelectStartTime = (item: string) => {
    const updatedDates = [...selectedDates];
    updatedDates[dateIndex].selectedtime1 = item;
    setSelectedDates(updatedDates);
    setIsStartOpen(false);
  };

  const handleSelectEndTime = (item: string) => {
    const updatedDates = [...selectedDates];
    updatedDates[dateIndex].selectedtime2 = item;
    setSelectedDates(updatedDates);
    setIsEndOpen(false);
  };

  return (
    <div className="flex flex-col">
      <span className="text-cusBlue text-3xl font-bold">Select a time</span>
      <div className='flex flex-row'>
        <div className='flex flex-col mr-20'>
          <span className='font-bold text-black'>Start</span>
          <details className={`dropdown`} open={isStartOpen} onClick={toggleStartMenu}>
            <summary className="dropdown-summary m-1 btn bg-white w-64 flex items-center justify-between cursor-pointer">
              <span className="text-left">{selectedDates[dateIndex].selectedtime1 || 'Select Start Time'}</span>
              <span><FaChevronDown /></span>
            </summary>
            <ul className="dropdown-menu p-2 shadow menu z-[1] bg-white rounded-box w-64">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectStartTime(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </details>
        </div>
        <div className='flex flex-col mr-20'>
          <span className='font-bold text-black'>End</span>
          <details className={`dropdown`} open={isEndOpen} onClick={toggleEndMenu}>
            <summary className="dropdown-summary m-1 btn bg-white w-64 flex items-center justify-between cursor-pointer">
              <span className="text-left">{selectedDates[dateIndex].selectedtime2 || 'Select End Time'}</span>
              <span><FaChevronDown /></span>
            </summary>
            <ul className="dropdown-menu p-2 shadow menu z-[1] bg-white rounded-box w-64">
              {items.map((item, index) => (
                <li 
                  key={index} 
                  className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectEndTime(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </div>
  );
};

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ items, setArrFunc, selectedDates, setSelectedDates }) => {

  
  function checker(dates: Date){
    console.log(dates);
  }

  const handleClick = () =>{
    selectedDates.forEach(obj => {
        checker(obj.date); // Accessing the 'date' property of each object
    });
  }

  useEffect(() => {
    // Call setArrFunc with selectedDates whenever it changes
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]); // Include setArrFunc in the dependency array

  return (
    <div>
      {selectedDates.map((dateObj, index) => (
        <Dropdown
          key={index}
          items={items}
          dateIndex={index}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
      ))}

    <button onClick={handleClick}> CLICK ME</button>
    </div>
  );
};

export default DropdownWrapper;
