import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderImageForm from './HeaderImageForm';
import { Category, HeaderImages, Subcategory, Product } from '../types';
import CategoryForm from './CategoryForm';
import ProductTypeForm from './ProductTypeForm';
import ProductForm from './ProductForm';
import { MdDelete, MdModeEdit } from "react-icons/md";


const AdminPanel: React.FC = () => {
    const [headerImage, setHeaderImage] = useState<HeaderImages[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [productType, setProductType] = useState<Subcategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeComponent, setActiveComponent] = useState<'headerImage' | 'category' | 'productType' | 'product'>('headerImage');
    const [activeSubComponent, SetActiveSubComponent] = useState<'new' | 'list'>('new');
    const [editingHeaderImage, setEditingHeaderImage] = useState<any | null>(null); // State for the header image being edited
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined); // Use undefined instead of null
    const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | undefined>(undefined);



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

    const deleteProduct = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/product/${id}`);
            setProducts(prevProduct => prevProduct.filter(product => product.id !== id));
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

    const handleUpdate = async (id: string, formData: FormData) => {
        try {
            const response = await axios.patch(`${API_URL}/header-images/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Update received:', response.data);

                setHeaderImage((prev) =>
                    prev.map((image) =>
                        image.id === id
                            ? { ...image, article: response.data.article, imageUrl: response.data.imageUrl }
                            : image
                    )
                );
                setEditingHeaderImage(null);
            } else {
                console.error('Error updating header image');
            }
        } catch (error) {
            console.error('Error updating header image:', error);
        }
    };



    const handleEdit = (image: any) => {
        setEditingHeaderImage(image);
        SetActiveSubComponent('new'); // Switch to the form component
    };

    // Handle selecting a category to edit
    const handleEditCat = (category: Category) => {
        setEditingCategory(category);
        SetActiveSubComponent('new');
    };

    // Handle updating a category
    const handleUpdateCat = (updatedCategory: Category) => {
        setCategories((prevCategories) =>
            prevCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
        setEditingCategory(undefined); // Clear editing state after update
    };

    const handleEditSubcategory = (subcategory: Subcategory) => {
        setEditingSubcategory(subcategory);
        SetActiveSubComponent('new');
    };

    const handleUpdateSubcategory = (updatedSubcategory: Subcategory) => {
        setProductType(prevSubcategories => prevSubcategories.map(sub => (sub.id === updatedSubcategory.id ? updatedSubcategory : sub)));
        setEditingSubcategory(undefined);
    };
    return (
        <>
            <h1 className="text-white font-extrabold text-4xl text-center md:w-full mt-16">Admin Panel</h1>
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
                        <>
                            <div className='flex w-full'>
                                <button onClick={() => SetActiveSubComponent('new')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'new' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>Add New HeaderImage</button>
                                <button onClick={() => SetActiveSubComponent('list')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>HeaderImage List</button>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-evenly mt-5">
                                {activeSubComponent === "new" && (
                                    <div className="w-full">
                                        <HeaderImageForm
                                            existingHeaderImage={editingHeaderImage} // Pass existing header image data if available
                                            onUpdate={handleUpdate} // Your function to handle update logic
                                        />
                                    </div>
                                )}
                                {activeSubComponent === 'list' && (
                                    <div className="w-full overflow-x-auto">
                                        <table className="min-w-full text-left bg-white rounded-lg shadow-md">
                                            <thead className="bg-gray-200 text-black font-bold">
                                                <tr>
                                                    <th className="border-b px-4 py-2">Title</th>
                                                    <th className="border-b px-4 py-2">Image</th>
                                                    <th className="border-b px-4 py-2">Delete</th>
                                                    <th className="border-b px-4 py-2">Edit</th>
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
                                                            <MdDelete size={30} color='red' onClick={() => deleteHeaderImage(image.id)} />
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            <MdModeEdit size={30} color='green' onClick={() => handleEdit(image)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {activeComponent === 'category' && (
                        <>
                            <div className='flex w-full'>
                                <button onClick={() => SetActiveSubComponent('new')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'new' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>Add New Category</button>
                                <button onClick={() => SetActiveSubComponent('list')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>Category List</button>
                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-evenly mt-5">
                                {activeSubComponent === "new" && (

                                    <div className="w-full mb-5 md:mb-0">
                                        <CategoryForm
                                            existingCategory={editingCategory}
                                            onCategoryCreated={(newCategory) => setCategories([...categories, ...newCategory])}
                                            onUpdate={handleUpdateCat}
                                        />
                                    </div>
                                )}
                                {activeSubComponent === "list" && (

                                    <div className="w-full overflow-x-auto">
                                        <table className="min-w-full text-left bg-white rounded-lg shadow-md">
                                            <thead className="bg-gray-200 text-black font-bold">
                                                <tr>
                                                    <th className="border-b px-4 py-2">Categories</th>
                                                    <th className="border-b px-4 py-2">Delete</th>
                                                    <th className="border-b px-4 py-2">Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {categories.map(data => (
                                                    <tr key={data.id} className="hover:bg-gray-100">
                                                        <td className="border-b px-4 py-2 text-black">{data.name}</td>
                                                        <td className="border-b px-4 py-2">
                                                            <MdDelete size={30} color='red' onClick={() => deleteCategory(data.id)} />
                                                        </td>
                                                        <td className="border-b px-4 py-2">
                                                            <MdModeEdit size={30} color='green' onClick={() => handleEditCat(data)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {activeComponent === 'productType' && (
                        <>
                            <div className='flex w-full'>
                                <button onClick={() => SetActiveSubComponent('new')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'new' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>Add New ProductType</button>
                                <button onClick={() => SetActiveSubComponent('list')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>ProductType List</button>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly">
                                {activeSubComponent === "new" && (
                                    <ProductTypeForm
                                    existingSubcategory={editingSubcategory}
                                    onProductTypeCreated={handleUpdateSubcategory}
                                />
                                )}
                                {activeSubComponent === "list" && (
                                    <div className="w-full mt-4 md:mt-0">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-left">
                                                <thead className="bg-gray-200 text-black font-bold">
                                                    <tr>
                                                        <th className="border-b px-4 py-2">Product Types</th>
                                                        <th className="border-b px-4 py-2">Delete</th>
                                                        <th className="border-b px-4 py-2">Edit</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productType.map(data => (
                                                        <tr key={data.id}>
                                                            <td className="border-b px-4 py-2 text-black">{data.name}</td>
                                                            <td className="border-b px-4 py-2">
                                                                <MdDelete size={30} color='red' onClick={() => deleteProductType(data.id)} />
                                                            </td>
                                                            <td className="border-b px-4 py-2">
                                                                <MdModeEdit size={30} color='green' onClick={() => handleEditSubcategory(data)} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {activeComponent === 'product' && (
                        <>
                            <div className='flex w-full'>
                                <button onClick={() => SetActiveSubComponent('new')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'new' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>Add New ProductType</button>
                                <button onClick={() => SetActiveSubComponent('list')} className={`w-full p-3 text-center border-blue-500 ${activeSubComponent === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>ProductType List</button>
                            </div>
                            {activeSubComponent === "list" && (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left">
                                        <thead className="bg-gray-200 text-black font-bold">
                                            <tr>
                                                <th className="border-b px-4 py-2">Product Name</th>
                                                <th className="border-b px-4 py-2">Delete</th>
                                                <th className="border-b px-4 py-2">Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map(product => (
                                                <tr key={product.id}>
                                                    <td className="border-b px-4 py-2 text-black">{product.name}</td>
                                                    <td className="border-b px-4 py-2">
                                                        <MdDelete size={30} color='red' onClick={() => deleteProduct(product.id)} />
                                                    </td>
                                                    <td className="border-b px-4 py-2">
                                                        <MdModeEdit size={30} color='green' onClick={() => { }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {activeSubComponent === "new" && (
                                <div className="mt-5">
                                    <ProductForm />
                                </div>
                            )}
                        </>
                    )}

                </div>
            </div>
        </>
    );
};

export default AdminPanel;
