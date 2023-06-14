const { celebrate, Joi } = require('celebrate');

const linkPattern = /(https?:\/\/)(w{3}\.)?(\w+[-.~:/?#[\]@!$&'()*+,;=]*?((-\w+[-.~:/?#[\]@!$&'()*+,;=]*?)+)?)((\.ru)?(\.com)?)(((\/\w+)+)?\/?)?#?/;

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const postMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkPattern),
    trailerLink: Joi.string().required().regex(linkPattern),
    thumbnail: Joi.string().required().regex(linkPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
});
const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const registerValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  updateUserValidate,
  postMovieValidate,
  deleteMovieValidate,
  loginValidate,
  registerValidate,
};
