import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { Subcategory } from '../types'; // Import Subcategory interface

interface Props {
    onProductTypeCreated?: (subcategory: Subcategory) => void; // Callback to parent if needed
    existingSubcategory?: Subcategory; // New prop to handle editing an existing subcategory
}

const ProductTypeForm: React.FC<Props> = ({ onProductTypeCreated, existingSubcategory }) => {
    // State for product type form fields
    const [message, setMessage] = useState<string | null>(null);
    const [name, setName] = useState<string>(existingSubcategory?.name || ''); // Initialize with existing name if editing
    const [categoryId, setCategoryId] = useState<string>(existingSubcategory?.categoryId || ''); // Initialize with existing categoryId
    const [categories, setCategories] = useState<any[]>([]); // To hold available categories
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion

    // Fetch categories from the backend
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get(`${API_URL}/category`);
                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to fetch categories');
            }
        }

        fetchCategories();
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error before making a request

        try {
            if (existingSubcategory) {
                // If editing an existing subcategory, make a PUT request
                const response = await axios.patch(`${API_URL}/subcategory/${existingSubcategory.id}`, {
                    name,
                    categoryId, // Pass the categoryId
                });
                setMessage('Product type updated successfully!');
                if (onProductTypeCreated) {
                    onProductTypeCreated(response.data); // Pass the updated product type to the parent
                }
            } else {
                // Make an API call to create a new product type
                const response = await axios.post(`${API_URL}/subcategory`, {
                    name,
                    categoryId, // Pass the categoryId
                });
                if (response.data) {
                    if (onProductTypeCreated) {
                        onProductTypeCreated(response.data); // Pass the newly created product type to the parent
                    }
                    setMessage('Product type created successfully!');
                }
            }
        } catch (err) {
            setError('Failed to create/update product type. Please try again later.');
            console.error('Error creating/updating product type:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
                {existingSubcategory ? 'Edit Product Type' : 'Create New Product Type'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Type Name Input */}
                <div>
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Product Type Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter product type name"
                        className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label htmlFor="categoryId" className="block text-lg font-medium text-gray-700">Select Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Error Message */}
                {error && <div className="text-red-500 text-center">{error}</div>}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-3 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {loading ? 'Creating...' : existingSubcategory ? 'Update Product Type' : 'Create Product Type'}
                    </button>
                </div>
            </form>

            {/* Message Display */}
            {message && (
                <p className={`mt-4 p-2 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default ProductTypeForm;
