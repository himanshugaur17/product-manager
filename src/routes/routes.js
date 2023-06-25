const express = require('express');
const router = express.Router()
const { createProduct, getProduct, updateProduct, filterProducts, bulkUpload, deleteProduct } = require('../controllers/productMgrController.js');
router.route('/product').post(createProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').get(getProduct)
router.route('/products/:id').patch(updateProduct)
router.route('/products').get(filterProducts)
router.route('/products/bulkUpload').post(bulkUpload)
module.exports = router;