import React, { useState, useEffect } from 'react';

interface Props {
    images: { url: string; article: string }[];
}

const Slider: React.FC<Props> = (props) => {
    const { images } = props;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, [images]);

    const handleDotClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className='relative overflow-hidden'>
            {images.map((collection, index) => (
                <div className='relative object-cover' key={index}>
                    <img
                        src={collection.url}
                        alt=''
                        style={{
                            display: index === currentImageIndex ? 'block' : 'none',
                        }}
                        className='w-full min-w-[1364px] max-h-[680px] object-cover object-center shadow-lg shadow-[#666666] rounded-md'
                    />
                    <div
                        className='absolute bottom-0 right-0'
                        style={{
                            display: index === currentImageIndex ? 'block' : 'none',
                        }}
                    >
                        <h1
                            className='backdrop-blur-3xl rounded-t-xl rounded-l-xl px-4 text-8xl font-Roboto font-extrabold bg-gradient-to-b from-[#666666] to-white text-transparent bg-clip-text'
                        >
                            {collection.article}
                        </h1>
                    </div>
                </div>
            ))}
            <div className='flex items-center justify-center mt-5'>
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 p-0 rounded-lg ${index === currentImageIndex ? 'bg-white' : 'bg-[#666666]'
                            }`}
                        onClick={() => handleDotClick(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;