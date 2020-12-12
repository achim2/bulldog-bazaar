const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');
const pageController = require('../controllers/page');
const productValidation = require('../validation/product');

router.get('/', adminController.getIndex);

router.post('/add-product', productValidation.addProduct, adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:id', adminController.getProduct);

router.post('/edit-product', productValidation.addProduct, adminController.postEditProduct);

router.post('/change-status', adminController.postChangeStatus);

router.post('/update-product-images', adminController.postUpdateProductImages);

router.post('/update-product-image-index', adminController.postUpdateProductImageIndex);

router.post('/delete-product-image', adminController.postDeleteProductImage);

router.post('/delete-product', adminController.postDeleteProduct);

router.post('/info', adminController.postSetInfo);

router.post('/update-gallery', adminController.postUpdateGallery);

router.post('/delete-gallery-image', adminController.postDeleteGalleryImage);

router.post('/update-gallery-image-index', adminController.postUpdateGalleryImageIndex);

router.get('/gallery', pageController.getGallery);

module.exports = router;
