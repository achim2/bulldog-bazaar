const express = require('express');
// const dotenv = require("dotenv").config({ path: '../.env' });
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const pageRouter = require('./routes/page');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');

const isAuth = require('./middleware/auth');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '_' + file.originalname);
  }
})

//Todo: file filter not works in multer.
const fileFilter = (req, file, cb) => {
  if (file.mimeType === 'image/png' || file.mimeType === 'image/jpg' || file.mimeType === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(multer({ storage: fileStorage }).array('images', 10))

app.use(`/${process.env.API_PREFIX}/uploads`, express.static(path.join(__dirname, 'uploads')));
app.use(`/${process.env.API_PREFIX}/`, pageRouter);
app.use(`/${process.env.API_PREFIX}/admin`, isAuth, adminRouter);
app.use(`/${process.env.API_PREFIX}/auth`, authRouter);

app.use((err, req, res, next) => {
  console.error('ERROR: ', err);
  res
    .status(err.statusCode || 500)
    .json({
      message: err.message,
      errors: err.errors
    })
})

// const {
//   MONGO_USERNAME,
//   MONGO_PASSWORD,
//   MONGO_HOSTNAME,
//   MONGO_PORT,
//   MONGO_DB
// } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(process.env.MONGO_CONNECTION, options)
  .then(function () {
    console.log('MongoDB is connected');
    let server = app.listen(process.env.SERVER_PORT || 8080, () => {
      console.log('Listening to: ', server.address())
    })
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = app;
