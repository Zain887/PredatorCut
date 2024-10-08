import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderImageForm from './HeaderImageForm';
import { Category, HeaderImages, Subcategory, Product } from '../types';
import CategoryForm from './CategoryForm';
import ProductTypeForm from './ProductTypeForm';
import ProductForm from './ProductForm';

const AdminPanel: React.FC = () => {
    const [headerImage, setHeaderImage] = useState<HeaderImages[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [productType, setProductType] = useState<Subcategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]); // State for products
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion
    console.log(import.meta.env, 'error defined');

    
    // Make sure to check if API_URL is defined
     if (!API_URL) {
        console.error('API_URL is not defined');
        return <div>Error: API_URL is not set.</div>;
    }

    const fetchHeaderImages = async () => {
        try {
            const response = await axios.get(`${API_URL}header-images`);
            setHeaderImage(response.data);
        } catch (error) {
            console.error('Error fetching header images:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}category`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProductType = async () => {
        try {
            const response = await axios.get(`${API_URL}subcategory`);
            setProductType(response.data);
        } catch (error) {
            console.error('Error fetching product types:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}product`); // Assuming you have this endpoint
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteHeaderImage = async (id: string) => {
        try {
            await axios.delete(`${API_URL}header-images/${id}`);
            setHeaderImage(prevImages => prevImages.filter(image => image.id !== id));
        } catch (error) {
            console.error('Error deleting header image:', error);
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await axios.delete(`${API_URL}category/${id}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const deleteProductType = async (id: string) => {
        try {
            await axios.delete(`${API_URL}subcategory/${id}`);
            setProductType(prevProductType => prevProductType.filter(productType => productType.id !== id));
        } catch (error) {
            console.error('Error deleting product type:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                fetchHeaderImages(),
                fetchCategories(),
                fetchProductType(),
                fetchProducts(), // Fetch products
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="py-20">
            <h1 className="text-white font-extrabold text-4xl text-center">Admin Panel</h1>
            <div className="border border-white rounded-md w-3/4 m-auto p-5 mt-10 bg-white">
                {/* Header Image Form Section */}
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
                                            <img src={`http://localhost:3000${image.url}`} alt={image.article} className="w-auto h-20 object-cover" />
                                        </td>
                                        <td className="border-b px-4 py-2">
                                            <button onClick={() => deleteHeaderImage(image.id)} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700">
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

                {/* Categories Section */}
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
                                                <button onClick={() => deleteCategory(data.id)} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700">
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

                {/* Product Types Section */}
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
                                                <button onClick={() => deleteProductType(data.id)} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-700">
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

                {/* Products Section */}
                <div className="mt-5">
                    <h2 className="text-black font-bold text-xl">Products</h2>
                    <div>
                        <table className="w-full text-left">
                            <thead className='text-black font-bold'>
                                <tr>
                                    <th className="border-b px-4 py-2">Product Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="border-b px-4 py-2 text-black">{product.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />

                {/* Product Form Section */}
                <div className="mt-5">
                    <ProductForm />
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
