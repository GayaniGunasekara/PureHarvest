// orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const orderCtrl = require('../controllers/orderController');

// create order (customer)
router.post('/', auth, role(['Customer']), orderCtrl.createOrder);

// customer's own orders
router.get('/my', auth, role(['Customer']), orderCtrl.customerOrders);

// owner (Farmer or FertilizerSeller) view orders that include their items
router.get('/owner', auth, role(['Farmer', 'FertilizerSeller']), orderCtrl.ownerOrders);

// owner assigns driver
router.post('/assign-driver', auth, role(['Farmer', 'FertilizerSeller']), orderCtrl.assignDriver);

// driver endpoints
router.get('/driver', auth, role(['Driver']), orderCtrl.driverOrders);
router.post('/driver/update-status', auth, role(['Driver']), orderCtrl.updateOrderStatus);

module.exports = router;
