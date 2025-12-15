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
        const movieResult = await limiter.schedule(() => searchAPI.searchById(req.params.id));
        cacheMovie(movieResult);
        return res.status(200).json({movieResult});
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

const handleGetMovieReviews = async (req, res) => {
    try {
        if (!req || !req.params.id) {
            return res.status(400).json({"message": "Error: You must supply a movie id"});
        }
        const movieReviewQuery = await db.query("SELECT user_id, username, rating, review FROM movies_seen JOIN users ON users.id=movies_seen.user_id WHERE movie_id = $1 AND review IS NOT NULL", [req.params.id]);
        if (movieReviewQuery.rowCount > 0) {
            const movieReviewsJson = {"reviews": movieReviewQuery.rows}
            return res.status(200).json(movieReviewsJson)
        } else {
            return res.status(404).json({"error": "404 Not Found"})
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

module.exports = {handleGetMovie, handleGetMovieReviews}