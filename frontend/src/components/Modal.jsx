import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#232323] via-transparent to-[#232323] z-50">
      <div className="bg-white w-2/5 p-4 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 font-bold text-5xl text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
