import React from "react";

const Modal = ({ isOpen, onClose, title, children, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="bg-fuchsia-950 text-white px-4 py-2 rounded hover:bg-fuchsia-900"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
