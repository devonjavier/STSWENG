'use client'; 
import Link from 'next/link'; 
import { MouseEvent, SetStateAction, useEffect, useState } from 'react'; 
import './page.css'; 
import { forTheErrors } from '@/utils/supabase/interfaces';
import { FaChevronDown } from 'react-icons/fa'; 
import { fetchAdditionalServices, fetchOneAdditionalService } from '@/utils/supabase/data'; 


const Page = ({ searchParams }: { searchParams: { service: string , serviceType:string} }) => { 
    const [isChecked, setIsChecked] = useState(false); 
    const [maincustomerfirstname, setmaincustomerfirstname] = useState(""); 
    const [maincustomermiddlename, setmaincustomermiddlename] = useState(""); 
    const [maincustomerlastname, setmaincustomerlastname] = useState(""); 
    const [phonenumber, setPhonenumber] = useState(""); 
    const [emailaddress, setEmailaddress] = useState(""); 
    const [additionalRequests, setadditionalRequests] = useState(""); 
    const [isOpen, setIsOpen] = useState(false); 
    const [selectedPackage, setSelectedPackage] = useState(""); 
    const [hours, setHours] = useState(4); 

    const theService = JSON.parse(searchParams.service); 
    const serviceTypeString = JSON.parse(searchParams.serviceType); 
    
    const [packages,setPackages] = useState<any[]>([]); 
    const [errors, setErrors] = useState<forTheErrors>({
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      }); // Object to hold error messages
    
    const [submitted, setSubmitted] = useState(false); // Track if form was submitted 

    const getServices = async () => { 
        try { 
            const additionalservices = await fetchAdditionalServices(parseInt(theService.serviceid)); 
            const additionalservicegetdetails = []; 
            for (const additionalservice of additionalservices) { 
                let getadditionalservicedetail = await fetchOneAdditionalService(additionalservice.serviceid); 
                additionalservicegetdetails.push(getadditionalservicedetail[0]); 
            } 

            setPackages(additionalservicegetdetails.map(service => service.title)); 
        } catch (error) { 
            console.error('Error fetching services:', error); 
        } 
    }; 

    const toggleDropdown = (e:any) => { 
        e.preventDefault(); 
        setIsOpen(!isOpen); 
    }; 

    const handleSelectPackage = (item: SetStateAction<string>) => { 
        setSelectedPackage(item); 
        setIsOpen(false); 
    };

    const changeHours = (item: number) => { 
        setHours(item); 
    };

    const handleCheckboxChange = (e: any) => { 
        setIsChecked(e.target.checked); 
    }; 

    const capitalizeFirstLetter = (e: string) => {
        return e.replace(/\b\w+/g, (word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
    };
    

    const validateForm = () => {
        let tempErrors:forTheErrors = {
            firstName: '',
            middleName: '',
            lastName: '',
            phoneNumber: '',
            email: ''
        };

        // Validate required fields
        if (!maincustomerfirstname.trim()) {
            tempErrors.firstName = "First Name is required";
        } else if (!/^[a-zA-Z ]+$/.test(maincustomerfirstname)) {
            tempErrors.firstName = "First Name must contain only letters and spaces";
        }

        if (maincustomermiddlename.trim()){
            if (!/^[a-zA-Z ]+$/.test(maincustomermiddlename)) {
            tempErrors.middleName = "Middle Name must contain only letters and spaces";
            }
        }

        if (!maincustomerlastname.trim()) {
            tempErrors.lastName = "Last Name is required";
        } else if (!/^[a-zA-Z ]+$/.test(maincustomerlastname)) {
            tempErrors.lastName = "Last Name must contain only letters and spaces";
        }
        
        if (!phonenumber.trim()) {
            tempErrors.phoneNumber = "Phone Number is required";
        } else if (!/^\d+$/.test(phonenumber)) {
            tempErrors.phoneNumber = "Phone Number must be numeric";
        } else if (!/^09\d{9}$/.test(phonenumber)) { 
            tempErrors.phoneNumber = "Phone Number must be 11 digits long and start with 09";
        }

        if (!emailaddress.trim()) {
            tempErrors.email = "Email Address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailaddress)) {
            tempErrors.email = "Email Address is invalid";
        }

        setErrors(tempErrors);
        return !Object.values(tempErrors).some(error => error!== '');
    };

    const handleNextClick = (e:any) => {
        setSubmitted(true);
        if (!validateForm()) {
            e.preventDefault();
        }
    };

    useEffect(()=>{ 
        getServices(); 
        console.log(searchParams.service); 
    },[]);

    return ( 
        <> 
        <div className='px-4 lg:px-32 flex flex-col gap-8 mt-10 lg:mb-6 lg:mt-20'> 
            <div>
                <div className='text-cusBlue text-4xl lg:text-6xl font-bold'>
                    Book an Appointment
                </div>
                <div className='text-sm pt-2 lg:pt-0 lg:text-xl'>
                    <span className='text-cusBlue'>Services </span>&gt; Details &gt; ExtraDetails &gt; Date & Time &gt; Confirmation &gt; Booking Status
                </div>
            </div>
                
            <div className="flex flex-row"> 
                <div className='flex flex-col lg:flex-row'> 
                    <div className='flex flex-col'> 
                        <span className='text-black drop-shadow-lg font-bold mb-5 text-lg'>Main Customer</span> 
                        <div className='flex flex-col'> 
                            <div className={`relative mb-3`}>
                                <input id='customerfirstname' name='customername' placeholder="First Name" onChange={(e) => { setmaincustomerfirstname(capitalizeFirstLetter(e.target.value)); }} className={`text-black text-center text-2xl font-medium w-[320px] h-[50px] lg:w-[480px] lg:h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 ${submitted && errors.firstName ? 'border-red-500' : ''}`} type="text" />
                                {submitted && errors.firstName && <span className="absolute right-3 top-2 text-red-500">*</span>}
                            </div>

                            <div className={`relative mb-3`}>
                                <input id='customermiddlename' name='customername' placeholder="Middle Name" onChange={(e) => { setmaincustomermiddlename(capitalizeFirstLetter(e.target.value)); }} className={`text-black text-center text-2xl font-medium w-[320px] h-[50px] lg:w-[480px] lg:h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 ${submitted && errors.middleName ? 'border-red-500' : ''}`} type="text" />
                                {submitted && errors.middleName && <span className="absolute right-3 top-2 text-red-500">*</span>}
                            </div>

                            <div className={`relative mb-3`}>
                                <input id='customerlastname' name='customername' placeholder="Last Name" onChange={(e) => { setmaincustomerlastname(capitalizeFirstLetter(e.target.value)); }} className={`text-black text-center text-2xl font-medium w-[320px] h-[50px] lg:w-[480px] lg:h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 ${submitted && errors.lastName ? 'border-red-500' : ''}`} type="text" />
                                {submitted && errors.lastName && <span className="absolute right-3 top-2 text-red-500">*</span>}
                            </div>
                        </div> 

                        <span className='text-black drop-shadow-lg font-bold mb-2 mt-6 text-lg'>Phone Number</span> 
                        <div className={`relative mb-3`}>
                            <input placeholder="09XXXXXXXXX" onChange={(e) => { setPhonenumber(e.target.value); }} className={`text-black text-center text-2xl font-medium w-[320px] h-[50px] lg:w-[480px] lg:h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 ${submitted && errors.phoneNumber ? 'border-red-500' : ''}`} type="text" /> 
                            {submitted && errors.phoneNumber && <span className="absolute right-3 top-2 text-red-500">*</span>}
                        </div> 
                        
                        <span className='text-black drop-shadow-lg font-bold mb-2 mt-6 text-lg'>Email Address</span> 
                        <div className={`relative mb-3`}>
                            <input placeholder="@gmail.com" onChange={(e) => { setEmailaddress(e.target.value); }} className={`text-black text-center text-2xl font-medium w-[320px] h-[50px] lg:w-[480px] lg:h-[68px] py-2.5 bg-white rounded-[20px] border border-indigo-800 ${submitted && errors.email ? 'border-red-500' : ''}`} type="text" /> 
                            {submitted && errors.email && <span className="absolute right-3 top-2 text-red-500">*</span>}
                        </div> 

                        <Link href={{ pathname: "/Services/Details/Extradetails", query: { service: searchParams.service, serviceType:searchParams.serviceType, maincustomerfirstname: maincustomerfirstname, maincustomermiddlename: maincustomermiddlename, maincustomerlastname: maincustomerlastname, phonenumber: phonenumber, emailaddress: emailaddress, needsparking: isChecked, additionalrequests: additionalRequests, hours: hours, additionalpackage: JSON.stringify(selectedPackage)} }} passHref>
                            <button className="hidden lg:block bg-cusBlue rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={handleNextClick}>Next</button> 
                        </Link> 
                    </div> 
                    
                    <div className='flex flex-col lg:ml-28 lg:mt-0 mt-6'> 
                        <div className='flex flex-col'> 
                            <span className='text-black drop-shadow-lg font-bold mb-2 text-lg'>Additional Request/s</span> 
                            <input id='additionalreq' name='additionalreq' onChange={(e) => { setadditionalRequests(e.target.value); }} placeholder=" " className='text-black text-center text-2xl font-medium w-[320px] h-[50px] lg:w-[480px] lg:h-[68px] py-2.5 my-4 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" /> 
                        </div> 
                        <div className='flex gap-4 mt-5'> 
                            <span className='text-black drop-shadow-lg font-bold mb-2 text-lg'>Do you need parking?</span> 
                            <div onClick={() => setIsChecked(!isChecked)} className={`toggle-switch ${isChecked ? 'checked' : ''}`}> 
                            <div className="slider"></div>
                            </div> 
                        </div> 
                        
                        {packages.length > 0 && ( 
                            <div className='flex flex-row mt-5 relative'> 
                                <span className='text-black drop-shadow-lg font-bold mb-2 text-lg mr-5 mt-2'>Additional Packages:</span> 
                                <details className="dropdown relative" open={isOpen}> 
                                    <summary className="dropdown-summary m-1 bg-white w-48 flex items-center justify-between cursor-pointer p-3 border rounded-lg shadow-sm transition duration-400 ease-in-out transform active:scale-110" onClick={(e) => toggleDropdown(e)}> 
                                        <span className="text-left">{selectedPackage || 'Select Package'}</span> 
                                        <span><FaChevronDown /></span> 
                                    </summary> 
                                    {isOpen && ( 
                                        <ul className="dropdown-menu2 absolute mt-1 p-2 shadow menu z-[1] bg-white rounded-lg w-48"> 
                                            {packages.map((item, index) => ( 
                                                <li key={index} className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelectPackage(item)}> 
                                                    {item} 
                                                </li> 
                                            ))} 
                                        </ul> 
                                    )} 
                                </details> 
                            </div> 
                        )} 

                        <div className='flex flex-row items-center'> 
                            {serviceTypeString === "hourly" ? ( 
                                <div> 
                                    <span className='text-black drop-shadow-lg font-bold mb-2 text-lg mr-5'>How many hours?:</span> 
                                    <input id='hours' name='hours' onChange={(e) => { changeHours(parseInt(e.target.value)); }} placeholder="-" className='text-black text-center font-medium py-2.5 my-4 w-24 bg-white rounded-[20px] border border-indigo-800 justify-between items-center inline-flex' type="text" maxLength={1} onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) { e.preventDefault(); } }} /> 
                                </div> 
                            ):(<div> </div>)} 
                        </div> 

                        <Link href={{ pathname: "/Services/Details/Extradetails", query: { service: searchParams.service, serviceType:searchParams.serviceType, maincustomerfirstname: maincustomerfirstname, maincustomermiddlename: maincustomermiddlename, maincustomerlastname: maincustomerlastname, phonenumber: phonenumber, emailaddress: emailaddress, needsparking: isChecked, additionalrequests: additionalRequests, hours: hours, additionalpackage: JSON.stringify(selectedPackage)} }} passHref>
                            <button className="lg:hidden bg-cusBlue my-5 rounded-3xl w-56 h-11 mt-8 px-0 text-white font-bold" onClick={handleNextClick}>Next</button> 
                        </Link> 
                    </div> 
                </div> 
            </div> 
        </div> 
        </> 
    ); 
}

export default Page;