// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const authorizeBookingOwnerOrAdmin = require('../middlewares/authorizeBookingOwnerOrAdmin');

// Tạo booking mới (bắt buộc đăng nhập)
router.post('/', protect, bookingController.createBooking);

// Lấy tất cả booking (chỉ admin)
router.get('/', protect, isAdmin, bookingController.getAllBookings);

// Lấy booking theo ID (chỉ admin hoặc chủ booking)
router.get('/:id', protect, authorizeBookingOwnerOrAdmin, bookingController.getBookingById);

// Cập nhật booking (chỉ admin hoặc chủ booking)
router.put('/:id', protect, authorizeBookingOwnerOrAdmin, bookingController.updateBooking);

// Xóa booking (chỉ admin hoặc chủ booking)
router.delete('/:id', protect, authorizeBookingOwnerOrAdmin, bookingController.deleteBooking);

router.delete('/:id', protect, authorizeBookingOwnerOrAdmin, bookingController.cancelBooking);

module.exports = router;
