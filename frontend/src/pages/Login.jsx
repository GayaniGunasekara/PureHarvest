import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Farmer');
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password, role });
            setToken(res.data.token);
            nav(`/${role}`);
        } catch (err) {
            setErr(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={submit} style={{ padding: 20 }}>
            <h2>Login</h2>
            {err && <div style={{ color: 'red' }}>{err}</div>}
            <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option>Farmer</option>
                <option>FertilizerSeller</option>
                <option>Customer</option>
                <option>Driver</option>
            </select><br />
            <button type="submit">Login</button>
        </form>
    );
}
