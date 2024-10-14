'use client'
import React, { useState, useEffect } from 'react';
import Modal from './modal'; 

export default function DisplayPage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); 
  const [isContentVisible, setIsContentVisible] = useState(true); 

  // Open/Close handlers for Edit Modal
  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  // Open/Close handlers for Cancel Modal
  const handleOpenCancelModal = () => setIsCancelModalOpen(true);
  const handleCloseCancelModal = () => setIsCancelModalOpen(false);

  return (
    <div className="p-8">
      {/* Simulate content visible without API call */}
      {isContentVisible && (
        <div className='flex flex-col justify-end h-full'>
          {/* Buttons to trigger modals */}
          <div className="flex items-start space-x-4 px-4 pb-4">
            <button onClick={handleOpenEditModal} className="text-white px-4 py-2 rounded-md" style={{ backgroundColor: '#6A1B9A'}}> Edit Details</button>
            <button onClick={handleOpenCancelModal} className="bg-red-500 text-white px-4 py-2 rounded-md" style={{ backgroundColor: '#C00A0A'}}> Cancel Booking</button>
          </div>

          {/* Edit Modal */}
        <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
            <h2 className="text-l font-medium text-left mb-2 text-[#6A1B9A]">EDIT BOOKING</h2>
            <hr className="border-t border-gray-300 mb-2" />
            <form className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-[#4B27A8] mt-4">Main Customer</label>
                        <input type="text" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" placeholder="First name"/>
                        <input type="text" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" placeholder="Middle name"/>
                        <input type="text" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" placeholder="Last name"/>
                        <label className="block text-sm font-medium text-[#4B27A8] mt-4">Phone Number</label>
                        <input type="text" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" placeholder="Phone number"/>
                        <label className="block text-sm font-medium text-[#4B27A8] mt-4">Email Address</label>
                        <input type="email" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" placeholder="Email address"/>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-[#4B27A8] mt-4">Additional Request/s</label>
                            <input type="text" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" placeholder="N/A"/>
                            <label className="block text-sm font-medium text-[#4B27A8] mt-4">How many hours?</label>
                            <input type="number" className="bg-white mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2" defaultValue={4}/>
                            
                            <div className="flex items-center mt-4">
                                <label className="block text-sm font-medium text-[#4B27A8] mr-2">Do you need parking?</label>
                                <input type="checkbox" className="bg-white rounded text-indigo-600"/>
                            </div>
                            
                            <label className="block text-sm font-medium text-[#4B27A8] mt-4">Scheduled Date & Time</label>
                            <input type="datetime-local" className="bg-white mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"/>
                            </div>
                            </div>
                            
                            <div className="flex justify-end mt-6">
                                <button type="button" onClick={handleCloseEditModal} className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2">Close</button>
                                <button type="submit" className="text-white px-4 py-2 rounded-md" style={{ backgroundColor: '#6A1B9A' }}>Save Changes</button>
                                
                </div>
            </form>
        </Modal>


        <Modal isOpen={isCancelModalOpen} onClose={handleCloseCancelModal}>
    <h2 className="text-l font-medium text-left mb-2 text-[#E2483A]">CANCEL BOOKING</h2>
    <hr className="border-t border-gray-300" />
    <p className="text-left font-bold text-xl text-[#4B27A8] mt-2">Sorry you had to cancel!</p>
    <p className="text-left font-light text-sm mb-2"> We hope to see you again soon. Feel free to book with us in the future.</p>
    <hr className="border-t border-gray-300 mb-6" />
    <form>
      <fieldset>
        <legend className="font-thin text-l mb-4 text-[#4B27A8]">What is your reason for cancelling your booking with Indigo Studios PH?</legend>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <label className="flex items-center">
          <input type="radio" name="reason" className="form-radio text-indigo-600" />
            <span className="ml-2 text-sm text-[#666666]">Change of Plans</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="reason" className="form-radio text-indigo-600" />
            <span className="ml-2 text-sm text-[#666666]">Financial Reasons</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="reason" className="form-radio text-indigo-600" />
            <span className="ml-2 text-sm text-[#666666]">Scheduling Conflicts</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="reason" className="form-radio text-indigo-600" />
            <span className="ml-2 text-sm text-[#666666]">Found a Better Option</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="reason" className="form-radio text-indigo-600" />
            <span className="ml-2 text-sm text-[#666666]">Personal Reasons</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="reason" className="form-radio text-indigo-600" />
            <span className="ml-2 text-sm text-[#666666]">Other</span>
          </label>
        </div>
      </fieldset>
      <div className="mb-6">
        <label htmlFor="additional-comments" className="font-regular text-l mb-2 block text-[#4B27A8]">Additional Comments (if any)</label>
        <textarea id="additional-comments" className="bg-white form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={4}></textarea>
      </div>
      <div className="flex justify-end mt-6">
      <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-regular py-2 px-4 rounded-md items-right" style={{ backgroundColor: '#C00A0A'}} onClick={() => { handleCloseCancelModal();}}>Cancel Booking</button>
        </div>
    </form>
</Modal>

        </div>
      )}
    </div>
  );
}
