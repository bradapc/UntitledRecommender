const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.handleSearch);
router.get('/cast/:id', searchController.handleGetCast);

module.exports = router;