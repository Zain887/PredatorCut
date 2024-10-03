import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product, ProductComment as Comment } from '../types'; // Adjust the path as necessary

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
    const [currentImage, setCurrentImage] = useState(product.imageUrl[0]);

    return (
        <div className='my-20 w-full bg-white p-5'>
            <h1 className='text-center py-20 bg-gradient-to-b from-[#666666] to-white text-transparent bg-clip-text font-bold uppercase'>
                Product Details
            </h1>
            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Left Section: Images */}
                <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
                    {/* Large Image */}
                    <div className=" w-96 h-96 mb-4 flex">
                        <img src={currentImage} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-center space-x-2 overflow-x-auto">
                        {product.imageUrl.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={imgSrc}
                                alt={`${product.name} thumbnail`}
                                className={`w-20 h-20 object-cover border rounded-lg cursor-pointer ${currentImage === imgSrc ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => setCurrentImage(imgSrc)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-4">
                    <h1 className="text-2xl font-bold mb-2 text-black">{product.name}</h1>
                    <p className="text-gray-600 mb-4"><span className='font-bold'>In Stock: </span>{product.quantity}</p>
                    <p className="text-gray-700 mb-4">{product.shortDescription || 'No description available.'}</p>

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

                    {/* Product Details */}
                    <p className='text-black'><span className='font-bold'>Blade Length: </span>{product.productDetails?.bladeLength}</p>
                    <p className='text-black'><span className='font-bold'>Blade Material: </span>{product.productDetails?.bladeMaterial}</p>
                    <p className='text-black'><span className='font-bold'>Handle Length: </span>{product.productDetails?.handleLength}</p>
                    <p className='text-black'><span className='font-bold'>Handle Material: </span>{product.productDetails?.handleMaterial}</p>
                    <p className='text-black'><span className='font-bold'>Total Length: </span>{product.productDetails?.totalLength}</p>
                    <p className='text-black'><span className='font-bold'>Description: </span>{product.productDetails?.description}</p>
                    <p className="text-xl font-semibold text-green-600">${product.price.toFixed(2)}</p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.quantity === 0}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            <div className='w-full bg-white p-5'>
                <h2 className="text-lg font-bold mb-2 text-black text-center">Comments</h2>
                {product.comments && product.comments.length > 0 ? (
                    <ul>
                        {product.comments.map((comment: Comment) => (
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
