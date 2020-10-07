const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product
    .find()
    .then(products => {
      console.log(products)
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product
    .findById(prodId)
    .then(product => {
      console.log(product)
    })
    .catch(err => console.log(err));
};
