import React, { useState, useEffect } from 'react';
import api from '../utils/api';

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
        <div className="container">
            <h2>Customer Dashboard</h2>
            <div className="search-row">
                <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" />
                <button onClick={fetchProducts} className="btn">Search</button>
            </div>

            <div className="grid">
                <div className="card list">
                    <h3>Products</h3>
                    {products.map(p => (
                        <div key={p.id} className="product-row">
                            <div>
                                <strong>{p.title}</strong> - {p.price}
                                <div className="small">By: {p.owner_name}</div>
                            </div>
                            <div>
                                <button className="btn" onClick={() => addToCart(p)}>Add</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card side">
                    <h3>Cart</h3>
                    {cart.length === 0 && <div>No items</div>}
                    {cart.map(c => (
                        <div key={c.product_id} className="cart-row">{c.product_id} x {c.qty}</div>
                    ))}
                    <button onClick={placeOrder} disabled={!cart.length} className="btn">Place Order</button>
                </div>
            </div>
        </div>
    );
}
