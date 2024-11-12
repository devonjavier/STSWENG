"use client";

import Link from 'next/link'
import { useState } from 'react';

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [question, setQuestion] = useState("");

    return(
        <div className="bg-white max-h-full">
            <div>
                <div className="flex flex-col lg:px-20 bg-white py-16">
                    <h1 className="text-indigo-800 text-5xl font-bold self-start pb-5 pl-3">Submit a Ticket</h1>
                    <p className="w-full lg:w-1/2 text-indigo-800 text-lg font-light pl-3">
                    Fill up this form to submit a ticket. A confirmation email will be sent regarding your ticket.
                    </p>
                </div>

                <div className="flex flex-col justify-center lg:px-96 lg:pb-20 w-full">
                    <div className="flex flex-col max-w-100">
                        <form>
                            <input type="text" placeholder="Name" className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900" value={name} onChange={(e) => setName(e.target.value)} required/>
                            <input type="text" placeholder="Email" className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <hr className="bg-cusBlue h-0.5"></hr> 
                            <select name="ServiceType" className="rounded-lg bg-gray-100 block p-5 w-full mt-10 mb-10 text-xl" value={serviceType} onChange={(e) => setServiceType(e.target.value)} required>
                                <option value="" disabled selected>Select</option>
                                <option value="saab">Option 1</option>
                                <option value="mercedes">Option 2</option>
                                <option value="audi">Option 3</option>
                            </select>
                            <input type="text" placeholder="Question..." className="rounded-lg bg-gray-100 block p-5 w-full mb-10 text-xl text-gray-900 pb-20" value={question} onChange={(e) => setQuestion(e.target.value)} required/>
                            <input type="submit" value="Submit" className="bg-cusBlue rounded-lg p-5 text-xl text-white hover:text-gray-400 hover:bg-purple-900 transition ease-in-out"/>
                        </form>
                    </div>
                    <Link href='/FAQs' className="hover:text-violet-950 transition ease-in-out text-indigo-800 text-4xl lg:text-3xl font-bold text-center mt-10">Back to FAQs</Link>
                </div>
            </div>
        </div>
    );
}

export default Page;