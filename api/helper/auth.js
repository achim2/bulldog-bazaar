const jwt = require('jsonwebtoken');

module.exports = (req) => {
  let decodedToken;
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }

  return decodedToken;
}
