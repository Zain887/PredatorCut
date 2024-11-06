import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Category } from '../types';

interface Props {
  onCategoryCreated?: (category: Category[]) => void;
  existingCategory?: Category;
  onUpdate?: (updatedCategory: Category) => void;
}

const CategoryForm: React.FC<Props> = ({ onCategoryCreated, existingCategory, onUpdate }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>(existingCategory?.name || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL as string;

  useEffect(() => {
    if (existingCategory) setName(existingCategory.name);
  }, [existingCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (existingCategory && onUpdate) {
        // Update existing category
        const response = await axios.patch(`${API_URL}/category/${existingCategory.id}`, { name });
        onUpdate(response.data); // Pass updated category to parent
        setMessage('Category updated successfully!');
      } else {
        // Create new category
        const response = await axios.post(`${API_URL}/category`, { name });
        onCategoryCreated && onCategoryCreated([response.data]);
        setMessage('Category created successfully!');
      }
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">{existingCategory ? 'Edit Category' : 'Create New Category'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-black">Category Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter category name"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-black"
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex justify-center">
          <button type="submit" disabled={loading} className={`px-6 py-3 text-white rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}>
            {loading ? 'Submitting...' : existingCategory ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </form>
      {message && <p className={`mt-4 p-2 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{message}</p>}
    </div>
  );
};

export default CategoryForm;
