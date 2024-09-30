import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiLogoTiktok } from "react-icons/bi";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { Category } from '../../types'; // Import the Category interface

interface Props {
    categories: Category[]; // Pass the categories as props
}

const Menubar: React.FC<Props> = ({ categories }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(-1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control the dropdown

    // Split categories: First 6 for direct menu items, rest for the dropdown
    const visibleCategories = categories.slice(0, 4);
    const dropdownCategories = categories.slice(4);

    return (
        <nav className="flex items-center px-10 py-3 justify-between fixed z-10 top-0 backdrop-blur-md w-full bg-[#000000b5]">
            <NavLink to="/" className="w-52 h-auto">
                <img src="/logo.svg" alt="predatorCut" width={'80%'} height={'80%'} />
            </NavLink>
            <div className="w-full flex justify-center items-center gap-24">
                <NavLink
                    to="/" // Home button linking to the home page
                    className={`text-[#666666] font-Roboto text-md cursor-pointer border rounded p-2 border-white`}
                    onClick={() => {
                        setActiveIndex(null); // Set active index to null for home
                        setIsDropdownOpen(false); // Close dropdown on select
                    }}
                >
                    <FaHome size={20} color='gray' />
                </NavLink>
                {visibleCategories.map((category, index) => (
                    <NavLink
                        key={index}
                        to={`/${category.name}`} // Link to category page
                        className={`text-[#666666] font-Roboto text-md cursor-pointer ${index === activeIndex
                            ? 'px-2 py-0 font-bold rounded-md bg-white'
                            : 'border-b-2 px-2 py-1 border-transparent hover:border-white hover:font-bold transition-border duration-300'
                            }`}
                        onClick={() => {
                            setActiveIndex(index);
                            setIsDropdownOpen(false); // Close dropdown on select

                        }}
                    >
                        {category.name}
                    </NavLink>
                ))}

                {/* Dropdown for categories more than 6 */}
                {dropdownCategories.length > 0 && (
                    <div className="relative">
                        <button
                            className="text-[#666666] font-Roboto text-md cursor-pointer border-b-2 px-2 py-0 border-transparent hover:bg-white hover:font-bold transition-border duration-300"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            More Categories
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 bg-white rounded-md shadow-lg py-2 z-20 w-48">
                                {dropdownCategories.map((category, index) => (
                                    <NavLink
                                        key={index + 4} // Ensure unique keys
                                        to={`/${category.name}`} // Link to category page
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                        onClick={() => {
                                            setActiveIndex(index + 4);
                                            setIsDropdownOpen(false); // Close dropdown on select
                                        }}
                                    >
                                        {category.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className='flex items-center justify-evenly'>
                <a href="/">
                    <BiLogoTiktok color='white' className='mr-2 animation-loop hover:scale-125' size={20} />
                </a>
                <a href="https://www.facebook.com/sheesh.hookahs?mibextid=LQQJ4d">
                    <FaFacebook color="white" className='mr-2 animation-loop hover:scale-125' size={20} />
                </a>
                <a href="https://wa.me/971502237203">
                    <IoLogoWhatsapp color="white" className='mr-2 animation-loop hover:scale-125' size={20} />
                </a>
                <a href="https://www.instagram.com/sheesh.hookahs/">
                    <AiFillInstagram color="white" className='mr-2 animation-loop hover:scale-125' size={20} />
                </a>
            </div>
            <NavLink
                to="/cart"
                className="text-[#666666] w-36 font-bold text-center bg-white py-1 rounded-md shadow-sm shadow-[white] animation-loop"
            >
                View Cart
            </NavLink>
        </nav>
    );
};

export default Menubar;
