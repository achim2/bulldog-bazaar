const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const Info = require('../models/info');
const Product = require('../models/product');
const Gallery = require('../models/gallery');

const { validationResult } = require('express-validator');

exports.getIndex = (req, res, next) => {
  res
    .status(200)
    .json('hello admin');
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res
        .status(200)
        .json(products);
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
  });

  product
    .save()
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Product created!',
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

  Product
    .findById(id)
    .then(product => {
      let existingImages = product.images;
      const hasSelected = product.selectedFilename;
      let counter = existingImages.length ? existingImages.length : 0;

      // update images
      if (req.files.length) {
        req.files.map(file => {
          files.push({
            filename: file.filename,
            index: counter,
          });
          counter++;
        });

        if (!hasSelected) {
          product.selectedFilename = files[0].filename;
        }
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

exports.postUpdateProductImageIndex = (req, res, next) => {
  const userId = req.body.userId;
  const id = req.body.productId;
  const images = req.body.images;

  Product.findOne({ _id: id })
    .then(product => {
      const sorted = setImageIndex(images);
      product.selectedFilename = sorted[0].filename;
      product.userId = userId;
      product.images = sorted;
      product.markModified('images');

      return product.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Images updated!',
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

exports.postDeleteProductImage = (req, res, next) => {
  const userId = req.body.userId;
  const id = req.body.productId;
  const deletedImage = req.body.deletedImage;

  Product
    .findById(id)
    .then(product => {
      const filteredImage = product.images.filter(image => image.filename === deletedImage);
      let filteredArr = product.images.filter(image => image.filename !== deletedImage);

      if (filteredArr.length) {
        filteredArr = setImageIndex(filteredArr);
      }

      if (filteredArr.length) {
        product.selectedFilename = filteredArr[0].filename;
      } else {
        product.selectedFilename = '';
      }

      deleteImages(filteredImage);

      product.images = filteredArr;
      product.userId = userId;
      product.markModified('images');

      return product.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Image deleted!',
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

exports.postUpdateGallery = async (req, res, next) => {
  const userId = req.body.userId;
  const files = [];

  try {
    //find all image
    const find = await Gallery.find();
    let counter = find.length ? find.length : 0;

    //set files userId && filename && index
    req.files.map(file => {
      files.push({
        userId: userId,
        filename: file.filename,
        index: counter,
      });
      counter++;
    });

    //insert files
    const result = await Gallery.insertMany(files);

    res
      .status(200)
      .json({
        message: 'Images uploaded!',
        result: result,
      });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postDeleteGalleryImage = async (req, res, next) => {
  const deletedImage = req.body.deletedImage;
  let filtered = [];

  try {
    //Delete image
    await Gallery
      .findOneAndDelete({ filename: deletedImage })
      .then(result => {
        deleteImages([result]);
      });

    //Query all image
    const find = await Gallery.find();

    //Set new image indexes if images not empty
    if (find.length) {
      filtered = await updateGalleryImageIndex(setImageIndex(find));
    }

    //Response
    res
      .status(200)
      .json({
        message: 'Images deleted!',
        result: filtered,
      });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postUpdateGalleryImageIndex = async (req, res, next) => {
  const images = req.body.images;

  try {
    const filtered = await updateGalleryImageIndex(setImageIndex(images));

    res
      .status(200)
      .json({
        message: 'Images updated!',
        result: filtered,
      });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
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
        .json('Product deleted!');
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postSetInfo = (req, res, next) => {
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
      });

      return info.save();
    })
    .then(result => {
      res
        .status(200)
        .json({
          message: 'Info updated!',
          info: result,
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

deleteImages = (arr) => {
  if (arr.length) {
    arr.map(img => {
      if (img.filename) {
        const unlinkAsync = promisify(fs.unlink);
        unlinkAsync(path.resolve('./uploads/' + img.filename));
        // .then(res => console.log('remove image success', res))
        // .catch(err => console.log('remove image error', err));
      }
    });
  }
};

slugify = (string) => {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
  const p = new RegExp(a.split('').join('|'), 'g');

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

setImageIndex = (arr) => {
  if (arr.length) {
    return arr.map((image, index) => {
      image.index = index;
      return image;
    });
  }

  return null;
};

updateGalleryImageIndex = (arr) => {
  if (arr.length) {
    const promises = arr.map(obj => {
      return Gallery
        .findOne({ _id: obj._id })
        .then(image => {
          image.index = obj.index;
          image.save();
          return image;
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          throw new Error(err);
        });
    });

    return Promise
      .all(promises)
      .then(result => {
        console.log('485', result);
        return result;
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        throw new Error(err);
      });
  }

  return null;
};
