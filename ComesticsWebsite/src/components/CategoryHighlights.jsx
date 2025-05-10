import { Link } from "react-router-dom";

export default function CategoryHighlights(){
    const categories = [
        { name: "Trang điểm", path: "/category/makeup", image: "/src/assets/img/mascara.webp" },
        { name: "Da", path: "/category/skin", image: "/src/assets/img/bochamsocda.webp" },
        { name: "Hương thơm", path: "/category/fragrance", image: "/src/assets/img/nuochoa.webp" },
        { name: "Quà tặng", path: "/category/gifts", image: "/src/assets/img/setquatang.webp" },
        { name: "Bộ sản phẩm", path: "/category/sets", image: "/src/assets/img/botrangdiem.webp" },
      ];
    
      return (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Mua sắm theo danh mục</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <Link to={category.path} key={category.name} className="block">
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
                    <div className="p-4 text-center">
                      <h3 className="text-xl font-semibold">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );
}