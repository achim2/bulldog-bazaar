const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const productController = require('../controllers/product');
const productValidation = require('../validation/product');

router.get('/', adminController.getIndex);

router.post('/add-product', productValidation.addProduct, adminController.postAddProduct);

router.get('/products', productController.getProducts);

router.get('/edit-product/:id', productController.getProduct);

router.post('/edit-product', productValidation.addProduct, adminController.postEditProduct);

router.post('/update-product-images', adminController.postUpdateProductImages);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
