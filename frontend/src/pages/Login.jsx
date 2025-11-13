import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';
import './RegisterLogin.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Defaulting to 'Customer' as seen in the image, but initialized to 'Farmer' in your original code.
    const [role, setRole] = useState('Customer');
    const [err, setErr] = useState('');
    const nav = useNavigate();

    // The select options are based on your original code
    const roleOptions = ['Customer', 'Farmer', 'FertilizerSeller', 'Driver'];

    // Determine the user role selected in the dropdown (defaults to Customer)
    const displayRole = roleOptions.includes(role) ? role : 'Customer';

    const submit = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            const res = await api.post('/auth/login', { email, password, role });
            // Set the token upon successful login
            setToken(res.data.token);
            // Navigate to the role-specific dashboard
            nav(`/${role}`);
            // Force a reload to pick up the token/auth state change
            window.location.reload();
        } catch (error) {
            setErr(error.response?.data?.message || 'Login failed. Please check your credentials and role.');
        }
    };

    return (
        // The container class is reused from Register.css
        <div className="register-page-container">
            <div className="back-to-home">
                <a href="/"><span role="img" aria-label="back arrow">←</span> Back to Home</a>
            </div>

            {/* The form card class is reused */}
            <form className="register-form-card" onSubmit={submit}>
                <div className="logo-section">
                    <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                    <div className="logo">PureHarvest</div>
                </div>

                {/* Welcome Back text */}
                <h2 className="welcome-message">Welcome Back</h2>
                <p className="subtitle">Sign in to your account to continue</p>

                {/* Login/Sign Up Tabs - Login is active */}
                <div className="auth-tabs">
                    {/* Active Tab */}
                    <button type="button" className="tab-button login-button active" onClick={() => nav('/login')}>Login</button>
                    {/* Inactive Tab, navigates to registration page */}
                    <button type="button" className="tab-button signup-button" onClick={() => nav('/register')}>Sign Up</button>
                </div>

                {/* Error message display */}
                {err && <div className="error-message">{err}</div>}

                {/* I am a dropdown */}
                <div className="input-group">
                    <label className="input-label" htmlFor="role-select">I am a</label>
                    <select
                        id="role-select"
                        className="role-select"
                        value={displayRole}
                        onChange={e => setRole(e.target.value)}
                    >
                        {roleOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                {/* Email Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="********"
                        required
                    />
                </div>

                {/* Sign In Button (Reusing the create-account-btn class for style) */}
                <button type="submit" className="create-account-btn">
                    Sign In
                </button>
            </form>
        </div>
    );
}