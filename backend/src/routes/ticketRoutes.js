// src/routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Lấy danh sách vé (chỉ admin hoặc user có quyền)
router.get('/', protect, isAdmin, ticketController.getAllTickets);

// Tạo vé (bất kỳ user đã đăng nhập)
router.post('/', protect, ticketController.createTicket);

// Lấy vé theo ID (user hoặc admin)
router.get('/:id', protect, ticketController.getTicketById);

// Cập nhật vé (chỉ admin)
router.put('/:id', protect, isAdmin, ticketController.updateTicket);

// Xóa vé (chỉ admin)
router.delete('/:id', protect, isAdmin, ticketController.deleteTicket);

module.exports = router;
