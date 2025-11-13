import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';
import "./RoleNav.css"; // Assuming this CSS file contains the necessary styles

// Define the component, accepting only the props needed for the Farmer view
export default function FarmerNavbar({ username, isCertified }) {
    const navigate = useNavigate();

    // Define handleLogout internally, as this component owns the navigation logic
    const handleLogout = () => {
        // Clear authentication token
        // removeToken(); // Uncomment when integrated with auth utility

        // Navigate to the login page or home page
        navigate('/login');

        // Optional: force a reload to ensure all state is cleared
        // window.location.reload(); 
    };

    return (
        <header className="dashboard-header-container">

            {/* --- LEFT SECTION: Logo and Title --- */}
            <div className="header-left-section">
                <div className="logo-section">
                    <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                    <div className="logo">PureHarvest</div>
                </div>
            </div>
            <div className="title-and-profile">
                <h1 className="header-title">Farmer Dashboard</h1>
            </div>

            {/* --- RIGHT SECTION: Profile Info and Logout --- */}
            <div className="profile-info">

                {/* Username and Certified Tag */}
                <span className="username">{username}</span>
                {isCertified && <span className="certified-tag">⭐ Certified</span>}

                {/* Logout Button: Uses the internal handleLogout function */}
                <button className="logout-btn-styled" onClick={handleLogout}>
                    <span role="img" aria-label="logout arrow">⇥</span> Logout
                </button>
            </div>

        </header>
    );
}