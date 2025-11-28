// controllers/flightController.js
const Flight = require('../models/Flight');

// Tạo chuyến bay
const createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo chuyến bay', error: err.message });
  }
};

// Lấy tất cả chuyến bay
const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách chuyến bay', error: err.message });
  }
};

// Lấy chuyến bay theo ID
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi truy vấn', error: err.message });
  }
};

// Cập nhật chuyến bay
const updateFlight = async (req, res) => {
  try {
    const updated = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật chuyến bay', error: err.message });
  }
};

// Xóa chuyến bay
const deleteFlight = async (req, res) => {
  try {
    const deleted = await Flight.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
    res.json({ message: 'Đã xóa chuyến bay' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa chuyến bay', error: err.message });
  }
};

// ✅ Tự động hủy chuyến bay quá giờ
const autoCancelFlights = async (req, res) => {
  try {
    const now = new Date();
    const result = await Flight.updateMany(
      { arrivalTime: { $lt: now }, status: 'Scheduled' },
      { $set: { status: 'Cancelled' } }
    );
    res.json({ message: 'Đã cập nhật trạng thái các chuyến bay quá giờ', result });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi cập nhật trạng thái', error: err.message });
  }
};

const searchFlights = async (req, res) => {
  try {
    const { departure, arrival, date } = req.query;

    let filter = {};

    if (departure) filter.departure = departure.toUpperCase();
    if (arrival) filter.arrival = arrival.toUpperCase();
    if (date) {
      // Giả sử chuyến bay có trường departureTime kiểu Date
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.departureTime = { $gte: start, $lt: end };
    }

    const flights = await Flight.find(filter);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tìm chuyến bay' });
  }
};

module.exports = {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  autoCancelFlights,
  searchFlights,
};
