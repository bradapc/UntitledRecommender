const express = require('express');
const router = express.Router();
const filtersController = require('../controllers/filtersController');

router.get('/genres', filtersController.getGenres);
router.get('/sortby', filtersController.getSortBy);

module.exports = router;