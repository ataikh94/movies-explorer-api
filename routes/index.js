const router = require('express').Router();
const { errorLogger } = require('express-winston');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { loginValidate, registerValidate } = require('../utils/validationSchemes');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', registerValidate, createUser);
router.post('/signin', loginValidate, login);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);

router.use(errorLogger);

router.use('/*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
