// ./features/auth/LoginModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../../styles/Modal.css";

export default function LoginModal({ onClose, onSwitchToRegister }) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", { email, password });
            const userData = res.data.user;
            const token = res.data.token;  // lấy token từ response
            login(userData, token);         // truyền token vào AuthContext
            setError("");
            onClose();

            if (userData.role === "admin") {
                window.location.href = "/admin/dashboard";
            } else {
                window.location.href = "/";
            }
        } catch (err) {
            setError(err.response?.data?.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Đăng nhập</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} required />
                    <button type="submit">Đăng nhập</button>
                </form>
                <p>Chưa có tài khoản? <button onClick={onSwitchToRegister}>Đăng ký</button></p>
            </div>
        </div>
    );
}
