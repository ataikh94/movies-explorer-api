const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');
const devSecretKey = require('../configs/devConfig');
const { notFoundErrorMessage, badRequestErrorMessage, conflictErrorMessage } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(notFoundErrorMessage));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(badRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(notFoundErrorMessage));
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequest(badRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return next(new BadRequest(badRequestErrorMessage));
      if (err.code === 11000) return next(new Conflict(conflictErrorMessage));
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return next(new Unauthorized('Неправильные почта или пароль'));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return next(new Unauthorized('Неправильные почта или пароль'));
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : devSecretKey, { expiresIn: '7d' });
          const userObj = user.toObject();
          delete userObj.password;
          return res.send({ token, userObj });
        });
    })
    .catch(next);
};
