import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminAircraft.css";

export default function AdminAircraft() {
  const { user } = useAuth();
  const [aircraftList, setAircraftList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAircrafts();
  }, []);

  const fetchAircrafts = async () => {
    try {
      const res = await axios.get("/api/aircraft");
      setAircraftList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi lấy danh sách tàu bay:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = user?.token;
    if (!token) {
      console.error("Chưa đăng nhập, không thể xóa tàu bay");
      return;
    }
    try {
      await axios.delete(`/api/aircraft/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAircrafts();
    } catch (err) {
      console.error("Lỗi xóa tàu bay:", err);
    }
  };

  return (
    <div className="admin-aircraft">
      <div className="aircraft-header">
        <h2>Danh sách Tàu bay</h2>
        <button onClick={() => navigate("/admin/aircraft/create")} className="add-aircraft-button">
          Thêm tàu bay
        </button>
      </div>

      {loading ? (
        <p>Đang tải danh sách...</p>
      ) : aircraftList.length === 0 ? (
        <p>Hiện chưa có tàu bay nào.</p>
      ) : (
        <div className="aircraft-list">
          {aircraftList.map((item) => (
            <div key={item._id} className="aircraft-item">
              <h4>{item.code}</h4>
              <p>Hãng sản xuất: {item.manufacturer}</p>
              <small>Số ghế: {item.seatCount}</small>
              <div>
                <button onClick={() => navigate(`/admin/aircraft/edit/${item._id}`)}>Sửa</button>
                <button onClick={() => handleDelete(item._id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}