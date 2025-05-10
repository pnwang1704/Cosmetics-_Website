import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../About.css";
import { Link } from "react-router-dom";

export default function About(){
  // Animation cho hiệu ứng fade-in
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation cho hero section
  const heroAnimation = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  // State cho carousel testimonial
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      quote:
        "Sản phẩm tuyệt vời, dịch vụ khách hàng rất tốt. Tôi sẽ tiếp tục ủng hộ!",
      author: "Khách hàng A",
      avatar: "https://picsum.photos/50/50?random=1",
    },
    {
      quote:
        "Tôi rất hài lòng với chất lượng sản phẩm và giao hàng nhanh chóng.",
      author: "Khách hàng B",
      avatar: "https://picsum.photos/50/50?random=2",
    },
    {
      quote: "Cửa hàng này thực sự hiểu nhu cầu làm đẹp của tôi!",
      author: "Khách hàng C",
      avatar: "https://picsum.photos/50/50?random=3",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Chuyển testimonial mỗi 5 giây
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Dữ liệu đội ngũ
  const teamMembers = [
    {
      name: "Nguyễn Văn A",
      role: "Giám đốc điều hành",
      img: "https://picsum.photos/200/200?random=1",
      bio: "Dẫn dắt công ty với hơn 10 năm kinh nghiệm trong ngành làm đẹp.",
    },
    {
      name: "Trần Thị B",
      role: "Trưởng phòng marketing",
      img: "https://picsum.photos/200/200?random=2",
      bio: "Chuyên gia xây dựng thương hiệu, đưa sản phẩm đến gần hơn với khách hàng.",
    },
    {
      name: "Lê Văn C",
      role: "Chuyên gia làm đẹp",
      img: "https://picsum.photos/200/200?random=3",
      bio: "Đảm bảo mọi sản phẩm đạt tiêu chuẩn chất lượng cao nhất.",
    },
  ];

  return (
    <section className="py-12 pt-20 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroAnimation}
          className="relative bg-cover bg-center h-[500px] rounded-2xl mb-16 overflow-hidden"
          style={{
            backgroundImage: "url(https://picsum.photos/1920/1080?random=1)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-green-800/70 to-transparent flex items-center justify-center">
            <motion.h2
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold text-white text-center font-playfair"
            >
              Giới thiệu về chúng tôi
            </motion.h2>
          </div>
        </motion.div>

        {/* Câu chuyện công ty */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h3 className="text-3xl font-semibold text-green-600 mb-4 font-playfair">
            Câu chuyện của chúng tôi
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            Ra đời vào năm 2020 tại TP. Hồ Chí Minh, chúng tôi mang trong mình
            sứ mệnh tôn vinh vẻ đẹp tự nhiên. Từ một cửa hàng nhỏ, chúng tôi đã
            trở thành điểm đến tin cậy cho các sản phẩm làm đẹp cao cấp, cam kết
            mang đến chất lượng và sự an toàn tuyệt đối.
          </p>
        </motion.div>

        {/* Sứ mệnh và giá trị */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
            Sứ mệnh và giá trị
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Chất lượng",
                desc: "Mọi sản phẩm đều được kiểm định nghiêm ngặt để đảm bảo an toàn.",
              },
              {
                title: "Minh bạch",
                desc: "Cung cấp thông tin rõ ràng về nguồn gốc và thành phần sản phẩm.",
              },
              {
                title: "Khách hàng là trung tâm",
                desc: "Dịch vụ tận tâm, luôn đặt khách hàng lên hàng đầu.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Đội ngũ */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
            Đội ngũ của chúng tôi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="relative group perspective-1000"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="relative w-full h-[320px] transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                  {/* Mặt trước */}
                  <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-40 h-40 rounded-full mb-4 object-cover shadow-md"
                      loading="lazy"
                    />
                    <h4 className="text-xl font-semibold text-gray-800">
                      {member.name}
                    </h4>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                  {/* Mặt sau */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-green-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {member.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Carousel Testimonial */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
            Khách hàng nói gì
          </h3>
          <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].author}
                className="w-16 h-16 rounded-full mx-auto mb-4"
                loading="lazy"
              />
              <blockquote className="text-gray-700 italic text-lg mb-4">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <p className="text-gray-600 font-semibold">
                - {testimonials[currentTestimonial].author}
              </p>
            </motion.div>
            {/* Nút điều hướng */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length
                  )
                }
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                aria-label="Testimonial trước"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setCurrentTestimonial(
                    (prev) => (prev + 1) % testimonials.length
                  )
                }
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                aria-label="Testimonial tiếp theo"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            {/* Chấm điều hướng */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentTestimonial === index
                      ? "bg-green-600"
                      : "bg-gray-300"
                  } hover:bg-green-500 transition`}
                  aria-label={`Đi đến testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Kêu gọi hành động */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/products"
            className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition duration-300"
            aria-label="Khám phá sản phẩm của chúng tôi"
          >
            Khám phá sản phẩm ngay
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
// function About() {
//   // Animation cho hiệu ứng fade-in
//   const fadeIn = {
//     hidden: { opacity: 0, y: 50 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   // Animation cho hero section
//   const heroAnimation = {
//     hidden: { opacity: 0, scale: 1.2 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 1.2, ease: "easeOut" },
//     },
//   };

//   // State cho carousel testimonial
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const testimonials = [
//     {
//       quote:
//         "Sản phẩm tuyệt vời, dịch vụ khách hàng rất tốt. Tôi sẽ tiếp tục ủng hộ!",
//       author: "Khách hàng A",
//       avatar: "https://picsum.photos/50/50?random=1",
//     },
//     {
//       quote:
//         "Tôi rất hài lòng với chất lượng sản phẩm và giao hàng nhanh chóng.",
//       author: "Khách hàng B",
//       avatar: "https://picsum.photos/50/50?random=2",
//     },
//     {
//       quote: "Cửa hàng này thực sự hiểu nhu cầu làm đẹp của tôi!",
//       author: "Khách hàng C",
//       avatar: "https://picsum.photos/50/50?random=3",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000); // Chuyển testimonial mỗi 5 giây
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   // Dữ liệu đội ngũ
//   const teamMembers = [
//     {
//       name: "Nguyễn Văn A",
//       role: "Giám đốc điều hành",
//       img: "https://picsum.photos/200/200?random=1",
//       bio: "Dẫn dắt công ty với hơn 10 năm kinh nghiệm trong ngành làm đẹp.",
//     },
//     {
//       name: "Trần Thị B",
//       role: "Trưởng phòng marketing",
//       img: "https://picsum.photos/200/200?random=2",
//       bio: "Chuyên gia xây dựng thương hiệu, đưa sản phẩm đến gần hơn với khách hàng.",
//     },
//     {
//       name: "Lê Văn C",
//       role: "Chuyên gia làm đẹp",
//       img: "https://picsum.photos/200/200?random=3",
//       bio: "Đảm bảo mọi sản phẩm đạt tiêu chuẩn chất lượng cao nhất.",
//     },
//   ];

//   return (
//     <section className="py-12 pt-20 bg-gradient-to-b from-green-50 via-white to-green-50">
//       <div className="container mx-auto px-4">
//         {/* Hero Section */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={heroAnimation}
//           className="relative bg-cover bg-center h-[500px] rounded-2xl mb-16 overflow-hidden"
//           style={{
//             backgroundImage: "url(https://picsum.photos/1920/1080?random=1)",
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-b from-green-800/70 to-transparent flex items-center justify-center">
//             <motion.h2
//               variants={fadeIn}
//               className="text-4xl md:text-6xl font-bold text-white text-center font-playfair"
//             >
//               Giới thiệu về chúng tôi
//             </motion.h2>
//           </div>
//         </motion.div>

//         {/* Câu chuyện công ty */}
//         <motion.div
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="mb-16 text-center"
//         >
//           <h3 className="text-3xl font-semibold text-green-600 mb-4 font-playfair">
//             Câu chuyện của chúng tôi
//           </h3>
//           <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
//             Ra đời vào năm 2020 tại TP. Hồ Chí Minh, chúng tôi mang trong mình
//             sứ mệnh tôn vinh vẻ đẹp tự nhiên. Từ một cửa hàng nhỏ, chúng tôi đã
//             trở thành điểm đến tin cậy cho các sản phẩm làm đẹp cao cấp, cam kết
//             mang đến chất lượng và sự an toàn tuyệt đối.
//           </p>
//         </motion.div>

//         {/* Sứ mệnh và giá trị */}
//         <motion.div
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
//             Sứ mệnh và giá trị
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Chất lượng",
//                 desc: "Mọi sản phẩm đều được kiểm định nghiêm ngặt để đảm bảo an toàn.",
//               },
//               {
//                 title: "Minh bạch",
//                 desc: "Cung cấp thông tin rõ ràng về nguồn gốc và thành phần sản phẩm.",
//               },
//               {
//                 title: "Khách hàng là trung tâm",
//                 desc: "Dịch vụ tận tâm, luôn đặt khách hàng lên hàng đầu.",
//               },
//             ].map((value, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
//                 whileHover={{ y: -8, scale: 1.02 }}
//               >
//                 <h4 className="text-xl font-semibold text-gray-800 mb-3">
//                   {value.title}
//                 </h4>
//                 <p className="text-gray-600">{value.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Đội ngũ */}
//         <motion.div
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
//             Đội ngũ của chúng tôi
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={index}
//                 className="relative group perspective-1000"
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <motion.div className="relative w-full h-[320px] transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
//                   {/* Mặt trước */}
//                   <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
//                     <img
//                       src={member.img}
//                       alt={member.name}
//                       className="w-40 h-40 rounded-full mb-4 object-cover shadow-md"
//                       loading="lazy"
//                     />
//                     <h4 className="text-xl font-semibold text-gray-800">
//                       {member.name}
//                     </h4>
//                     <p className="text-gray-600">{member.role}</p>
//                   </div>
//                   {/* Mặt sau */}
//                   <div className="absolute inset-0 backface-hidden rotate-y-180 bg-green-100 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center text-center">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-2">
//                       {member.name}
//                     </h4>
//                     <p className="text-gray-600 text-sm">{member.bio}</p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Carousel Testimonial */}
//         <motion.div
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
//             Khách hàng nói gì
//           </h3>
//           <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
//             <motion.div
//               key={currentTestimonial}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.5 }}
//               className="text-center"
//             >
//               <img
//                 src={testimonials[currentTestimonial].avatar}
//                 alt={testimonials[currentTestimonial].author}
//                 className="w-16 h-16 rounded-full mx-auto mb-4"
//                 loading="lazy"
//               />
//               <blockquote className="text-gray-700 italic text-lg mb-4">
//                 "{testimonials[currentTestimonial].quote}"
//               </blockquote>
//               <p className="text-gray-600 font-semibold">
//                 - {testimonials[currentTestimonial].author}
//               </p>
//             </motion.div>
//             {/* Nút điều hướng */}
//             <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between">
//               <button
//                 onClick={() =>
//                   setCurrentTestimonial(
//                     (prev) =>
//                       (prev - 1 + testimonials.length) % testimonials.length
//                   )
//                 }
//                 className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
//                 aria-label="Testimonial trước"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M15 19l-7-7 7-7"
//                   />
//                 </svg>
//               </button>
//               <button
//                 onClick={() =>
//                   setCurrentTestimonial(
//                     (prev) => (prev + 1) % testimonials.length
//                   )
//                 }
//                 className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
//                 aria-label="Testimonial tiếp theo"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </button>
//             </div>
//             {/* Chấm điều hướng */}
//             <div className="flex justify-center mt-4 space-x-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full ${
//                     currentTestimonial === index
//                       ? "bg-green-600"
//                       : "bg-gray-300"
//                   } hover:bg-green-500 transition`}
//                   aria-label={`Đi đến testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Kêu gọi hành động */}
//         <motion.div
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="text-center"
//         >
//           <Link
//             to="/products"
//             className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition duration-300"
//             aria-label="Khám phá sản phẩm của chúng tôi"
//           >
//             Khám phá sản phẩm ngay
//           </Link>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
