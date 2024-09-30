import React from 'react';
import Slider from '../components/Slider';
import Tracer from '../components/Tracer';
import { headerImages } from '../data';
interface Props {
  // Define your component props here
}

const LandingPage: React.FC<Props> = () => {
  const flipImage = [
    '/flipImage/sword.webp',
    '/flipImage/axe.jpg',
    '/flipImage/kknife.jpg',
    '/flipImage/hknife.jpg',
  ];

  return (
    <>
      <Slider hImages={headerImages}/>
      <p className='text-center text-[#918787] font-Roboto font-extrabold text-5xl my-20'>
        It's BOLD | It's SLEEK | It's UNSTOPPABLE
      </p>
      <div className='my-5 flex items-center justify-evenly'>
        {flipImage.map((image, index) => (
          <div
            key={index}
            className='w-[20%] h-auto bg-gray-500 border-2 border-white rounded-md overflow-hidden relative transform hover:rotate-180 hover:scale-y-[-1] transition-transform duration-1000 cursor-pointer'
          >
            <img src={image} alt='' width={'100%'} height={'100%'} />
          </div>
        ))}
      </div>
      <div className='text-center my- text-white'>
        <p className='text-lg font-Roboto'>Our Products at a Glance</p>
        <p className='text-3xl font-bold mt-5'>Currently most popular <br />
          The Steamulation Highlights</p>
      </div>
      <Tracer />
      <div className='flex p-5'>
        <div className='w-[33.33%] h-full overflow-hidden border-2 border-white'>
          <img src="/sword.webp" alt="sheesh" width={'100%'} height={'100%'} />
        </div>
        <div className='w-[33.33%] border-y-2 border-white'>
          <div className='w-full h-full bg-white flex items-center justify-center'>
            <div className='text-center p-5'>
              <p className='font-Roboto text-2xl font-bold text-[#666666]'>
                Elevating Craftsmanship to an Art Form
              </p>
              <p className='font-Roboto text-xl font-light my-8 text-[#666666]'>
                We craft high-performance instruments by blending form, function, and expert craftsmanship, using only the finest materials for our swords, knives, and precision tools.</p>
              <p className='mb-10 font-Roboto text-2xl font-bold text-[#666666]'>
                Hand Crafted in PAKISTAN.
              </p>
              <a href="/" className='text-lg font-bold bg-[#666666] text-white border p-2 border-[#666666] hover:bg-white hover:text-[#666666] duration-150'>
                Descover More
              </a>
            </div>
          </div>
        </div>
        <div className='w-[33.33%] h-full overflow-hidden border-2 border-white'>
          <img src="/axe.webp" alt="sheesh" width={'100%'} height={'100%'} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
