const express = require('express');
const router = express.Router();
const searchGenreController = require('../controllers/searchGenreController');

router.get('/', searchGenreController.searchByGenre);

module.exports = router;