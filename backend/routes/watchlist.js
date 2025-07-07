const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlistController');

router.get('/', watchlistController.getWatchlist);
router.post('/', watchlistController.handleAddToWatchlist);
router.delete('/:id', watchlistController.handleDelete);

module.exports = router;