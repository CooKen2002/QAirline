// backend/seed.js
const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const Airport = require('../models/Airport');
const Aircraft = require('../models/Aircraft');

// ⚙️ Thay đổi URI cho phù hợp với .env hoặc cấu hình thực tế
const MONGO_URI = 'mongodb://localhost:27017/qairline';

async function seedData() {
  await mongoose.connect(MONGO_URI);
  console.log('🔗 Connected to MongoDB');

  // Xóa dữ liệu cũ
  await Flight.deleteMany({});
  await Airport.deleteMany({});
  await Aircraft.deleteMany({});

  // Airports
  const airports = await Airport.insertMany([
    { name: 'Nội Bài', code: 'HAN', city: 'Hà Nội', country: 'Việt Nam' },
    { name: 'Tân Sơn Nhất', code: 'SGN', city: 'TP.HCM', country: 'Việt Nam' },
    { name: 'Đà Nẵng', code: 'DAD', city: 'Đà Nẵng', country: 'Việt Nam' },
    { name: 'Incheon', code: 'ICN', city: 'Seoul', country: 'Hàn Quốc' },
  ]);

  // Aircrafts
  const aircrafts = await Aircraft.insertMany([
    {
      code: 'VN-A888',
      manufacturer: 'Airbus',
      seatsInfo: [
        { seatNumber: '1A', class: 'business' },
        { seatNumber: '2A', class: 'economy' },
        { seatNumber: '3B', class: 'economy' },
      ],
    },
    {
      code: 'VN-B777',
      manufacturer: 'Boeing',
      seatsInfo: [
        { seatNumber: '1C', class: 'first' },
        { seatNumber: '2C', class: 'economy' },
        { seatNumber: '3D', class: 'economy' },
      ],
    },
    {
      code: 'VN-C321',
      manufacturer: 'Airbus',
      seatsInfo: [
        { seatNumber: '4A', class: 'economy' },
        { seatNumber: '4B', class: 'economy' },
        { seatNumber: '4C', class: 'business' },
      ],
    },
    {
      code: 'VN-D888',
      manufacturer: 'Embraer',
      seatsInfo: [
        { seatNumber: '5A', class: 'economy' },
        { seatNumber: '5B', class: 'business' },
        { seatNumber: '5C', class: 'economy' },
      ],
    },
  ]);

  // Flights
  const now = new Date();
  const flights = await Flight.insertMany([
    {
      flightNumber: 'VN001',
      airline: 'Vietnam Airlines',
      from: 'HAN',
      to: 'SGN',
      departureTime: new Date(now.getTime() + 60 * 60 * 1000),
      arrivalTime: new Date(now.getTime() + 3 * 60 * 60 * 1000),
      price: 1500000,
      seatsAvailable: 100,
    },
    {
      flightNumber: 'VN002',
      airline: 'Bamboo Airways',
      from: 'SGN',
      to: 'DAD',
      departureTime: new Date(now.getTime() + 2 * 60 * 60 * 1000),
      arrivalTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),
      price: 1200000,
      seatsAvailable: 80,
    },
    {
      flightNumber: 'VN003',
      airline: 'Vietjet Air',
      from: 'DAD',
      to: 'HAN',
      departureTime: new Date(now.getTime() + 1.5 * 60 * 60 * 1000),
      arrivalTime: new Date(now.getTime() + 3.5 * 60 * 60 * 1000),
      price: 1000000,
      seatsAvailable: 90,
    },
    {
      flightNumber: 'VN004',
      airline: 'Vietnam Airlines',
      from: 'HAN',
      to: 'ICN',
      departureTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),
      arrivalTime: new Date(now.getTime() + 9 * 60 * 60 * 1000),
      price: 4500000,
      seatsAvailable: 50,
    },
  ]);

  console.log('✅ Dữ liệu mẫu đã được tạo!');
  mongoose.disconnect();
}

seedData();
