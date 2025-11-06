const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

// helper: decode token
function getUserFromHeader(req) {
    const h = req.headers.authorization;
    if (!h) return null;
    const token = h.replace('Bearer ', '');
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch { return null; }
}

// GET /api/products?q=...
router.get('/', async (req, res) => {
    const q = req.query.q || '';
    const [rows] = await pool.query("SELECT p.*, u.name as owner_name FROM products p JOIN users u ON p.owner_id = u.id WHERE p.title LIKE ? OR p.description LIKE ?", [`%${q}%`, `%${q}%`]);
    res.json(rows);
});

// GET /api/products/mine
router.get('/mine', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const [rows] = await pool.query('SELECT * FROM products WHERE owner_id = ?', [user.id]);
    res.json(rows);
});

// POST /api/products
router.post('/', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { title, description, price, quantity } = req.body;
    const [result] = await pool.query('INSERT INTO products (owner_id, title, description, price, quantity) VALUES (?, ?, ?, ?, ?)', [user.id, title, description, price, quantity]);
    res.json({ id: result.insertId });
});

module.exports = router;
