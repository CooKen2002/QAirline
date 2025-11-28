const Ticket = require('../models/Ticket');

// Tạo vé mới
const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo vé', error: err.message });
  }
};

// Lấy tất cả vé
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('flight')
      .populate('user');
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách vé', error: err.message });
  }
};

// Lấy vé theo ID
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('flight')
      .populate('user');
    if (!ticket) return res.status(404).json({ message: 'Không tìm thấy vé' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi truy vấn', error: err.message });
  }
};

// Cập nhật vé
const updateTicket = async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy vé' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật vé', error: err.message });
  }
};

// Xóa vé
const deleteTicket = async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy vé' });
    res.json({ message: 'Đã xóa vé' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa vé', error: err.message });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
