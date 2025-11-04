// productController.js
const pool = require('../db');

exports.createProduct = async (req, res) => {
    // only Farmer or FertilizerSeller reach here (enforced in route)
    const { title, description, price, quantity } = req.body;
    const owner_id = req.user.id;
    const owner_role = req.user.role;
    try {
        const [result] = await pool.query(
            'INSERT INTO products (owner_id, owner_role, title, description, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
            [owner_id, owner_role, title, description, price || 0, quantity || 0]
        );
        res.json({ id: result.insertId, title, description, price, quantity });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.listPublic = async (req, res) => {
    // public product listing for customers
    const q = req.query.q || '';
    try {
        const [rows] = await pool.query('SELECT p.*, u.name as owner_name FROM products p JOIN users u ON p.owner_id = u.id WHERE p.title LIKE ? OR p.description LIKE ?',
            [`%${q}%`, `%${q}%`]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.listOwnerProducts = async (req, res) => {
    const owner_id = req.user.id;
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE owner_id = ?', [owner_id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
