const express = require('express');
const router = express.Router();
const seenController = require('../controllers/seenController');

router.get('/', seenController.getSeenMovies);
router.post('/add', seenController.addSeenMovie);

module.exports = router;