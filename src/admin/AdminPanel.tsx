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
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState<'headerImage' | 'category' | 'productType' | 'product'>('headerImage');

    const API_URL = import.meta.env.VITE_API_URL as string;

    if (!API_URL) {
        console.error('API_URL is not defined');
        return <div>Error: API_URL is not set.</div>;
    }

    const fetchHeaderImages = async () => {
        try {
            const response = await axios.get(`${API_URL}/header-images`);
            setHeaderImage(response.data);
        } catch (error) {
            console.error('Error fetching header images:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/category`);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProductType = async () => {
        try {
            const response = await axios.get(`${API_URL}/subcategory`);
            setProductType(response.data);
        } catch (error) {
            console.error('Error fetching product types:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/product`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteHeaderImage = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/header-images/${id}`);
            setHeaderImage(prevImages => prevImages.filter(image => image.id !== id));
        } catch (error) {
            console.error('Error deleting header image:', error);
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/category/${id}`);
            setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const deleteProductType = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/subcategory/${id}`);
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
                fetchProducts(),
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-white font-extrabold text-4xl text-center md:w-full">Admin Panel</h1>
            <div className="flex flex-col md:flex-row py-20">
                <div className="md:w-1/4 bg-gray-200 md:rounded-md p-5">
                    <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
                        <li>
                            <button
                                onClick={() => setActiveComponent('headerImage')}
                                className={`w-full p-3 text-left rounded-md ${activeComponent === 'headerImage' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            >
                                Header Images
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveComponent('category')}
                                className={`w-full p-3 text-left rounded-md ${activeComponent === 'category' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            >
                                Categories
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveComponent('productType')}
                                className={`w-full p-3 text-left rounded-md ${activeComponent === 'productType' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            >
                                Product Types
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveComponent('product')}
                                className={`w-full p-3 text-left rounded-md ${activeComponent === 'product' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            >
                                Products
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="md:w-3/4 w-full border border-white rounded-md m-auto p-5 bg-white">
                    {/* Render Active Component */}
                    {activeComponent === 'headerImage' && (
                        <div className="flex flex-col md:flex-row items-center justify-evenly mt-5">
                            <div className="w-full md:w-1/2">
                                <HeaderImageForm />
                            </div>
                            <div className="w-full md:w-1/2 overflow-x-auto">
                                <table className="min-w-full text-left bg-white rounded-lg shadow-md">
                                    <thead className="bg-gray-200 text-black font-bold">
                                        <tr>
                                            <th className="border-b px-4 py-2">Title</th>
                                            <th className="border-b px-4 py-2">Image</th>
                                            <th className="border-b px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {headerImage.map(image => (
                                            <tr key={image.id} className="hover:bg-gray-100">
                                                <td className="border-b px-4 py-2 text-black">{image.article}</td>
                                                <td className="border-b px-4 py-2">
                                                    <img
                                                        src={`${API_URL}${image.url}`}
                                                        alt={image.article}
                                                        className="w-auto h-20 object-cover rounded"
                                                    />
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
                    )}
                    {activeComponent === 'category' && (
                        <div className="flex flex-col md:flex-row items-center justify-evenly mt-5">
                            <div className="w-full md:w-1/2 mb-5 md:mb-0">
                                <CategoryForm />
                            </div>
                            <div className="w-full md:w-1/2 overflow-x-auto">
                                <table className="min-w-full text-left bg-white rounded-lg shadow-md">
                                    <thead className="bg-gray-200 text-black font-bold">
                                        <tr>
                                            <th className="border-b px-4 py-2">Categories</th>
                                            <th className="border-b px-4 py-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(data => (
                                            <tr key={data.id} className="hover:bg-gray-100">
                                                <td className="border-b px-4 py-2 text-black">{data.name}</td>
                                                <td className="border-b px-4 py-2">
                                                    <button
                                                        onClick={() => deleteCategory(data.id)}
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
                    )}
                    {activeComponent === 'productType' && (
                        <>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly">
                                <ProductTypeForm />
                                <div className="w-full mt-4 md:mt-0">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-left">
                                            <thead className="text-black font-bold">
                                                <tr>
                                                    <th className="border-b px-4 py-2">Product Types</th>
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
                        </>
                    )}
                    {activeComponent === 'product' && (
                        <>
                            <h2 className="text-black font-bold text-xl">Products</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead className="text-black font-bold">
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
                            <hr />
                            {/* Product Form Section */}
                            <div className="mt-5">
                                <ProductForm />
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    );
};

export default AdminPanel;
