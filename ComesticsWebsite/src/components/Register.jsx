import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useUser } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {
  const { setUser, setMockUsers, mockUsers } = useUser();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Tên đăng nhập là bắt buộc")
      .min(3, "Tối thiểu 3 ký tự"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const existingUser = mockUsers.find(
        (u) => u.username === values.username || u.email === values.email
      );
      if (existingUser) {
        setErrors({
          username:
            existingUser.username === values.username
              ? "Tên đăng nhập đã tồn tại"
              : "",
          email:
            existingUser.email === values.email ? "Email đã được sử dụng" : "",
        });
      } else {
        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password,
          avatar: "/src/assets/img/icon-7797704_1280.png",
        };
        const updatedMockUsers = [...mockUsers, newUser];
        setMockUsers(updatedMockUsers);
        setUser(newUser);
        setErrors({});

        // Gửi yêu cầu đến backend để cập nhật mockUsers.json
        const response = await fetch('/api/update-users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedMockUsers),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Lỗi khi cập nhật danh sách người dùng');
        }

        // Lưu vào localStorage (để đồng bộ với UserContext)
        localStorage.setItem('mockUsers', JSON.stringify(updatedMockUsers));

        navigate("/");
      }
    } catch (error) {
      setErrors({ email: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 pt-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Đăng ký</h2>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700">Tên đăng nhập</label>
                <Field
                  type="text"
                  name="username"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Mật khẩu</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Xác nhận mật khẩu</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
              >
                {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
              </button>
              <p className="mt-4 text-center">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-green-600 hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}