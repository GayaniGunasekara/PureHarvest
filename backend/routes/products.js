// backend/routes/products.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');

// GET /api/products?q=...
router.get('/', async (req, res) => {
    const q = req.query.q || '';
    try {
        const [rows] = await pool.query(
            "SELECT p.*, u.name as owner_name FROM products p LEFT JOIN users u ON p.owner_id = u.id WHERE p.title LIKE ? OR p.description LIKE ?",
            [`%${q}%`, `%${q}%`]
        );
        res.json(rows);
    } catch (err) {
        console.error('Products list error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/products/mine
router.get('/mine', verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE owner_id = ?', [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error('Products mine error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/products  (owner only)
router.post('/', verifyToken, async (req, res) => {
    const { title, description, price, quantity } = req.body || {};
    try {
        const [r] = await pool.query(
            'INSERT INTO products (owner_id, title, description, price, quantity) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, title, description, price || 0, quantity || 0]
        );
        res.json({ id: r.insertId });
    } catch (err) {
        console.error('Create product error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
