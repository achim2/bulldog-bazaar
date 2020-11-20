const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const productValidation = require('../validation/product')

router.get('/', adminController.getIndex);

router.post('/add-product', productValidation.addProduct, adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:id', adminController.getEditProduct);

router.post('/edit-product', productValidation.addProduct, adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
