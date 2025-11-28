// src/routes/airportRoutes.js
const express = require('express');
const router = express.Router();
const airportController = require('../controllers/airportController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Lấy danh sách sân bay (public)
router.get('/', airportController.getAllAirports);

// Các thao tác chi tiết (admin)
router.get('/:id', protect, isAdmin, airportController.getAirportById);
router.post('/', protect, isAdmin, airportController.createAirport);
router.put('/:id', protect, isAdmin, airportController.updateAirport);
router.delete('/:id', protect, isAdmin, airportController.deleteAirport);

module.exports = router;
