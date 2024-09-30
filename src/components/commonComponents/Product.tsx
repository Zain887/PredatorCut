import React from 'react';
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';

interface Props {
  id: string; // Added the id prop
  name: string;
  description?: string;
  price: number;
  imageUrl: string[];
  quantity: number;
  tag?: string[];
  addToCart: () => void; // AddToCart function as prop
}

const Product: React.FC<Props> = ({ id, name, description = "No description available", price, imageUrl = [], quantity, tag = [], addToCart }) => {

  const displayedImageUrl = imageUrl.length > 0 ? imageUrl[0] : '/ImgPlaceholder.webp'; // Replace with actual placeholder path
  
  return (
    <div className="p-4 border rounded-lg shadow-md">
      {/* Link to Product Details */}
      <Link to={`/product/${id}`} className="block text-white">
        {/* Product Image */}
        <img src={displayedImageUrl} alt={name} className="w-full h-48 object-cover rounded-md mb-4" />

        {/* Product Name and Description */}
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>

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
          onClick={addToCart}
          className='w-full bg-gray-400 text-[#242424] font-bold items-center justify-around flex'>
          Add To Cart <FaCartArrowDown size={25} color='#242424' />
        </button>
      </div>
    </div>
  );
};

export default Product;
