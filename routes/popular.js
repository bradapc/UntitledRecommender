const express = require('express');
const router = express.Router();
const popularController = require('../controllers/popularController');

router.get('/', popularController.getPopularMovies);

module.exports = router;