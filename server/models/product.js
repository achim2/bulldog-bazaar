const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    // required: true
  },
  color: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Product', productSchema);
