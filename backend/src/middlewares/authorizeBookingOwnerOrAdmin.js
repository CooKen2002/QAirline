const Booking = require('../models/Booking');

const authorizeBookingOwnerOrAdmin = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Không tìm thấy booking' });
    }

    // req.user đã được gán từ middleware protect (jwt)
    if (req.user.role === 'admin' || booking.userId.toString() === req.user._id) {
      // Nếu là admin hoặc là chủ booking -> cho phép tiếp tục
      next();
    } else {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập booking này' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Lỗi xác thực quyền truy cập', error: error.message });
  }
};

module.exports = authorizeBookingOwnerOrAdmin;
