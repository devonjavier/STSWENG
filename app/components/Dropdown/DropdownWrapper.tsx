import React, { useState, MouseEvent } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Schedule {
  date: string;
  starttime: string;
  endtime: string;
  status: string | null;
}

interface DropdownProps {
  items: {
    startTimes: string[];
    endTimes: string[];
  };
  dateIndex: number;
  selectedDates: { date: string; selectedtime1?: string; selectedtime2?: string }[];
  setSelectedDates: React.Dispatch<React.SetStateAction<{ date: string; selectedtime1?: string; selectedtime2?: string }[]>>;
  openDropdown: string | null;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

interface DropdownWrapperProps {
  selectedDates: { date: string; selectedtime1?: string; selectedtime2?: string }[];
  setSelectedDates: React.Dispatch<React.SetStateAction<{ date: string; selectedtime1?: string; selectedtime2?: string }[]>>;
  schedules: Schedule[];
}

const DropdownWrapper: React.FC<DropdownWrapperProps> = ({ selectedDates, setSelectedDates, schedules }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  const getScheduleTimes = (selectedDate: string) => {
    const normalizedSelectedDate = normalizeDate(selectedDate);
    const filteredSchedules = schedules.filter(schedule => {
      const scheduleDate = normalizeDate(schedule.date);
      return scheduleDate.getTime() === normalizedSelectedDate.getTime() && (schedule.status === "Available");
    });
    const startTimes = filteredSchedules.map(schedule => schedule.starttime).sort((a, b) => parseTimeString(a).getTime() - parseTimeString(b).getTime());
    const endTimes = filteredSchedules.map(schedule => schedule.endtime).sort((a, b) => parseTimeString(a).getTime() - parseTimeString(b).getTime());
    return {
      startTimes,
      endTimes
    };
  };

  const itemsPerDate = selectedDates.map(selectedDateObj => getScheduleTimes(selectedDateObj.date));

const Dropdown: React.FC<DropdownProps> = ({ items, dateIndex, selectedDates, setSelectedDates, openDropdown, setOpenDropdown}) => {
  const isStartOpen = openDropdown === `start-${dateIndex}`;
  const isEndOpen = openDropdown === `end-${dateIndex}`;
  const toggleStartMenu = (e: MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(isStartOpen ? null : `start-${dateIndex}`);
  };
  const toggleEndMenu = (e: MouseEvent) => {
    e.preventDefault();
    setOpenDropdown(isEndOpen ? null : `end-${dateIndex}`);
  };

  const handleSelectStartTime = (item: string) => {
    const updatedDates = [...selectedDates];
    updatedDates[dateIndex].selectedtime1 = item;
    const endTime = updatedDates[dateIndex].selectedtime2;
    if (endTime && parseTimeString(endTime) <= parseTimeString(item)) {
      updatedDates[dateIndex].selectedtime2 = undefined;
    }
    setSelectedDates(updatedDates);
    setOpenDropdown(null);
  };

  const handleSelectEndTime = (item: string) => {
    const updatedDates = [...selectedDates];
    updatedDates[dateIndex].selectedtime2 = item;
    setSelectedDates(updatedDates);
    setOpenDropdown(null);
  };

  const parseTimeString = (timeString: string): Date => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);
    return date;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const startTime = selectedDates[dateIndex].selectedtime1;
  const filteredEndTimes = startTime
    ? items.endTimes.filter((endTime) => parseTimeString(endTime) > parseTimeString(startTime))
    : items.endTimes;

  return (
    <div className="flex flex-col">
      <div className='flex flex-row'>
        <div className='flex flex-col mr-20'>
          <span className='font-bold text-black'>{formatDate(selectedDates[dateIndex].date)}</span>
          <details className={`dropdown`} open={isStartOpen}>
            <summary className="dropdown-summary m-1 btn bg-white w-64 flex items-center justify-between cursor-pointer" onClick={toggleStartMenu}>
              <span className="text-left">{selectedDates[dateIndex].selectedtime1 || 'Select Start Time'}</span>
              <span><FaChevronDown /></span>
            </summary>
            {isStartOpen && (
              <ul className="dropdown-menu p-2 shadow menu z-[1] bg-white rounded-box w-64">
                {items.startTimes.map((item, index) => (
                  <li
                    key={index}
                    className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectStartTime(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </details>
        </div>
        <div className='flex flex-col mr-20'>
          <span className='font-bold text-black'>End</span>
          <details className={`dropdown`} open={isEndOpen}>
            <summary className="dropdown-summary m-1 btn bg-white w-64 flex items-center justify-between cursor-pointer" onClick={toggleEndMenu}>
              <span className="text-left">{selectedDates[dateIndex].selectedtime2 || 'Select End Time'}</span>
              <span><FaChevronDown /></span>
            </summary>
            {isEndOpen && (
              <ul className="dropdown-menu p-2 shadow menu z-[1] bg-white rounded-box w-64">
                {filteredEndTimes.map((item, index) => (
                  <li
                    key={index}
                    className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectEndTime(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </details>
        </div>
      </div>
    </div>
  );
};

  return (
    <div>
      {selectedDates.map((dateObj, index) => (
        <Dropdown
          key={index}
          items={itemsPerDate[index]}
          dateIndex={index}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
      ))}
    </div>
  );
};

export default DropdownWrapper;
