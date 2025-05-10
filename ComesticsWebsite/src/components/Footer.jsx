import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Ensure Formik components are imported
import * as Yup from 'yup'; // Import Yup for validation
export default function Footer(){
    const handleNewsletterSubmit = (values, { resetForm }) => {
        alert(`Đã đăng ký nhận bản tin với email: ${values.email}`);
        resetForm();
      };
    
      return (
        <footer className="bg-gray-800 text-white py-10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Thông tin liên hệ */}
            <div>
              <h3 className="text-lg font-bold mb-4">Liên hệ với chúng tôi</h3>
              <p>Email: pnquangcn1704@gmail.com && dangthaibao14@gmail.com</p>
              <p>Hotline: 0123 456 789</p>
              <p>Địa chỉ: 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh, Việt Nam</p>
            </div>
    
            {/* Liên kết hữu ích */}
            <div>
              <h3 className="text-lg font-bold mb-4">Liên kết hữu ích</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-green-400">Giới thiệu</Link></li>
                <li><Link to="/contact" className="hover:text-green-400">Liên hệ</Link></li>
              </ul>
            </div>
    
            {/* Bản đồ */}
            <div>
              <h3 className="text-lg font-bold mb-4">Vị trí của chúng tôi</h3>
              <div className="w-full h-32">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.636636789162!2d106.6297!3d10.8231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0x5e4f16020925c2a!2zMTIzIFBo4buRIEThuqFjIEJpw6FchiwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIExp4buHcCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1634567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps Location"
                ></iframe>
              </div>
            </div>
    
            {/* Đăng ký bản tin */}
            <div>
              <h3 className="text-lg font-bold mb-4">Đăng ký bản tin</h3>
              <p>Nhận thông tin ưu đãi và sản phẩm mới nhất!</p>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
                })}
                onSubmit={handleNewsletterSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="mt-2">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Nhập email của bạn"
                      className="w-full p-2 mb-2 border rounded-md text-black"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Đăng ký'}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
    
          {/* Phần chân trang dưới cùng */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                Facebook
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">
                Twitter
              </a>
            </div>
            <p>© 2025 Cửa hàng mỹ phẩm. Tất cả quyền được bảo lưu.</p>
          </div>
        </footer>
      );
}