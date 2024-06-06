import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';


interface DateFormatterProps {
    dateString: string; // Define the correct type for setArrFunc
}

const DateFormatter: React.FC<DateFormatterProps>  = ({dateString}) => {
    
  const [formattedString, setFormattedString] = useState('');

  useEffect(() => {
    const dateStrings: string[] = JSON.parse(dateString);
    const dates = dateStrings.map((dateString: string) => parseISO(dateString));
    const formattedDates = dates.map((date: Date) => format(date, 'yyyy-MM-dd'));
    const newDateString = JSON.stringify(formattedDates);
    setFormattedString(newDateString);
  }, [dateString]);

  let theDates: string[] = [];
  
  try {
    theDates = JSON.parse(formattedString);
  } catch (error) {
    console.error('Error parsing formattedString:', error);
  }
  return (
    
    <div className='flex flex-col'>
        {theDates.map((date:string, i:number) => (
            <span className='text-cusBlue font-bold mb-2 ml-7'  text-md key={i}> {i+1}. {date} </span>
        ))}
    </div>
    
  );
};

export default DateFormatter;
