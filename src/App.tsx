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

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="fade-in">
          <Menubar categories={categories} />
          <Routes>
            <Route
              path="/"
              element={<LandingPage />}
            />
            {categories.map((category) => (
              <Route
                key={category.id}
                path={`/${category.name}`}
                element={<CategoryPage selectedCategory={category} headerImages={headerImages} />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/cart" element={<CartHolder />} /> {/* Route for cart */}
          </Routes>
          <Footer categories={categories} />
        </div>
      )}
    </Router>
  );
}

export default App;