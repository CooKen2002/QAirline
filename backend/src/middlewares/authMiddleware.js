// File: backend/src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware kiểm tra xác thực JWT
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có token xác thực' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // lưu thông tin user từ token vào req
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

// Middleware kiểm tra quyền admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role == 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Không có quyền admin' });
  }
};

module.exports = {
  protect,
  isAdmin
};
