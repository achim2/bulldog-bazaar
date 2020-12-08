const fs = require('fs');
const { promisify } = require('util');
const path = require('path')

const Info = require('../models/info');
const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
  res
    .status(200)
    .json('hello admin')
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res
        .status(200)
        .json(products)
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProduct = (req, res, next) => {
  const id = req.params.id;

  Product
    .findById(id)
    .then(product => {
      if (!product) {
        const error = new Error('Product not found!');
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
    slug: slugify(req.body.name),
    color: req.body.color,
    birthday: req.body.birthday,
    gender: req.body.gender,
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
      product.slug = slugify(req.body.name);
      product.color = req.body.color;
      product.birthday = req.body.birthday;
      product.gender = req.body.gender;
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
  const files = [];
  const deletedImage = req.body.deletedImage;
  const selectedImage = req.body.selectedImage;

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
      let existingImages = product.images;
      const hasSelected = product.images.find(img => img.selected);

      // update images
      if (req.files.length !== 0) {
        console.log('in req.files if')
        req.files.forEach((file, i) => {
          files.push({
            name: file.filename,
            selected: false,
          })
        });

        if (!hasSelected) {
          files[0].selected = true;
        }
      }

      //if deleted not empty
      if (deletedImage !== '') {
        console.log('in deleted if')
        if (hasSelected && hasSelected.name === deletedImage) {
          const error = new Error('You cannot delete selected image!')
          error.statusCode = 422;
          throw error;
        }
        const filteredImages = product.images.filter(image => image.name === deletedImage);
        existingImages = product.images.filter(image => image.name !== deletedImage);
        deleteImages(filteredImages);
      }

      //selected not empty
      if (selectedImage !== '') {
        console.log('in selected if')
        existingImages = product.images.map(img => {
          img.selected = img.name === selectedImage;
          return img;
        });
      }

      //update images url
      product.userId = userId;
      product.images = [...existingImages, ...files];
      product.markModified('images');

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
};

exports.postChangeStatus = (req, res, next) => {
  const id = req.body.id;
  const userId = req.body.userId;

  Product
    .findById(id)
    .then(product => {
      product.userId = userId;
      product.status = !product.status;

      return product.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Status updated!',
          product: result,
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

exports.setInfo = (req, res, next) => {
  const userId = req.body.userId;
  const email = req.body.email;
  const phone = req.body.phone;

  Info
    .findOne()
    .then(dbInfo => {
      if (dbInfo) {
        dbInfo.userId = userId;
        dbInfo.email = email;
        dbInfo.phone = phone;

        return dbInfo.save();
      }

      const info = new Info({
        userId: userId,
        email: email,
        phone: phone,
      })

      return info.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Info updated!',
          info: result,
        })
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
    imageArr.map(img => {
      const unlinkAsync = promisify(fs.unlink)
      unlinkAsync(path.resolve('./uploads/' + img.name))
      // .then(res => console.log('remove image success', res))
      // .catch(err => console.log('remove image error', err));
    });
  }
};

slugify = (string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
