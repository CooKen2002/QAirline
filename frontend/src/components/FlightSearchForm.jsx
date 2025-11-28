import { useState } from "react";
import "./FlightSearchForm.css";

export default function FlightSearchForm({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("economy");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onSearch truyền dữ liệu lên cha hoặc chuyển trang
    onSearch({
      from,
      to,
      departureDate,
      returnDate,
      passengers,
      travelClass,
    });
  };

  return (
    <form className="flight-search-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="from">Điểm đi</label>
        <input
          id="from"
          type="text"
          placeholder="Nhập điểm đi"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="to">Điểm đến</label>
        <input
          id="to"
          type="text"
          placeholder="Nhập điểm đến"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="departureDate">Ngày đi</label>
        <input
          id="departureDate"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="returnDate">Ngày về</label>
        <input
          id="returnDate"
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={departureDate}
          disabled={!departureDate}
        />
      </div>

      <div className="form-row">
        <label htmlFor="passengers">Hành khách</label>
        <input
          id="passengers"
          type="number"
          min="1"
          max="9"
          value={passengers}
          onChange={(e) => setPassengers(Number(e.target.value))}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="travelClass">Hạng ghế</label>
        <select
          id="travelClass"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
        >
          <option value="economy">Phổ thông</option>
          <option value="premiumEconomy">Phổ thông cao cấp</option>
          <option value="business">Thương gia</option>
          <option value="firstClass">Hạng nhất</option>
        </select>
      </div>

      <div className="form-row form-actions">
        <button type="submit" className="btn-search">
          Tìm chuyến bay
        </button>
      </div>
    </form>
  );
}
