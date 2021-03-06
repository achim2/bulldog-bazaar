const { body } = require('express-validator');

exports.addProduct = [
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required!'),
  body('color')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Color is required!'),
  body('birthday')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Birthday is required!'),
  body('gender')
    .trim()
    .not()
    .isEmpty()
    .withMessage('gender is required!'),
];
