import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BiLogoTiktok } from "react-icons/bi";
import { FaFacebook, FaBars } from "react-icons/fa6"; // Icons for mobile menu toggle
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaHome, FaTimes, FaShoppingCart } from "react-icons/fa"; // Importing the shopping cart icon
import { Category } from '../../types'; // Import the Category interface

interface Props {
    categories: Category[]; // Pass the categories as props
}

const Menubar: React.FC<Props> = ({ categories }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(-1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control the dropdown
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control the mobile menu

    // Split categories: First 4 for direct menu items, rest for the dropdown
    const visibleCategories = categories.slice(0, 4);
    const dropdownCategories = categories.slice(4);

    return (
        <nav className="flex items-center justify-between px-6 py-1 fixed top-0 w-full bg-black bg-opacity-75 z-20">
            {/* Logo */}
            <NavLink to="/" className="w-40">
                <img src="/logo.svg" alt="predatorCut" className="w-full h-auto" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
                <NavLink
                    to="/"
                    className={`text-gray-300 hover:text-white transition-colors`}
                    onClick={() => setActiveIndex(null)}
                >
                    <FaHome size={20} />
                </NavLink>

                {visibleCategories.map((category, index) => (
                    <NavLink
                        key={index}
                        to={`/${category.name}`}
                        className={`text-gray-300 hover:text-white transition-colors ${index === activeIndex ? 'font-bold text-white' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {category.name}
                    </NavLink>
                ))}

                {dropdownCategories.length > 0 && (
                    <div className="relative">
                        <button
                            className="text-gray-300 hover:text-white transition-colors py-0 bg-gray-800"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            More Categories
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 bg-white text-black rounded shadow-md w-48">
                                {dropdownCategories.map((category, index) => (
                                    <NavLink
                                        key={index + 4}
                                        to={`/${category.name}`}
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={() => setActiveIndex(index + 4)}
                                    >
                                        {category.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Cart Icon */}
                <NavLink
                    to="/cart"
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                    <FaShoppingCart size={20} />
                </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
                <NavLink
                    to="/cart"
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <button className='bg-transparent'>
                        <FaShoppingCart size={20} color='white'/>
                    </button>
                </NavLink>

                <button
                    className="text-white py-2 bg-transparent"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-screen w-full bg-black bg-opacity-90 z-30 transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Close button */}
                <div className="flex justify-end p-4">
                    <button
                        className="text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Mobile menu content */}
                <div className="flex flex-col items-center space-y-4 py-4">
                    <NavLink
                        to="/"
                        className="text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FaHome size={20} />
                    </NavLink>

                    {categories.map((category, index) => (
                        <NavLink
                            key={index}
                            to={`/${category.name}`}
                            className="text-gray-300 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {category.name}
                        </NavLink>
                    ))}

                    {/* Cart Icon for Mobile */}
                    <NavLink
                        to="/cart"
                        className="text-gray-300 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <FaShoppingCart size={20} />
                    </NavLink>

                    {/* Social Icons - Positioned at the bottom */}
                    <div className="absolute bottom-4 left-0 w-full flex justify-center space-x-4">
                        <a href="/">
                            <BiLogoTiktok color='white' className='hover:scale-110 transition-transform' size={20} />
                        </a>
                        <a href="https://www.facebook.com/sheesh.hookahs?mibextid=LQQJ4d">
                            <FaFacebook color="white" className='hover:scale-110 transition-transform' size={20} />
                        </a>
                        <a href="https://wa.me/971502237203">
                            <IoLogoWhatsapp color="white" className='hover:scale-110 transition-transform' size={20} />
                        </a>
                        <a href="https://www.instagram.com/sheesh.hookahs/">
                            <AiFillInstagram color="white" className='hover:scale-110 transition-transform' size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Social Icons for Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
                <a href="/">
                    <BiLogoTiktok color='white' className='hover:scale-110 transition-transform' size={20} />
                </a>
                <a href="https://www.facebook.com/sheesh.hookahs?mibextid=LQQJ4d">
                    <FaFacebook color="white" className='hover:scale-110 transition-transform' size={20} />
                </a>
                <a href="https://wa.me/971502237203">
                    <IoLogoWhatsapp color="white" className='hover:scale-110 transition-transform' size={20} />
                </a>
                <a href="https://www.instagram.com/sheesh.hookahs/">
                    <AiFillInstagram color="white" className='hover:scale-110 transition-transform' size={20} />
                </a>
            </div>
        </nav>
    );
};

export default Menubar;
