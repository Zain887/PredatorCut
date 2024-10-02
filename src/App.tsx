// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Menubar from './components/commonComponents/Menubar';
import LoadingAnimation from './components/loading/LoadingAnimation';
import Footer from './components/commonComponents/Footer';
import { categories, headerImages } from './data';
import CategoryPage from './components/commonComponents/CategoryPage';
import LandingPage from './pages/LandingPage';
import CartHolder from './components/CartHolder';
import ProductDetails from './components/ProductDetails';
import { Product } from './types'; // Ensure the correct import for Product
import AdminPanel from './admin/AdminPanel';

function App() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]); // Initialize cart state

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  // Combine all products from all categories and subcategories
  const allProducts = categories.flatMap(category =>
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
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="fade-in">
          <Menubar categories={categories} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {categories.map((category) => (
              <Route
                key={category.id}
                path={`/${category.name}`}
                element={<CategoryPage addToCart={addToCart} selectedCategory={category} headerImages={headerImages} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/cart" element={<CartHolder cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/product/:id" element={<ProductDetails products={allProducts} addToCart={addToCart} />} />
            <Route path='/admin' element={< AdminPanel/>}/>
          </Routes>
          <Footer categories={categories} />
        </div>
      )}
    </Router>
  );
}

export default App;
