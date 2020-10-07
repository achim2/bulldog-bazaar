const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  res.json('hello admin')
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const color = req.body.color;
  const birthday = req.body.birthday;
  const sex = req.body.sex;
  const description = req.body.description;
  // const product = new Product(title, price, description, imageUrl, null, req.user_id);
  const product = new Product({
    userId: req.user,
    name: name,
    imageUrl: imageUrl,
    color: color,
    birthday: birthday,
    sex: sex,
    description: description,
  })
  product
    .save()
    .then(result => {
      console.log('Created product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      // res.render('admin/edit-product', {
      //   pageTitle: 'Edit Product',
      //   path: '/admin/edit-product',
      //   editing: editMode,
      //   product: product,
      // });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  // const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageUrl, id)

  Product.findById(id)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;

      return product.save();
    })
    .then(result => {
      console.log('updated product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      // res.render('admin/products', {
      //   prods: products,
      //   pageTitle: 'Admin Products',
      //   path: '/admin/products'
      // });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
};
