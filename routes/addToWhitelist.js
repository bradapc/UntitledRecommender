const express = require('express');
const router = express.Router();
const addToWhitelistController = require('../controllers/addToWhitelistController');

router.post('/', addToWhitelistController.handleAddToWhitelist);

module.exports = router;