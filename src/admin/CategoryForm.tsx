import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { Category } from '../types';

interface Props {
  // Define any other props you need
  onCategoryCreated?: (category: Category[]) => void; // Callback to parent if needed
}

const CategoryForm: React.FC<Props> = ({ onCategoryCreated }) => {
  // State for category form fields
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion
  console.log(import.meta.env, 'error defined');

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error before making a request

    try {
      // Make an API call to create the category in the backend
      const response = await axios.post(`${API_URL}/category`, {
        name,
      });

      // Handle the response and pass the created category back to the parent if needed
      if (response.data) {
        if (onCategoryCreated) {
          onCategoryCreated(response.data); // Pass the newly created category to the parent
        }
        setMessage('category created successfully!');
      }
    } catch (err) {
      setError('Failed to create category. Please try again later.');
      setMessage('Error creating category');
      console.error('Error creating category:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Create New Category</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter category name"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 text-white rounded-md focus:outline-none ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            {loading ? 'Creating...' : 'Create Category'}
          </button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 p-2 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CategoryForm;
