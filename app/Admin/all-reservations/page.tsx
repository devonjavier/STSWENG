'use client'
import React from 'react';
// import AdminLayout from '../../components/AdminLayout';

const data = [
  { id: 1001, date: '05-26-2024', time: '9:00 AM', reservee: 'Juan Cruz', service: 'Recording', status: 'Done' },
  { id: 1002, date: '05-26-2024', time: '9:00 AM', reservee: 'Juan Cruz', service: 'Mixing', status: 'Pending' },
  { id: 1003, date: '05-27-2024', time: '9:00 PM', reservee: 'Juan Cruz', service: 'Production', status: 'Cancelled' },
];

const Page: React.FC = () => {
  return (
    <>
      <div className="flex justify-between mb-4">
        <input type="text" placeholder="Search..." className="border p-2 rounded" />
        <input type="text" placeholder="Filter" className="border p-2 rounded" />
      </div>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Reservee</th>
            <th className="border px-4 py-2">Service</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{row.id}</td>
              <td className="border px-4 py-2">{row.date}</td>
              <td className="border px-4 py-2">{row.time}</td>
              <td className="border px-4 py-2">{row.reservee}</td>
              <td className="border px-4 py-2">{row.service}</td>
              <td className="border px-4 py-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Page;
