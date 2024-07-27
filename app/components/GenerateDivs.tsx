import React from 'react';

interface GenerateDivsProps {
    counter: number;
    setadditionalCustomersFirst: React.Dispatch<React.SetStateAction<string[]>>;
    setadditionalCustomersMiddle: React.Dispatch<React.SetStateAction<string[]>>;
    setadditionalCustomersLast: React.Dispatch<React.SetStateAction<string[]>>;
    errors: string[];
    submitted: boolean;
}

const GenerateDivs: React.FC<GenerateDivsProps> = ({ counter, setadditionalCustomersFirst, setadditionalCustomersMiddle, setadditionalCustomersLast, errors, submitted }) => {
    const div: JSX.Element[] = [];

    const capitalizeFirstLetter = (e: string) => {
        return e.replace(/\b\w+/g, (word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
    };
    
    const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = capitalizeFirstLetter(e.target.value);
        setadditionalCustomersFirst(prevCustomers => {
            const updatedCustomers = [...prevCustomers];
            updatedCustomers[index] = value;
            return updatedCustomers;
        });
    };

    const handleMiddlenameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = capitalizeFirstLetter(e.target.value);
        setadditionalCustomersMiddle(prevCustomers => {
            const updatedCustomers = [...prevCustomers];
            updatedCustomers[index] = value;
            return updatedCustomers;
        });
    };

    const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = capitalizeFirstLetter(e.target.value);
        setadditionalCustomersLast(prevCustomers => {
            const updatedCustomers = [...prevCustomers];
            updatedCustomers[index] = value;
            return updatedCustomers;
        });
    };

    for (let i = 0; i < counter; i++) {
        div.push(
            <div key={i} className='flex flex-wrap gap-5 items-center'>
                <span className='text-cusBlue text-lg md:text-xl xl:text-2xl mr-4'>Person {i + 1}:</span>

                <div className='relative w-full md:w-1/3 lg:w-1/4'>
                    <input
                        onChange={(e) => handleFirstnameChange(e, i)}
                        placeholder="First name"
                        className={`text-black text-center text-lg md:text-xl font-medium w-full h-[50px] md:h-[68px] py-2.5 my-2 bg-white rounded-[20px] border ${submitted && (errors[i]?.includes("FirstNameRequired") || errors[i]?.includes("FirstNameInvalid")) ? 'border-red-500' : 'border-indigo-800'} inline-flex justify-between items-center`}
                        type="text" />
                        {submitted && (errors[i]?.includes("FirstNameRequired") || errors[i]?.includes("FirstNameInvalid")) && <span className="absolute right-3 top-2 text-red-500">*</span>}
                </div>

                <div className='relative w-full md:w-1/3 lg:w-1/4'>
                    <input
                        onChange={(e) => handleMiddlenameChange(e, i)}
                        placeholder="Middle name"
                        className={`text-black text-center text-lg md:text-xl font-medium w-full h-[50px] md:h-[68px] py-2.5 my-2 bg-white rounded-[20px] border ${submitted && errors[i]?.includes("MiddleNameInvalid") ? 'border-red-500' : 'border-indigo-800'} inline-flex justify-between items-center`}
                        type="text" />
                        {submitted && errors[i]?.includes("MiddleNameInvalid") && <span className="absolute right-3 top-2 text-red-500">*</span>}
                </div>

                <div className='relative w-full md:w-1/3 lg:w-1/4'>
                    <input
                        onChange={(e) => handleLastnameChange(e, i)}
                        placeholder="Last name"
                        className={`text-black text-center text-lg md:text-xl font-medium w-full h-[50px] md:h-[68px] py-2.5 my-2 bg-white rounded-[20px] border ${submitted && (errors[i]?.includes("LastNameRequired") || errors[i]?.includes("LastNameInvalid")) ? 'border-red-500' : 'border-indigo-800'} inline-flex justify-between items-center`}
                        type="text" />
                        {submitted && (errors[i]?.includes("LastNameRequired") || errors[i]?.includes("LastNameInvalid")) && <span className="absolute right-3 top-2 text-red-500">*</span>}
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col'>
            {div}
        </div>
    );
};

export default GenerateDivs;