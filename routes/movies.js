const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { postMovieValidate, deleteMovieValidate } = require('../utils/validationSchemes');

router.get('/movies', getMovies);
router.post('/movies', postMovieValidate, postMovie);
router.delete('/movies/:_id', deleteMovieValidate, deleteMovie);

module.exports = router;
