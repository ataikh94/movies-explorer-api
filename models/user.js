const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле email обязательно для заполнения'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорерктный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле password обязательно для заполнения'],
      select: false,
    },
    name: {
      type: String,
      required: [true, 'Поле name обязательно для заполнения'],
      minlength: [2, 'Миинимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
