import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const { setUser, mockUsers } = useUser();
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const validationSchema = Yup.object({
    username: Yup.string().required("Tên đăng nhập là bắt buộc"),
    password: Yup.string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const forgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc")
      .test(
        "email-exists",
        "Email không tồn tại trong hệ thống",
        (value) => mockUsers.some((u) => u.email === value)
      ),
  });

  const handleLogin = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === values.username && u.password === values.password
      );
      if (user) {
        setUser(user);
        setErrors({});
        navigate("/");
      } else {
        setErrors({ username: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
      setSubmitting(false);
    }, 500);
  };

  const handleForgotPassword = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: values.email }),
      });
      const data = await response.json();
      if (data.error) {
        setErrors({ email: data.error });
      } else {
        alert(data.message);
        setShowForgotPassword(false);
      }
    } catch (error) {
      setErrors({ email: 'Lỗi kết nối server' });
      console.error('Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 pt-20 bg-gray-100">
      <div className="container mx-auto px-4 max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Đăng nhập</h2>
        {!showForgotPassword ? (
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
                </button>
                <p className="mt-4 text-center">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-green-600 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>{" "}
                  |{" "}
                  <Link to="/register" className="text-green-600 hover:underline">
                    Đăng ký
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleForgotPassword}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-center mb-4">
                  Quên mật khẩu
                </h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded"
                    placeholder="Nhập email đã đăng ký"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {isSubmitting ? "Đang xử lý..." : "Gửi mật khẩu"}
                </button>
                <p className="mt-4 text-center">
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="text-green-600 hover:underline"
                  >
                    Quay lại đăng nhập
                  </button>
                </p>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
}

export default Login;