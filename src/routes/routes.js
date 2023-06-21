const express = require('express');
const router = express.Router();
const controller = require('../controllers/productMgrController.js')
router.route('/product').post(controller.createProduct);
router.route('/products/:id').get(controller.getProduct)
router.route('products/:id').patch(controller.updateProduct)
router.route('products').get(controller.filterProducts)