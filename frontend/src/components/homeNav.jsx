import React from "react";
import { Link } from "react-router-dom";
import "./HomeNavbar.css"; // add stylesheet

export default function HomeNavbar() {
    return (
        <nav className="home-navbar">
            <div className="logo-section">
                <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                <div className="logo">PureHarvest</div>
            </div>

            <div className="menu">
                <a href="#features">Features</a>
                <a href="#how">How It Works</a>
                <a href="#benefits">Benefits</a>
            </div>


        </nav>
    );
}
