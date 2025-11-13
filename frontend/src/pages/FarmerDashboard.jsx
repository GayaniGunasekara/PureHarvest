import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import './FarmerDashboard.css';
import FarmerNavbar from '../components/FarmerNavbar';
// --- MOCK DATA for the visual elements ---
const mockFarmer = {
    username: 'gayanigunasekara2001',
    isCertified: true,
    location: 'Colombo',
    rating: 4.5,
    totalProducts: 1,
    activeOrders: 2,
    ratingStars: 1 // Assuming 1 gold star for simplicity
};

const mockProducts = [
    {
        id: 1,
        title: 'Organic Tomatoes',
        description: 'Fresh, vine-ripened organic tomatoes',
        price: '450',
        unit: 'kg',
        quantity: '50', // Stock
        category: 'Vegetables',
    },
    // Add more products here if needed
];

// --- Component Start ---
export default function FarmerDashboard() {
    // State for API interaction (kept from your original code)
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [products, setProducts] = useState(mockProducts); // Using mock data initially
    const [orders, setOrders] = useState([]);
    const [driverId, setDriverId] = useState('');
    const [activeTab, setActiveTab] = useState('Products'); // New state for tab control
    const [showModal, setShowModal] = useState(false); // New state for Add Product Modal

    // useEffect(() => { load(); }, []); // Uncomment this block when integrating API
    // const load = async () => {
    //     const [pRes, oRes] = await Promise.all([api.get('/products/mine'), api.get('/orders/owner')]);
    //     setProducts(pRes.data);
    //     setOrders(oRes.data);
    // };

    const createProduct = async () => {
        // Your original logic for creating a product
        // await api.post('/products', { title, description: desc, price, quantity: qty });
        console.log('Creating Product:', { title, desc, price, qty });
        // setTitle(''); setDesc(''); setPrice(''); setQty('');
        // load(); 
        setShowModal(false); // Close modal on success
    };

    const assignDriver = async (orderId) => {
        // Your original logic for assigning a driver
        // if (!driverId) { alert('Set driverId'); return; }
        // await api.post('/orders/assign-driver', { orderId, driverId });
        // load();
        console.log(`Assigning driver ${driverId} to order ${orderId}`);
    };

    // --- Render Functions (Stats Cards, Product Card, Modal, Orders Tab - Unchanged) ---

    const renderStatsCards = () => (
        <div className="stats-grid">
            {/* Total Products Card */}
            <div className="stat-card">
                <div className="stat-content">
                    <span className="stat-label">Total Products</span>
                    <span className="stat-value">{mockFarmer.totalProducts}</span>
                </div>
                <div className="stat-icon-box green"><span role="img" aria-label="package">📦</span></div>
            </div>

            {/* Active Orders Card */}
            <div className="stat-card">
                <div className="stat-content">
                    <span className="stat-label">Active Orders</span>
                    <span className="stat-value">{mockFarmer.activeOrders}</span>
                </div>
                <div className="stat-icon-box blue"><span role="img" aria-label="truck">🚚</span></div>
            </div>

            {/* Rating Card */}
            <div className="stat-card">
                <div className="stat-content">
                    <span className="stat-label">Rating</span>
                    <span className="stat-value">{mockFarmer.rating}</span>
                </div>
                <div className="stat-icon-box yellow">
                    <span role="img" aria-label="star">⭐</span>
                </div>
            </div>

            {/* Location Card */}
            <div className="stat-card">
                <div className="stat-content">
                    <span className="stat-label">Location</span>
                    <span className="stat-value">{mockFarmer.location}</span>
                </div>
                <div className="stat-icon-box red"><span role="img" aria-label="location">📍</span></div>
            </div>
        </div>
    );

    const renderProductCard = (product) => (
        <div key={product.id} className="product-card">
            <div className="product-image-placeholder">
                {/*  (Placeholder for a product image) */}
            </div>
            <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-info-row">
                    <span className="info-label">Price</span>
                    <span className="info-value">Rs. {product.price}/{product.unit}</span>
                </div>
                <div className="product-info-row">
                    <span className="info-label">Stock</span>
                    <span className="info-value">{product.quantity} {product.unit}</span>
                </div>
                <div className="product-info-row">
                    <span className="info-label">Category</span>
                    <span className="category-tag">{product.category}</span>
                </div>
            </div>
        </div>
    );

    const renderAddProductModal = () => (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Add New Product</h3>
                <input placeholder="Title (e.g., Organic Tomatoes)" value={title} onChange={e => setTitle(e.target.value)} required />
                <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
                <input type="number" placeholder="Price (Rs.)" value={price} onChange={e => setPrice(e.target.value)} required />
                <input type="number" placeholder="Stock Quantity (kg/units)" value={qty} onChange={e => setQty(e.target.value)} required />
                <button className="add-product-modal-btn" onClick={createProduct}>Save Product</button>
            </div>
        </div>
    );

    const renderOrdersTab = () => (
        <div className="tab-content orders-content">
            <input placeholder="Driver ID to assign" value={driverId} onChange={e => setDriverId(e.target.value)} className="driver-id-input" />
            <div className="order-list">
                {orders.length > 0 ? orders.map(o => (
                    <div key={o.id} className="order-row-item">
                        <p>Order: {o.id} | Status: {o.status} | Customer: {o.customer_name}</p>
                        <p>Product: {o.product_id} | Qty: {o.qty}</p>
                        <button className="assign-driver-btn" onClick={() => assignDriver(o.id)}>Assign Driver</button>
                    </div>
                )) : <p>No active orders for your products.</p>}
            </div>
        </div>
    );


    return (
        <div className="dashboard-container">
            {/* 1. Header (Now imported as a separate component) */}
            <FarmerNavbar
                username={mockFarmer.username}
                isCertified={mockFarmer.isCertified}
            />

            {/* 2. Stats Cards */}
            {renderStatsCards()}

            {/* 3. Main Content Area */}
            <main className="main-content">

                {/* Tabs */}
                <div className="tab-navigation">
                    <button
                        className={`tab-btn ${activeTab === 'Products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Products')}
                    >
                        My Products
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'Orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Orders')}
                    >
                        Orders
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'Drivers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Drivers')}
                    >
                        Find Drivers
                    </button>
                </div>

                <h2 className="section-heading">
                    {activeTab === 'Products' ? 'Product Listings' : activeTab === 'Orders' ? 'Current Orders' : 'Available Drivers'}
                </h2>

                {activeTab === 'Products' && (
                    <div className="products-section">
                        {/* Add Product Button (matches design) */}
                        <button className="add-product-btn" onClick={() => setShowModal(true)}>
                            + Add Product
                        </button>

                        <div className="product-listings-grid">
                            {/* Render Products */}
                            {products.map(renderProductCard)}
                        </div>
                    </div>
                )}

                {activeTab === 'Orders' && renderOrdersTab()}
                {activeTab === 'Drivers' && <div className="tab-content">Driver search content goes here...</div>}
            </main>

            {/* Add Product Modal */}
            {showModal && renderAddProductModal()}
        </div>
    );
}