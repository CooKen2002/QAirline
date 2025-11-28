const Aircraft = require('../models/Aircraft');

// Lấy tất cả tàu bay
exports.getAllAircrafts = async (req, res) => {
  try {
    const aircrafts = await Aircraft.find();
    res.json(aircrafts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy tàu bay' });
  }
};

// Lấy tàu bay theo ID
exports.getAircraftById = async (req, res) => {
  try {
    const aircraft = await Aircraft.findById(req.params.id);
    if (!aircraft) return res.status(404).json({ message: 'Không tìm thấy tàu bay' });
    res.json(aircraft);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi lấy tàu bay' });
  }
};

// Tạo tàu bay mới
exports.createAircraft = async (req, res) => {
  try {
    const { code, manufacturer, seatsInfo } = req.body;
    const newAircraft = new Aircraft({ code, manufacturer, seatsInfo });
    await newAircraft.save();
    res.status(201).json(newAircraft);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi tạo tàu bay' });
  }
};

// Cập nhật tàu bay
exports.updateAircraft = async (req, res) => {
  try {
    const aircraft = await Aircraft.findById(req.params.id);
    if (!aircraft) return res.status(404).json({ message: 'Không tìm thấy tàu bay' });

    Object.assign(aircraft, req.body);
    await aircraft.save();
    res.json(aircraft);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi cập nhật tàu bay' });
  }
};

// Xóa tàu bay
exports.deleteAircraft = async (req, res) => {
  try {
    const aircraft = await Aircraft.findByIdAndDelete(req.params.id);
    if (!aircraft) return res.status(404).json({ message: 'Không tìm thấy tàu bay' });
    res.json({ message: 'Xóa tàu bay thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi xóa tàu bay' });
  }
};
