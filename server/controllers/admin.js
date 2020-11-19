const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res
    .status(200)
    .json('hello admin')
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    userId: req.body.userId,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
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
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        res
          .status(404)
          .json('Product not found!')
      }

      res
        .status(200)
        .json(product);
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;

  Product.findById(id)
    .then(product => {
      product.userId = req.body.userId;
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
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res
        .status(200)
        .json(products)
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.id;
  Product.findOneAndDelete(id)
    .then(() => {
      res
        .status(200)
        .json('Product deleted!')
    })
    .catch(err => console.log(err));
};
