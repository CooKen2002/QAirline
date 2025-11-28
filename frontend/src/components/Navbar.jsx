import React, { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import LoginModal from "../features/auth/LoginModal";
import RegisterModal from "../features/auth/RegisterModal";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  // Điều hướng khi click avatar user
  const goToUserProfile = () => {
    // Nếu bạn có user id, có thể điều hướng dạng `/user/${user.id}`
    navigate("/user"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>QAirline</Link>
      </div>

      <div className="navbar-menu">
        <Link to="/news" className="nav-link">Tin tức</Link>
        <Link to="/journey" className="nav-link">Hành trình</Link>

        {!user ? (
          <div className="auth-buttons">
            <button onClick={openLogin}>Đăng nhập</button>
            <button onClick={openRegister}>Đăng ký</button>
          </div>
        ) : (
          <div className="user-box" onClick={goToUserProfile} style={{ cursor: 'pointer' }}>
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
          </div>
        )}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={openRegister}
        />
      )}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={openLogin}
        />
      )}
    </nav>
  );
}
