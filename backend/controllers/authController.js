// authController.js
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' });

    try {
        const [exists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (exists.length) return res.status(400).json({ message: 'Email already used' });

        const hashed = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)', [name, email, hashed, role]);
        const user = { id: result.insertId, name, email, role };
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);
        const user = rows[0];
        if (!user) return res.status(401).json({ message: 'Invalid credentials or role' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const payload = { id: user.id, name: user.name, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token, user: payload });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
