// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const User = require('../models/User');
const Airport = require('../models/Airport');
const Aircraft = require('../models/Aircraft');
const Flight = require('../models/Flight');
const News = require('../models/News');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/qairline';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Clear old data
    await User.deleteMany();
    await Airport.deleteMany();
    await Aircraft.deleteMany();
    await Flight.deleteMany();
    await News.deleteMany();

    // Seed users
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'user',
      }
    ]);

    // Seed airports
    const airports = await Airport.insertMany([
      { name: 'Noi Bai International Airport', code: 'HAN', city: 'Hanoi', country: 'Vietnam' },
      { name: 'Tan Son Nhat International Airport', code: 'SGN', city: 'Ho Chi Minh City', country: 'Vietnam' },
      { name: 'Narita International Airport', code: 'NRT', city: 'Tokyo', country: 'Japan' }
    ]);

    // Seed aircrafts
    const aircrafts = await Aircraft.insertMany([
      {
        code: 'B737',
        manufacturer: 'Boeing',
        seatsInfo: [
          { seatNumber: '1A', class: 'business' },
          { seatNumber: '10C', class: 'economy' }
        ]
      },
      {
        code: 'A320',
        manufacturer: 'Airbus',
        seatsInfo: [
          { seatNumber: '2A', class: 'business' },
          { seatNumber: '12D', class: 'economy' }
        ]
      }
    ]);

    // Seed flights
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 3600000);
    const twoHoursLater = new Date(now.getTime() + 7200000);

    const flights = await Flight.insertMany([
      {
        flightNumber: 'VN123',
        airline: 'Vietnam Airlines',
        from: 'HAN',
        to: 'SGN',
        departureTime: oneHourLater,
        arrivalTime: twoHoursLater,
        price: 1500000,
        seatsAvailable: 150
      },
      {
        flightNumber: 'JL456',
        airline: 'Japan Airlines',
        from: 'NRT',
        to: 'SGN',
        departureTime: twoHoursLater,
        arrivalTime: new Date(twoHoursLater.getTime() + 3 * 3600000),
        price: 5000000,
        seatsAvailable: 120
      }
    ]);

    // Seed news
    const news = await News.insertMany([
      {
        title: 'New Flight Route HAN -> SGN',
        content: 'Vietnam Airlines launches a new route from Hanoi to Ho Chi Minh City.',
        type: 'news'
      },
      {
        title: 'Summer Promotion 2025!',
        content: 'Get 30% off all domestic flights booked before July.',
        type: 'promotion'
      },
      {
        title: 'Important Notice',
        content: 'Please arrive 2 hours before departure due to new security measures.',
        type: 'announcement'
      }
    ]);

    console.log('✅ Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
