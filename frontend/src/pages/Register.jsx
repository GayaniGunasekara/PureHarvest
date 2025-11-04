import React, { useState } from 'react';
import api from '../api';
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
        try {
            const res = await api.post('/auth/register', { name, email, password, role });
            setToken(res.data.token);
            nav(`/${role}`);
        } catch (err) {
            setErr(err.response?.data?.message || 'Failed');
        }
    };

    return (
        <form onSubmit={submit} style={{ padding: 20 }}>
            <h2>Register</h2>
            {err && <div style={{ color: 'red' }}>{err}</div>}
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" /><br />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option>Farmer</option>
                <option>FertilizerSeller</option>
                <option>Customer</option>
                <option>Driver</option>
            </select><br />
            <button type="submit">Register</button>
        </form>
    );
}
