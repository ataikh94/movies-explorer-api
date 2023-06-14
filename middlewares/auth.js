const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');
const devSecretKey = require('../configs/devConfig');
const { unauthorizedErrorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new Unauthorized(unauthorizedErrorMessage));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecretKey);
  } catch (err) {
    return next(new Unauthorized(unauthorizedErrorMessage));
  }

  req.user = payload;
  return next();
};
