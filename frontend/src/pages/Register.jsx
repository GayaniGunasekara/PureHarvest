import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Farmer');
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setErr('');
        try {
            const res = await api.post('/auth/register', { name, email, password, role });
            setToken(res.data.token);
            nav(`/${role}`);
            window.location.reload();
        } catch (error) {
            setErr(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form className="form card" onSubmit={submit}>
            <h2>Register</h2>
            {err && <div className="error">{err}</div>}
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option>Farmer</option>
                <option>FertilizerSeller</option>
                <option>Customer</option>
                <option>Driver</option>
            </select>
            <button type="submit" className="btn">Register</button>
        </form>
    );
}
