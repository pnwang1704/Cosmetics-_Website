import { Link } from "react-router-dom";
import { useUser } from "../UserContext";

export default function OrderHistory() {
  const { orderHistory, user } = useUser();

  if (!user) {
    return (
      <section className="py-12 pt-20 bg-gray-100 text-center">
        <p>Vui lòng đăng nhập để xem lịch sử đơn hàng.</p>
        <Link to="/login" className="text-green-600 hover:underline mt-4 inline-block">Đăng nhập ngay</Link>
      </section>
    );
  }

  return (
    <section className="py-12 pt-20 bg-gray-100">
      <div className="container mx-auto px-4 mt-5">
        <h2 className="text-3xl font-bold text-center mb-8">Lịch sử đơn hàng</h2>
        {orderHistory.length === 0 ? (
          <p className="text-center">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Đơn hàng #{order.id}</h3>
                <p className="text-gray-600 mb-2">Ngày đặt: {order.date}</p>
                <p className="text-gray-600 mb-2">Tổng: {order.total.toLocaleString()} VNĐ</p>
                <div className="mb-2">
                  <strong>Thông tin giao hàng:</strong>
                  <p>Họ tên: {order.customerInfo.fullName}</p>
                  <p>Địa chỉ: {order.customerInfo.address}</p>
                  <p>Số điện thoại: {order.customerInfo.phone}</p>
                  <p>Phương thức thanh toán: {order.customerInfo.paymentMethod}</p>
                </div>
                <h4 className="font-semibold mb-2">Sản phẩm:</h4>
                <ul className="list-disc pl-5">
                  {order.items.map((item) => (
                    <li key={item.product.id}>
                      {item.product.name} - {item.quantity} x {item.product.price.toLocaleString()} VNĐ ={' '}
                      {(item.product.price * item.quantity).toLocaleString()} VNĐ
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}