// src/models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },     // Tiêu đề tin tức
  content: { type: String, required: true },   // Nội dung chi tiết
  type: {                                      
    type: String, 
    enum: ['news', 'promotion', 'announcement'], 
    default: 'news' 
  },  // Loại tin: tin tức, khuyến mại, thông báo
  publishedAt: { type: Date, default: Date.now }  // Ngày đăng
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
