// src/routes/flightRoutes.js
const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Lấy danh sách chuyến bay (public)
router.get('/', flightController.getAllFlights);
router.get('/search', flightController.searchFlights);

// Tự động cập nhật status (admin)
router.get('/auto-cancel', protect, isAdmin, flightController.autoCancelFlights);

// Tạo mới chuyến bay (admin)
router.post('/', protect, isAdmin, flightController.createFlight);

// Các thao tác chi tiết (admin)
router.get('/:id', protect, isAdmin, flightController.getFlightById);
router.put('/:id', protect, isAdmin, flightController.updateFlight);
router.delete('/:id', protect, isAdmin, flightController.deleteFlight);

module.exports = router;
