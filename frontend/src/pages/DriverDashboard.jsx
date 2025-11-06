import React, { useEffect, useState } from 'react';
import api from '../utils/api';

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
        <div className="container">
            <h2>Driver Dashboard</h2>
            <div className="list card">
                {orders.length === 0 && <div>No orders assigned</div>}
                {orders.map(o => (
                    <div key={o.id} className="order-row">
                        <div>Order: {o.id} | Status: {o.status} | Total: {o.total}</div>
                        <div className="controls">
                            <button className="btn" onClick={() => updateStatus(o.id, 'OnTheWay')}>On The Way</button>
                            <button className="btn" onClick={() => updateStatus(o.id, 'Delivered')}>Delivered</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
