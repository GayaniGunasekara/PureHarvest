// backend/middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ message: 'Missing authorization' });
    const token = h.replace('Bearer ', '');
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // { id, name, email, role, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { verifyToken };
