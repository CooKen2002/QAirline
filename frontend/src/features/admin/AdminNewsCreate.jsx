import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminNewsCreate() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("news");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = user?.token;
    if (!token) return setError("Bạn chưa đăng nhập");
    try {
      await axios.post(
        "/api/news",
        { title, content, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/admin/news");
    } catch (err) {
      console.error("Lỗi tạo tin tức:", err);
      setError(err.response?.data?.message || "Đã xảy ra lỗi khi tạo bài viết");
    }
  };

  return (
    <div className="admin-news-create">
      <h2>Thêm bài viết mới</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Nội dung:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>Loại:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="news">Tin tức</option>
            <option value="promotion">Khuyến mãi</option>
            <option value="announcement">Thông báo</option>
          </select>
        </div>
        <button type="submit">Tạo bài</button>
      </form>
    </div>
  );
}
