import React, { Dispatch, useState, useEffect }from 'react';
import Dropdown from '@/app/components/Dropdown/DropdownWrapper';

interface GenerateDivsProps {
  setArrFunc: Dispatch<{date: Date, selectedtime1: string, selectedtime2: string}[]>;
}

const GenerateDivs: React.FC<GenerateDivsProps> = ({ setArrFunc }) => {

    const time: string[] = [];

    const startTime = 9 * 60; // 0900am
    const endTime = 21 * 60 + 30; //0930pm
    
    for (let minutes = startTime; minutes <= endTime; minutes += 30) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      const formattedMins = mins === 0 ? '00' : mins;
      time.push(`${formattedHours}:${formattedMins}${period}`);
    }

  const [selectedDates, setSelectedDates] = useState<{date: Date, selectedtime1: string, selectedtime2: string}[]>([]);

  const handleTime1Change = (targetDate: Date, newTime1: string, newTime2: string) => {

    setSelectedDates(prevDates => prevDates.map(dateObj => {
      if (dateObj.date === targetDate) {
          return {
              ...dateObj,
              selectedtime1: newTime1,
              selectedtime2: newTime2
          };
      }
      return dateObj;
      }));
  };

  const divs: JSX.Element[] = [];

  useEffect(() => {
    // Call setArrFunc with selectedDates whenever it changes
    setArrFunc(selectedDates);
  }, [selectedDates, setArrFunc]); // Include setArrFunc in the dependency array

  {selectedDates.map((date,index)=>{
    divs.push(
      <div className="flex flex-col">
      <span className="text-cusBlue text-3xl font-bold"> Select a time </span>
      <div className='flex flex-row'>
          <div className='flex flex-col mr-20 '>
              <span className='font-bold text-black'> Start </span>
              <Dropdown key={index} items={time} setArrFunc={setSelectedDates} targetdate={date}/>
          </div>
          <div className='flex flex-col mr-20 '>
          <span className='font-bold text-black' > End </span>
              <Dropdown key={index} items={time} setArrFunc={setSelectedDates} targetdate={date}/>
          </div>

      </div>
  </div>
    )
  })

  }

  return <div className='flex flex-col'>{divs}</div>;
};

export default GenerateDivs;
