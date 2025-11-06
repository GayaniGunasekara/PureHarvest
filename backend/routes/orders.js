const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

function getUserFromHeader(req) {
    const h = req.headers.authorization;
    if (!h) return null;
    const token = h.replace('Bearer ', '');
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch { return null; }
}

// POST /api/orders  { items: [{product_id, qty}] }
router.post('/', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { items } = req.body;
    if (!items || !items.length) return res.status(400).json({ message: 'No items' });

    // For simplicity create one order per request, linked to first product's owner
    const first = items[0];
    const [prod] = await pool.query('SELECT * FROM products WHERE id = ?', [first.product_id]);
    if (!prod.length) return res.status(400).json({ message: 'Product not found' });
    const ownerId = prod[0].owner_id;

    const [r] = await pool.query('INSERT INTO orders (owner_id, customer_id, status) VALUES (?, ?, ?)', [ownerId, user.id, 'Pending']);
    const orderId = r.insertId;

    const promises = items.map(it => pool.query('INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)', [orderId, it.product_id, it.qty, 0]));
    await Promise.all(promises);

    res.json({ orderId });
});

// GET /api/orders/owner  - orders for owner (Farmer / Seller)
router.get('/owner', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const [rows] = await pool.query('SELECT o.*, u.name as customer_name FROM orders o JOIN users u ON o.customer_id = u.id WHERE o.owner_id = ?', [user.id]);
    res.json(rows);
});

// POST /api/orders/assign-driver  {orderId, driverId}
router.post('/assign-driver', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { orderId, driverId } = req.body;
    await pool.query('UPDATE orders SET driver_id = ? WHERE id = ? AND owner_id = ?', [driverId, orderId, user.id]);
    res.json({ ok: true });
});

// GET /api/orders/driver - orders assigned to driver
router.get('/driver', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const [rows] = await pool.query('SELECT * FROM orders WHERE driver_id = ?', [user.id]);
    res.json(rows);
});

// POST /api/orders/driver/update-status  { orderId, status }
router.post('/driver/update-status', async (req, res) => {
    const user = getUserFromHeader(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { orderId, status } = req.body;
    await pool.query('UPDATE orders SET status = ? WHERE id = ? AND driver_id = ?', [status, orderId, user.id]);
    res.json({ ok: true });
});

module.exports = router;
