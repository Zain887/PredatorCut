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
import { CartItem, Category, HeaderImages, Product } from './types';
import AdminPanel from './admin/AdminPanel';
import ErrorBoundary from './ErrorBoundry';
import axios from 'axios';
import Login from './admin/Login';
import Register from './admin/Register';

function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [headerImage, setHeaderImage] = useState<HeaderImages[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token'); // Check if token exists
  });
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin status

  const API_URL = import.meta.env.VITE_API_URL as string;

  // Function to fetch cart data
  const fetchCartData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(response.data.items || []); // Update cart state with fetched items
      } catch (error) {
        handleAxiosError(error, 'Error fetching cart data');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCategories(), fetchHeaderImages()]);
      // Check login status on component mount
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        await fetchCartData(); // Fetch cart data if logged in
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${API_URL}/category`);
        setCategories(response.data);
      } catch (error: unknown) {
        handleAxiosError(error, 'Error fetching categories');
      }
    };

    const fetchHeaderImages = async () => {
      try {
        const response = await axios.get<HeaderImages[]>(`${API_URL}/header-images`);
        setHeaderImage(response.data.map(image => ({
          ...image,
          url: `${API_URL}${image.url}`,
        })));
      } catch (error: unknown) {
        handleAxiosError(error, 'Error fetching header images');
      }
    };

    fetchData().then(() => setLoading(false));
  }, [API_URL]);

  // Fetch cart data whenever the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchCartData(); // Fetch cart data if logged in
    }
  }, [isLoggedIn]);

  const handleAxiosError = (error: unknown, context: string) => {
    if (axios.isAxiosError(error)) {
      console.error(`${context}:`, error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error(`${context}:`, error.message);
    } else {
      console.error(`${context}:`, error);
    }
  };

  const handleLoginSuccess = (adminStatus: boolean) => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Update login state
      setIsAdmin(adminStatus); // Set admin status based on login
      fetchCartData(); // Fetch cart data on login success
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsLoggedIn(false); // Update login state
    setIsAdmin(false); // Reset admin status
    setCart([]); // Optionally clear the cart
  };

  const allProducts = categories.flatMap(category =>
    category.subcategories.flatMap(subcategory => subcategory.products)
  );

  const addToCart = async (product: Product) => {
    if (!isLoggedIn) {
      alert('You need to log in to add items to your cart.'); // Inform user to log in
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${API_URL}/cart/add/${product.id}`,
        { quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local cart state immediately
      if (response.status === 200) {
        setCart(response.data.items); // Update cart state immediately after adding
      }
    } catch (error) {
      handleAxiosError(error, 'Error adding to cart');
    }
  };

  const removeFromCart = async (productId: string) => {
    const token = localStorage.getItem('token');

    if (!productId) {
      console.error('Product ID is missing');
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 && response.data?.items) {
        setCart(response.data.items); // Update cart state after successful removal
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      handleAxiosError(error, 'Error removing from cart');
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(
        `${API_URL}/cart/update-quantity/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the local cart state immediately
      if (response.status === 200) {
        setCart(response.data.items); // Update cart state with new quantities
      }
    } catch (error) {
      handleAxiosError(error, 'Error updating quantity');
    }
  };

  return (
    <Router>
      <ErrorBoundary>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <div className="fade-in">
            <Menubar categories={categories}
              isLoggedIn={isLoggedIn}
              onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<LandingPage headerImages={headerImage} />} />
              {categories.map((category) => (
                <Route
                  key={category.id}
                  path={`/${category.name}`}
                  element={
                    <CategoryPage
                      addToCart={addToCart}
                      selectedCategory={category}
                      headerImages={headerImage}
                      categories={categories}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
              <Route
                path="/cart"
                element={
                  <CartHolder
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity} // Pass updateQuantity to CartHolder
                    fetchCartData={fetchCartData} // Pass fetchCartData as a prop
                  />
                }
              />
              <Route
                path="/product/:id"
                element={
                  <ProductDetails
                    products={allProducts}
                    addToCart={addToCart}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route path='/admin' element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
              <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
            </Routes>
            <Footer categories={categories} />
          </div>
        )}
      </ErrorBoundary>
    </Router>
  );
}

export default App;
