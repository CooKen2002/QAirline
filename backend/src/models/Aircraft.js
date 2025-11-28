// src/models/Aircraft.js
const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },   // vd: "1A", "2B"
  class: { type: String, enum: ['economy', 'business', 'first'], required: true },
  isAvailable: { type: Boolean, default: true }
});

const aircraftSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },    // Mã tàu bay
  manufacturer: { type: String, required: true },          // Hãng sản xuất
  seatsInfo: [seatSchema],                                 // Thông tin ghế ngồi
}, { timestamps: true });

module.exports = mongoose.model('Aircraft', aircraftSchema);
