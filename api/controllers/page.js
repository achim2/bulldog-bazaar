const Product = require('../models/product');
const Info = require('../models/info');
const Gallery = require('../models/gallery');

exports.getProductsFiltered = (req, res, next) => {
  const limit = req.params.limit ? parseInt(req.params.limit) : 0;

  Product.find().limit(limit)
    .then(products => {
      const filteredProducts = products.filter(product => product.status);

      res
        .status(200)
        .json(filteredProducts);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProductFiltered = (req, res, next) => {
  const id = req.params.id;

  Product
    // .findById(id)
    .find({ slug: id })
    .then(product => {
      product = product.find(x => x !== undefined);

      if (!product) {
        const error = new Error('Product not found!');
        error.statusCode = 404;
        throw error;
      }

      if (!product.status) {
        const error = new Error('Product not allowed!');
        error.statusCode = 404;
        throw error;
      }

      res
        .status(200)
        .json(product);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getInfo = (req, res, next) => {
  Info.findOne()
    .then(info => {
      res
        .status(200)
        .json(info);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getGallery = (req, res, next) => {
  Gallery
    .find()
    .then(images => {
      if (!images) {
        const error = new Error('Image not found!');
        error.statusCode = 404;
        throw error;
      }

      res
        .status(200)
        .json(images);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
