// File: src/features/admin/AdminFlight.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminFlight.css";

export default function AdminFlight() {
  const { user } = useAuth();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await axios.get("/api/flights");
      setFlights(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách chuyến bay:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập");
      return;
    }
    try {
      await axios.delete(`/api/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFlights();
    } catch (err) {
      console.error("Lỗi khi xóa chuyến bay:", err);
    }
  };

  return (
    <div className="admin-flight">
      <div className="flight-header">
        <h2>Danh sách Chuyến bay</h2>
        <button onClick={() => navigate("/admin/flights/create")} className="add-flight-button">
          Thêm chuyến bay
        </button>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : flights.length === 0 ? (
        <p>Chưa có chuyến bay nào.</p>
      ) : (
        <div className="flight-list">
          {flights.map((flight) => (
            <div key={flight._id} className="flight-item">
              <h4>{flight.flightNumber} - {flight.aircraft?.code}</h4>
              <p>Điểm đi: {flight.departure}</p>
              <p>Điểm đến: {flight.destination}</p>
              <p>Khởi hành: {new Date(flight.departureTime).toLocaleString()}</p>
              <div>
                <button onClick={() => navigate(`/admin/flights/edit/${flight._id}`)}>Sửa</button>
                <button onClick={() => handleDelete(flight._id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
