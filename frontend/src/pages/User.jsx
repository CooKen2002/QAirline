import { useAuth } from "../features/auth/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  // Dữ liệu booking mẫu (ảo)
  const bookings = [
    {
      id: 'BK001',
      type: 'Vé máy bay',
      flightNumber: 'VN123',
      from: 'Hanoi (HAN)',
      to: 'Ho Chi Minh (SGN)',
      departure: '2025-07-01 08:00',
      seat: '12A',
      status: 'Đã xác nhận'
    },
    {
      id: 'BK002',
      type: 'Vé máy bay',
      flightNumber: 'VJ456',
      from: 'Da Nang (DAD)',
      to: 'Hanoi (HAN)',
      departure: '2025-07-05 14:30',
      seat: '7C',
      status: 'Đã xác nhận'
    },
    {
      id: 'BK003',
      type: 'Booking đặc biệt',
      description: 'Dịch vụ xe đưa đón sân bay',
      date: '2025-07-01',
      status: 'Đã hoàn tất'
    },
    {
      id: 'BK004',
      type: 'Booking đặc biệt',
      description: 'Phòng khách VIP sân bay',
      date: '2025-07-05',
      status: 'Chờ xác nhận'
    }
  ];

  if (!user) return <p>Bạn cần đăng nhập để xem trang này.</p>;

  return (
    <div style={{
      display: 'flex',
      maxWidth: 900,
      margin: '2rem auto',
      padding: 20,
      gap: 40,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f2f5',
      borderRadius: 8,
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Bên trái: Thông tin cá nhân */}
      <div style={{
        flex: '1 1 40%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <img
          src={user.avatar || "/default-avatar.png"}
          alt="Avatar"
          style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', marginBottom: 20, border: '3px solid #4A90E2' }}
        />
        <h2 style={{ marginBottom: 10, color: '#333' }}>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Điện thoại:</strong> {user.phone}</p>}
        {user.address && <p><strong>Địa chỉ:</strong> {user.address}</p>}

        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            padding: '10px 20px',
            backgroundColor: '#4A90E2',
            color: 'white',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: 16
          }}
        >
          Đăng xuất
        </button>
      </div>

      {/* Bên phải: Danh sách booking */}
      <div style={{
        flex: '1 1 60%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        <h2 style={{ marginBottom: 20, color: '#333' }}>Các booking của bạn</h2>

        {bookings.length === 0 && <p>Chưa có booking nào.</p>}

        {bookings.map((b) => (
          <div
            key={b.id}
            style={{
              borderBottom: '1px solid #ddd',
              padding: '12px 0',
            }}
          >
            <h3 style={{ margin: 0, color: '#4A90E2' }}>{b.type}</h3>

            {b.type === 'Vé máy bay' ? (
              <>
                <p><strong>Chuyến bay:</strong> {b.flightNumber}</p>
                <p><strong>Điểm đi:</strong> {b.from}</p>
                <p><strong>Điểm đến:</strong> {b.to}</p>
                <p><strong>Khởi hành:</strong> {b.departure}</p>
                <p><strong>Ghế:</strong> {b.seat}</p>
              </>
            ) : (
              <>
                <p><strong>Mô tả:</strong> {b.description}</p>
                <p><strong>Ngày:</strong> {b.date}</p>
              </>
            )}

            <p><strong>Trạng thái:</strong> {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
