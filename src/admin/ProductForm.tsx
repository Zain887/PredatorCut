import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Category, Subcategory, Product, ProductDetails } from '../types';

interface Props {
  onProductCreated?: (product: Product) => void;
}

const ProductForm: React.FC<Props> = ({ onProductCreated }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>(''); // Change to string
  const [quantity, setQuantity] = useState<string>('1'); // Change to string
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState<string>('');
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    description: '',
    bladeLength: '',
    bladeMaterial: '',
    handleLength: '',
    handleMaterial: '',
    totalLength: ''
  });
  const [categoryId, setCategoryId] = useState<string>('');
  const [subcategoryId, setSubcategoryId] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL as string; // Add type assertion

  // Fetch categories from the backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${API_URL}/category`);
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryId) return;

    async function fetchSubcategories() {
      try {
        const response = await axios.get(`${API_URL}/subcategory/category/${categoryId}`);
        setSubcategories(response.data);
      } catch (err) {
        setError('Failed to fetch subcategories');
        console.error(err);
      }
    }

    fetchSubcategories();
  }, [categoryId]);



  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        name,
        price: Number(price), // Convert to number
        quantity: Number(quantity), // Convert to number
        imageUrl, // array of image URLs
        shortDescription,
        categoryId,
        subcategoryId,
        tag: tag.split(','), // Convert tag input into an array of tags
        productDetails,
      };

      const response = await axios.post(`${API_URL}/product`, productData);

      if (response.data && onProductCreated) {
        onProductCreated(response.data); // Pass the newly created product to the parent
      }

      setMessage('Product created successfully!');

      // Reset form fields
      resetForm();
    } catch (err) {
      setError('Failed to create product');
      setMessage('Error creating product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setName('');
    setPrice('');
    setQuantity('1');
    setImageUrl([]);
    setShortDescription('');
    setProductDetails({
      description: '',
      bladeLength: '',
      bladeMaterial: '',
      handleLength: '',
      handleMaterial: '',
      totalLength: ''
    });
    setCategoryId('');
    setSubcategoryId('');
    setTag('');
  };

  // Handle image upload and convert to actual image path
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      // Create a FormData object to hold the files
      const formData = new FormData();
      filesArray.forEach(file => {
        formData.append('images', file); // 'images' is the name of the field your backend expects
      });

      try {
        // Make the API request to upload images
        const response = await axios.post(`${API_URL}/product/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Assuming the server response contains the URLs of the uploaded images
        const imageUrls = response.data.urls; // Adjust this according to your response structure
        setImageUrl(imageUrls); // Set the state with actual image URLs

      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
  };

  // Handle Product Detail change
  const handleProductDetailChange = (field: keyof ProductDetails, value: string) => {
    setProductDetails({
      ...productDetails,
      [field]: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Create New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter product name"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-lg font-medium text-gray-700">Price</label>
          <input
            type="text" // Change to text
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)} // Handle as string
            required
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity</label>
          <input
            type="text" // Change to text
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} // Handle as string
            required
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-lg font-medium text-gray-700">Upload Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
          {imageUrl.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-medium text-gray-700">Image Preview:</h4>
              <div className="flex space-x-4 mt-2">
                {imageUrl.map((url, index) => (
                  <img key={index} src={url} alt={`preview-${index}`} className="w-24 h-24 object-cover rounded-md" />
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Product Details - Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Product Description</label>
          <textarea
            id="description"
            value={productDetails.description}
            onChange={(e) => handleProductDetailChange('description', e.target.value)}
            placeholder="Enter product description"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details - Blade Length */}
        <div>
          <label htmlFor="bladeLength" className="block text-lg font-medium text-gray-700">Blade Length</label>
          <input
            type="text"
            id="bladeLength"
            value={productDetails.bladeLength}
            onChange={(e) => handleProductDetailChange('bladeLength', e.target.value)}
            placeholder="Enter blade length"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details - Blade Material */}
        <div>
          <label htmlFor="bladeMaterial" className="block text-lg font-medium text-gray-700">Blade Material</label>
          <input
            type="text"
            id="bladeMaterial"
            value={productDetails.bladeMaterial}
            onChange={(e) => handleProductDetailChange('bladeMaterial', e.target.value)}
            placeholder="Enter blade material"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details - Handle Length */}
        <div>
          <label htmlFor="handleLength" className="block text-lg font-medium text-gray-700">Handle Length</label>
          <input
            type="text"
            id="handleLength"
            value={productDetails.handleLength}
            onChange={(e) => handleProductDetailChange('handleLength', e.target.value)}
            placeholder="Enter handle length"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details - Handle Material */}
        <div>
          <label htmlFor="handleMaterial" className="block text-lg font-medium text-gray-700">Handle Material</label>
          <input
            type="text"
            id="handleMaterial"
            value={productDetails.handleMaterial}
            onChange={(e) => handleProductDetailChange('handleMaterial', e.target.value)}
            placeholder="Enter handle material"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Product Details - Total Length */}
        <div>
          <label htmlFor="totalLength" className="block text-lg font-medium text-gray-700">Total Length</label>
          <input
            type="text"
            id="totalLength"
            value={productDetails.totalLength}
            onChange={(e) => handleProductDetailChange('totalLength', e.target.value)}
            placeholder="Enter total length"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700">Short Description</label>
          <textarea
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Enter a short description"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="categoryId" className="block text-lg font-medium text-gray-700">Select Category</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        {categoryId && (
          <div>
            <label htmlFor="subcategoryId" className="block text-lg font-medium text-gray-700">Select Subcategory</label>
            <select
              id="subcategoryId"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              required
              className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select a subcategory</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Product Tags */}
        <div>
          <label htmlFor="tag" className="block text-lg font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter product tags"
            className="bg-white text-black mt-2 w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-lg text-green-600">{message}</p>}
      {error && <p className="mt-4 text-center text-lg text-red-600">{error}</p>}
    </div>
  );
};

export default ProductForm;
