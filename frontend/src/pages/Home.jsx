import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="container">
            <h1>PureHarvest</h1>
            <p>Connect Farmers, Fertilizer Sellers, Customers and Drivers.</p>
            <div>
                <Link className="btn" to="/login">Login</Link>
                <Link className="btn ghost" to="/register">Register</Link>
            </div>
        </div>
    );
}
