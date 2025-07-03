const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:userId/watchlist', usersController.getWatchlistByID);
router.get('/:userId/seen', usersController.getSeenByID);

module.exports = router;