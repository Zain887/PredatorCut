import React, { useState, MouseEvent } from 'react';

interface Props {
    // Define your component props here
}

const Tracer: React.FC<Props> = () => {
    const [positions, setPositions] = useState<{ x: number; y: number }[]>([
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ]);

    const handleMouseMove = (index: number, event: MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = 1 - (event.clientX - rect.left) / rect.width; // Adjust x calculation
        const y = 1 - (event.clientY - rect.top) / rect.height; // Adjust y calculation

        setPositions((prevPositions) => {
            const newPositions = [...prevPositions];
            newPositions[index] = { x, y };
            return newPositions;
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5 mb-16">
            {positions.map((position, index) => (
                <img
                    key={index}
                    src={`/tracerImage/frame${index + 1}.png`}
                    alt="predator Cut"
                    className="w-full h-auto sm:h-60 md:h-80 cursor-pointer duration-700 relative m-auto"
                    style={{
                        transform: `translate(${position.x * 20}px, ${position.y * 20}px)`,
                        maxWidth: '300px', // Set a max width for larger screens
                    }}
                    onMouseMove={(event) => handleMouseMove(index, event)}
                />
            ))}
        </div>

    );
};

export default Tracer;
