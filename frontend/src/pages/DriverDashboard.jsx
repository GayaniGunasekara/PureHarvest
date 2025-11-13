import React, { useState } from 'react';
import DriverNavbar from '../components/DriverNavbar';
import './DriverDashboard.css';



// --- MOCK DATA ---
const mockKpis = [
    { label: 'Pending Requests', value: 1, icon: '📦', class: 'pending-icon' },
    { label: 'Active Deliveries', value: 1, icon: '🚚', class: 'active-icon' },
    { label: 'Completed Today', value: 0, icon: '✅', class: 'completed-icon' },
    { label: 'Earnings Today', value: 'Rs. 0', icon: '💰', class: 'earnings-icon' },
];

const mockDelivery = {
    id: 'DEL001',
    status: 'pending',
    payment: 500,
    pickupName: 'Sunil Farm',
    pickupAddress: '123 Farm Road, Colombo 07',
    deliverToName: 'Sarah Johnson',
    deliverToAddress: '456 Main Street, Colombo 03',
    items: 'Organic Tomatoes (5kg)',
    distance: '5.2 km',
};

// --- Component Start ---
export default function DriverDashboard() {
    const [activeTab, setActiveTab] = useState('New Requests');
    // Using a mock username for the Navbar
    const mockUsername = 'gayani.gunasekara2001';

    // Helper function to render the KPI cards
    const renderKpiCard = (kpi, index) => (
        <div key={index} className="kpi-card">
            <div>
                <div className="kpi-value">{kpi.value}</div>
                <p className="kpi-label">{kpi.label}</p>
            </div>
            <span className={`kpi-icon ${kpi.class}`} role="img" aria-label={kpi.label}>
                {kpi.icon}
            </span>
        </div>
    );

    // Helper function to render a single delivery request card
    const renderDeliveryCard = (delivery) => (
        <div className="delivery-card">
            <div className="delivery-header">
                <div className="delivery-id">
                    Delivery #{delivery.id}
                    <span className="pending-tag">{delivery.status}</span>
                </div>
                <div className="payment-info">
                    <p className="payment-label">Payment</p>
                    <span className="payment-text">Rs. {delivery.payment}</span>
                </div>
            </div>

            <div className="address-row">
                <div className="address-group">
                    <h4><span role="img" aria-label="pin">📍</span> Pick up from:</h4>
                    <p>{delivery.pickupName}</p>
                    <p>{delivery.pickupAddress}</p>
                </div>
                <div className="address-group">
                    <h4><span role="img" aria-label="truck">✅</span> Deliver to:</h4>
                    <p>{delivery.deliverToName}</p>
                    <p>{delivery.deliverToAddress}</p>
                </div>
            </div>

            <div className="items-row">
                <div className="items-group">
                    <p className="items-label">Items</p>
                    <p className="items-list-text">{delivery.items}</p>
                </div>
                <div className="distance-group">
                    <p className="distance-label">Distance</p>
                    <p className="distance-value">{delivery.distance}</p>
                </div>
            </div>

            {/* Action Button - only shown for New Requests */}
            {activeTab === 'New Requests' && (
                <button className="accept-button" onClick={() => console.log(`Accepted delivery ${delivery.id}`)}>
                    Accept Delivery Request
                </button>
            )}
        </div>
    );


    // Main render function based on the active tab
    const renderActiveContent = () => {
        switch (activeTab) {
            case 'New Requests':
                // Display pending requests card
                return renderDeliveryCard(mockDelivery);
            case 'Active Deliveries':
                return <p className="p-4 text-gray-600">You have no active deliveries currently.</p>;
            case 'Completed':
                return <p className="p-4 text-gray-600">No deliveries completed today.</p>;
            default:
                return null;
        }
    };


    return (
        // Use a Fragment to include the Navbar outside the main container
        <>
            <DriverNavbar username={mockUsername} />

            <div className="driver-dashboard-container">

                {/* 4 KPI Cards */}
                <div className="kpi-cards-grid">
                    {mockKpis.map(renderKpiCard)}
                </div>

                {/* Tab Navigation */}
                <div className="delivery-tabs">
                    {['New Requests (1)', 'Active Deliveries (1)', 'Completed (0)'].map(tab => {
                        const tabName = tab.split(' ')[0]; // Extract 'New', 'Active', 'Completed'
                        const isActive = activeTab === tabName;
                        return (
                            <button
                                key={tab}
                                className={`tab-item ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveTab(tabName)}
                            >
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {/* Main Content Area */}
                <main className="dashboard-main-content">
                    {renderActiveContent()}
                </main>
            </div>
        </>
    );
}