const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectID,
      ref: 'User',
      required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    fbUrl: {
      type: String,
      // required: true,
    },
    instaUrl: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Info', infoSchema);
