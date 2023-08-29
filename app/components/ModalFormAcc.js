



import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 right-0 bottom-2 left-0 flex items-center justify-center bg-black bg-opacity-50 z-1 ">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="absolute top-2 right-2">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;