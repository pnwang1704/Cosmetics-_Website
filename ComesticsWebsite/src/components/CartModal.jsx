import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

export default function CartModal({setShowCart}){
    const { cartItems, updateQuantity, removeFromCart } = useUser();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setShowCart(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-end z-30">
      <div className="bg-white w-full max-w-md h-full p-6 transform transition-transform duration-300 translate-x-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Giỏ hàng</h2>
          <button onClick={() => setShowCart(false)} className="text-gray-600 hover:text-red-600">
            ✕
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center mb-4">
                <div
                  onClick={() => navigate(`/product/${item.product.id}`)}
                  className="cursor-pointer flex-1"
                >
                  <p className="font-semibold">{item.product.name}</p>
                  <p>{item.product.price.toLocaleString()} VNĐ</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
            <p className="font-bold">
              Tổng: {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString()} VNĐ
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
            >
              Đặt hàng
            </button>
          </div>
        )}
      </div>
    </div>
  );

}