const express = require('express');
const router = express.Router();

const productController = require('../controllers/product');

router.get('/filtered', productController.getProductsFiltered);

router.get('/:id', productController.getProductFiltered);

module.exports = router;
