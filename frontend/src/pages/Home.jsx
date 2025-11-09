import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../components/homeNav.jsx';

export default function Home() {
    return (
        <>
            <HomeNavbar /> {/* Navbar at the top */}

            <div className="container text-center mt-16">
                <h1 className="text-4xl font-semibold">PureHarvest</h1>
                <p className="mt-2 text-gray-600">
                    PureHarvest is your trusted marketplace for 100% organic products. Connect farmers directly with customers,
                    eliminating intermediaries and ensuring freshness, transparency, and fair prices
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <Link className="btn" to="/login">Login</Link>
                    <Link className="btn ghost" to="/register">Register</Link>
                </div>
            </div>
        </>
    );
}
