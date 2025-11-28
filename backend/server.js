// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const cors = require('cors');

const flightRoutes = require('./src/routes/flightRoutes');
const aircraftRoutes = require('./src/routes/aircraftRoutes');
const newsRoutes = require('./src/routes/newsRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const airportRoutes = require('./src/routes/airportRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/qairline')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/users', userRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/aircrafts', aircraftRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/airports', airportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
