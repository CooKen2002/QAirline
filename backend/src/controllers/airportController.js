const Airport = require('../models/Airport');

// Tạo sân bay mới
const createAirport = async (req, res) => {
  try {
    const airport = new Airport(req.body);
    const savedAirport = await airport.save();
    res.status(201).json(savedAirport);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo sân bay', error: err.message });
  }
};

// Lấy danh sách sân bay
const getAllAirports = async (req, res) => {
  try {
    const airports = await Airport.find();
    res.json(airports);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sân bay', error: err.message });
  }
};

// Lấy sân bay theo ID
const getAirportById = async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.id);
    if (!airport) return res.status(404).json({ message: 'Không tìm thấy sân bay' });
    res.json(airport);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi truy vấn', error: err.message });
  }
};

// Cập nhật sân bay
const updateAirport = async (req, res) => {
  try {
    const updated = await Airport.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy sân bay' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật sân bay', error: err.message });
  }
};

// Xóa sân bay
const deleteAirport = async (req, res) => {
  try {
    const deleted = await Airport.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy sân bay' });
    res.json({ message: 'Đã xóa sân bay' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa sân bay', error: err.message });
  }
};

module.exports = {
  createAirport,
  getAllAirports,
  getAirportById,
  updateAirport,
  deleteAirport
};
