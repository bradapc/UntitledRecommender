const express = require('express');
const router = express.Router();
const searchTitleController = require('../controllers/searchTitleController')

router.get('/', searchTitleController.searchByTitle);

module.exports = router;