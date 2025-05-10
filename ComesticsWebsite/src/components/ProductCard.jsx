import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function ProductCard({ product }) { 

    const { user, addToCart } = useUser();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        if (!user) {
            alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            navigate('/login');
            return;
        }
        addToCart(product);
    };

    const handleProductClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div
            className="bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
            onClick={handleProductClick}
        >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.price.toLocaleString()} VNĐ</p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                    }}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transform hover:scale-105 transition"
                >
                    Thêm vào giỏ
                </button>
            </div>
        </div>
    );
}