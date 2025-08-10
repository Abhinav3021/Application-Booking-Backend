const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs is imported for password hashing

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password, role: 'patient' });
        const token = generateToken(user._id, user.role);
        res.status(201).json({ token, role: user.role });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: { code: 'EMAIL_EXISTS', message: 'Email already in use' } });
        }
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message } });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id, user.role);
            res.status(200).json({ token, role: user.role });
        } else {
            res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
        }
    } catch (error) {
        res.status(500).json({ error: { code: 'SERVER_ERROR', message: error.message } });
    }
});

module.exports = router;