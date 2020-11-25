const fs = require('fs');
const { promisify } = require('util');
const path = require('path')

const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
  res
    .status(200)
    .json('hello admin')
};

exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const product = new Product({
    userId: req.body.userId,
    name: req.body.name,
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

exports.postUpdateProductImages = (req, res, next) => {
  const id = req.body.productId;
  const userId = req.body.userId;
  const files = req.files ? req.files.map(file => file.filename) : [];
  const oldImages = JSON.parse(req.body.oldImages);

  // if (req.files) {
  //   const error = new Error('No image provided!');
  //   error.statusCode = 422;
  //   throw error;
  // }

  // console.log('new files: ', files)
  // console.log('old files: ', oldImages)

  Product
    .findById(id)
    .then(product => {
      //update images
      if (files.length === 0) {
        const filteredImages = product.images.filter(image => !oldImages.includes(image));
        deleteImages(filteredImages);
      }
      //update images url
      product.userId = userId;
      product.images = [...oldImages, ...files];

      return product.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Images uploaded!',
          product: result
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;

  //delete product from db
  Product.findOneAndDelete(id)
    .then(result => {
      //delete images from uploads
      deleteImages(result.images);
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

deleteImages = (imageArr) => {
  if (imageArr.length > 0) {
    imageArr.map(name => {
      const unlinkAsync = promisify(fs.unlink)
      unlinkAsync(path.resolve('./uploads/' + name))
        // .then(res => console.log('remove image success', res))
        // .catch(err => console.log('remove image error', err));
    });
  }
}
