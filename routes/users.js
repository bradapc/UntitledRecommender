const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:userId/watchlist', usersController.getWatchlistByID);

module.exports = router;