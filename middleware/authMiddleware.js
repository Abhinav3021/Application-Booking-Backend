const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            req.userRole = decoded.role;
            next();
        } catch (error) {
            res.status(401).json({ error: { code: 'INVALID_TOKEN', message: 'Not authorized, token failed' } });
        }
    }
    if (!token) {
        res.status(401).json({ error: { code: 'NO_TOKEN', message: 'Not authorized, no token' } });
    }
};

const admin = (req, res, next) => {
    if (req.userRole === 'admin') {
        next();
    } else {
        res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not authorized as an admin' } });
    }
};

module.exports = { protect, admin };