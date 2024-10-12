import React, { useState } from 'react';
import axios from 'axios';

interface HeaderImage {
    article: string;
    file: File | null;
}

const HeaderImageForm: React.FC = () => {
    const [formData, setFormData] = useState<HeaderImage>({
        article: '',
        file: null,
    });

    const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion
    console.log(import.meta.env, 'error defined');

    const [message, setMessage] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview

    // Handle text input (article)
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input (image)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData({
            ...formData,
            file: file,
        });

        // Set image preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null); // Clear preview if no file is selected
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('article', formData.article);
        if (formData.file) {
            formDataToSend.append('file', formData.file); // Append the file to the form data
        }

        try {
            const response = await axios.post(`${API_URL}/header-images`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) { // Check if created successfully
                setMessage('Header image created successfully!');
                setFormData({ article: '', file: null });
                setImagePreview(null); // Clear preview on success
            } else {
                setMessage('Error creating header image');
            }
        } catch (error) {
            setMessage('Network error, please try again later');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-16 md:mt-[72px]">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Header Image</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Article:</label>
                    <input
                        type="text"
                        name="article"
                        value={formData.article}
                        onChange={handleTextChange}
                        required
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Upload Image:</label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Image Preview */}
                {imagePreview && (
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Image Preview:</label>
                        <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg border border-gray-300" />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
            {message && (
                <p className={`mt-4 p-2 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default HeaderImageForm;
