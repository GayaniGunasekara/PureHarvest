// backend/server.js
const express = require('express');
const app = express();
require('dotenv').config();

// If you are using the frontend proxy (frontend/package.json "proxy"),
// you do not need to enable CORS. If you call backend directly, enable CORS:
//
// const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000' }));
//
// For production, set origin to your frontend domain.

app.use(express.json());

const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server listening on', port));
