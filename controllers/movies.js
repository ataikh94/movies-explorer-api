const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const Forbidden = require('../errors/Forbidden');
const { badRequestErrorMessage, notFoundErrorMessage, forbiddenErrorMessage } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(badRequestErrorMessage));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) return next(new NotFoundError(notFoundErrorMessage));
      if (movie.owner.toString() !== req.user._id) {
        return next(new Forbidden(forbiddenErrorMessage));
      }
      return movie.deleteOne()
        .then(() => res.send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') return next(new BadRequest(badRequestErrorMessage));
      return next(err);
    });
};
