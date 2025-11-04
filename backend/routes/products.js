// products.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { createProduct, listPublic, listOwnerProducts } = require('../controllers/productController');

router.get('/', listPublic); // public
// create product: only Farmer or FertilizerSeller
router.post('/', auth, role(['Farmer', 'FertilizerSeller']), createProduct);
router.get('/mine', auth, role(['Farmer', 'FertilizerSeller']), listOwnerProducts);

module.exports = router;
