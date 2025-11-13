import React, { useState, useEffect } from 'react';
import './CustomerDashboard.css';
import api from '../utils/api';
// CustomerDashboard.jsx
import CustomerNavbar from '../components/CustomerNavbar';

// --- MOCK DATA for the product listings ---
const mockProducts = [
    // ... (mockProducts array remains unchanged)
    { id: 1, title: 'Organic Tomatoes', description: 'Fresh, vine-ripened organic tomatoes', price: 450, unit: 'kg', location: 'Colombo', seller: 'Sunil Farm', rating: 4.8, category: 'Vegetables', isFertilizer: false, image: 'truck' },
    { id: 2, title: 'Organic Beans', description: 'Fresh, high-quality organic long beans', price: 350, unit: 'kg', location: 'Kandy', seller: 'Ranjith Gardens', rating: 4.5, category: 'Vegetables', isFertilizer: false, image: 'beans' },
    { id: 3, title: 'Organic Compost', description: 'Premium quality organic compost', price: 850, unit: 'kg', location: 'Galle', seller: 'EcoFert Solutions', rating: 4.9, category: 'Fertilizers', isFertilizer: true, image: 'tractor' },
];

const categories = ['All Categories', 'Vegetables', 'Fruits', 'Fertilizers', 'Grains'];

// --- Component Start ---
export default function CustomerDashboard() {
    const [activeTab, setActiveTab] = useState('Browse Products');
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('10000');

    // ... (renderProductCard, renderBrowseProducts, renderMyOrders functions remain unchanged)

    const renderProductCard = (product) => (
        <div key={product.id} className="product-card">
            <div className={`product-card-image ${product.image}`}>
                {/* Placeholder for actual image */}
                {product.isFertilizer && <span className="fertilizer-tag">Fertilizer</span>}
            </div>
            <div className="product-card-body">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-price-row">
                    <span className="price-text">Rs. {product.price}/{product.unit}</span>
                    <span className="category-tag">{product.category}</span>
                </div>

                <div className="product-location-row">
                    <span className="location-text">📍 {product.location}</span>
                    <span className="rating-text">⭐ {product.rating}</span>
                </div>

                <p className="seller-text">Seller: {product.seller}</p>

                <button className="add-to-cart-btn">
                    <span role="img" aria-label="cart">🛒</span> Add to Cart
                </button>
            </div>
        </div>
    );

    const renderBrowseProducts = () => (
        <div className="browse-products-content">
            {/* Find Organic Products Section */}
            <h2 className="section-title">Find Organic Products</h2>

            <div className="search-container">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search by product name, farmer name, or city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-row">
                    <div className="filter-group">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="filter-group price-group">
                        <label>Min Price (Rs.)</label>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    </div>

                    <div className="filter-group price-group">
                        <label>Max Price (Rs.)</label>
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                </div>
            </div>

            {/* Product Listings Grid */}
            <div className="product-grid">
                {mockProducts.map(renderProductCard)}
            </div>
        </div>
    );

    const renderMyOrders = () => (
        <div className="my-orders-content">
            <p>Your order history and tracking will appear here.</p>
        </div>
    );

    return (
        // Use a Fragment (<>) to return multiple top-level elements (Navbar and Container)
        <>
            {/* 💡 INSERTED NAVBAR HERE 💡 */}
            <CustomerNavbar
                userType="customer"
                username="Gayani Gunasekara"
                onLogout={() => console.log('Logout action')}
                onCartClick={() => console.log('Cart action')}
            />

            <div className="customer-dashboard-container">
                {/* Tab Navigation */}
                <div className="dashboard-tabs">
                    <button
                        className={`tab-item ${activeTab === 'Browse Products' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Browse Products')}
                    >
                        Browse Products
                    </button>
                    <button
                        className={`tab-item ${activeTab === 'My Orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('My Orders')}
                    >
                        My Orders
                    </button>
                </div>

                {/* Main Content */}
                <main className="dashboard-main-content">
                    {activeTab === 'Browse Products' && renderBrowseProducts()}
                    {activeTab === 'My Orders' && renderMyOrders()}
                </main>
            </div>
        </>
    );
}