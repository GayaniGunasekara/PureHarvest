import React, { useState, useEffect } from 'react';
import api from '../api';

export default function CustomerDashboard() {
    const [q, setQ] = useState('');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        const res = await api.get('/products?q=' + encodeURIComponent(q));
        setProducts(res.data);
    };

    const addToCart = (p) => {
        setCart(prev => {
            const found = prev.find(it => it.product_id === p.id);
            if (found) return prev.map(it => it.product_id === p.id ? { ...it, qty: it.qty + 1 } : it);
            return [...prev, { product_id: p.id, qty: 1 }];
        });
    };

    const placeOrder = async () => {
        try {
            const res = await api.post('/orders', { items: cart });
            alert('Order placed: ' + res.data.orderId);
            setCart([]);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Customer Dashboard</h2>
            <div>
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" />
                <button onClick={fetchProducts}>Search</button>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 10 }}>
                <div style={{ flex: 1 }}>
                    <h3>Products</h3>
                    {products.map(p => (
                        <div key={p.id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 6 }}>
                            <strong>{p.title}</strong> - {p.price} <br />
                            <small>By: {p.owner_name}</small><br />
                            <button onClick={() => addToCart(p)}>Add</button>
                        </div>
                    ))}
                </div>
                <div style={{ width: 300 }}>
                    <h3>Cart</h3>
                    {cart.map(c => (
                        <div key={c.product_id}>{c.product_id} x {c.qty}</div>
                    ))}
                    <button onClick={placeOrder} disabled={!cart.length}>Place Order</button>
                </div>
            </div>
        </div>
    );
}
