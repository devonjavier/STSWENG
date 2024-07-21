'use client'
import React, { useState, useEffect } from 'react';
import { fetchAppointments, fetchServices } from '@/utils/supabase/data';
import { reservation } from '@/utils/supabase/interfaces';
import '../scrollbarStyle.css';

const Page: React.FC = () => {
  const [reservations, setReservations] = useState<reservation[]>([]);
  const [services, setServices] = useState<{ title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function getReservations() {
      try {
        const data = await fetchAppointments();
        console.log("RESERVATIONS:", data);
        setReservations(data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    }

    async function getServices() {
      try {
        const data = await fetchServices();  // Fetch the list of services

        // Flatten the services data structure here
        const flattenedServices = data.map((service) => service.service);
        setServices(flattenedServices);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }

    getReservations();
    getServices();
  }, []);

  const filteredReservations = reservations.filter((reservation) => {
    const matchesStatus = filter === 'All' || reservation.status === filter;
    const matchesService = serviceFilter === 'All' || reservation.title === serviceFilter;
    const matchesSearch = reservation.reservee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesService && matchesSearch;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="p-24 pt-20 pb-2">
        <div className="flex mb-4 mb-10">
          <input 
            type="text" 
            placeholder="Search customer..." 
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-72 pl-3"
            style={{ borderRadius: '15px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-3 ml-2"
            style={{ borderRadius: '15px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select 
            className="h-10 border border-cusBlue bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 pl-3 ml-2"
            style={{ borderRadius: '15px' }}
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="All">All Services</option>
            {services.map((service, index) => (
              <option key={index} value={service.title}>{service.title}</option>
            ))}
          </select>
        </div>

        <div className="max-h-[72vh] overflow-y-auto rounded-3xl custom-scrollbar">
          <table className="max-h-[70vh] overflow-y-auto min-w-full bg-white border border-transparent shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
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
              {filteredReservations.map((reservation, index) => {
                console.log("HERE", reservation);
                return (
                  <tr
                    key={index}
                    className={`${reservation.status === 'Pending' ? 'bg-purple-100' : ''}`}
                  >
                    <td className="border border-transparent px-4 py-2">{reservation.appointmentid}</td>
                    <td className="border border-transparent px-4 py-2">{reservation.date}</td>
                    <td className="border border-transparent px-4 py-2">{reservation.starttime}</td>
                    <td className="border border-transparent px-4 py-2">{reservation.reservee}</td>
                    <td className="border border-transparent px-4 py-2">{reservation.title}</td>
                    <td className="border border-transparent px-4 py-2">{reservation.status}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>  
      </div>
    </>
  );
};

export default Page;
