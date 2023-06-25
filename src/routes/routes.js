const express = require('express');
const router = express.Router()
const productBodyValidator = require('../validators/productBody.js');
const { createProduct, getProduct, updateProduct, filterProducts, bulkUpload, deleteProduct } = require('../controllers/productMgrController.js');
router.route('/product').post(productBodyValidator, createProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').get(getProduct)
router.route('/products/:id').patch(updateProduct)
router.route('/products/filter').post(filterProducts)
router.route('/products/bulkUpload').post(bulkUpload)
module.exports = router;