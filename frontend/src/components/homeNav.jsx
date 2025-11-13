// HomeNavbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.css";

export default function HomeNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`home-navbar ${scrolled ? "scrolled" : ""}`} role="navigation">
            <div className="nav-inner">
                <div className="logo-section">
                    <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                    <div className="logo">PureHarvest</div>
                </div>

                <div className="menu">
                    <a href="#features">Features</a>
                    <a href="#how">How It Works</a>
                    <a href="#benefits">Benefits</a>
                </div>

                <div className="navRight">
                    <Link className="btn login" to="/login">Log In</Link>
                    <Link className="btn reg" to="/register">Register</Link>
                </div>
            </div>
        </nav>
    );
}
