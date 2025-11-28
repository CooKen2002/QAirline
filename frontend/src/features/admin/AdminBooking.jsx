// File: src/features/admin/AdminBooking.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import "../../styles/AdminBooking.css";

export default function AdminBooking() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = user?.token;
    if (!token) {
      console.error("Chưa đăng nhập");
      return;
    }
    try {
      const res = await axios.get("/api/bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách đặt vé:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-booking">
      <h2>Danh sách Đặt vé</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : bookings.length === 0 ? (
        <p>Không có đặt vé nào.</p>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-item">
              <p><strong>Khách:</strong> {booking.user?.name}</p>
              <p><strong>Chuyến bay:</strong> {booking.flight?.code}</p>
              <p><strong>Ghế:</strong> {booking.seatNumber}</p>
              <p><strong>Thời gian:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
              <p><strong>Trạng thái:</strong> {booking.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
