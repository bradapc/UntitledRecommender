const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:userId/watchlist', usersController.handleGetWatchlistByID);
router.get('/:userId/seen', usersController.getSeenByID);
router.get('/:userId', usersController.getUserByID)

module.exports = router;