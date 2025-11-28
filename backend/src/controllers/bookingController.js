const Booking = require('../models/Booking');

// Tạo booking mới
const createBooking = async (req, res) => {
  try {
    const { userId, flightId, seatNumber, paymentStatus, ticketCode, passengers } = req.body;

    const booking = new Booking({
      userId,
      flightId,
      seatNumber,
      paymentStatus,
      ticketCode,
      passengers
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi tạo booking', error: err.message });
  }
};

// Lấy tất cả booking
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')   // populate thông tin user (có thể chọn các trường cần thiết)
      .populate('flightId', 'flightNumber airline from to departureTime arrivalTime');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách booking', error: err.message });
  }
};

// Lấy booking theo ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('flightId', 'flightNumber airline from to departureTime arrivalTime');
    if (!booking) return res.status(404).json({ message: 'Không tìm thấy booking' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi truy vấn booking', error: err.message });
  }
};

// Cập nhật booking
const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy booking' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Lỗi khi cập nhật booking', error: err.message });
  }
};

// Xóa booking
const deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy booking' });
    res.json({ message: 'Đã xóa booking' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa booking', error: err.message });
  }
};
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId).populate('flight');
    if (!booking) return res.status(404).json({ message: 'Không tìm thấy đặt vé' });

    // Kiểm tra quyền (chủ booking hoặc admin)
    if (booking.user.toString() !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Bạn không có quyền hủy vé này' });
    }

    // Kiểm tra hạn hủy vé (ví dụ: vé có thể hủy trước 24h giờ bay)
    const now = new Date();
    const cancelDeadline = new Date(booking.flight.departureTime);
    cancelDeadline.setHours(cancelDeadline.getHours() - 24);

    if (now > cancelDeadline) {
      return res.status(400).json({ message: 'Đã quá hạn hủy vé' });
    }

    // Thực hiện hủy vé (xóa booking hoặc cập nhật trạng thái)
    await booking.remove();

    res.json({ message: 'Hủy vé thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hủy vé' });
  }
};
module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  cancelBooking,
};
