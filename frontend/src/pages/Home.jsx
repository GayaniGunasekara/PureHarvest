import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Farm Connect</h1>
            <p>Connect Farmers, Fertilizer Sellers, Customers and Drivers.</p>
            <p><Link to="/login">Login</Link> or <Link to="/register">Register</Link></p>
        </div>
    );
}
