const db = require('../db');
const searchAPI = require('../services/searchAPI');

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
            await db.query("INSERT INTO movie (id, title, poster_path, release_date, overview) VALUES ($1, $2, $3, $4, $5)", [movieId, searchResult.title, searchResult.poster_path, searchResult.release_date, searchResult.overview]);
            for (const genre of searchResult.genres) {
                await db.query("INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2)", [movieId, genre.id])
            }
        }
        await db.query("INSERT INTO watchlist (user_id, movie_id, priority) VALUES ($1, $2, $3)", [req.userId, movieId, priority]);

        await db.query("COMMIT");
    } catch (err) {
        await db.query("ROLLBACK");
        console.error(err);
        return res.status(500).json({"message": "Error: Server error when attempting to add to database"});
    }

    return res.status(200).json({"message": `Added movie ${movieId} to user ${req.userId}'s watchlist`});
}

const getWatchlist = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({"message": 'Unauthorized: userId missing'});
    }
    try {
        const dbres = await db.query('SELECT * FROM watchlist WHERE user_id = $1', [req.userId]);
        const movieIds = dbres.rows.map(movie => movie.movie_id);
        const movieInfo = await db.query('SELECT * FROM movie WHERE id = ANY($1::int[])', [movieIds]);
        const combined = mergeOnId(dbres.rows, movieInfo.rows);
        return res.status(200).json(combined);
    } catch (err) {
        console.error(err);
        return res.status(500).json({"message": "Internal server error"});
    }
};

const mergeOnId = (watchlist, movies) => {
    return watchlist.map(watch => {
        const movie = movies.find(m => m.id === watch.movie_id) || {};
        return {...watch, ...movie};
    });
};

module.exports = {handleAddToWatchlist, getWatchlist};