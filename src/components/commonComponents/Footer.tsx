import React from 'react';
import { Category } from '../../types'; // Import the Category interface

interface Props {
  categories: Category[]; // Pass the categories as props
}

const Footer: React.FC<Props> = ({ categories }) => {
  return (
    <footer className="w-full h-fit bg-gray-900 py-12" style={{ boxShadow: '0 -8px 6px -6px white' }}>
      {/* Footer content */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-evenly gap-8 lg:gap-0 px-6">
        {/* Logo and Address */}
        <div className="flex flex-col items-center lg:items-start space-y-4 text-center lg:text-left">
          <img src="/logo.svg" alt="sheesh" className="w-48 h-auto" />
          <ul className="text-stone-400">
            <li>New Village Islamabad,</li>
            <li>Ugoki Tehsil & Dist Sialkot.</li>
          </ul>
        </div>

        {/* Categories */}
        <div className="text-center lg:text-left">
          <h3 className="text-white font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
                <a href={`/${category.name}`} className="text-stone-400 hover:text-white transition-colors">
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="text-center lg:text-left">
          <h3 className="text-white font-bold mb-4">Contact Us</h3>
          <ul className="text-stone-400 space-y-2">
            <li>Email: info@predatorcut.com</li>
            <li>Phone: +92 123 4567890</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-white">
        © 2024 PredatorCut. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
