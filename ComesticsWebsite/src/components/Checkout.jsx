import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
    const context = useUser();
  const { cartItems, setCartItems, orderHistory, setOrderHistory } = context || {};
  const navigate = useNavigate();

  // Kiểm tra chi tiết các thuộc tính từ context
  console.log('Context từ useUser:', context);
  if (!context || !setCartItems || !setOrderHistory) {
    console.error('UserContext không cung cấp đầy đủ giá trị: ', context);
    return <div className="py-12 pt-20 text-center">Đã xảy ra lỗi. Vui lòng thử lại sau.</div>;
  }

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Họ tên là bắt buộc'),
    address: Yup.string().required('Địa chỉ là bắt buộc'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số')
      .required('Số điện thoại là bắt buộc'),
    paymentMethod: Yup.string().required('Vui lòng chọn phương thức thanh toán'),
  });

  const handleConfirmOrder = (values, { setSubmitting }) => {
    console.log('Bắt đầu xử lý đơn hàng...');
    setSubmitting(true);

    setTimeout(() => {
      try {
        const total = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
        const order = {
          id: Date.now(),
          items: [...cartItems],
          total: total,
          customerInfo: { ...values },
          date: new Date().toLocaleString(),
        };

        console.log('Đơn hàng mới:', order);

        // Cập nhật lịch sử đơn hàng
        setOrderHistory((prevOrderHistory) => {
          const newHistory = [...prevOrderHistory, order];
          console.log('Lịch sử đơn hàng sau khi cập nhật:', newHistory);
          return newHistory;
        });

        // Xóa giỏ hàng
        setCartItems([]);
        console.log('Giỏ hàng sau khi xóa:', []);

        // Hiển thị thông báo thành công
        alert('Đơn hàng của bạn đã được đặt thành công!');

        // Đặt lại trạng thái submitting
        setSubmitting(false);
        console.log('Xử lý đơn hàng hoàn tất.');

        // Chuyển hướng về trang chủ
        navigate('/');
      } catch (error) {
        console.error('Lỗi khi xử lý đơn hàng:', error);
        alert('Đã xảy ra lỗi khi xử lý đơn hàng. Vui lòng thử lại.');
        setSubmitting(false);
      }
    }, 1000); // Mô phỏng xử lý bất đồng bộ trong 1 giây
  };

  return (
    <section className="py-12 pt-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Thanh toán</h2>
        {cartItems.length === 0 ? (
          <p className="text-center">Không có sản phẩm nào để thanh toán.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>
              <Formik
                initialValues={{
                  fullName: '',
                  address: '',
                  phone: '',
                  paymentMethod: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleConfirmOrder}
              >
                {({ isSubmitting }) => (
                  <Form className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                      <label className="block text-gray-700">Họ tên</label>
                      <Field
                        type="text"
                        name="fullName"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage name="fullName" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Địa chỉ</label>
                      <Field
                        type="text"
                        name="address"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage name="address" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Số điện thoại</label>
                      <Field
                        type="text"
                        name="phone"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700">Phương thức thanh toán</label>
                      <Field as="select" name="paymentMethod" className="w-full p-2 border rounded">
                        <option value="">Chọn phương thức thanh toán</option>
                        <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                        <option value="bank">Chuyển khoản ngân hàng</option>
                        <option value="momo">Thanh toán qua MoMo</option>
                      </Field>
                      <ErrorMessage name="paymentMethod" component="div" className="text-red-600 text-sm" />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                      {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt hàng'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center mb-4 border-b pb-2">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p>
                        {item.product.price.toLocaleString()} VNĐ x {item.quantity} ={' '}
                        {(item.product.price * item.quantity).toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>
                ))}
                <p className="font-bold text-xl">
                  Tổng: {cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString()} VNĐ
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}