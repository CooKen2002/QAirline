import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminNews.css";

export default function AdminNews() {
  const { user } = useAuth();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get("/api/news");
      setNewsList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi lấy danh sách tin tức:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = user?.token;
    if (!token) {
      console.error("Chưa đăng nhập, không thể xóa tin tức");
      return;
    }
    try {
      await axios.delete(`/api/news/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNews();
    } catch (err) {
      console.error("Lỗi xóa tin tức:", err);
    }
  };

  return (
    <div className="admin-news">
      <div className="news-header">
        <h2>Danh sách Tin tức</h2>
        <button onClick={() => navigate("/admin/news/create")} className="add-news-button">Thêm bài</button>
      </div>

      {loading ? (
        <p>Đang tải tin tức...</p>
      ) : newsList.length === 0 ? (
        <p>Hiện chưa có bài viết nào.</p>
      ) : (
        <div className="news-list">
          {newsList.map((item) => (
            <div key={item._id} className="news-item">
              <h4>{item.title}</h4>
              <p>{item.content}</p>
              <small>Loại: {item.type}</small>
              <div>
                <button onClick={() => navigate(`/admin/news/edit/${item._id}`)}>Sửa</button>
                <button onClick={() => handleDelete(item._id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}