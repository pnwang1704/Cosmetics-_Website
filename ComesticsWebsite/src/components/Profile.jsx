import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { useUser } from "../UserContext";

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const avatarVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#15803d",
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

const formVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

function Profile() {
  const { user, setUser, setMockUsers } = useUser();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(
    user?.avatar || "https://picsum.photos/200/200?random=1"
  );
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const infoValidationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
  });

  const passwordValidationSchema = Yup.object({
    currentPassword: Yup.string().required("Mật khẩu hiện tại là bắt buộc"),
    newPassword: Yup.string()
      .min(6, "Mật khẩu mới phải có ít nhất 6 ký tự")
      .required("Mật khẩu mới là bắt buộc"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAvatar = () => {
    setUser({ ...user, avatar });
    setMockUsers((prev) =>
      prev.map((u) => (u.username === user.username ? { ...u, avatar } : u))
    );
    alert("Avatar đã được cập nhật thành công!");
  };

  const handleUpdateInfo = (values, { setSubmitting }) => {
    setTimeout(() => {
      setUser({ ...user, email: values.email, avatar });
      setMockUsers((prev) =>
        prev.map((u) =>
          u.username === user.username
            ? { ...u, email: values.email, avatar }
            : u
        )
      );
      setIsEditingInfo(false);
      alert("Thông tin đã được cập nhật thành công!");
      setSubmitting(false);
    }, 500);
  };

  const handleChangePassword = (values, { setSubmitting, setErrors }) => {
    setTimeout(() => {
      if (values.currentPassword !== user.password) {
        setErrors({ currentPassword: "Mật khẩu hiện tại không đúng" });
      } else {
        setUser({ ...user, password: values.newPassword });
        setMockUsers((prev) =>
          prev.map((u) =>
            u.username === user.username
              ? { ...u, password: values.newPassword }
              : u
          )
        );
        setIsChangingPassword(false);
        alert("Mật khẩu đã được thay đổi thành công!");
      }
      setSubmitting(false);
    }, 500);
  };

  if (!user) {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-12 pt-20 bg-gradient-to-br from-green-100 via-white to-green-50 min-h-screen flex items-center justify-center"
      >
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <motion.p
            className="text-lg text-gray-700 mb-6 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
          >
            Vui lòng đăng nhập để xem thông tin cá nhân.
          </motion.p>
          <motion.a
            href="/login"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition transform hover:scale-105 shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Đăng nhập ngay
          </motion.a>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-12 pt-20 bg-gradient-to-br from-green-100 via-white to-green-50 min-h-screen"
    >
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          className="text-5xl font-bold text-center text-green-700 mb-10 font-playfair tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        >
          Thông tin cá nhân
        </motion.h2>
        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-green-100">
          <motion.div
            className="flex flex-col items-center mb-10"
            variants={avatarVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="relative group">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-green-200 group-hover:border-green-400 group-hover:brightness-110 group-hover:shadow-xl transition-all duration-300"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-green-600 text-white p-3 rounded-full cursor-pointer hover:bg-green-700 transition-all duration-300 transform group-hover:scale-110"
              >
                <FaCamera size={20} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <motion.button
              onClick={handleSaveAvatar}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition shadow-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Lưu avatar
            </motion.button>
            <motion.p
              className="mt-4 text-xl font-semibold text-gray-800 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              {user.username}
            </motion.p>
          </motion.div>
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Thông tin
              </h3>
              <motion.button
                onClick={() => setIsEditingInfo(!isEditingInfo)}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isEditingInfo ? (
                  <>
                    <FaUser /> Hủy
                  </>
                ) : (
                  <>
                    <FaUser /> Chỉnh sửa
                  </>
                )}
              </motion.button>
            </div>
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate={isEditingInfo ? "visible" : "hidden"}
            >
              {isEditingInfo && (
                <Formik
                  initialValues={{ email: user.email }}
                  validationSchema={infoValidationSchema}
                  onSubmit={handleUpdateInfo}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Tên đăng nhập
                        </label>
                        <div className="relative">
                          <FaUser className="absolute top-3 left-3 text-green-600" />
                          <input
                            type="text"
                            value={user.username}
                            disabled
                            className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed text-gray-600"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Email
                        </label>
                        <div className="relative">
                          <FaUser className="absolute top-3 left-3 text-green-600" />
                          <Field
                            type="email"
                            name="email"
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:bg-gray-400 shadow-md"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {isSubmitting
                          ? "Đang cập nhật..."
                          : "Cập nhật thông tin"}
                      </motion.button>
                    </Form>
                  )}
                </Formik>
              )}
            </motion.div>
            {!isEditingInfo && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
              >
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Tên đăng nhập
                  </label>
                  <p className="text-gray-600 text-lg">{user.username}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Email
                  </label>
                  <p className="text-gray-600 text-lg">{user.email}</p>
                </div>
              </motion.div>
            )}
          </div>
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                Đổi mật khẩu
              </h3>
              <motion.button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isChangingPassword ? (
                  <>
                    <FaLock /> Hủy
                  </>
                ) : (
                  <>
                    <FaLock /> Đổi mật khẩu
                  </>
                )}
              </motion.button>
            </div>
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate={isChangingPassword ? "visible" : "hidden"}
            >
              {isChangingPassword && (
                <Formik
                  initialValues={{
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  }}
                  validationSchema={passwordValidationSchema}
                  onSubmit={handleChangePassword}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <div className="relative">
                          <FaLock className="absolute top-3 left-3 text-green-600" />
                          <Field
                            type="password"
                            name="currentPassword"
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                          />
                        </div>
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Mật khẩu mới
                        </label>
                        <div className="relative">
                          <FaLock className="absolute top-3 left-3 text-green-600" />
                          <Field
                            type="password"
                            name="newPassword"
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                          />
                        </div>
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                          <FaLock className="absolute top-3 left-3 text-green-600" />
                          <Field
                            type="password"
                            name="confirmPassword"
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                          />
                        </div>
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition disabled:bg-gray-400 shadow-md"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        {isSubmitting ? "Đang cập nhật..." : "Đổi mật khẩu"}
                      </motion.button>
                    </Form>
                  )}
                </Formik>
              )}
            </motion.div>
          </div>
          <motion.button
            onClick={() => navigate("/")}
            className="w-full bg-gray-600 text-white py-3 rounded-xl hover:bg-gray-700 transition shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Quay lại
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}

export default Profile;
