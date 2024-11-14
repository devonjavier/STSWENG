'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { fetchMultiplePerson, fetchOneAppointment, fetchOneCustomer, fetchOnePerson, fetchOneService, fetchSelectedSchedule, fetchSelectedSchedules, fetchServices, deleteAppointment} from '@/utils/supabase/data'
import { useDebouncedCallback } from 'use-debounce';
import { schedule } from '@/utils/supabase/interfaces';
import Image from "next/image"
import Modal from './modal';

const formatDate = (dateString : any) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function DisplayPage() {

    const [trackingNumber, setTrackingNumber] = useState<number>(12) 
    const [isChecked, setIsChecked] = useState(false); // assume its false
    const [selectedService, setSelectedService] = useState("");
    const [selectedAdditionalService, setSelectedAdditionalService] = useState("None selected");

    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // for edit modal

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);  //for cancel modal
    const [selectedReason, setSelectedReason] = useState("");
    const [comments, setComments] = useState("");

    const [maincustomerfirstname, setmaincustomerfirstname] = useState(" "); // assume no customer
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(" "); // assume no customer
    const [maincustomerlastname, setmaincustomerlastname] = useState(" "); // assume no customer
    const [phonenumber, setPhonenumber] = useState(" "); // assume no customer
    const [emailaddress, setEmailaddress] = useState(" "); // assume no customer
    const [additionalRequests, setadditionalRequests] = useState(" "); // assume no request\
    const [additionalCustomersFirstname, setadditionalCustomersFirstname] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersMiddlename, setadditionalCustomersMiddlename] = useState<string[]>([]);// assume no addtional customer
    const [additionalCustomersLastname, setadditionalCustomersLastname] = useState<string[]>([]);// assume no addtional customer
    const [listofschedules,setlistofschedules] = useState<schedule[]>([])
    const [status, setStatus] = useState<string>("/check_mark.png");
    const [statusMessage , setStatusMessage] = useState<string>(" ");
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [totalAmountDue, setTotalAmountDue] = useState(0)
    const [isError, setIsError] = useState(false); 
    const trackingNumberChange = ((term:number) => {
        setTrackingNumber(term);
    });

    // Open/Close handlers for Edit Modal
    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => setIsEditModalOpen(false);

    // Open/Close handlers for Cancel Modal
    const handleOpenCancelModal = () => setIsCancelModalOpen(true);
    const handleCloseCancelModal = () => setIsCancelModalOpen(false);

    const handleSubmit = async () => {
        console.log('Selected reason:', selectedReason);
        console.log('Additional comments:', comments);

        try {
            await deleteAppointment(trackingNumber);
        } catch (error) {
            console.error(error);
        }
        handleCloseCancelModal();
        setIsContentVisible(false);
    };
    
    
    const fetchStatus = async () => {
    try {
        const getThatAppointment = await fetchOneAppointment(trackingNumber);

        if (!getThatAppointment || !getThatAppointment.length) {
            setIsError(true);  
            return;
        } 

        setIsError(false); 
        const status = getThatAppointment[0].status;
        
        if (status === "Pending") {
            setStatus("/pending_mark.png");
            setStatusMessage("Appointment Pending");
        } else if (status === "Accepted") {
            setStatus("/check_mark.png");
            setStatusMessage("Appointment Accepted");
        } else if (status === "Rejected") {
            setStatus("/ekis_mark.png");
            setStatusMessage("Appointment Rejected");
        }

        const appid = getThatAppointment[0].appointmentid;
        const mainCustomer = await fetchOneCustomer(appid, true);
        if (!mainCustomer || !mainCustomer.length) {
            setIsError(true);
            throw new Error('Main customer not found'); 
        }

        const mainCustomerDetails = await fetchOnePerson(mainCustomer[0].personid);
        if (!mainCustomerDetails || !mainCustomerDetails.length) {
            setIsError(true);
            throw new Error('Main customer details not found'); 
        }

        setTotalAmountDue(getThatAppointment[0].totalamountdue);
        if (getThatAppointment[0].additionalrequest == "")
            setadditionalRequests("No requests");
        else   
        setadditionalRequests(getThatAppointment[0].additionalrequest);

        setIsChecked(getThatAppointment[0].isparkingspotneeded);

        const selectedservice = await fetchOneService(parseInt(getThatAppointment[0].serviceid));
        setSelectedService(selectedservice[0].title);

        if (!Object.is(getThatAppointment[0].additionalserviceid, null)) {
            const additionalservice = await fetchOneService(parseInt(getThatAppointment[0].additionalserviceid));
            setSelectedAdditionalService(additionalservice[0].title);
        } else {
            setSelectedAdditionalService("None Selected");
        }

        setmaincustomerfirstname(mainCustomerDetails[0].firstname);
        setmaincustomermiddlename(mainCustomerDetails[0].middlename);
        setmaincustomerlastname(mainCustomerDetails[0].lastname);
        setPhonenumber(mainCustomerDetails[0].contactnumber);
        setEmailaddress(mainCustomerDetails[0].emailaddress);

        const additionalCustomers = await fetchOneCustomer(appid, false);
        let additionalcust = [];
        let additionalfirstnames = [];
        let additionalmiddlenames = [];
        let additionallastnames = [];

        for (let detail of additionalCustomers) {
            additionalcust = await fetchOnePerson(detail.personid);
            additionalfirstnames.push(additionalcust[0].firstname);
            additionalmiddlenames.push(additionalcust[0].middlename);
            additionallastnames.push(additionalcust[0].lastname);
        }

        setadditionalCustomersFirstname(additionalfirstnames);
        setadditionalCustomersMiddlename(additionalmiddlenames);
        setadditionalCustomersLastname(additionallastnames);

        const newSchedules = await fetchSelectedSchedule(appid);
        setlistofschedules(newSchedules);

        setTimeout(() => {
            setIsContentVisible(true);
        }, 0);
    } catch (error) {
        console.error(error);
        setIsError(true);
    }finally{
        setLoading(false);
    }
};

    const getStatus = async() => {
        if (isContentVisible) {
            setLoading(true);
            setIsContentVisible(false);
            setTimeout(fetchStatus, 300); 
        } else {
            setLoading(true);
            fetchStatus();
        }
    }
    const parseTimeString = (timeString: string): Date => {  // helper function
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
        return `${adjustedHours}:${formattedMinutes} ${suffix}`; // end
      };

    useEffect(() => {}, [trackingNumber]); 

    return (
        <>
            <div className='flex flex-col items-center lg:items-baseline lg:mt-16 lg:ml-48 font-araboto'>
                <span className='text-cusBlue font-black mb-2 mt-6 text-4xl lg:text-7xl ml-3'> Check Status </span>
                <span className='text-gray-400 font-light mb-6 text-md lg:text-xl ml-3'> Track your appointment here. </span>
                <span className='text-black font-medium mb-2 text-md lg:text-xl ml-3'> Reference Number: </span>
                <input placeholder="Input reference number" onChange={(e) => {trackingNumberChange(parseInt(e.target.value)); setIsError(false);  }}
                className={`text-cusBlue text-center ml-3 text-md lg:text-2xl font-medium w-[280px] lg:w-[480px] lg:h-[68px] py-2.5 bg-white rounded-[20px] 
                border ${isError ? 'border-red-600' : 'border-indigo-800'} justify-between items-center inline-flex`} type="number" />
                {isError && <span className="text-red-600 text-lg"></span>} 
                <button className="bg-cusBlue rounded-3xl ml-3 w-48 h-9 lg:w-56 lg:h-11 mt-5 lg:mt-8 px-0 text-white font-bold" onClick={() => getStatus()}> Check status </button>
            </div>

            {loading ? (
                <>
                    <div className="flex items-center justify-center min-h-screen">
                        <p className="text-gray-500 font-medium italic text-3xl">Loading...</p>
                    </div>;
                </>
            ) : (
                <>
                {isContentVisible && ( 
                <>
                    <div className='m-5'>
                        <hr />
                        <hr />
                        <hr />
                    </div>

                    <div className='flex flex-col items-center'>
                        <Image src={status} alt=" " width={80} height={80}/>
                        <span className="font-bold text-2xl lg:text-4xl text-black"> {statusMessage} </span>
                    </div>
                    
                    <div className="flex flex-row justify-center mb-6 p-5 lg:w-2/3 m-auto">
                        <div className='flex flex-col lg:flex-row w-full'>
                            <div className='flex flex-col w-full'>
                                <div className="flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl">
                                    <span className='text-black  font-bold mb-5 text-2xl lg:text-3xl'> Main Customer: </span>
                                    <div className='flex flex-col p-0 ml-12 my-0 mr-0'>
                                        <span className='text-black mb-5 text-md lg:text-xl mar '> <span className='font-bold'> Name</span>: {maincustomerfirstname} {maincustomermiddlename} {maincustomerlastname}</span>
                                        <span className='text-black mb-5 text-md lg:text-xl'> <span className='font-bold'> Contact number</span>: {phonenumber} </span>
                                        <span className='text-black mb-5 text-md lg:text-xl'> <span className='font-bold'> Email address:</span> {emailaddress} </span>
                                    </div>
                                </div>

                                <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl'>
                                    <span className='text-black font-bold text-2xl lg:text-3xl mr-16 my-6'> Additional Persons Involved: </span>
                                    <div className='flex flex-col p-0 my-0 mr-0'>
                                        {additionalCustomersFirstname.length === 0 ? (
                                            <span className='text-black text-md lg:text-xl font-semibold mb-5 ml-12 text-md'>None</span>
                                        ) : (
                                            additionalCustomersFirstname.map((firstName, i) => (
                                                <span className='text-black text-md lg:text-xl  mb-5 ml-12 text-md' key={i}>
                                                    <span className='font-semibold'>Person {i+1}: </span> {firstName} {additionalCustomersMiddlename[i]} {additionalCustomersLastname[i]}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                </div>

                                <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl'>
                                    <span className='text-black mb-5 text-2xl lg:text-3xl'> <span className='font-bold'>Parking Spot: </span> {isChecked ? "Yes" : "No"} </span>
                                </div>
                            </div>
                            
                            <div className='flex flex-col border-2 border-indigo-800 mt-5 rounded-lg p-4 drop-shadow-2xl lg:ml-4 w-full'>
                                <span className='text-black  font-bold mb-5 text-2xl lg:text-3xl'> Reservation Details: </span>
                                <span className='text-black mb-5 ml-7 text-md lg:text-xl'> <span className='font-bold'> Package Selection:</span> {selectedService}  </span>
                                <span className='text-black mb-5 ml-7 text-md lg:text-xl'> <span className='font-bold'> Additional Service:</span> {selectedAdditionalService}  </span>
                                
                                <span className='text-black mb-5 ml-7 text-md lg:text-xl'> <span className='font-bold'> Total Amount Due </span>: ₱{totalAmountDue}  </span>
                                <span className='text-black font-bold mb-2 ml-7 text-md lg:text-xl'> Appointment schedules: </span>
                                <div className='flex flex-col mb-4'>
                                    {listofschedules.map((schedule) => (
                                        <span key={schedule.scheduleid} className='text-black mb-5 ml-12  text-md'> <span className='font-bold'> Date: </span> {formatDate(schedule.date)} 
                                            <div>
                                                <span className='font-bold'>Time: </span> {formatTimeString(schedule.starttime)} - {formatTimeString(schedule.endtime)}
                                            </div>
                                        </span>
                                    ))}
                                </div>
                                <span className='text-black font-bold mb-5 ml-7  text-xl'> Additional Requests:  </span>
                                {}
                                <div className="flex flex-col ml-16">
                                    <span className='text-black mb-5 text-md'> {additionalRequests} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
          {/* Buttons to trigger modals */}
          <div className="flex items-start space-x-4 px-4 pb-4">  {/* Adjust buttons accordingly based on the details shown above these buttons */}
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
                            <input type="radio" name="reason" className="form-radio text-indigo-600" value="Change of Plans" onChange={(e) => setSelectedReason(e.target.value)} checked={selectedReason === 'Change of Plans'} />
                            <span className="ml-2 text-sm text-[#666666]">Change of Plans</span>
                        </label>

                        <label className="flex items-center">
                            <input type="radio" name="reason" className="form-radio text-indigo-600" value="Financial Reasons" onChange={(e) => setSelectedReason(e.target.value)} checked={selectedReason === 'Financial Reasons'} />
                            <span className="ml-2 text-sm text-[#666666]">Financial Reasons</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="reason" className="form-radio text-indigo-600" value="Scheduling Conflicts" onChange={(e) => setSelectedReason(e.target.value)} checked={selectedReason === 'Scheduling Conflicts'} />
                            <span className="ml-2 text-sm text-[#666666]">Scheduling Conflicts</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="reason" className="form-radio text-indigo-600" value="Found a Better Option" onChange={(e) => setSelectedReason(e.target.value)} checked={selectedReason === 'Found a Better Option'} />
                            <span className="ml-2 text-sm text-[#666666]">Found a Better Option</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="reason" className="form-radio text-indigo-600" value="Personal Reasons" onChange={(e) => setSelectedReason(e.target.value)} checked={selectedReason === 'Personal Reasons'} />
                            <span className="ml-2 text-sm text-[#666666]">Personal Reasons</span>
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="reason" className="form-radio text-indigo-600" value="Other" onChange={(e) => setSelectedReason(e.target.value)} checked={selectedReason === 'Other'} />
                            <span className="ml-2 text-sm text-[#666666]">Other</span>
                        </label>
                    </div>
                </fieldset>
                
                <div className="mb-6">
                    <label htmlFor="additional-comments" className="font-regular text-l mb-2 block text-[#4B27A8]">Additional Comments (if any)</label>
                    <textarea id="additional-comments" className="bg-white form-textarea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows={4} value={comments} onChange={(e) => setComments(e.target.value)} ></textarea>
                </div>
                
                <div className="flex justify-end mt-6">
                    <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-regular py-2 px-4 rounded-md items-right" style={{ backgroundColor: '#C00A0A'}} onClick={() => { handleSubmit();}}>Cancel Booking</button>
                </div>
            </form>
        </Modal>
        
                </>
            )}
                </>

                

            )
                // if not loading
            }
            
        </>
    )
}
