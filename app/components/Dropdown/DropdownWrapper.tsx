import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';


interface Schedule {
  date: string;
  starttime: string;
  endtime: string;
  status: string | null;
}

interface DropdownProps {
  items: {
    validStartTimes:string[];
    validEndTimes:(startTime?: string | undefined) => string[];
  };

  dateIndex: number;
  selectedDates: { date: string; selectedtime1?: string; selectedtime2?: string }[];
  setSelectedDates: React.Dispatch<React.SetStateAction<{ date: string; selectedtime1?: string; selectedtime2?: string }[]>>;
  openDropdown: { [key: string]: boolean };
  setOpenDropdown: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  maxHours: number;
}

interface DropdownWrapperProps {
  selectedDates: { date: string; selectedtime1?: string; selectedtime2?: string }[];
  setSelectedDates: React.Dispatch<React.SetStateAction<{ date: string; selectedtime1?: string; selectedtime2?: string }[]>>;
  schedules: Schedule[];
  hours: number;
  items:string[]
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ selectedDates, setSelectedDates, schedules, hours }) => {
  const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastDropdownKey = `end-${selectedDates.length - 1}`;
    if (openDropdown[lastDropdownKey] && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [openDropdown, selectedDates.length]);

  const normalizeDate = (date: string): Date => {
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj;
  };

  const parseTimeString = (timeString: string): Date => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);
    return date;
  };

  const formatTime = (date: Date): string => {
    return date.toTimeString().split(' ')[0].substring(0, 5);
  };

  const formatTimeString = (timeString: string): string => {
    const date = parseTimeString(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    const adjustedHours = hours % 12 === 0 ? 12 : hours % 12; 
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const suffix = isPM ? 'PM' : 'AM';
    return `${adjustedHours}:${formattedMinutes} ${suffix}`;
  };

  const calculateTimeDifferenceInHours = (startTime: string, endTime: string): number => {
    const startDate = parseTimeString(startTime);
    const endDate = parseTimeString(endTime);
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  };

  const filterTimes = (startTimes: string[], endTimes: string[], maxHours: number) => {
    const validStartTimes = startTimes.filter(startTime =>
      endTimes.some(endTime => calculateTimeDifferenceInHours(startTime, endTime) <= maxHours)
    );

    const validEndTimes = (startTime?: string) => endTimes.filter(endTime =>
      startTime ? (parseTimeString(endTime) > parseTimeString(startTime) && calculateTimeDifferenceInHours(startTime, endTime) <= maxHours) : true
    );

    return { validStartTimes, validEndTimes };
  };

  const getScheduleTimes = (selectedDate: string) => {
    const normalizedSelectedDate = normalizeDate(selectedDate);
    const filteredSchedules = schedules.filter(schedule => {
      const scheduleDate = normalizeDate(schedule.date);
      return scheduleDate.getTime() === normalizedSelectedDate.getTime() && schedule.status === "Available";
    });

    const startTimes = filteredSchedules.map(schedule => schedule.starttime)
      .sort((a, b) => parseTimeString(a).getTime() - parseTimeString(b).getTime());
    const endTimes = filteredSchedules.map(schedule => schedule.endtime)
      .sort((a, b) => parseTimeString(a).getTime() - parseTimeString(b).getTime());

    return filterTimes(startTimes, endTimes, hours);
  };

  const itemsPerDate = selectedDates.map(selectedDateObj => getScheduleTimes(selectedDateObj.date));

  const Dropdown: React.FC<DropdownProps> = ({ items, dateIndex, selectedDates, setSelectedDates, openDropdown, setOpenDropdown, maxHours }) => {
    const isStartOpen = openDropdown[`start-${dateIndex}`];
    const isEndOpen = openDropdown[`end-${dateIndex}`];

    const toggleDropdown = (type: 'start' | 'end', e: React.MouseEvent) => {
      e.preventDefault();
      setOpenDropdown({ [`${type}-${dateIndex}`]: !openDropdown[`${type}-${dateIndex}`] });
    };

    const handleSelectTime = (type: 'start' | 'end', item: string) => {
      const updatedDates = [...selectedDates];
      if (type === 'start') {
        updatedDates[dateIndex].selectedtime1 = item;
        const endTime = updatedDates[dateIndex].selectedtime2;
        if (endTime && (parseTimeString(endTime) <= parseTimeString(item) || calculateTimeDifferenceInHours(item, endTime) > maxHours)) {
          updatedDates[dateIndex].selectedtime2 = undefined;
        }
      } else {
        updatedDates[dateIndex].selectedtime2 = item;
      }
      setSelectedDates(updatedDates);
      setOpenDropdown({});
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    };

    const startTime = selectedDates[dateIndex].selectedtime1;
    const filteredEndTimes = items.validEndTimes(startTime);

    return (
      <div className='flex flex-row space-x-8 mt-4'>
        <div className='flex flex-col w-full relative'>
          <span className={`font-semibold w-full text-neutral-400 ${!selectedDates[dateIndex].selectedtime1 ? '' : ''}`}>{formatDate(selectedDates[dateIndex].date)}</span>
          <span className='pl-1 text-sm w-full font-bold text-black'>Start</span>
          <details className="dropdown" open={isStartOpen}>
            <summary
              className="dropdown-summary m-1 bg-white w-48 flex items-center justify-between cursor-pointer p-3 border rounded-lg shadow-sm transition duration-400 ease-in-out transform active:scale-110"
              onClick={(e) => toggleDropdown('start', e)}>
              <span className="text-left">{selectedDates[dateIndex].selectedtime1? formatTimeString(selectedDates[dateIndex].selectedtime1) : 'Select Time'}</span>
              <span><FaChevronDown /></span>
            </summary>
              {isStartOpen && (
                <ul className="dropdown-menu2 p-2 shadow menu z-[1] bg-white rounded-lg w-48">
                  {items.validStartTimes.map((item:any, index:number) => (
                    <li
                      key={index}
                      className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectTime('start', item)}>
                      {formatTimeString(item)}
                    </li>
                  ))}
                </ul>
              )}
          </details>
        </div>

        <div className='flex flex-col w-full relative'>
          <span className='pl-1 text-sm font-bold text-black pt-6'>End</span>
          <details className="dropdown" open={isEndOpen}>
          <summary
              className="dropdown-summary m-1 bg-white w-48 flex items-center justify-between cursor-pointer p-3 border rounded-lg shadow-sm transition duration-200 ease-in-out transform active:scale-95"
              onClick={(e) => toggleDropdown('end', e)}>
              <span className="text-left">{selectedDates[dateIndex].selectedtime2? formatTimeString(selectedDates[dateIndex].selectedtime2) : 'Select Time'}</span>
              <span><FaChevronDown /></span>
            </summary>
            {isEndOpen && (
              <ul className={`dropdown-menu2 p-2 shadow menu z-[1] bg-white rounded-lg w-48 ${selectedDates[dateIndex].selectedtime1 ? '' : 'disabled'}`}>
                {filteredEndTimes.map((item:any, index:number) => (
                  <li
                    key={index}
                    className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectTime('end', item)}>
                    {formatTimeString(item)}
                  </li>
                ))}
              </ul>
            )}
          </details>
        </div>
      </div>
    );
  };

  const containerClass = selectedDates.length >= 4 ? 'scrollable-container' : '';

  return (
    <div>
      <div ref={containerRef} className={`border-4 rounded-3xl p-8 drop-shadow-md ${containerClass} min-w-[500px]`}>
        <span className="text-black text-xl font-semibold mb-4 block">Select a time</span>
        {selectedDates.map((dateObj, index) => (
          <Dropdown
            key={index}
            items={itemsPerDate[index]}
            dateIndex={index}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            maxHours={hours}
          />
        ))}
      </div>
    </div>
  );
};

export default DropdownWrapper;