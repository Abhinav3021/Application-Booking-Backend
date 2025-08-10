const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use an environment variable for the frontend URL
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api', authRoutes);
app.use('/api', bookingRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});