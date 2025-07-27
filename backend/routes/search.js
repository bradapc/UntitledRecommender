const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/', searchController.handleSearch);
router.get('/cast/:id', searchController.handleGetCast);
router.get('/person/:cast_id', searchController.handleGetPerson);

module.exports = router;