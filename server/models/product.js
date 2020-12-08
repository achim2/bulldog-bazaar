const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    slug: {
      type: String,
      unique: true,
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
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    description: {
      type: Array,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
