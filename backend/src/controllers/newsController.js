const News = require('../models/News');

exports.getAllNews = async (req, res) => {
  try {
    const newsList = await News.find().sort({ createdAt: -1 });
    res.json(newsList);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy danh sách tin tức' });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Không tìm thấy tin tức' });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy tin tức' });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { title, content, type, publishedAt } = req.body;
    const newNews = new News({ title, content, type, publishedAt });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo tin tức' });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'Không tìm thấy tin tức' });

    Object.assign(news, req.body);
    await news.save();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật tin tức' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: 'Không tìm thấy tin tức' });
    res.json({ message: 'Xóa tin tức thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa tin tức' });
  }
};
