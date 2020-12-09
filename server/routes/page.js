const express = require('express');
const router = express.Router();

const pageController = require('../controllers/page');

router.get('/products/filtered', pageController.getProductsFiltered);

router.get('/products/:id', pageController.getProductFiltered);

router.get('/info', pageController.getInfo);

router.get('/gallery', pageController.getGallery);

module.exports = router;
