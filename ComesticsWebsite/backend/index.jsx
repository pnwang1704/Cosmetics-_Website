const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Xác định đường dẫn tuyệt đối đến mockUsers.json trong src/data
const mockUsersPath = path.resolve('D:/IUH/2024-2025/ReactBTL/ComesticsWebsite/src/data/mockUsers.json');

// Đọc mockUsers từ file JSON, sử dụng giá trị mặc định nếu file không tồn tại
let mockUsers = [];
try {
  const data = fs.readFileSync(mockUsersPath, 'utf8');
  mockUsers = JSON.parse(data);
  console.log('Successfully loaded mockUsers:', mockUsers);
} catch (error) {
  console.warn('mockUsers.json not found or invalid, using default data:', error.message);
  // Tạo file mockUsers.json mặc định nếu không tồn tại
  const defaultUsers = [
    { username: 'user', email: 'user@example.com', password: 'password123', avatar: 'https://picsum.photos/200/200?random=1' },
  ];
  fs.writeFileSync(mockUsersPath, JSON.stringify(defaultUsers, null, 2));
  mockUsers = defaultUsers;
  console.log('Created default mockUsers.json:', mockUsers);
}

// Cấu hình Nodemailer với Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint để xử lý quên mật khẩu
app.post('/forgot-password', (req, res) => {
  const { email } = req.body;
  console.log('Received request for email:', email);

  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    console.log('User not found for email:', email);
    return res.status(404).json({ error: 'Email không tồn tại trong hệ thống' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Lấy lại mật khẩu',
    text: `Mật khẩu của bạn là: ${user.password}. Vui lòng không chia sẻ thông tin này!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('SendMail error:', error);
      return res.status(500).json({ error: 'Lỗi khi gửi email: ' + error.message });
    }
    console.log('Email sent:', info.response);
    res.json({ message: 'Mật khẩu đã được gửi đến email của bạn' });
  });
});

// API endpoint để cập nhật mockUsers
app.post('/update-users', (req, res) => {
  const updatedUsers = req.body;
  try {
    fs.writeFileSync(mockUsersPath, JSON.stringify(updatedUsers, null, 2));
    mockUsers = updatedUsers;
    res.json({ message: 'Danh sách người dùng đã được cập nhật' });
  } catch (error) {
    console.error('Error updating mockUsers.json:', error);
    res.status(500).json({ error: 'Lỗi khi cập nhật danh sách người dùng' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});