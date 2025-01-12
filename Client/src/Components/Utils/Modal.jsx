import React from 'react';

function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-2xl font-bold">Error</h2>
                <p className="mb-4">{message}</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-white transition duration-300 bg-red-500 rounded hover:bg-red-600"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

export default Modal;