import React from 'react';

interface PopupProps {
    message: string;
    onClose: () => void;
}

const PopUp: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <p className="text-lg font-semibold mb-4">{message}</p>
                <button 
                    onClick={onClose} 
                    className="mt-4 bg-stone-400 text-red-500 rounded px-4 py-2 hover:bg-stone-300 transition duration-300"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PopUp;
