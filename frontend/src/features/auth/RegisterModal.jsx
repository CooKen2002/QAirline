// ./features/auth/RegisterModal.jsx
import React, { useState } from "react";
import axios from "axios";
import "../../styles/Modal.css";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      setSuccess(res.data.message || "Đăng ký thành công!");
      setTimeout(() => {
        onClose(); // Đóng modal sau khi thành công
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Đăng ký</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Họ tên" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} required />
          <input name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
          <input name="dateOfBirth" type="date" placeholder="Ngày sinh" value={formData.dateOfBirth} onChange={handleChange} />
          <button type="submit">Đăng ký</button>
        </form>
        <p>Đã có tài khoản? <button onClick={onSwitchToLogin}>Đăng nhập</button></p>
      </div>
    </div>
  );
}
