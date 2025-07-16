const db = require('../db');
const searchAPI = require('../services/searchAPI');
const {cacheMovie} = require('../services/cacheMovie');
const {mergeOnId} = require('../services/mergeMovieInfo');

const handleAddToWatchlist = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({"message": 'Request body missing or empty'});
    }
    const {movieId} = req.body;
    if (!movieId) {
        return res.status(400).json({"message": 'Watchlist add must include movieId'});
    }

    const searchResult = await searchAPI.searchById(movieId);
    if (searchResult && 'success' in searchResult && searchResult.success === false) {
        return res.status(400).json({"message": 'Movie could not be found.'});
    }

    const priority = (req.body.priority) ? req.body.priority : 5;

    try {
        await db.query("BEGIN");

        const movieExists = await db.query("SELECT id FROM movie WHERE id = $1", [movieId]);
        if (!movieExists.rows[0]) {
            cacheMovie(searchResult);
        }
        await db.query("INSERT INTO watchlist (user_id, movie_id, priority) VALUES ($1, $2, $3) ON CONFLICT (user_id, movie_id) DO NOTHING", [req.userId, movieId, priority]);

        await db.query("COMMIT");
    } catch (err) {
        await db.query("ROLLBACK");
        console.error(err);
        return res.status(500).json({"message": "Error: Server error when attempting to add to database"});
    }

    return res.status(200).json({"message": `Added movie ${movieId} to user ${req.userId}'s watchlist`});
}

const handleDelete = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2', [req.userId, req.params.id]);
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Internal server error"});
    }
    return res.sendStatus(200);
};

const getWatchlist = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({"message": 'Unauthorized: userId missing'});
    }
    try {
        const dbres = await db.query('SELECT * FROM watchlist WHERE user_id = $1', [req.userId]);
        const movieIds = dbres.rows.map(movie => movie.movie_id);
        const movieInfo = await db.query('SELECT * FROM movie WHERE id = ANY($1::int[])', [movieIds]);
        const genreInfo = await db.query('SELECT * FROM movie_genre WHERE movie_id = ANY($1::int[])', [movieIds]);
        const combined = {"watchlist": mergeOnId(dbres.rows, movieInfo.rows, genreInfo.rows)};
        return res.status(200).json(combined);
    } catch (err) {
        console.error(err);
        return res.status(500).json({"message": "Internal server error"});
    }
};

module.exports = {handleAddToWatchlist, getWatchlist, handleDelete};