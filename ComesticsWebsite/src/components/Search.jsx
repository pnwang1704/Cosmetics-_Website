import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import CartModal from "./CartModal";
import mockProducts from "../data/mockProducts";

export default function Search(){
    const location = useLocation();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get('query')?.toLowerCase() || '';
  
      if (query) {
        const results = mockProducts.filter((product) =>
          product.name.toLowerCase().includes(query)
        );
        setFilteredProducts(results);
      } else {
        setFilteredProducts([]);
      }
    }, [location.search]);
  
    return (
      <section className="py-12 bg-gray-100 pt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Kết quả tìm kiếm</h2>
          {filteredProducts.length === 0 ? (
            <p className="text-center">Không tìm thấy sản phẩm nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          {showCart && <CartModal setShowCart={setShowCart} />}
        </div>
      </section>
    );
}