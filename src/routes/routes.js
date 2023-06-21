import { Router } from 'express';
const router = Router();
import { createProduct, getProduct, updateProduct, filterProducts } from '../controllers/productMgrController.js';
router.route('/product').post(createProduct);
router.route('/products/:id').get(getProduct)
router.route('products/:id').patch(updateProduct)
router.route('products').get(filterProducts)