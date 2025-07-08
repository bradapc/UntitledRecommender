const apiOptions = require('../config/apiOptions');

const getGenres = (req, res) => {
    return res.status(200).json(apiOptions.getAvailableGenresMap());
}

const getSortBy = (req, res) => {
    return res.status(200).json(apiOptions.getSortByOptions());
}

module.exports = {getGenres, getSortBy}