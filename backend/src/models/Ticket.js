// src/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true }, // Vé thuộc chuyến bay nào
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },    // Vé thuộc người dùng nào
  seatNumber: { type: String, required: true },  // Số ghế
  price: { type: Number, required: true },       // Giá vé (có thể khác giá chuyến bay nếu có khuyến mãi)
  status: { 
    type: String, 
    enum: ['Booked', 'CheckedIn', 'Cancelled'], 
    default: 'Booked' 
  },
  bookingDate: { type: Date, default: Date.now }, // Ngày đặt vé
  checkInDate: { type: Date },                    // Ngày check-in (nếu đã check-in)
});

module.exports = mongoose.model('Ticket', ticketSchema);
