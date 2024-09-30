// ProductDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types'; // Adjust the path as necessary

interface Props {
    products: Product[]; // Array of products passed as props to the component
    addToCart: (product: Product) => void; // Add addToCart as a prop
}

const ProductDetails: React.FC<Props> = ({ products, addToCart }) => {
    const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
    const product = products.find((prod) => prod.id === id); // Find the product by ID

    if (!product) {
        return <p>Product not found.</p>; // Display this if product ID is invalid
    }

    return (
        <div className='my-20 w-full bg-white p-5'>
            <h1 className='text-center py-20 bg-gradient-to-b from-[#666666] to-white text-transparent bg-clip-text font-bold uppercase'>Product Details</h1>
            <div className="flex flex-col md:flex-row md:max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Details Section */}
                <div className="p-4 w-full md:w-1/2 flex flex-col justify-center ">
                    <h1 className="text-2xl font-bold mb-2 text-black">{product.name}</h1>
                    <p className="text-gray-600 mb-4">Available Quantity: {product.quantity}</p>
                    <p className="text-gray-700 mb-4">{product.description || 'No description available.'}</p>

                    {/* Tags Section */}
                    {product.tag && product.tag.length > 0 && (
                        <div className="flex flex-wrap mb-4">
                            {product.tag.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <p className="text-xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</p>

                    {/* Add to Cart Button */}
                    <button onClick={() => addToCart(product)} disabled={product.quantity === 0} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
            {/* Comments Section */}
            <div className='w-full bg-white p-5'>
                <h2 className="text-lg font-bold mb-2 text-black text-center">Comments</h2>
                {product.comments && product.comments.length > 0 ? (
                    <ul>
                        {product.comments.map((comment) => (
                            <li key={comment.id} className="mb-2 border-b pb-2">
                                <p className="font-semibold text-black">{comment.user}:</p>
                                <p className="text-gray-700">{comment.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
