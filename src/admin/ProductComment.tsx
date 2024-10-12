import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Comment {
    id: string; // Adjust this based on your backend comment structure
    user: string;
    comment: string;
    rating?: number;
}

interface Props {
    productId: string; // The productId will be passed as a prop to associate the comment with a specific product
}

const ProductComment: React.FC<Props> = ({ productId }) => {
    const [user, setUser] = useState<string>(''); // State to hold the user's name
    const [comment, setComment] = useState<string>(''); // State to hold the comment text
    const [rating, setRating] = useState<number | undefined>(undefined); // State to hold the rating
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // State to track form submission status
    const [message, setMessage] = useState<string | null>(null); // Message for success or error feedback
    const [comments, setComments] = useState<Comment[]>([]); // State to hold fetched comments

    // Fetch comments when the component mounts
    useEffect(() => {
        const fetchComments = async () => {
            const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion
            if (!API_URL) {
                console.error('API_URL is not defined');
                return;
            }
            try {
                const response = await axios.get(`${API_URL}/product-comment/${productId}`);
                if (response.status === 200) {
                    setComments(response.data); // Assuming the data is an array of comments
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [productId]); // Run the effect when productId changes

    const handleSubmit = async (e: React.FormEvent) => {
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
            const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion
            const response = await axios.post(`${API_URL}/product-comment/${productId}`, newComment);

            if (response.status === 201 || response.status === 200) {
                setMessage('Comment submitted successfully!');
                setUser(''); // Clear the form fields
                setComment('');
                setRating(undefined);
                setComments((prevComments) => [...prevComments, { ...newComment, id: response.data.id }]); // Add the new comment to the list
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

        <div className="w-full mx-auto p-4 bg-white">
            {/* Display Comments Section */}
            <h3 className="text-xl font-bold mt-6 text-black">Comments</h3>
            <div className="mt-4">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="border-b mb-4 pb-2">
                            <div className='flex justify-between border-b mb-5'>
                                <p className="font-semibold text-black">{comment.user}</p>
                                {comment.rating && (
                                    <p className="text-yellow-500">Rating: {comment.rating} Start</p>
                                )}
                            </div>
                            <p className='text-black'>{comment.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-black text-center">Leave a Comment</h2>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="user" className="block text-sm font-semibold text-gray-800">Name:</label>
                    <input
                        type="text"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 bg-white text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-semibold text-gray-800">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                        className="mt-1 block w-full p-3 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out"
                        rows={4}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-800">Rating (optional):</label>
                    <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setRating(star)} // Optional: change color on hover
                                onMouseLeave={() => setRating(rating)} // Reset color on mouse leave
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-8 w-8 cursor-pointer transition duration-200 ease-in-out ${rating && rating >= star ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
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
                    className={`w-full p-3 text-white font-bold rounded-md transition duration-200 ease-in-out ${isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50'}`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                </button>
            </form>

            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default ProductComment;
