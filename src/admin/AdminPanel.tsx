import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderImageForm from './HeaderImageForm';
import { Category, HeaderImages, ProductTypes } from '../types';
import CategoryForm from './CategoryForm';
import ProductTypeForm from './ProductTypeForm';

const AdminPanel: React.FC = () => {
    const [headerImage, setHeaderImage] = useState<HeaderImages[]>([]); // State to hold the fetched data
    const [categories, setCategories] = useState<Category[]>([]);
    const [productType, setProductType] = useState<ProductTypes[]>([]);
    const [loading, setLoading] = useState(true); // Loading state for fetching

    // Function to fetch header images from the backend
    const fetchHeaderImages = async () => {
        try {
            const response = await axios.get('http://localhost:3000/header-images'); // Replace with your actual API endpoint
            setHeaderImage(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching header images:', error);
            setLoading(false);
        }
    };

    // Function to fetch categories from the backend
    const fetchCategoires = async () => {
        try {
            const response = await axios.get('http://localhost:3000/category'); // Replace with your actual API endpoint
            setCategories(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Categories:', error);
            setLoading(false);
        }
    };

    // Function to fetch categories from the backend
    const fetchProductType = async () => {
        try {
            const response = await axios.get('http://localhost:3000/product-type'); // Replace with your actual API endpoint
            setProductType(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching Categories:', error);
            setLoading(false);
        }
    };

    // Function to delete an image by its ID
    const deleteHeaderImage = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/header-images/${id}`); // Replace with your actual delete endpoint
            // Remove the deleted image from the local state without re-fetching
            setHeaderImage(prevImages => prevImages.filter(image => image.id !== id));
        } catch (error) {
            console.error('Error deleting header image:', error);
        }
    };

    // Function to delete an image by its ID
    const deleteCatgory = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/category/${id}`); // Replace with your actual delete endpoint
            // Remove the deleted image from the local state without re-fetching
            setCategories(prevCategory => prevCategory.filter(categories => categories.id !== id));
        } catch (error) {
            console.error('Error deleting header image:', error);
        }
    };

    // Fetch the data when the component is mounted
    useEffect(() => {
        fetchHeaderImages();
        fetchCategoires();
        fetchProductType();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Optional loading state while data is being fetched
    }

    return (
        <div className="py-20">
            <h1 className="text-white font-extrabold text-4xl text-center">Admin Panel</h1>
            <div className="border border-white rounded-md w-3/4 m-auto p-5 mt-10 bg-white">
                <div className="flex items-center justify-evenly">
                    <HeaderImageForm />
                    <div>
                        <table className="w-full text-left">
                            <thead className='text-black font-bold'>
                                <tr>
                                    <th className="border-b px-4 py-2">Title</th>
                                    <th className="border-b px-4 py-2">Image</th>
                                    <th className="border-b px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headerImage.map(image => (
                                    <tr key={image.id}>
                                        <td className="border-b px-4 py-2 text-black">{image.article}</td>
                                        <td className="border-b px-4 py-2">
                                            <img src={`http://localhost:3000${image.url}`}
                                                alt={image.article} className="w-auto h-20 object-cover" />
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            <button
                                                onClick={() => deleteHeaderImage(image.id)}
                                                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
                <div className='mt-5'>
                    <div className="flex items-center justify-evenly">
                        <CategoryForm />
                        <div>
                            <table className="w-full text-left">
                                <thead className='text-black font-bold'>
                                    <tr>
                                        <th className="border-b px-4 py-2">Categories</th>
                                        <th className="border-b px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map(data => (
                                        <tr key={data.id}>
                                            <td className="border-b px-4 py-2 text-black">{data.name}</td>
                                            <td className="border-b px-4 py-2">
                                                <button
                                                    onClick={() => deleteCatgory(data.id)}
                                                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='mt-5'>
                    <div className="flex items-center justify-evenly">
                        <ProductTypeForm />
                        <div>
                            <table className="w-full text-left">
                                <thead className='text-black font-bold'>
                                    <tr>
                                        <th className="border-b px-4 py-2">Categories</th>
                                        <th className="border-b px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productType.map(data => (
                                        <tr key={data.id}>
                                            <td className="border-b px-4 py-2 text-black">{data.name}</td>
                                            <td className="border-b px-4 py-2">
                                                <button
                                                    onClick={() => deleteCatgory(data.id)}
                                                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
