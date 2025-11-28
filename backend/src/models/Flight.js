// src/models/Flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { 
    type: Date, 
    required: true 
  },
  arrivalTime: { 
    type: Date, 
    required: true,
    validate: {
      validator: function (value) {
        return value > this.departureTime;
      },
      message: 'arrivalTime phải sau departureTime'
    }
  },
  duration: { type: Number }, // minutes, auto-calculated
  price: { type: Number, required: true },
  seatsAvailable: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Scheduled', 'Delayed', 'Cancelled'], 
    default: 'Scheduled' 
  }
});

// Tính tự động duration trước khi lưu
flightSchema.pre('save', function (next) {
  if (this.arrivalTime && this.departureTime) {
    const diffMs = this.arrivalTime - this.departureTime;
    this.duration = Math.floor(diffMs / (1000 * 60)); // chuyển ms → phút
  }
  next();
});

// Tự động cập nhật status nếu giờ đến đã qua
flightSchema.pre('save', function (next) {
  const now = new Date();
  if (this.arrivalTime < now && this.status === 'Scheduled') {
    this.status = 'Cancelled';
  }
  next();
});

module.exports = mongoose.model('Flight', flightSchema);
