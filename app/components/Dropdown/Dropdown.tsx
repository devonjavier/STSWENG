// Dropdown.tsx

import React from 'react';
import {FaChevronDown} from 'react-icons/fa'

interface DropdownProps {
  items: Array<number>; // Assuming items are strings
}
const Dropdown: React.FC<DropdownProps> = ({ items }) => {

  return (
    <details className="dropdown">
      <summary className="m-1 btn bg-white w-64 flex items-center justify-between">
        <span className="text-left">Select Time</span>
        <span><FaChevronDown/></span>
      </summary>
      
      <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
  </details>
  );
};

export default Dropdown;
