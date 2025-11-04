import React, { useEffect, useState } from 'react';
import api from '../api';

export default function DriverDashboard() {
    const [orders, setOrders] = useState([]);
    useEffect(() => { load(); }, []);
    const load = async () => {
        const res = await api.get('/orders/driver');
        setOrders(res.data);
    };
    const updateStatus = async (orderId, status) => {
        await api.post('/orders/driver/update-status', { orderId, status });
        load();
    };
    return (
        <div style={{ padding: 20 }}>
            <h2>Driver Dashboard</h2>
            {orders.map(o => (
                <div key={o.id} style={{ border: '1px solid #ddd', padding: 8, margin: 6 }}>
                    <div>Order: {o.id} | Status: {o.status} | Total: {o.total}</div>
                    <button onClick={() => updateStatus(o.id, 'OnTheWay')}>On The Way</button>
                    <button onClick={() => updateStatus(o.id, 'Delivered')}>Delivered</button>
                </div>
            ))}
        </div>
    );
}
