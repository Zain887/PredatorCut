import React from 'react';
import { FaCartArrowDown } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

// Define the Props interface
interface Props {
  id: string; // Product ID
  name: string; // Product name
  description?: string; // Product description
  price: number; // Product price
  imageUrl: string[]; // Array of image URLs
  quantity: number; // Product quantity
  tag?: string[]; // Array of tags
  addToCart: (productId: string, userId: string) => void; // Function to add to cart
  isLoggedIn: boolean; // Indicates if the user is logged in
  userId: string; // User ID for the logged-in user
}

// Define the Product component
const Product: React.FC<Props> = ({
  id,
  name,
  description = "No description available",
  price,
  imageUrl = [],
  quantity,
  tag = [],
  addToCart,
  isLoggedIn,
  userId,
}) => {
  const navigate = useNavigate(); // Hook for navigation
  const displayedImageUrl = imageUrl.length > 0 ? imageUrl[0] : '/ImgPlaceholder.webp'; // Placeholder for image

  // Handle add to cart action
  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart(id, userId); // Pass product ID and user ID to addToCart
    } else {
      navigate('/login'); // Redirect to login if not logged in
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      {/* Link to Product Details */}
      <Link to={`/product/${id}`} className="block text-black">
        {/* Product Image */}
        <img src={displayedImageUrl} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />

        {/* Product Name and Description */}
        <h2 className="text-lg font-bold mb-2 truncate">{name}</h2>
        <p className="text-gray-600 mb-4 text-sm truncate">{description}</p>

        {/* Product Price and Quantity */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xl font-semibold">${price}</p>
          <p className={`text-sm font-semibold ${quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {quantity > 0 ? `${quantity} in stock` : 'Out of stock'}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap mb-4">
          {tag.map((tagItem, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {tagItem}
            </span>
          ))}
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className='mt-4'>
        <button
          onClick={handleAddToCart}
          className={`w-full ${isLoggedIn ? 'bg-gray-400' : 'bg-gray-300 cursor-pointer'} text-[#242424] font-bold flex items-center justify-center p-2 rounded-md hover:bg-gray-500 transition-colors`}
        >
          Add To Cart <FaCartArrowDown size={25} color='#242424' className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Product;
