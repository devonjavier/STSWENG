import React, { useEffect } from 'react';

interface Schedule {
    appointmentid: number;
    date: string;
    endtime: string;
    scheduleid: number;
    starttime: string;
    status:string;
}

interface List {
  listofschedules: Schedule[];
}

const Schedules: React.FC<List> = ({ listofschedules }) => {

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined);
  };

  const parseTimeString = (timeString: string): Date => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);
    return date;
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

  useEffect(() => {
    console.log("listofschedules in useEffect:", listofschedules);
    listofschedules.forEach((schedule, index) => {
      console.log(`Schedule ${index}:`, schedule);
    });
  }, [listofschedules]);

  return (
    <div>
      {listofschedules.length > 0 ? (
        listofschedules.map((schedule: Schedule) => (
          <div key={schedule.scheduleid} className='text-black mb-5 text-md'>
            <div className='font-bold'>Date: {formatDate(schedule.date)}</div>
            <div>
              <span className='font-bold'>Time: </span> {formatTimeString(schedule.starttime)} - {formatTimeString(schedule.endtime)}
            </div>
          </div>
        ))
      ) : (
        <p>No schedules available</p>
      )}
    </div>
  );
};

export default Schedules;
