import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth'; // Assuming you have a utility to remove token
import "./RoleNav.css";
// ...
/**
 * Navigation Bar for the Driver Dashboard.
 * Includes status toggle and logout functionality.
 */
export default function DriverNavbar({ username }) {
    // State to manage the driver's availability status (Available/Offline)
    const [isAvailable, setIsAvailable] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('Driver logged out.');
        // In a real app, you would clear the token here.
        // removeToken(); 
        navigate('/login');
    };

    const toggleStatus = () => {
        setIsAvailable(prev => !prev);
        // In a real application, this would trigger an API call to update the driver's status
        console.log(`Driver status changed to: ${!isAvailable ? 'Available' : 'Offline'}`);
    };

    const statusText = isAvailable ? 'Available' : 'Offline';
    const statusClass = isAvailable ? 'status-available' : 'status-offline';

    return (
        <header className="dashboard-header-container">
            <div className="header-left-section">
                <div className="logo-section">
                    <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                    <div className="logo">PureHarvest</div>
                </div>
            </div>
            <div className="title-and-profile">
                <h1 className="header-title">Fertilizer Seller Dashboard</h1>
            </div>



            {/* Right Section: Status and Logout */}
            <div className="profile-info">
                <div>
                    <span className="username">{username}</span>
                </div>
                {/* Status Toggle Button */}
                <button
                    className={`status-btn ${statusClass}`}
                    onClick={toggleStatus}
                    title="Click to change your availability status"
                >
                    Status: {statusText}
                </button>

                {/* Logout Button */}
                <button className="logout-btn-styled" onClick={handleLogout}>
                    <span role="img" aria-label="logout arrow">⇥</span> Logout
                </button>
            </div>
        </header>
    );
}