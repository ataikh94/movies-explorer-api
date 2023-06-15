const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле country обязательно для заполнения.'],
    },
    director: {
      type: String,
      required: [true, 'Поле director обязательно для заполнения.'],
    },
    duration: {
      required: [true, 'Поле duration обязательно для заполнения.'],
      type: Number,
    },
    year: {
      required: [true, 'Поле year обязательно для заполнения.'],
      type: String,
    },
    description: {
      required: [true, 'Поле description обязательно для заполнения.'],
      type: String,
    },
    image: {
      required: [true, 'Поле image обязательно для заполнения.'],
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      required: [true, 'Поле trailerLink обязательно для заполнения.'],
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      required: [true, 'Поле thumbnail обязательно для заполнения.'],
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      required: [true, 'Поле movieId обязательно для заполнения.'],
      type: Number,
    },
    nameRU: {
      required: [true, 'Поле nameRU обязательно для заполнения.'],
      type: String,
    },
    nameEN: {
      required: [true, 'Поле nameEN обязательно для заполнения.'],
      type: String,
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('movie', movieSchema);
