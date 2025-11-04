import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function RoleNav({ user }) {
    const nav = useNavigate();
    const logout = () => { removeToken(); nav('/'); };
    return (
        <nav style={{ padding: 10, borderBottom: '1px solid #ddd' }}>
            <Link to="/">Home</Link> {' | '}
            {!user && <>
                <Link to="/login">Login</Link> {' | '}
                <Link to="/register">Register</Link>
            </>}
            {user && <>
                <span style={{ marginLeft: 12 }}>Hi {user.name} ({user.role})</span>
                <Link style={{ marginLeft: 10 }} to={`/${user.role}`}>Dashboard</Link>
                <button style={{ marginLeft: 10 }} onClick={logout}>Logout</button>
            </>}
        </nav>
    );
}
