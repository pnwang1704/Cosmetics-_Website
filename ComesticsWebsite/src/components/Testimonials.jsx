export default function Testimonials(){
    const testimonials = [
        { name: "Nguyễn Thị A", comment: "Sản phẩm rất tốt, tôi rất hài lòng!" },
        { name: "Trần Văn B", comment: "Giao hàng nhanh, đóng gói cẩn thận." },
        { name: "Lê Thị C", comment: "Giá cả hợp lý, chất lượng đảm bảo." },
      ];
      return (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Khách hàng nói gì</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
}