'use client'
import React from 'react';
import { fetchAppointments } from '@/utils/supabase/data';
import { useState, useEffect } from 'react';
// import AdminLayout from '../../components/AdminLayout';

//sample dataset
const data = [
  { id: 1001, date: '05-26-2024', time: '9:00 AM', reservee: 'Juan Cruz', service: 'Recording', status: 'Done' },
  { id: 1002, date: '05-26-2024', time: '9:00 AM', reservee: 'Juan Cruz', service: 'Mixing', status: 'Pending' },
  { id: 1003, date: '05-27-2024', time: '9:00 PM', reservee: 'Juan Cruz', service: 'Production', status: 'Cancelled' },
];

const Page: React.FC = () => {
  
  const [reservations, setReservations] = useState(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getReservations() {

      try{
        const data = await fetchAppointments();
        setReservations(data);
      } catch(error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false)
      }
      
    }

    getReservations();
  }, []);

  if(loading){
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="p-24 pt-20">
        <div className="flex mb-4 mb-10">
          <input 
          type="text" 
          placeholder="Search..." 
          className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-72 pl-3"
          style={{borderRadius: '15px'}}/>
          <input type="text" 
          placeholder="Filter" 
          className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-3"  
          style={{marginLeft: '10px', borderRadius: '15px'}}/>
        </div>

        <table className="min-w-full bg-white border border-transparent shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
          <thead>
            <tr className="bg-cusBlue text-white text-left">
              <th className="border border-transparent px-4 py-2">ID</th>
              <th className="border border-transparent px-4 py-2">Date</th>
              <th className="border border-transparent px-4 py-2">Time</th>
              <th className="border border-transparent px-4 py-2">Reservee</th>
              <th className="border border-transparent px-4 py-2">Service</th>
              <th className="border border-transparent px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-cusBlue font-medium">
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`${row.status === 'Pending' ? 'bg-purple-100' : ''}`}
              >
                <td className="border border-transparent px-4 py-2">{row.id}</td>
                <td className="border border-transparent px-4 py-2">{row.date}</td>
                <td className="border border-transparent px-4 py-2">{row.time}</td>
                <td className="border border-transparent px-4 py-2">{row.reservee}</td>
                <td className="border border-transparent px-4 py-2">{row.service}</td>
                <td className="border border-transparent px-4 py-2">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
