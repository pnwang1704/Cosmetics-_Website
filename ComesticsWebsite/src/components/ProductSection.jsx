import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ProductCard from './ProductCard';

export default function ProductSection({ title, products, link, id }){
    return (
        <section id={id} className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
            {products.length === 0 ? (
              <p className="text-center">Đang tải...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {link && (
                  <div className="text-center mt-8">
                    <Link
                      to={link}
                      className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transform hover:scale-105 transition"
                    >
                      Xem thêm
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      );
}