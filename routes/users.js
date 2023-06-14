const router = require('express').Router();

const { getUser, updateUserInfo } = require('../controllers/users');
const { updateUserValidate } = require('../utils/validationSchemes');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserValidate, updateUserInfo);

module.exports = router;
