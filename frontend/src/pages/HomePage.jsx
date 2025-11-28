import MainLayout from "../layouts/MainLayout";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import FlightSearchForm from "../components/FlightSearchForm";

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    const params = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      departureDate: searchData.departureDate,
      returnDate: searchData.returnDate || "",
      passengers: searchData.passengers,
      travelClass: searchData.travelClass,
    }).toString();

    navigate(`/search?${params}`);
  };

  return (
    <MainLayout>
      <div className="hero-section">
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Bay cùng QAirline</h1>
          <p>Khám phá thế giới với trải nghiệm bay đẳng cấp</p>
          <Link to="/search" className="btn-book">
            Đặt chuyến bay
          </Link>
        </div>
      </div>

      <FlightSearchForm onSearch={handleSearch} />

      <section className="services">
        <h2>Dịch vụ nổi bật</h2>
        <div className="service-grid">
          <div className="service-card">
            <img src="/images/business-class.jpg" alt="Business Class" />
            <h3>Hạng thương gia</h3>
            <p>Thoải mái tối đa, phục vụ tận tâm.</p>
          </div>
          <div className="service-card">
            <img src="/images/entertainment.jpg" alt="Entertainment" />
            <h3>Giải trí trên không</h3>
            <p>Hàng trăm bộ phim và âm nhạc đặc sắc.</p>
          </div>
          <div className="service-card">
            <img src="/images/meal.jpg" alt="Meal Service" />
            <h3>Ẩm thực trên máy bay</h3>
            <p>Thực đơn đa dạng, chuẩn 5 sao quốc tế.</p>
          </div>
        </div>
      </section>

      <section className="promo-banner">
        <h2>Ưu đãi đặc biệt</h2>
        <p>
          Nhận ngay <strong>giảm giá 20%</strong> khi đặt vé khứ hồi trong tháng này!
        </p>
        <Link to="/promotions" className="btn-promo">
          Xem ưu đãi
        </Link>
      </section>
    </MainLayout>
  );
}
