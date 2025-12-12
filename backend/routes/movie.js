const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/:id', movieController.handleGetMovie);

module.exports = router;