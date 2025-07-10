require('dotenv').config();
const searchAPI = require('../services/searchAPI');
const db = require('../db');
const {addMovieGenres} = require('../services/addMovieGenres');

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
            await db.query("INSERT INTO movie (id, title, poster_path, release_date, overview, budget, runtime, revenue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING", 
                [movieResult.id, movieResult.title, movieResult.poster_path, movieResult.release_date, movieResult.overview, movieResult.budget, movieResult.runtime, movieResult.revenue])
                await addMovieGenres(movieResult);
                return res.status(200).json({movieResult: movieResult});
        } else if (req.query.title) {
            const movieResult = await searchAPI.searchByTitle(req.query.title);
            return res.status(200).json({movieResult: movieResult})
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
    const castResult = await searchAPI.searchCastByID(req.params.id);
    return res.status(200).json(castResult.cast);
};

module.exports = {handleSearch, handleGetCast}