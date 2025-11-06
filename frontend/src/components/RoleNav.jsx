// src/components/RoleNav.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, getUserFromToken } from '../utils/auth';

export default function RoleNav({ user: propUser }) {
    const nav = useNavigate();

    const logout = () => {
        // remove token locally; backend logout (revoke) is optional
        removeToken();
        // If your backend implements token blacklisting, call /auth/logout here.
        // Example:
        // api.post('/auth/logout'); // (requires server side /auth/logout endpoint)
        nav('/');
        window.location.reload();
    };

    const user = propUser || getUserFromToken();

    return (
        <nav className="role-nav">
            <div className="role-nav-inner">
                <div className="left">
                    <Link to="/" className="brand">PureHarvest</Link>
                </div>
                <div className="right">
                    {!user && <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>}
                    {user && <>
                        <span className="greeting">Hi {user.name || user.email} ({user.role})</span>
                        <Link to={`/${user.role}`}>Dashboard</Link>
                        <button className="btn-logout" onClick={logout}>Logout</button>
                    </>}
                </div>
            </div>
        </nav>
    );
}
