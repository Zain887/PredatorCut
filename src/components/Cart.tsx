import React from 'react';
import { Product as ProductType } from '../types'; // Import necessary types

interface Props {
    cart: ProductType[]; // Expecting an array of ProductType
    removeFromCart: (index: number) => void; // Function to remove an item from the cart
}

const Cart: React.FC<Props> = ({ cart, removeFromCart }) => {
    // Calculate the total amount
    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="m-5 p-5 bg-white border rounded-md text-black">
            <h2 className="text-xl font-bold mb-4 text-center">Cart</h2>
            {cart.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-2 py-2 text-left">Product Image</th>
                                    <th className="border border-gray-300 px-2 py-2 text-left">Product Name</th>
                                    <th className="border border-gray-300 px-2 py-2 text-left">Product Price</th>
                                    <th className="border border-gray-300 px-2 py-2 text-left">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="border border-gray-300 px-2 py-2">
                                            <img src={item.imageUrl[0]} alt={item.name} className="w-24 h-24 object-cover" />
                                        </td>
                                        <td className="border border-gray-300 px-2 py-2">{item.name}</td>
                                        <td className="border border-gray-300 px-2 py-2">${item.price.toFixed(2)}</td>
                                        <td className="border border-gray-300 px-2 py-2">
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h2 className="text-2xl font-bold mt-4 text-center text-red-500">
                        Total Amount to Pay: ${totalAmount.toFixed(2)}
                    </h2>
                </>
            ) : (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
