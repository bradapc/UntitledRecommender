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

module.exports = {handleAddToWatchlist};