const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');   // only if you installed bcryptjs
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
    try {
        const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (rows.length) return res.status(400).json({ message: 'Email exists' });

        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name || '', email, hash, role]);

        const token = jwt.sign({ id: result.insertId, name: name || '', email, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
        // inside catch blocks in both register and login handlers
    } catch (err) {
        console.error('Register/Login error stack:', err);     // <-- detailed log
        // DEV ONLY: return err.message to client to see what happened (remove in production)
        return res.status(500).json({ message: err.message || 'Server error' });
    }

});

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND role = ?', [email, role]);
        if (!rows.length) return res.status(400).json({ message: 'Invalid credentials' });
        const user = rows[0];
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });
        // inside catch blocks in both register and login handlers
    } catch (err) {
        console.error('Register/Login error stack:', err);     // <-- detailed log
        // DEV ONLY: return err.message to client to see what happened (remove in production)
        return res.status(500).json({ message: err.message || 'Server error' });
    }

});

module.exports = router;
