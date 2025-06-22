require('dotenv').config();
const searchAPI = require('../services/searchAPI');

const searchByTitle = async (req, res) => {
    if (!req || (!req.query.title && !req.query.id)) {
        return res.status(400).json({"message": "Error: You must supply an id or a title"});
    }
    
    if (req.query.id) {
        const movieResult = await searchAPI.searchById(req.query.id);
        return res.status(200).json({movieResult});
    } else if (req.query.title) {
        const movieResult = await searchAPI.searchByTitle(req.query.title);
        return res.status(200).json({movieResult})
    }
}

module.exports = {searchByTitle};