const decodedUser = require('../helper/auth');

module.exports = (req, res, next) => {
  decodedUser(req);
  next();
}
