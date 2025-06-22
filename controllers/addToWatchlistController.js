const db = require('../db');
const options = require('../config/apiOptions');

const handleAddToWatchlist = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({"message": 'Request body missing or empty'});
    }
    const {movieId} = req.body;
    if (!movieId) {
        return res.status(400).json({"message": 'Watchlist add must include movieId'});
    }

    const searchResult = await searchById(movieId);
    if (searchResult && 'success' in searchResult && searchResult.success === false) {
        return res.status(400).json({"message": 'Movie could not be found.'});
    }

    const priority = (req.body.priority) ? req.body.priority : 5;

    try {
        const insertResult = await db.query("INSERT INTO watchlist (user_id, movie_id, priority) VALUES ($1, $2, $3)", [req.userId, movieId, priority]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({"message": "Error: Server error when attempting to add to database"});
    }

    return res.status(200).json({"message": `Added movie ${movieId} to Watchlist`});
}

const searchById = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    const jsonObj = await response.json();
    return jsonObj;
};

module.exports = {handleAddToWatchlist};