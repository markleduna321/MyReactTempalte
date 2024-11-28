import React from 'react';

const Modal = ({ isOpen, onClose, children, width = 'w-1/2' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg ${width} max-h-5/6 min-w-fit`}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
