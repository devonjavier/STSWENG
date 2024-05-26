import React from 'react'

import Calendar from 'react-calendar'

const CustomCalendar = () => {
  return (
  <div className="flex justify-center items-center h-screen">
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl mb-4">My Custom Calendar</h1>
      <Calendar/ >
    </div>
  </div>
  )
}

export default CustomCalendar
