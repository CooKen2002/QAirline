// src/middlewares/isAdmin.js

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Hợp lệ, tiếp tục xử lý
  } else {
    res.status(403).json({ message: 'Truy cập bị từ chối: yêu cầu quyền admin' });
  }
};

module.exports = isAdmin;
