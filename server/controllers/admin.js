const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
  res
    .status(200)
    .json('hello admin')
};

exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(req.body)
  // console.log(req.file)
  // console.log(req.files)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  if (!req.file) {
    const error = new Error('No image provided!');
    error.statusCode = 422;
    throw error;
  }

  const product = new Product({
    userId: req.body.userId,
    name: req.body.name,
    imageUrl: req.file.filename,
    color: req.body.color,
    birthday: req.body.birthday,
    sex: req.body.sex,
    description: req.body.description,
  })

  product
    .save()
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Product created!',
          product: result,
        })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const userId = req.body.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  Product
    .findById(id)
    .then(product => {
      product.userId = userId;
      product.name = req.body.name;
      product.imageUrl = req.body.imageUrl;
      product.color = req.body.color;
      product.birthday = req.body.birthday;
      product.sex = req.body.sex;
      product.description = req.body.description;

      return product.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Product Updated!',
          product: result
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;

  Product.findOneAndDelete(id)
    .then(() => {
      res
        .status(200)
        .json('Product deleted!')
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
