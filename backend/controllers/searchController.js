require('dotenv').config();
const searchAPI = require('../services/searchAPI');
const db = require('../db');
const {cacheMovie} = require('../services/cacheMovie');

const handleSearch = async (req, res) => {
    try {
        if (!req || (!req.query.title && !req.query.id)) {
            return res.status(400).json({"message": "Error: You must supply an id or a title"});
        }

        if (req.query.id) {
            const movieIdQuery = await db.query('SELECT * FROM movie WHERE id = $1', [req.query.id]);
            if (movieIdQuery.rowCount > 0) {
                const genresResult = await db.query('SELECT genre_id FROM movie_genre WHERE movie_id = $1', [req.query.id]);
                const movie = {...movieIdQuery.rows[0], genres: genresResult.rows.map(g => {
                    return {id: g.genre_id};
                })};
                return res.status(200).json({movieResult: movie});
            }
            const movieResult = await searchAPI.searchById(req.query.id);
            cacheMovie(movieResult);
            return res.status(200).json({movieResult});
        } else if (req.query.title) {
            const movieResult = await searchAPI.searchByTitle(req.query.title);
            return res.status(200).json({movieResult})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

const handleGetCast = async (req, res) => {
    if (!req || !req.params.id) {
        return res.status(400).json({"message": "Error: You must supply a movie id to get cast"});
    }
    try {
        const castDbQuery = await db.query('SELECT * FROM movie_cast JOIN casted_in ON movie_cast.id=casted_in.cast_id WHERE movie_id = $1 ORDER BY billing_order', [req.params.id]);
        if (castDbQuery.rowCount > 0) {
            return res.status(200).json(castDbQuery.rows);
        }
        const castResult = await searchAPI.searchCastByID(req.params.id);
        return res.status(200).json(castResult.cast);
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"});
    }
};

module.exports = {handleSearch, handleGetCast}