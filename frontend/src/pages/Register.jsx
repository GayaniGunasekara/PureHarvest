import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
// import { setToken } from '../utils/auth'; // Not needed if redirecting to login
import './RegisterLogin.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    // Start with 'Customer' as seen in the image, but use 'Farmer' if your backend prefers it
    const [role, setRole] = useState('Customer');
    const [err, setErr] = useState('');
    const nav = useNavigate();

    // The select options based on your original code
    const roleOptions = ['Customer', 'Farmer', 'FertilizerSeller', 'Driver'];

    // Determine the user role selected in the dropdown (defaults to Customer)
    const displayRole = roleOptions.includes(role) ? role : 'Customer';

    const submit = async (e) => {
        e.preventDefault();
        setErr('');

        // NOTE: Ensure your API endpoint can handle the 'phone' and 'city' fields
        // if you want them registered. I'm including them in the console log payload 
        // for context, but the API call itself still only uses name, email, password, and role 
        // based on your original backend setup.

        try {
            // API call to register the user
            const res = await api.post('/auth/register', {
                name,
                email,
                password,
                role
            });

            // Log successful registration data (optional)
            console.log('Registration Successful:', res.data);

            // 1. **Crucial Change**: Navigate to the login page after successful registration
            nav('/login');

            // 2. Clear form state (optional but good practice)
            setName('');
            setEmail('');
            setPassword('');
            setPhone('');
            setCity('');
            setRole('Customer');

        } catch (error) {
            // Display error message
            setErr(error.response?.data?.message || 'Registration failed. Please check your details.');
        }
    };

    return (
        <div className="register-page-container">
            <div className="back-to-home">
                <a href="/"><span role="img" aria-label="back arrow">←</span> Back to Home</a>
            </div>

            <form className="register-form-card" onSubmit={submit}>
                <div className="logo-section">
                    <img src="/logo.png" alt="PureHarvest Logo" className="logo-image" />
                    <div className="logo">PureHarvest</div>
                </div>

                <p className="subtitle">Join PureHarvest - Create an account to get started</p>

                {/* Login/Sign Up Tabs - Add nav handler to Login button */}
                <div className="auth-tabs">
                    <button type="button" className="tab-button login-button" onClick={() => nav('/login')}>Login</button>
                    <button type="button" className="tab-button signup-button active">Sign Up</button>
                </div>

                {/* Error message display */}
                {err && <div className="error-message">{err}</div>}

                {/* I want to join as dropdown */}
                <div className="input-group">
                    <label className="input-label" htmlFor="role-select">I want to join as</label>
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

                {/* Full Name Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="full-name">Full Name</label>
                    <input
                        id="full-name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                    />
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

                {/* Phone Number Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="phone">Phone Number</label>
                    <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="+94 77 123 4567"
                        required
                    />
                </div>

                {/* City Input */}
                <div className="input-group">
                    <label className="input-label" htmlFor="city">City</label>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="Colombo"
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

                {/* Create Account Button */}
                <button type="submit" className="create-account-btn">
                    Create Account
                </button>
            </form>
        </div>
    );
}