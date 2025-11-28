import { useEffect, useState } from 'react';
import axios from 'axios';

const sampleFlights = [
  { _id: 'f1', flightNumber: 'VN123', airline: 'Vietnam Airlines', from: 'HAN', to: 'SGN', departureTime: '2025-06-10T08:00:00Z', arrivalTime: '2025-06-10T10:00:00Z', price: 1500000, status: 'Scheduled' },
  { _id: 'f2', flightNumber: 'VJ456', airline: 'VietJet Air', from: 'DAD', to: 'HAN', departureTime: '2025-06-11T13:00:00Z', arrivalTime: '2025-06-11T15:30:00Z', price: 900000, status: 'Scheduled' },
  { _id: 'f3', flightNumber: 'QH789', airline: 'Bamboo Airways', from: 'SGN', to: 'CXR', departureTime: '2025-06-12T09:30:00Z', arrivalTime: '2025-06-12T11:00:00Z', price: 1100000, status: 'Delayed' },
  { _id: 'f4', flightNumber: 'VN321', airline: 'Vietnam Airlines', from: 'HAN', to: 'DAD', departureTime: '2025-06-13T16:00:00Z', arrivalTime: '2025-06-13T17:30:00Z', price: 1200000, status: 'Cancelled' },
];

const sampleAirports = [
  { _id: 'a1', name: 'Noi Bai International Airport', code: 'HAN', city: 'Hanoi', country: 'Vietnam' },
  { _id: 'a2', name: 'Tan Son Nhat International Airport', code: 'SGN', city: 'Ho Chi Minh City', country: 'Vietnam' },
  { _id: 'a3', name: 'Da Nang International Airport', code: 'DAD', city: 'Da Nang', country: 'Vietnam' },
  { _id: 'a4', name: 'Cam Ranh International Airport', code: 'CXR', city: 'Khanh Hoa', country: 'Vietnam' },
];

const sampleAircrafts = [
  { _id: 'ac1', code: 'A320', manufacturer: 'Airbus', seatsInfo: [ { seatNumber: '1A', class: 'business', isAvailable: true }, { seatNumber: '1B', class: 'business', isAvailable: false }, { seatNumber: '10C', class: 'economy', isAvailable: true }, { seatNumber: '10D', class: 'economy', isAvailable: true } ] },
  { _id: 'ac2', code: 'B737', manufacturer: 'Boeing', seatsInfo: [ { seatNumber: '2A', class: 'business', isAvailable: true }, { seatNumber: '15C', class: 'economy', isAvailable: false }, { seatNumber: '15D', class: 'economy', isAvailable: true }, { seatNumber: '15E', class: 'economy', isAvailable: true } ] },
  { _id: 'ac3', code: 'A350', manufacturer: 'Airbus', seatsInfo: [ { seatNumber: '1A', class: 'first', isAvailable: false }, { seatNumber: '2B', class: 'business', isAvailable: true }, { seatNumber: '20C', class: 'economy', isAvailable: true }, { seatNumber: '20D', class: 'economy', isAvailable: false } ] },
  { _id: 'ac4', code: 'B787', manufacturer: 'Boeing', seatsInfo: [ { seatNumber: '3A', class: 'business', isAvailable: true }, { seatNumber: '18B', class: 'economy', isAvailable: true }, { seatNumber: '18C', class: 'economy', isAvailable: true }, { seatNumber: '18D', class: 'economy', isAvailable: true } ] },
];

export default function Journey() {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [flightsRes, airportsRes, aircraftsRes] = await Promise.all([
          axios.get('/api/flights'),
          axios.get('/api/airports'),
          axios.get('/api/aircrafts'),
        ]);

        setFlights(Array.isArray(flightsRes.data) ? flightsRes.data : []);
        setAirports(Array.isArray(airportsRes.data) ? airportsRes.data : []);
        setAircrafts(Array.isArray(aircraftsRes.data) ? aircraftsRes.data : []);
      } catch (err) {
        setError('Không lấy được dữ liệu từ server, chỉ hiển thị dữ liệu mẫu.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <p style={styles.loading}>Đang tải dữ liệu...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thông tin Journey</h1>
      {error && <p style={styles.error}>{error}</p>}

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Chuyến bay </h2>
        <div style={styles.grid}>
          {[...flights.slice(0, 4), ...sampleFlights].map((flight, i) => (
            <div key={flight._id + '-' + i} style={styles.card}>
              <p><b>Mã chuyến bay:</b> {flight.flightNumber}</p>
              <p><b>Hãng:</b> {flight.airline}</p>
              <p><b>Từ:</b> {flight.from} → <b>Đến:</b> {flight.to}</p>
              <p><b>Giờ khởi hành:</b> {new Date(flight.departureTime).toLocaleString()}</p>
              <p><b>Giờ đến:</b> {new Date(flight.arrivalTime).toLocaleString()}</p>
              <p><b>Giá vé:</b> {flight.price.toLocaleString()} VND</p>
              <p><b>Trạng thái:</b> <span style={flight.status === 'Cancelled' ? styles.statusCancelled : flight.status === 'Delayed' ? styles.statusDelayed : styles.statusScheduled}>{flight.status}</span></p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Sân bay </h2>
        <div style={styles.grid}>
          {[...airports.slice(0, 4), ...sampleAirports].map((airport, i) => (
            <div key={airport._id + '-' + i} style={styles.card}>
              <p><b>Tên sân bay:</b> {airport.name}</p>
              <p><b>Mã sân bay:</b> {airport.code}</p>
              <p><b>Thành phố:</b> {airport.city}</p>
              <p><b>Quốc gia:</b> {airport.country}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Tàu bay</h2>
        <div style={styles.grid}>
          {[...aircrafts.slice(0, 4), ...sampleAircrafts].map((aircraft, i) => (
            <div key={aircraft._id + '-' + i} style={styles.card}>
              <p><b>Mã tàu bay:</b> {aircraft.code}</p>
              <p><b>Hãng sản xuất:</b> {aircraft.manufacturer}</p>
              <p><b>Số lượng ghế:</b> {aircraft.seatsInfo.length}</p>
              <p><b>Danh sách ghế (ví dụ):</b></p>
              <ul style={styles.list}>
                {aircraft.seatsInfo.slice(0, 3).map((seat, idx) => (
                  <li key={idx} style={seat.isAvailable ? styles.seatAvailable : styles.seatUnavailable}>
                    Ghế {seat.seatNumber} - Hạng: {seat.class} - {seat.isAvailable ? 'Còn chỗ' : 'Đã đặt'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 32,
    fontWeight: '700',
    color: '#1a73e8',
  },
  subtitle: {
    marginBottom: 20,
    fontSize: 24,
    borderBottom: '2px solid #1a73e8',
    paddingBottom: 6,
  },
  section: {
    marginBottom: 40,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
    gap: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgb(0 0 0 / 0.1)',
    padding: 20,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'default',
  },
  cardHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 12px rgb(0 0 0 / 0.15)',
  },
  loading: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  statusScheduled: {
    color: 'green',
    fontWeight: '700',
  },
  statusDelayed: {
    color: 'orange',
    fontWeight: '700',
  },
  statusCancelled: {
    color: 'red',
    fontWeight: '700',
  },
  list: {
    paddingLeft: 20,
  },
  seatAvailable: {
    color: 'green',
  },
  seatUnavailable: {
    color: 'red',
    textDecoration: 'line-through',
  },
};
