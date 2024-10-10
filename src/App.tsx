// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Menubar from './components/commonComponents/Menubar';
import LoadingAnimation from './components/loading/LoadingAnimation';
import Footer from './components/commonComponents/Footer';
import CategoryPage from './components/commonComponents/CategoryPage';
import LandingPage from './pages/LandingPage';
import CartHolder from './components/CartHolder';
import ProductDetails from './components/ProductDetails';
import { Category, HeaderImages, Product } from './types'; // Ensure the correct import for Product
import AdminPanel from './admin/AdminPanel';
import ErrorBoundary from './ErrorBoundry';
import axios from 'axios';

function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]); // Initialize cart state
  const [categoires, setCategories] = useState<Category[]>([]);
  const [headerImage, setHeaderImage] = useState<HeaderImages[]>([]);
  const API_URL = import.meta.env.VITE_API_URL as string; // Make sure the API URL is properly defined


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}category`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchHeaderImages = async () => {
      try {
        const response = await axios.get<HeaderImages[]>('http://localhost:3000/header-images');
        if (response.status === 200) {
          const updatedImages = response.data.map(image => ({
            ...image,
            url: `http://localhost:3000${image.url}`, // Make sure this path is correct
          }));
          setHeaderImage(updatedImages);
        } else {
          console.error('Failed to fetch header images:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching header images:', error);
      }
    };

    fetchHeaderImages();
    fetchCategories();
  }, [])

  // Combine all products from all categories and subcategories
  const allProducts = categoires.flatMap(category =>
    category.subcategories.flatMap(subcategory => subcategory.products)
  );

  const addToCart = (product: Product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Update the quantity if it exists
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === id);
      if (existingProduct && existingProduct.quantity > 1) {
        // Decrease quantity if more than 1
        return prevCart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Remove the product if quantity is 1 or it doesn't exist
        return prevCart.filter(item => item.id !== id);
      }
    });
  };

  return (
    <Router>
      <ErrorBoundary>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <div className="fade-in">
            <Menubar categories={categoires} />
            <Routes>
              <Route path="/" element={<LandingPage headerImages={headerImage} />} />
              {categoires.map((category) => (
                <Route
                  key={category.id}
                  path={`/${category.name}`}
                  element={<CategoryPage addToCart={addToCart} selectedCategory={category} headerImages={headerImage}
                    categories={categoires} />}
                />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/cart" element={<CartHolder cart={cart} removeFromCart={removeFromCart} />} />
              <Route path="/product/:id" element={<ProductDetails products={allProducts} addToCart={addToCart} />} />
              <Route path='/admin' element={< AdminPanel />} />
            </Routes>
            <Footer categories={categoires} />
          </div>
        )}
      </ErrorBoundary>
    </Router>
  );
}

export default App;
