import React, { useState, useEffect } from 'react'; 
export default function Hero(){
    const [currentSlide, setCurrentSlide] = useState(0);
      const slides = [
        {
          image: "https://picsum.photos/1920/1080?random=1",
          title: "Khám phá sản phẩm mới",
          description: "Sản phẩm chất lượng cao với giá ưu đãi đặc biệt!",
        },
        {
          image: "https://picsum.photos/1920/1080?random=2",
          title: "Ưu đãi hấp dẫn",
          description: "Giảm giá lên đến 50% cho tất cả sản phẩm!",
        },
        {
          image: "https://picsum.photos/1920/1080?random=3",
          title: "Mua sắm ngay hôm nay",
          description: "Nhanh tay để không bỏ lỡ cơ hội vàng!",
        },
      ];
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Chuyển slide mỗi 5 giây
        return () => clearInterval(interval);
      }, [slides.length]);
    
      const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      };
    
      const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      };
    
      return (
        <section className="h-screen relative pt-20">
          <div className="w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
            ))}
            <div className="container mx-auto px-4 h-full flex items-center justify-center text-center text-white relative z-10">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slides[currentSlide].title}</h1>
                <p className="text-lg md:text-xl mb-6">{slides[currentSlide].description}</p>
                <a
                  href="#products"
                  className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transform hover:scale-105 transition"
                >
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition"
          >
            ❯
          </button>
        </section>
      );
}