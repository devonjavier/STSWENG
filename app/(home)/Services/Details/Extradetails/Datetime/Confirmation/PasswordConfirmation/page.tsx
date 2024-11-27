'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

const Page = ({ searchParams }: { searchParams: any }) => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const validatePasswords = () => {
        if (password === confirmPassword) {
            setIsPasswordMatched(true);
            setError('');
        } else {
            setIsPasswordMatched(false);
            setError('Passwords do not match');
        }
    };

    const handleSubmit = () => {
        // Proceed with form submission logic
        if (isPasswordMatched) {
            // Your logic to handle password confirmation
            alert('Password confirmed');
        } else {
            alert('Please fix the errors before submitting.');
        }
    };

    return (
        <>
            <div className="px-4 lg:px-32 flex flex-col gap-8 mt-10 lg:mb-6 lg:mt-20">
                <div>
                    <div className="text-cusBlue text-4xl lg:text-6xl font-bold">
                        Password Confirmation
                    </div>
                    <div className="text-sm pt-2 lg:pt-0 lg:text-xl">
                        Services&gt; Details &gt; ExtraDetails &gt; Date & Time &gt; Confirmation &gt; <span className="text-cusBlue"> Password Confirmation</span> &gt; Booking Status
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:space-x-4">
                    <div className="flex flex-col w-full lg:w-1/2">
                    
                        <div className="flex flex-col mt-5 border-2 border-indigo-800 rounded-lg p-4">
                            <span className="text-black font-bold mb-2 text-xl lg:text-3xl"> Password Confirmation </span>

                            {/* Message explaining the password requirement */}
                            <div className="text-sm lg:text-base text-gray-700 mb-4">
                                <p>To ensure the security of your booking details, a password is required. This prevents unauthorized users from viewing your booking status in case they guess your booking number.</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <label htmlFor="password" className="font-semibold text-sm lg:text-xl">Password:</label>
                                <div className="relative">
                                    <input 
                                        type={isPasswordVisible ? "text" : "password"} 
                                        id="password" 
                                        className="bg-white border-2 border-grey rounded-lg p-2 w-full text-black"
                                        value={password} 
                                        onChange={handlePasswordChange} 
                                        onBlur={validatePasswords} 
                                    />
                                    <span 
                                        className="absolute right-3 top-3 cursor-pointer"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
                                    >
                                        {isPasswordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                    </span>
                                </div>

                                <label htmlFor="confirmPassword" className="font-semibold text-sm lg:text-xl">Confirm Password:</label>
                                <div className="relative">
                                    <input 
                                        type={isConfirmPasswordVisible ? "text" : "password"} 
                                        id="confirmPassword" 
                                        className="bg-white border-2 border-grey rounded-lg p-2 w-full text-black"
                                        value={confirmPassword} 
                                        onChange={handleConfirmPasswordChange} 
                                        onBlur={validatePasswords} 
                                    />
                                    <span 
                                        className="absolute right-3 top-3 cursor-pointer"
                                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} // Toggle visibility
                                    >
                                        {isConfirmPasswordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                    </span>
                                </div>

                                {error && <span className="text-red-500 text-sm">{error}</span>}
                            </div>
                        </div>

                        <Link
                            href={{
                                pathname: "/Services/Details/Extradetails/Datetime/Confirmation/PasswordConfirmation/Bookingstatus",
                                query: {
                                    ...searchParams,
                                    passwordConfirmed: isPasswordMatched ? 'true' : 'false',
                                    newpassword : password
                                },
                            }}
                        >
                            <button 
                                className={`bg-cusBlue rounded-3xl w-full lg:w-56 h-11 mt-8 px-0 text-white font-bold ${!isPasswordMatched ? 'opacity-50 cursor-not-allowed' : ''}`} 
                                onClick={handleSubmit} 
                                disabled={!isPasswordMatched}
                            >
                                Confirm Password
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
