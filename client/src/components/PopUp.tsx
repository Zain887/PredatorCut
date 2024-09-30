// Popup.tsx
import React from 'react';

interface PopupProps {
    message: string;
    onClose: () => void;
}

const PopUp: React.FC<PopupProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-4 rounded shadow-lg text-center">
                <p>{message}</p>
                <p onClick={onClose} className="cursor-pointer mt-4 bg-stone-400 text-red-500 rounded">
                    Close
                </p>
            </div>
        </div>
    );
};

export default PopUp;
