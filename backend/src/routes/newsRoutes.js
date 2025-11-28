    const express = require('express');
    const router = express.Router();
    const newsController = require('../controllers/newsController');
    const { protect, isAdmin } = require('../middlewares/authMiddleware');

    // Lấy danh sách tin tức (public)
    router.get('/', newsController.getAllNews);

    // Lấy chi tiết tin tức (public)
    router.get('/:id', newsController.getNewsById);

    // Tạo tin tức (admin)
    router.post('/', protect, isAdmin, newsController.createNews);

    // Cập nhật tin tức (admin)
    router.put('/:id', protect, isAdmin, newsController.updateNews);

    // Xóa tin tức (admin)
    router.delete('/:id', protect, isAdmin, newsController.deleteNews);

    module.exports = router;
