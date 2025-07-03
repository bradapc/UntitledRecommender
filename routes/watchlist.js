const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

router.get('/', watchlistController.getWatchlist);
router.post('/', watchlistController.handleAddToWatchlist);

module.exports = router;