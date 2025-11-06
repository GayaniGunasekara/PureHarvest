// backend/db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

/*
  Replace env variables with your MySQL credentials.
  If you run MySQL on a non-default port, add `port: 3306`.
*/
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
