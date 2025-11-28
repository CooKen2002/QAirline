import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    return <div>Bạn không có quyền truy cập trang này.</div>;
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h3>Admin</h3>
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="admin-avatar"
        />
        <p><strong>{user.name}</strong></p>
        <p>{user.email}</p>
      </aside>

      <main className="admin-main">
        <h2>Bảng điều khiển Admin</h2>
        <div className="admin-buttons">
          <button onClick={() => navigate("/admin/news")}>News</button>
          <button onClick={() => navigate("/admin/aircraft")}>Aircraft</button>
          <button onClick={() => navigate("/admin/flight")}>Flight</button>
          <button onClick={() => navigate("/admin/booking")}>Booking</button>
        </div>
      </main>
    </div>
  );
} 