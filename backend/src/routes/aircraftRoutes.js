const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/aircraftController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Lấy danh sách tàu bay (public)
router.get('/', aircraftController.getAllAircrafts);

// Lấy chi tiết tàu bay (admin hoặc có thể public tùy bạn)
router.get('/:id', protect, isAdmin, aircraftController.getAircraftById);

// Tạo tàu bay mới (admin)
router.post('/', protect, isAdmin, aircraftController.createAircraft);

// Cập nhật tàu bay (admin)
router.put('/:id', protect, isAdmin, aircraftController.updateAircraft);

// Xóa tàu bay (admin)
router.delete('/:id', protect, isAdmin, aircraftController.deleteAircraft);

module.exports = router;
