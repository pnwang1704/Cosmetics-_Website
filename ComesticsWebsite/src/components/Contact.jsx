import "../Contact.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaComment, FaEnvelope, FaUser } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";


export default function Contact() {
    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const heroAnimation = {
        hidden: { opacity: 0, scale: 1.2 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: "easeOut" },
        },
    };
    // State cho form
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // State cho FAQ accordion
    const [activeFAQ, setActiveFAQ] = useState(null);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý submit form (giả lập)
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
        setFormData({ name: "", email: "", message: "" });
    };

    // Dữ liệu FAQ
    const faqs = [
        {
            question: "Làm thế nào để đặt hàng?",
            answer:
                "Bạn có thể đặt hàng trực tiếp trên website hoặc liên hệ qua hotline.",
        },
        {
            question: "Chính sách đổi trả như thế nào?",
            answer:
                "Chúng tôi hỗ trợ đổi trả trong 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.",
        },
        {
            question: "Tôi có thể nhận hàng trong bao lâu?",
            answer: "Thời gian giao hàng từ 2-5 ngày tùy khu vực.",
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
                    className="relative bg-cover bg-center h-[400px] rounded-2xl mb-12 overflow-hidden"
                    style={{
                        backgroundImage: "url(https://picsum.photos/1920/1080?random=2)",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-green-800/70 to-transparent flex items-center justify-center">
                        <motion.h2
                            variants={fadeIn}
                            className="text-4xl md:text-5xl font-bold text-white text-center font-playfair"
                        >
                            Liên hệ với chúng tôi
                        </motion.h2>
                    </div>
                </motion.div>

                {/* Form Liên hệ */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
                        Gửi tin nhắn cho chúng tôi
                    </h3>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg contact-form"
                    >
                        <div className="mb-6 relative">
                            <FaUser className="absolute top-3 left-3 text-green-600" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Họ và tên"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                                required
                                aria-label="Họ và tên"
                            />
                        </div>
                        <div className="mb-6 relative">
                            <FaEnvelope className="absolute top-3 left-3 text-green-600" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 transition"
                                required
                                aria-label="Email"
                            />
                        </div>
                        <div className="mb-6 relative">
                            <FaComment className="absolute top-3 left-3 text-green-600" />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="Tin nhắn của bạn"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 transition resize-none h-32"
                                required
                                aria-label="Tin nhắn"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 hover:shadow-lg transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Gửi tin nhắn"
                        >
                            Gửi tin nhắn
                        </motion.button>
                    </form>
                </motion.div>

                {/* Google Maps */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
                        Tìm chúng tôi
                    </h3>
                    <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669684145123!2d106.68006941462175!3d10.759922392330495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3ed289%3A0xa06651894598e488!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyB0aMO0bmcgdGlue1xu4bqldCDEkOG6oW5nIMSQ4bqh!5e0!3m2!1svi!2s!4v1698673944332!5m2!1svi!2s"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Bản đồ vị trí cửa hàng"
                        />
                    </div>
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair text-center">
                        Câu hỏi thường gặp
                    </h3>
                    <div className="max-w-2xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-4">
                                <button
                                    onClick={() =>
                                        setActiveFAQ(activeFAQ === index ? null : index)
                                    }
                                    className="w-full text-left bg-green-100 p-4 rounded-lg font-semibold text-gray-800 hover:bg-green-200 transition"
                                    aria-expanded={activeFAQ === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    {faq.question}
                                </button>
                                <motion.div
                                    id={`faq-answer-${index}`}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: activeFAQ === index ? "auto" : 0,
                                        opacity: activeFAQ === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden bg-white p-4 rounded-b-lg text-gray-600"
                                >
                                    {faq.answer}
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Mạng xã hội */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-3xl font-semibold text-green-600 mb-6 font-playfair">
                        Kết nối với chúng tôi
                    </h3>
                    <div className="flex justify-center space-x-6">
                        {[
                            {
                                Icon: FaFacebook,
                                href: "https://facebook.com",
                                label: "Facebook",
                            },
                            {
                                Icon: FaInstagram,
                                href: "https://instagram.com",
                                label: "Instagram",
                            },
                            {
                                Icon: FaTwitter,
                                href: "https://twitter.com",
                                label: "Twitter",
                            },
                        ].map(({ Icon, href, label }, index) => (
                            <motion.a
                                key={index}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                aria-label={`Kết nối qua ${label}`}
                            >
                                <Icon size={32} />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
