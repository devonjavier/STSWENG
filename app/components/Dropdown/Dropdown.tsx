import React, { Dispatch, useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface DropdownProps {
  items: Array<string>; // Assuming items are strings
  setTime: Dispatch<string>; // Define the correct type for setArrFunc
  
}

const Dropdown: React.FC<DropdownProps> = ({ items, setTime}) => {
  const [selectedItem, setSelectedItem] = useState<string>('Select Time');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: string) => {
    setIsOpen;
    setSelectedItem(item);
  };

  useEffect(() => {
    // Call setArrFunc with selectedDates whenever it changes
    setTime(selectedItem);
  }, [selectedItem, setTime]); // Include setArrFunc in the dependency array

  return (
    <details className={`dropdown`} open={isOpen} onClick={toggleMenu}>
      <summary className="dropdown-summary m-1 btn bg-white w-64 flex items-center justify-between cursor-pointer">
        <span className="text-left">{selectedItem}</span>
        <span><FaChevronDown /></span>
      </summary>

      <ul className="dropdown-menu p-2 shadow menu z-[1] bg-white rounded-box w-64">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="dropdown-item p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;
