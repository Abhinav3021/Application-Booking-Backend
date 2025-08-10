// backend/models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
}, { timestamps: true });

const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;