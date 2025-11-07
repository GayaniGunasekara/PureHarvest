// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyToken } = require('../middleware/auth');

// POST /api/orders  { items: [{ product_id, qty }] }
router.post('/', verifyToken, async (req, res) => {
    const items = req.body.items || [];
    if (!items.length) return res.status(400).json({ message: 'No items' });

    try {
        // find owner of first product (simple approach)
        const [prodRows] = await pool.query('SELECT owner_id FROM products WHERE id = ?', [items[0].product_id]);
        if (!prodRows.length) return res.status(400).json({ message: 'Product not found' });
        const ownerId = prodRows[0].owner_id;

        const [r] = await pool.query('INSERT INTO orders (owner_id, customer_id, status) VALUES (?, ?, ?)', [ownerId, req.user.id, 'Pending']);
        const orderId = r.insertId;

        for (const it of items) {
            await pool.query('INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)', [orderId, it.product_id, it.qty, it.price || 0]);
        }

        res.json({ orderId });
    } catch (err) {
        console.error('Create order error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/orders/owner  - orders for owner (Farmer / Seller)
router.get('/owner', verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT o.*, u.name as customer_name FROM orders o LEFT JOIN users u ON o.customer_id = u.id WHERE o.owner_id = ?', [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error('Owner orders error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/orders/assign-driver
router.post('/assign-driver', verifyToken, async (req, res) => {
    const { orderId, driverId } = req.body || {};
    if (!orderId || !driverId) return res.status(400).json({ message: 'Missing fields' });

    try {
        await pool.query('UPDATE orders SET driver_id = ? WHERE id = ? AND owner_id = ?', [driverId, orderId, req.user.id]);
        res.json({ ok: true });
    } catch (err) {
        console.error('Assign driver error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/orders/driver - orders assigned to driver
router.get('/driver', verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders WHERE driver_id = ?', [req.user.id]);
        res.json(rows);
    } catch (err) {
        console.error('Driver orders error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/orders/driver/update-status  { orderId, status }
router.post('/driver/update-status', verifyToken, async (req, res) => {
    const { orderId, status } = req.body || {};
    if (!orderId || !status) return res.status(400).json({ message: 'Missing fields' });

    try {
        await pool.query('UPDATE orders SET status = ? WHERE id = ? AND driver_id = ?', [status, orderId, req.user.id]);
        res.json({ ok: true });
    } catch (err) {
        console.error('Driver update status error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
