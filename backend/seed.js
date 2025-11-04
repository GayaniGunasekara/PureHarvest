// seed.js
const pool = require('./db');
const bcrypt = require('bcryptjs');

async function seed() {
    await pool.query('DELETE FROM order_items');
    await pool.query('DELETE FROM orders');
    await pool.query('DELETE FROM products');
    await pool.query('DELETE FROM users');

    const users = [
        { name: 'Farmer One', email: 'farmer1@example.com', pass: 'password', role: 'Farmer' },
        { name: 'Seller One', email: 'seller1@example.com', pass: 'password', role: 'FertilizerSeller' },
        { name: 'Customer One', email: 'customer1@example.com', pass: 'password', role: 'Customer' },
        { name: 'Driver One', email: 'driver1@example.com', pass: 'password', role: 'Driver' },
    ];

    for (const u of users) {
        const h = await bcrypt.hash(u.pass, 10);
        await pool.query('INSERT INTO users (name,email,password,role) VALUES (?, ?, ?, ?)', [u.name, u.email, h, u.role]);
    }

    // add a sample product by farmer
    const [[farmer]] = await pool.query('SELECT id FROM users WHERE role = ?', ['Farmer']);
    await pool.query('INSERT INTO products (owner_id, owner_role, title, description, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
        [farmer.id, 'Farmer', 'Tomato (Local)', 'Fresh tomatoes', 50.00, 100]);

    console.log('Seeded');
    process.exit(0);
}

seed().catch(console.error);
