const express = require('express');
const router = express.Router();
const addToWatchlistController = require('../controllers/addToWatchlistController');
const getWatchlistController = require('../controllers/getWatchlistController');

router.get('/', getWatchlistController.getWatchlist);
router.post('/', addToWatchlistController.handleAddToWatchlist);

module.exports = router;