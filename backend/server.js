// backend/server.js
const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4000' })); // dev
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// db ping
const db = require('./db');
app.get('/api/ping', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 as ok'); // db is pool
        res.json({ ok: rows[0].ok === 1 });
    } catch (err) {
        console.error('Ping DB error:', err);
        res.status(500).json({ message: err.message });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on', port));
