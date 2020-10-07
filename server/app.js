const express = require('express');
// const dotenv = require("dotenv").config({ path: '../.env' });
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');

const isAuth = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/admin', isAuth, adminRouter);
app.use('/auth', authRouter);
// app.use('/product', productRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.statusCode || 500)
    .json({
      message: err.message,
      data: err.data,
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
  useUnifiedTopology: true
};

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(process.env.MONGO_CONNECTION, options)
  .then(function () {
    console.log('MongoDB is connected');
    let server = app.listen(process.env.SERVER_PORT || 8080, () => {
      // console.log('Listening to: ', server.address())
    })
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = app;
