// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');


// Auth
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// CRUD
router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);


module.exports = router;
