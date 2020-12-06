const Product = require('../models/product');
const Info = require('../models/info');

exports.getProductsFiltered = (req, res, next) => {
  Product.find()
    .then(products => {
      let filteredProducts = [];
      for (let product of products) {
        product.images = product.images.find(img => img.selected);
        filteredProducts.push(product)
      }

      filteredProducts = filteredProducts.filter(product => product.status);

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
    .find({ name: id })
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
        .json(info)
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
