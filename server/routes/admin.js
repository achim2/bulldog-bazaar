const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const productValidation = require('../validation/product');

router.get('/', adminController.getIndex);

router.post('/add-product', productValidation.addProduct, adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:id', adminController.getProduct);

router.post('/edit-product', productValidation.addProduct, adminController.postEditProduct);

router.post('/change-status', adminController.postChangeStatus);

router.post('/update-product-images', adminController.postUpdateProductImages);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
