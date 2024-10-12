import React from 'react';
import { Product } from '../types'; // Adjust the path as necessary

interface Props {
    cart: Product[]; // Accept cart as a prop
    removeFromCart: (id: string) => void; // Function to remove item from cart
}

const CartHolder: React.FC<Props> = ({ cart, removeFromCart }) => {
    // Calculate total amount
    const totalAmount = cart.reduce((total, item) => {
        const price = typeof item.price === 'number' ? item.price : 0; // Ensure price is a number
        const quantity = item.quantity || 1; // Default quantity to 1 if undefined
        return total + price * quantity;
    }, 0).toFixed(2);

    return (
        <div className="my-20 mt-[72px] max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cart.map((item) => (
                        <li key={item.id} className="flex justify-between items-center p-4 border-b border-gray-200">
                            <div>
                                <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                                <p className="text-green-700 ">${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}</p>
                                <p className="text-gray-500">Quantity: {item.quantity || 1}</p>
                            </div>
                            <div className="flex items-center">
                                <img src={item.imageUrl[0]} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {cart.length > 0 && (
                <div className="mt-6 flex justify-between items-center">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                        Proceed to Checkout
                    </button>
                    <p className="text-xl font-bold text-red-500">Total: ${totalAmount}</p>
                </div>
            )}
        </div>
    );
};

export default CartHolder;
