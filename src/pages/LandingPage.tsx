import React from 'react';
import Slider from '../components/Slider';
import Tracer from '../components/Tracer';
import { HeaderImages } from '../types';

interface Props {
  headerImages: HeaderImages[]; // Define the headerImages prop
}

const LandingPage: React.FC<Props> = ({ headerImages }) => {
  const flipImage = [
    '/flipImage/sword.webp',
    '/flipImage/axe.jpg',
    '/flipImage/kknife.jpg',
    '/flipImage/hknife.jpg',
  ];

  return (
    <>
      <Slider hImages={headerImages} />
      <p className='text-center text-[#918787] font-Roboto font-extrabold text-5xl my-20'>
        It's BOLD | It's SLEEK | It's UNSTOPPABLE
      </p>
      <div className='my-5 grid grid-cols-2 sm:grid-cols-4 gap-4 w-3/4 m-auto'>
        {flipImage.map((image, index) => (
          <div
            key={index}
            className='h-auto bg-gray-500 border-2 border-white rounded-md overflow-hidden relative transform hover:rotate-180 hover:scale-y-[-1] transition-transform duration-1000 cursor-pointer'
          >
            <img src={image} alt='' className='w-full h-full object-cover' />
          </div>
        ))}
      </div>

      <div className='text-center my-10 text-white'>
        <p className='text-lg font-Roboto'>Our Products at a Glance</p>
        <p className='text-3xl font-bold mt-5'>Currently most popular <br />
          The Steamulation Highlights</p>
      </div>
      <Tracer />
      <div className='flex flex-col md:flex-row p-5'>
        <div className='md:w-1/3 h-full overflow-hidden border-2 border-white'>
          <img src="/sword.webp" alt="sheesh" className='w-full h-full object-cover' />
        </div>
        <div className='md:w-1/3 border-y-2 border-white flex flex-col'>
          <div className='flex-1 w-full h-full bg-white flex items-center justify-center'>
            <div className='text-center p-5'>
              <p className='font-Roboto text-2xl font-bold text-[#666666]'>
                Elevating Craftsmanship to an Art Form
              </p>
              <p className='font-Roboto text-xl font-light my-8 text-[#666666]'>
                We craft high-performance instruments by blending form, function, and expert craftsmanship, using only the finest materials for our swords, knives, and precision tools.
              </p>
              <p className='mb-10 font-Roboto text-2xl font-bold text-[#666666]'>
                Hand Crafted in PAKISTAN.
              </p>
              <a href="/" className='text-lg font-bold bg-[#666666] text-white border p-2 border-[#666666] hover:bg-white hover:text-[#666666] duration-150'>
                Discover More
              </a>
            </div>
          </div>
        </div>
        <div className='md:w-1/3 h-full overflow-hidden border-2 border-white'>
          <img src="/axe.webp" alt="sheesh" className='w-full h-full object-cover' />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
