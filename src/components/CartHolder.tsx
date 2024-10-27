import React, { useEffect } from 'react';
import Cart from './Cart';
import { CartItem } from '../types';

interface Props {
    cart: CartItem[];
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    fetchCartData: () => void; // Keep fetchCartData as a prop
}

const CartHolder: React.FC<Props> = ({ cart, removeFromCart, updateQuantity, fetchCartData }) => {
    // Fetch the cart data only once when the component mounts
    useEffect(() => {
        fetchCartData(); // Fetch the latest cart data on mount
    }, []); // Removed fetchCartData from the dependency array

    return (
        <div className="py-20 mt-[72px] w-auto mx-auto p-5 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-black">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
                <Cart
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                />
            )}
        </div>
    );
};

export default CartHolder;
