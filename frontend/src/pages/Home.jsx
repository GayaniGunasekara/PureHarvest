import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../components/homeNav.jsx';
import home1 from "../assets/home1.jpg";
import home2 from "../assets/home2.jpg";

import './Home.css';


export default function Home() {
    return (
        <>
            <HomeNavbar />

            {/* ================= Hero Section ================= */}
            <section className="hero" id="hero">
                <div className="hero-content container">
                    <div className="hero-text">
                        <h1 className="title">PureHarvest</h1>
                        <p className="lead">
                            PureHarvest is your trusted marketplace for 100% organic products. Connect farmers directly with customers, eliminating intermediaries and ensuring freshness, transparency, and fair prices.
                        </p>
                        <div className="hero-actions">
                            <Link className="btn primary" to="/login">Log In</Link>
                            <Link className="btn ghost" to="/register">Get Started</Link>
                        </div>
                    </div>
                    <div className="hero-image-wrap">
                        <img src={home1} alt="Fresh produce" className="hero-image" />
                    </div>
                </div>
            </section>

            {/* ================= Features Section ================= */}
            <section className="features" id="features">
                <div className="container">
                    <h2>Why Choose PureHarvest?</h2>
                    <p className="desc">A comprehensive platform designed exclusively for organic farming and sustainable agriculture</p>
                    <div className="features-grid">
                        <div className="feature-card">100% Organic Certified
                            <p className='WhyDesc'>All farmers and sellers are verified through our AI-powered certification process to ensure genuine organic practices.</p>
                        </div>

                        <div className="feature-card">Direct Connection
                            <p className='WhyDesc'>No intermediaries. Farmers get fair prices, customers get fresh produce, and everyone knows the source.</p>
                        </div>
                        <div className="feature-card">Smart Delivery
                            <p className='WhyDesc'>AI-powered driver allocation ensures the fastest delivery, preserving freshness and reducing food miles.</p>
                        </div>
                        <div className="feature-card">Advanced Search
                            <p className='WhyDesc'>Find products by farmer name, product type, city, or price range with our powerful search engine.</p></div>
                        <div className="feature-card">Rating System
                            <p className='WhyDesc'>Transparent ratings help maintain quality. Rate farmers, sellers, and drivers based on your experience.</p>
                        </div>
                        <div className="feature-card">Organic Fertilizers
                            <p className='WhyDesc'>Marketplace for organic fertilizers, supporting farmers and home gardeners in sustainable practices.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= How It Works ================= */}
            <section className="how" id="how">
                <div className="container">
                    <h2>How PureHarvest Works</h2>
                    <p className="desc">Simple steps for all stakeholders to join our organic ecosystem</p>
                    <div className="how-grid">
                        {/* Farmers & Sellers */}
                        <div className="how-column">
                            <h3>For Farmers & Sellers</h3>
                            <ul className="steps">
                                <li className="step"><span className="num dark">1</span><div className="content"><h4>Register & Get Certified</h4><p>Verify your organic practices with our AI certification.</p></div></li>
                                <li className="step"><span className="num dark">2</span><div className="content"><h4>Showcase Your Products</h4><p>List your produce or fertilizers with prices.</p></div></li>
                                <li className="step"><span className="num dark">3</span><div className="content"><h4>Receive Direct Orders</h4><p>Get orders directly from customers.</p></div></li>
                                <li className="step"><span className="num dark">4</span><div className="content"><h4>Arrange Delivery</h4><p>Find nearby drivers for quick delivery.</p></div></li>
                            </ul>
                        </div>
                        {/* Customers */}
                        <div className="how-column">
                            <h3>For Customers</h3>
                            <ul className="steps">
                                <li className="step"><span className="num light">1</span><div className="content"><h4>Create Account</h4><p>Quick registration to start shopping.</p></div></li>
                                <li className="step"><span className="num light">2</span><div className="content"><h4>Search & Browse</h4><p>Find products by name, farmer, or location.</p></div></li>
                                <li className="step"><span className="num light">3</span><div className="content"><h4>Place Order</h4><p>Order directly from farmers easily.</p></div></li>
                                <li className="step"><span className="num light">4</span><div className="content"><h4>Track & Rate</h4><p>Track your delivery and rate your experience.</p></div></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= Description Section ================= */}
            <section className="description" id="benefits">
                <div className="container desc-grid">
                    <div className="desc-image">
                        <img src={home2} alt="Healthy farming" />
                    </div>
                    <div className="desc-text">
                        <h2>Building a Healthier Society Together</h2>
                        <ul className="steps" itemType='Triangle' >
                            <li className="step"><span className="num desc"></span><div className="content"><h4>Fair Prices</h4><p>Sell directly without intermediaries.</p></div></li>
                            <li className="step"><span className="num desc"></span><div className="content"><h4>Fresh & Affordable</h4><p>Customers get fresher produce.</p></div></li>
                            <li className="step"><span className="num desc"></span><div className="content"><h4>Transparency</h4><p>Know exactly where your food comes from.</p></div></li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ================= Call to Action ================= */}
            <section className="cta">
                <div className="container cta-content">
                    <h3>Ready to Join PureHarvest?</h3>
                    <p>Whether you're a farmer, customer, or driver - PureHarvest welcomes you.</p>
                    <div className="cta-buttons">
                        <Link className="btn primary" to="/register">Get Started Today</Link>
                        <Link className="btn ghost" to="/login">Sign In</Link>
                    </div>
                </div>
            </section>

            {/* ================= Footer ================= */}
            <footer className="footer">
                <div className="container footer-grid">
                    <div className="footer-logo">
                        <p>PureHarvest</p>
                        <p>Connecting organic farmers with conscious customers.</p>
                    </div>
                    <div className="footer-links">
                        <h4>For Sellers</h4>
                        <ul>
                            <li>Become a Farmer</li>
                            <li>Sell Fertilizers</li>
                            <li>Certification Process</li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>For Buyers</h4>
                        <ul>
                            <li>Shop Products</li>
                            <li>How It Works</li>
                            <li>Delivery Info</li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Support</h4>
                        <ul>
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                </div>
                <p className="footer-bottom">© {new Date().getFullYear()} PureHarvest. All rights reserved - Gayani Malsha Gunasekara.</p>
            </footer>
        </>
    );
}
