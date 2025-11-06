import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function FarmerDashboard() {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [driverId, setDriverId] = useState('');

    useEffect(() => { load(); }, []);
    const load = async () => {
        const [pRes, oRes] = await Promise.all([api.get('/products/mine'), api.get('/orders/owner')]);
        setProducts(pRes.data);
        setOrders(oRes.data);
    };

    const create = async () => {
        await api.post('/products', { title, description: desc, price, quantity: qty });
        setTitle(''); setDesc(''); setPrice(''); setQty('');
        load();
    };

    const assignDriver = async (orderId) => {
        if (!driverId) { alert('Set driverId'); return; }
        await api.post('/orders/assign-driver', { orderId, driverId });
        load();
    };

    return (
        <div className="container">
            <h2>Farmer Dashboard</h2>

            <div className="card">
                <h3>Create Product</h3>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Desc" value={desc} onChange={e => setDesc(e.target.value)} />
                <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
                <input placeholder="Qty" value={qty} onChange={e => setQty(e.target.value)} />
                <button className="btn" onClick={create}>Create</button>
            </div>

            <div className="grid">
                <div className="card list">
                    <h3>Your Products</h3>
                    {products.map(p => <div key={p.id}>{p.title} - {p.price} (qty {p.quantity})</div>)}
                </div>

                <div className="card list">
                    <h3>Orders for your items</h3>
                    <input placeholder="Driver id to assign" value={driverId} onChange={e => setDriverId(e.target.value)} />
                    {orders.map(o => (
                        <div key={o.id} className="order-row">
                            <div>Order: {o.id} | Status: {o.status} | Customer: {o.customer_name}</div>
                            <div>ProductId: {o.product_id} | qty: {o.qty}</div>
                            <button className="btn" onClick={() => assignDriver(o.id)}>Assign Driver</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
