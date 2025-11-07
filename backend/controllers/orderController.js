// orderController.js
const pool = require('../db');

exports.createOrder = async (req, res) => {
    // customer places an order with items = [{product_id, qty}]
    const customer_id = req.user.id;
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'No items' });

    try {
        // calculate total and insert order
        let total = 0;
        // fetch product details
        const productIds = items.map(i => i.product_id);
        const [prods] = await pool.query('SELECT id, price, owner_id FROM products WHERE id IN (?)', [productIds]);

        // map prices
        const prodMap = {};
        prods.forEach(p => { prodMap[p.id] = p; });

        // compute total
        for (const it of items) {
            const p = prodMap[it.product_id];
            if (!p) return res.status(400).json({ message: 'Product not found: ' + it.product_id });
            total += parseFloat(p.price) * (it.qty || 1);
        }

        const [orderRes] = await pool.query('INSERT INTO orders (customer_id, total, status) VALUES (?, ?, ?)', [customer_id, total, 'Pending']);
        const orderId = orderRes.insertId;

        // insert order items
        const insertPromises = items.map(it => {
            const p = prodMap[it.product_id];
            return pool.query('INSERT INTO order_items (order_id, product_id, owner_id, qty, price) VALUES (?, ?, ?, ?, ?)', [orderId, it.product_id, p.owner_id, it.qty, p.price]);

        });
        await Promise.all(insertPromises);

        res.json({ orderId, total });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.customerOrders = async (req, res) => {
    const customer_id = req.user.id;
    const [rows] = await pool.query('SELECT * FROM orders WHERE customer_id = ?', [customer_id]);
    res.json(rows);
};

exports.ownerOrders = async (req, res) => {
    // returns orders that include products owned by this farmer/seller
    const owner_id = req.user.id;
    try {
        const [rows] = await pool.query(`
      SELECT o.*, oi.product_id, oi.qty, oi.price, u.name as customer_name
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      JOIN users u ON u.id = o.customer_id
      WHERE oi.owner_id = ?
      ORDER BY o.created_at DESC
    `, [owner_id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.assignDriver = async (req, res) => {
    // owner books driver for an order
    const owner_id = req.user.id;
    const { orderId, driverId } = req.body;
    try {
        // optional: check owner actually has items in this order
        const [check] = await pool.query('SELECT id FROM order_items WHERE order_id = ? AND owner_id = ?', [orderId, owner_id]);
        if (!check.length) return res.status(403).json({ message: 'Order not associated with you' });

        await pool.query('UPDATE orders SET driver_id = ?, status = ? WHERE id = ?', [driverId, 'DriverAssigned', orderId]);
        res.json({ message: 'Driver assigned' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.driverOrders = async (req, res) => {
    const driver_id = req.user.id;
    const [rows] = await pool.query('SELECT * FROM orders WHERE driver_id = ?', [driver_id]);
    res.json(rows);
};

exports.updateOrderStatus = async (req, res) => {
    const driver_id = req.user.id;
    const { orderId, status } = req.body;
    // allow drivers to update to OnTheWay, Delivered, etc.
    try {
        // ensure assigned to this driver
        const [ord] = await pool.query('SELECT * FROM orders WHERE id = ? AND driver_id = ?', [orderId, driver_id]);
        if (!ord.length) return res.status(403).json({ message: 'Not assigned to you' });

        await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, orderId]);
        res.json({ message: 'Status updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
