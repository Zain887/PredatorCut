import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types'; // Ensure this path is correct
import ProductComment from '../admin/ProductComment'; // Import the ProductComment component

interface Props {
    products: Product[]; // Array of products passed as props to the component
    addToCart: (product: Product) => void; // Function to add product to cart
    isLoggedIn: boolean; // Prop to determine if user is logged in
}

const ProductDetails: React.FC<Props> = ({ products, addToCart, isLoggedIn }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
    const product = products.find((prod) => prod.id === id); // Find the product by ID

    if (!product) {
        return <p>Product not found.</p>; // Display this if product ID is invalid
    }

    const [currentImage, setCurrentImage] = useState(product.imageUrl[0]);

    // Ensure price is a number
    const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

    const handleAddToCart = () => {
        if (isLoggedIn) {
            addToCart(product);
        } else {
            navigate('/login')
        }
    };

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);

    return (
        <div className='py-20 w-full bg-white p-5'>
            <h1 className='text-center py-10 bg-gradient-to-b from-[#666666] to-white text-transparent bg-clip-text font-bold uppercase text-3xl sm:text-4xl'>
                Product Details
            </h1>

            <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Left Section: Images */}
                <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
                    {/* Large Image */}
                    <div className="w-[80vw] md:w-[30vw] h-auto mb-4 flex">
                        <img src={currentImage} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
                    </div>

                    {/* Thumbnails */}
                    <div className="flex justify-center space-x-2 overflow-x-auto">
                        {product.imageUrl.map((imgSrc, index) => (
                            <img
                                key={index}
                                src={imgSrc}
                                alt={`${product.name} thumbnail`}
                                className={`w-16 h-16 md:w-20 md:h-20 object-cover border rounded-lg cursor-pointer ${currentImage === imgSrc ? 'border-blue-500' : 'border-gray-300'}`}
                                onClick={() => setCurrentImage(imgSrc)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center space-y-4">
                    <h1 className="text-xl md:text-2xl font-bold mb-2 text-black">{product.name}</h1>
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
                    {product.productDetails?.bladeLength && (
                        <p className='text-black'><span className='font-bold'>Blade Length: </span>{product.productDetails.bladeLength}"</p>
                    )}
                    {product.productDetails?.bladeMaterial && (
                        <p className='text-black'><span className='font-bold'>Blade Material: </span>{product.productDetails.bladeMaterial}</p>
                    )}
                    {product.productDetails?.handleLength && (
                        <p className='text-black'><span className='font-bold'>Handle Length: </span>{product.productDetails.handleLength}"</p>
                    )}
                    {product.productDetails?.handleMaterial && (
                        <p className='text-black'><span className='font-bold'>Handle Material: </span>{product.productDetails.handleMaterial}</p>
                    )}
                    {product.productDetails?.totalLength && (
                        <p className='text-black'><span className='font-bold'>Total Length: </span>{product.productDetails.totalLength}"</p>
                    )}

                    {/* Display price safely */}
                    <p className="text-lg md:text-xl font-semibold text-green-600">${price.toFixed(2)}</p>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart} // Call the handle function
                        disabled={product.quantity === 0}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 w-full"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <div className='my-20'>
                {product.productDetails?.description && (
                    <p className='text-black text-center text-sm md:text-base'>
                        <span className='font-bold text-xl md:text-2xl'>Description </span> <br /> 
                        {product.productDetails.description}
                    </p>
                )}
            </div>

            {/* Comments Section */}
            <div className='mt-4'>
                <ProductComment productId={product.id} />
            </div>
        </div>
    );
};

export default ProductDetails;
