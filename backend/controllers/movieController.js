require('dotenv').config();
const searchAPI = require('../services/searchAPI');
const db = require('../db');
const {cacheMovie} = require('../services/cacheMovie');
const {limiter} = require('../services/apiLimiter');

const handleGetMovie = async (req, res) => {
    try {
        if (!req || (!req.params.id)) {
            return res.status(400).json({"message": "Error: You must supply a movie id"});
        }

        const movieIdQuery = await db.query('SELECT * FROM movie WHERE id = $1', [req.params.id]);
        if (movieIdQuery.rowCount > 0) {
            const genresResult = await db.query('SELECT genre_id FROM movie_genre WHERE movie_id = $1', [req.params.id]);
            const movie = {...movieIdQuery.rows[0], genres: genresResult.rows.map(g => {
                return {id: g.genre_id};
            })};
            return res.status(200).json({movieResult: movie});
        }
        const movieResult = await searchAPI.searchById(req.params.id);
        cacheMovie(movieResult);
        return res.status(200).json({movieResult});
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

module.exports = {handleGetMovie}