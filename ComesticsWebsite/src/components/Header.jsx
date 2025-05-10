import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";


function Header({ setShowCart }) {
  const { user, logout, cartItems } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAvatarDropdownOpen, setIsAvatarDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsAvatarDropdownOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const productCategories = [
    { id: 1, name: "Trang điểm", path: "/category/makeup" },
    { id: 2, name: "Da", path: "/category/skin" },
    { id: 3, name: "Hương thơm", path: "/category/fragrance" },
    { id: 4, name: "Quà tặng", path: "/category/gifts" },
    { id: 5, name: "Bộ sản phẩm", path: "/category/sets" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-20 top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-600"><img src="/src/assets/img/Logo.png" alt="" className="w-40"/></div>
        <nav className="flex items-center space-x-6 ml-auto mr-auto">
          <Link
            to="/"
            className="text-gray-600 hover:text-green-600 transition ml-20"
          >
            Trang chủ
          </Link>
          <div
            className="relative"
            onMouseEnter={() => {
              setIsDropdownOpen(true);
              clearTimeout(window.dropdownTimeout);
            }}
            onMouseLeave={() => {
              window.dropdownTimeout = setTimeout(
                () => setIsDropdownOpen(false),
                200
              );
            }}
          >
            <Link
              to="/products"
              className="text-gray-600 hover:text-green-600 transition"
            >
              Sản phẩm
            </Link>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                {productCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={category.path}
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/about"
            className="text-gray-600 hover:text-green-600 transition"
          >
            Giới thiệu
          </Link>
          <Link
            to="/contact"
            className="text-gray-600 hover:text-green-600 transition"
          >
            Liên hệ
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsAvatarDropdownOpen(!isAvatarDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-green-600 transition"
              >
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <span className="ml-2">Xin chào, {user.username}</span>
              </button>
              {isAvatarDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                    onClick={() => setIsAvatarDropdownOpen(false)}
                  >
                    Xem thông tin
                  </Link>
                  <Link
                    to="/order-history"
                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                    onClick={() => setIsAvatarDropdownOpen(false)}
                  >
                    Lịch sử đơn hàng
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-green-600 transition"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="text-gray-600 hover:text-green-600 transition"
              >
                Đăng ký
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Tìm kiếm sản phẩm..."
            className="p-2 border rounded-md focus:outline-none"
          />
          <button
            onClick={() => setShowCart(true)}
            className="relative text-gray-600 hover:text-green-600 transition ml-2"
          >
            🛒
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
