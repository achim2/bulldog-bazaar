const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/', productController.getProducts);

router.get('/filtered', productController.getProductsFiltered);

router.get('/:id', productController.getProduct);

module.exports = router;
