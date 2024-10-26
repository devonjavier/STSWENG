import React from 'react';

interface ModalProps {
  isOpen: boolean; // Controls if the modal is open
  onClose: () => void; // Function to close the modal
  children: React.ReactNode; // The content inside the modal
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Don't render the modal if it's not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[600px] p-6 relative">
        {/* Close button in the top-right corner */}
        <button
          className="absolute top-5 right-7 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &#10005; {/* X (close) icon */}
        </button>

        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
