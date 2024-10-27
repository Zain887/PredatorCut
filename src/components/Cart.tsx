import React from 'react';
import { CartItem } from '../types';
import { MdAddBox, MdDelete } from 'react-icons/md';
import { FaMinusSquare } from 'react-icons/fa';

interface Props {
    cart: CartItem[];
    removeFromCart: (productId: string) => void; // Adjust to only require productId
    updateQuantity: (productId: string, newQuantity: number) => void; // Add updateQuantity prop
}

const Cart: React.FC<Props> = ({ cart, removeFromCart, updateQuantity }) => {
    const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleIncreaseQuantity = (productId: string) => {
        const item = cart.find(item => item.product.id === productId);
        if (item) {
            const newQuantity = item.quantity + 1;
            updateQuantity(productId, newQuantity);
        }
    };

    const handleDecreaseQuantity = (productId: string) => {
        const item = cart.find(item => item.product.id === productId);
        if (item && item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateQuantity(productId, newQuantity);
        }
    };

    return (
        <div className="p-5 bg-white border rounded-md text-black">
            {cart.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-2 py-2">Product Image</th>
                                    <th className="border border-gray-300 px-2 py-2">Product Name</th>
                                    <th className="border border-gray-300 px-2 py-2">Product Price</th>
                                    <th className="border border-gray-300 px-2 py-2">Quantity</th>
                                    <th className="border border-gray-300 px-2 py-2">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item) => {
                                    const imageUrls = item.product.imageUrl;
                                    const productId = item.product.id;

                                    return (
                                        <tr key={productId} className="border-b border-gray-300 text-center">
                                            <td className="border border-gray-300 px-2 py-2">
                                                {imageUrls.length > 0 ? (
                                                    <img src={imageUrls[0]} alt={item.product.name} className="w-24 h-24 m-auto object-cover" />
                                                ) : (
                                                    <div className="w-24 h-24 bg-gray-200 flex items-center justify-center">No Image</div>
                                                )}
                                            </td>
                                            <td className="border border-gray-300 px-2 py-2">{item.product.name || 'Unnamed Product'}</td>
                                            <td className="border border-gray-300 px-2 py-2">${item.product.price}</td>
                                            <td className="border border-gray-300 px-2 py-2">
                                                <div className="flex items-center justify-evenly w-full h-full">
                                                    <FaMinusSquare 
                                                        size={18} 
                                                        color='red' 
                                                        className='cursor-pointer' 
                                                        onClick={() => handleDecreaseQuantity(productId)} 
                                                    />
                                                    <span>{item.quantity}</span>
                                                    <MdAddBox 
                                                        size={18} 
                                                        color='green' 
                                                        className='cursor-pointer' 
                                                        onClick={() => handleIncreaseQuantity(productId)} 
                                                    />
                                                </div>
                                            </td>
                                            <td className="border border-gray-300 px-2 py-2">
                                                <MdDelete
                                                    color="red"
                                                    className="cursor-pointer w-full"
                                                    size={30}
                                                    onClick={() => removeFromCart(productId)} // Only pass productId
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                        <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto">
                            Proceed to Checkout
                        </button>
                        <p className="text-xl font-bold text-red-500 mt-2 md:mt-0">Total: ${totalAmount.toFixed(2)}</p>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
