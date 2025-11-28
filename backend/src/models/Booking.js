// models/Booking.js
const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  passportNumber: String
});

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  seatNumber: String,
  bookingTime: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  ticketCode: { type: String, unique: true },
  passengers: [passengerSchema]
});

module.exports = mongoose.model('Booking', bookingSchema);
