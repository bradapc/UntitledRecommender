const express = require('express');
const router = express.Router();
const seenController = require('../controllers/seenController');

router.get('/', seenController.getSeenMovies);
router.post('/', seenController.addSeenMovie);
router.patch('/:movie_id', seenController.patchSeenMovie);
router.delete('/:id', seenController.removeSeenMovie);

module.exports = router;