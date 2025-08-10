const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const Slot = require('../models/Slot');
const Booking = require('../models/Booking');

// GET /api/slots - Get available slots
router.get('/slots', async (req, res) => {
    const { from, to } = req.query;
    try {
        const slots = await Slot.find({
            startAt: { $gte: new Date(from), $lte: new Date(to) }
        }).sort('startAt');

        const bookedSlots = await Booking.find({}).select('slot');
        const bookedSlotIds = new Set(bookedSlots.map(booking => booking.slot.toString()));

        const availableSlots = slots.filter(slot => !bookedSlotIds.has(slot._id.toString()));
        res.json(availableSlots);
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message } });
    }
});

// POST /api/book - Book a slot
router.post('/book', protect, async (req, res) => {
    const { slotId } = req.body;
    try {
        // This will fail if the slotId is already in a booking due to the unique index
        const booking = await Booking.create({ user: req.user._id, slot: slotId });
        res.status(201).json(booking);
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(409).json({ error: { code: 'SLOT_TAKEN', message: 'This slot is already booked' } });
        }
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message } });
    }
});

// GET /api/my-bookings - Get patient's bookings
router.get('/my-bookings', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('slot');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message } });
    }
});

// GET /api/all-bookings - Get all bookings (admin only)
router.get('/all-bookings', protect, admin, async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('slot');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message } });
    }
});

module.exports = router;