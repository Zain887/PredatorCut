import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    productId: string; // The productId will be passed as a prop to associate the comment with a specific product
}

const ProductComment: React.FC<Props> = ({ productId }) => {
    const [user, setUser] = useState<string>(''); // State to hold the user's name
    const [comment, setComment] = useState<string>(''); // State to hold the comment text
    const [rating, setRating] = useState<number | undefined>(undefined); // State to hold the rating
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State to track form submission status
    const [message, setMessage] = useState<string | null>(null); // Message for success or error feedback

    const handleSubmit = async (e: React.FormEvent) => {
        const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion
        // Make sure to check if API_URL is defined
        if (!API_URL) {
            console.error('API_URL is not defined');
            return;
        }

        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null); // Clear any previous message

        // Prepare the data to be sent to the backend
        const newComment = {
            user,
            comment,
            rating,
            productId, // Include the productId to associate the comment with the product
        };

        try {
            // Send a POST request to the backend to create the comment using axios
            const response = await axios.post(`${API_URL}product-comment/${productId}`, newComment);

            if (response.status === 201 || response.status === 200) {
                setMessage('Comment submitted successfully!');
                setUser(''); // Clear the form fields
                setComment('');
                setRating(undefined);
            } else {
                setMessage('Failed to submit comment. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full mx-auto p-4 border rounded shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">Leave a Comment</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Rating (optional):</label>
                    <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setRating(star)} // Optional: change color on hover
                                onMouseLeave={() => setRating(rating)} // Reset color on mouse leave
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 cursor-pointer ${rating && rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .587l3.668 7.568 8.332 1.214-6 5.848 1.416 8.234L12 18.896l-7.416 3.892L6 14.169l-6-5.848 8.332-1.214z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full p-2 text-white font-bold rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default ProductComment;
