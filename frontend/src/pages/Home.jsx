import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../components/homeNav.jsx';
import home1 from "../assets/home1.jpg";
import './Home.css'; // add this

export default function Home() {
    return (
        <>
            <HomeNavbar />

            {/* ================= Hero Section ================= */}
            <section className="container hero">
                <div className="hero-content">
                    {/* Left - Text */}
                    <div className="hero-text">
                        <h1 className="title">PureHarvest</h1>
                        <p className="lead">
                            PureHarvest is your trusted marketplace for 100% organic products.
                            Connect farmers directly with customers, eliminating intermediaries
                            and ensuring freshness, transparency, and fair prices.
                        </p>

                        <div className="hero-actions">
                            <Link className="btn primary" to="/login">Start Shopping</Link>
                            <Link className="btn ghost" to="/register">Sell Your Products</Link>
                        </div>
                    </div>

                    {/* Right - Image */}
                    <div className="hero-image-wrap">
                        <img src={home1} alt="Fresh produce" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* ================= Features Section ================= */}
            <section className="features container">
                <h2>Why Choose PureHarvest?</h2>
                <p className='desc' >A comprehensive platform designed exclusively for organic farming and sustainable agriculture</p>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>100% Organic Certified</h3>
                        <p>All farmers and sellers are verified through our AI-powered certification process to ensure genuine organic practices.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Direct Connection</h3>
                        <p>No intermediaries. Farmers get fair prices, customers get fresh produce, and everyone knows the source.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Smart Delivery</h3>
                        <p>AI-powered driver allocation ensures the fastest delivery, preserving freshness and reducing food miles.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Advanced Search</h3>
                        <p>Find products by farmer name, product type, city, or price range with our powerful search engine.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Rating System</h3>
                        <p>Transparent ratings help maintain quality. Rate farmers, sellers, and drivers based on your experience..</p>
                    </div>
                    <div className="feature-card">
                        <h3>Organic Fertilizers</h3>
                        <p>Marketplace for organic fertilizers, supporting farmers and home gardeners in sustainable practices..</p>
                    </div>
                </div>
            </section>

            {/* ================= How It Works ================= */}
            <section className="how container">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 text-center">
                    How PureHarvest Works
                </h2>
                <p className="desc text-slate-500 text-center mt-3">
                    Simple steps for all stakeholders to join our organic ecosystem
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {/* Farmers & Sellers */}
                    <div>
                        <h3 className="text-lg font-medium text-slate-700 mb-6">
                            For Farmers & Fertilizer Sellers
                        </h3>

                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                                    1
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Register & Get Certified</h4>
                                    <p className="text-slate-500 mt-1">
                                        Complete our AI-powered certification process to verify your organic practices
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                                    2
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Showcase Your Products</h4>
                                    <p className="text-slate-500 mt-1">
                                        List your organic produce or fertilizers with prices and descriptions
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                                    3
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Receive Direct Orders</h4>
                                    <p className="text-slate-500 mt-1">
                                        Get orders from customers without any intermediaries
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                                    4
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Arrange Delivery</h4>
                                    <p className="text-slate-500 mt-1">
                                        Find nearest available drivers for fast, fresh delivery
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Customers */}
                    <div>
                        <h3 className="text-lg font-medium text-slate-700 mb-6">
                            For Customers
                        </h3>

                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    1
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Create Account</h4>
                                    <p className="text-slate-500 mt-1">
                                        Quick and easy registration to start shopping organic
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    2
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Search & Browse</h4>
                                    <p className="text-slate-500 mt-1">
                                        Find products by name, farmer, location, or price range
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    3
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Place Order</h4>
                                    <p className="text-slate-500 mt-1">
                                        Order directly from farmers with multiple payment options
                                    </p>
                                </div>
                            </li>

                            <li className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                                    4
                                </div>
                                <div>
                                    <h4 className="text-slate-800 font-semibold">Track & Rate</h4>
                                    <p className="text-slate-500 mt-1">
                                        Track your delivery in real-time and rate your experience
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div> hj </section>

            {/* ================= Testimonials & Footer (simple) ================= */}
            <section className="testimonials container">
                <h2>What Our Users Say</h2>
                <blockquote className="quote">
                    "PureHarvest helped us get fresh organic vegetables directly from farmers.
                    The price is fair and the quality is amazing."
                    <cite>- Satisfied Customer</cite>
                </blockquote>
            </section>

            <footer className="site-footer">
                <div className="container">
                    <p>© {new Date().getFullYear()} PureHarvest. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
