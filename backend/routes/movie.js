const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/:id', movieController.handleGetMovie);
router.get('/:id/reviews', movieController.handleGetMovieReviews);

module.exports = router;