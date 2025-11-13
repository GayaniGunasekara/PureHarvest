import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth'; // Assuming you have a utility to remove token
import "./RoleNav.css";



// Define the component, accepting farmer info and other necessary props
export default function FarmerNavbar({ username, isCertified }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication token
        // removeToken(); // Uncomment when integrated with auth utility

        // Navigate to the login page or home page
        navigate('/login');

        // Optional: force a reload to ensure all state is cleared
        window.location.reload();
    };

    return (
        <header className="dashboard-header-container">
            <div className="header-left-section">
                <div className="logo-section">
                    <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                    <div className="logo">PureHarvest</div>
                </div>
            </div>
            <div className="title-and-profile">
                <h1 className="header-title">Farmer Dashboard</h1>
            </div>

            <div className="profile-info">
                <span className="username">{username}</span>
                {isCertified && <span className="certified-tag">⭐ Certified</span>}

                <button className="logout-btn-styled" onClick={handleLogout}>
                    <span role="img" aria-label="logout arrow">⇥</span> Logout
                </button>
            </div>
        </header>
    );
}