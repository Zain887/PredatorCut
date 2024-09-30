import React from 'react';
import { Category } from '../../types'; // Import the Category interface

interface Props {
  categories: Category[]; // Pass the categories as props
}


const Footer: React.FC<Props> = ({ categories }) => {
  return (
    <footer className='w-full h-fit bg-cover py-16' style={{ boxShadow: '0 -8px 6px -6px white' }}>
      <div className='flex justify-evenly items-start'>
        <img src="/logo.svg" alt="sheesh" className='w-48 h-auto' />
        <ul className='text-stone-400'>
          <li>New Village Islamabad,</li>
          <li> Ugoki Tehsil & Dist Sialkot. </li>
        </ul>
        <ul>
          {categories.map((category, index) => (
            <a key={index} href={category.name} className=' text-stone-400'>
              <li>{category.name}</li>
            </a>
          ))}
        </ul>
      </div>
      <center className='text-white pt-2 pb-5'>© 2024 PredatorCut. All rights reserved</center>
    </footer>

  );
};

export default Footer;