const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
