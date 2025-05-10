import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { useEffect, useState } from "react";
import mockProducts from "../data/mockProducts";
import Rating from "@mui/material/Rating"; 

export default function ProductDetail() {
  const { id } = useParams();
  const { user, addToCart } = useUser();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hover, setHover] = useState(-1); // Thêm state để xử lý hover cho Rating

  const product = mockProducts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      // Lấy bình luận từ localStorage hoặc sử dụng product.reviews nếu chưa có
      const savedReviews = JSON.parse(localStorage.getItem(`productReviews_${id}`)) || [];
      // Hợp nhất bình luận từ mockProducts và localStorage
      const combinedReviews = [...(product.reviews || []), ...savedReviews];
      // Loại bỏ trùng lặp (dựa trên id) nếu cần
      const uniqueReviews = Array.from(new Map(combinedReviews.map(review => [review.id, review])).values());
      setReviews(uniqueReviews);
    }
  }, [id, product]);

  if (!product) {
    return <div className="py-12 pt-20 text-center">Sản phẩm không tồn tại</div>;
  }

  const handleAddToCart = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
    setQuantity(1);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vui lòng đăng nhập để gửi đánh giá!');
      navigate('/login');
      return;
    }
    if (newRating < 1 || newRating > 5 || !newComment.trim()) {
      alert('Vui lòng chọn số sao (1-5) và nhập bình luận!');
      return;
    }

    const newReview = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      rating: newRating,
      comment: newComment,
      createdAt: new Date().toISOString(),
    };

    // Cập nhật danh sách reviews
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setNewRating(0);
    setNewComment('');
    alert('Đánh giá của bạn đã được gửi!');

    // Lưu tất cả reviews vào localStorage (bao gồm cả reviews từ mockProducts)
    localStorage.setItem(`productReviews_${id}`, JSON.stringify(updatedReviews));
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <section className="py-12 pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{product.name}</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-96 object-cover rounded-lg"
          />
          <div className="flex-1">
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              {product.price.toLocaleString()} VNĐ
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Thêm vào giỏ
              </button>
            </div>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Quay lại
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Đánh giá sản phẩm</h3>
          <div className="mb-6">
            <p className="text-lg">
              Đánh giá trung bình: {averageRating} / 5 ({reviews.length} đánh giá)
            </p>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <span key={index} className={`text-2xl ${index < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className="reviews-list space-y-4">
            {reviews.length === 0 ? (
              <p>Chưa có đánh giá nào cho sản phẩm này.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.username}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className={`text-xl ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <small className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </div>
          {user ? (
            <form onSubmit={handleSubmitReview} className="mt-6 bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold mb-4">Gửi đánh giá của bạn</h4>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Đánh giá sao (1-5)</label>
                <div className="flex flex-row items-center">
                  <Rating
                    name="simple-controlled"
                    value={newRating}
                    onChange={(event, newValue) => setNewRating(newValue)}
                    onChangeActive={(event, newHover) => setHover(newHover)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bình luận</label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Gửi đánh giá
              </button>
            </form>
          ) : (
            <p className="mt-6">
              Vui lòng <a href="/login" className="text-green-600 hover:underline">đăng nhập</a> để gửi đánh giá.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}