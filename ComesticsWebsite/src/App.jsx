import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserProvider, useUser } from './UserContext';
import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import ProductCard from './components/ProductCard';
import CategoryHighlights from './components/CategoryHighlights';
import Testimonials from './components/Testimonials';
import CartModal from './components/CartModal';
import ProductDetail from './components/ProductDetail';
import Category from './components/Category';
import mockProducts from './data/mockProducts';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Login from './components/Login';
import Pagination from './components/Pagination';
import Products from './components/Product';
import Register from './components/Register';
import Search from './components/Search';
import Header from './components/Header';
import Profile from './components/Profile';
import About from './components/About';
import Contact from './components/Contact';

// Mock backend data for users
const mockUsers = [
  { username: 'user', email: 'user@example.com', password: 'password123' },
];



function AboutUs() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Về chúng tôi</h2>
        <p className="text-gray-700 mb-4">
          Chúng tôi là cửa hàng chuyên cung cấp các sản phẩm làm đẹp chất lượng cao, từ trang điểm, chăm sóc da đến nước hoa và quà tặng. Với cam kết mang đến cho khách hàng những trải nghiệm mua sắm tuyệt vời nhất, chúng tôi luôn nỗ lực để cung cấp dịch vụ tốt nhất và sản phẩm đáng tin cậy.
        </p>
        <p className="text-gray-700">
          Hãy đến với chúng tôi để khám phá thế giới làm đẹp và tìm kiếm những sản phẩm phù hợp nhất cho bạn!
        </p>
      </div>
    </section>
  );
}


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
    }, 500);
  }, []);

  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(-4);
  const bestSellers = products.filter(p => p.price > 300000).slice(0, 4);

  return (
    <>
      <Hero />
      <ProductSection id="products" title="Sản phẩm nổi bật" products={featuredProducts} link="/products" />
      <CategoryHighlights />
      <ProductSection title="Sản phẩm mới" products={newArrivals} />
      <ProductSection title="Bán chạy nhất" products={bestSellers} />
      <Testimonials />
      <AboutUs />
    </>
  );
}


function AppContent() {
  const [showCart, setShowCart] = useState(false);

  return (
    <div className="App-wrapper">
      <Header setShowCart={setShowCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      {showCart && <CartModal setShowCart={setShowCart} />}
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}