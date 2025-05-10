import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import mockProducts from "../data/mockProducts";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import CartModal from "./CartModal";

export default function Category(){
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const categoryMapping = {
      makeup: "Trang điểm",
      skin: "Da",
      fragrance: "Hương thơm",
      gifts: "Quà tặng",
      sets: "Bộ sản phẩm",
    };
    const categoryName = categoryMapping[category] || "";
    const filteredProducts = mockProducts.filter(
      (product) => product.category === categoryName
    );
    setProducts(filteredProducts);
    setCurrentPage(1); // Reset về trang đầu khi thay đổi danh mục
  }, [category]);

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="py-12 bg-gray-100 pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Danh mục: {category ? category.charAt(0).toUpperCase() + category.slice(1) : ""}
        </h2>
        {products.length === 0 ? (
          <p className="text-center">Không có sản phẩm trong danh mục này.</p>
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