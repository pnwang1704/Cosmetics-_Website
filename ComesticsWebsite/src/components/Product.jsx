import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import CartModal from "./CartModal";
import mockProducts from "../data/mockProducts";

export default function Products(){
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
    }, 500);
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="py-12 bg-gray-100 pt-20">
      <div className="container mx-auto px-4 mt-5">
        <h2 className="text-3xl font-bold text-center mb-8">Sản phẩm nổi bật</h2>
        {products.length === 0 ? (
          <p className="text-center">Đang tải...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
        {showCart && <CartModal setShowCart={setShowCart} />}
      </div>
    </section>
  );
}