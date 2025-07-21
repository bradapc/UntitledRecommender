const db = require('../db');
const searchAPI = require('../services/searchAPI');

const removeSeenMovie = async (req, res) => {
    if (!req.body || !req.userId || !req.body.movie_id) {
        return res.status(400).json({"message": "Invalid request body"});
    }

    try {
        const deleteCount = await db.query("DELETE FROM movies_seen WHERE user_id = $1 AND movie_id = $2", [req.userId, req.body.movie_id]);
        if (deleteCount.rowCount === 0) {
            return res.status(404).json({"message": "You have not seen this movie."});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to remove listing from database."});
    }

    return res.status(200).json({"message": `Movie ${req.body.movie_id} has been removed from your seen list`});
};

const addSeenMovie = async (req, res) => {
    if (!req.body || !req.userId || !req.body.movieId) {
        return res.status(400).json({"message": "Invalid request body"});
    };
    const {movieId} = req.body;
    try {
        await db.query("BEGIN");

        const movieExistsInDB = await db.query('SELECT id FROM movie WHERE id = $1', [movieId]);
        if (!movieExistsInDB.rows[0]) {
            const searchResult = await searchAPI.searchById(movieId);
            if (searchResult && 'success' in searchResult && searchResult.success === false) {
                return res.status(400).json({"message": 'Movie could not be found.'});
            }
            await db.query('INSERT INTO movie (id, title, poster_path, release_date, overview) VALUES ($1, $2, $3, $4, $5)', [movieId, searchResult.title, searchResult.poster_path, searchResult.release_date, searchResult.overview]);
            for (const genre of searchResult.genres) {
                await db.query("INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2)", [movieId, genre.id])
            }
        }

        const insertResult = await db.query('INSERT INTO movies_seen (user_id, movie_id, rating, review) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id, movie_id) DO NOTHING', [req.userId, movieId, req.body.rating, req.body.review]);
        if (insertResult.rowCount === 0) {
            return res.status(409).json({"message": "Movie already in user's seen movies list"});
        }
        await db.query('DELETE FROM watchlist WHERE user_id = $1 AND movie_id = $2', [req.userId, movieId]);

        await db.query("COMMIT");
    } catch (err) {
        await db.query("ROLLBACK");
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to insert movie into seen list"});
    }
    return res.status(200).json({"message": `Added movie ${movieId} to seen movies list`});
};

const getSeenMovies = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({"message": "Unauthorized: User ID missing"})
    }
    try {
        const seen = await db.query('SELECT movie.*, movies_seen.*, ARRAY_AGG(movie_genre.genre_id) AS genres FROM movie JOIN movies_seen ON movie.id=movies_seen.movie_id JOIN movie_genre ON movie.id=movie_genre.movie_id WHERE user_id = $1 GROUP BY movies_seen.movie_id, movies_seen.user_id, movie.id', [req.userId])
        return res.status(200).json({seen: seen.rows});
    } catch (err) {
        console.error(err);
        return res.status(500).json({"error": "Internal server error"})
    }
};

const patchSeenMovie = async (req, res) => {
    const {rating, review} = req.body;
    const movie_id = req.params.movie_id;
    if (rating != undefined && rating != null) {
        if (isNaN(Number(rating))) {
            return res.status(400).json({"error": "Rating must be a number."});
        }
        if (rating < 0 || rating > 5) {
            return res.status(400).json({"error": "Rating must be between 0 and 5"});
        }
        try {
            await db.query('UPDATE movies_seen SET rating = $1 WHERE user_id = $2 AND movie_id = $3', [rating, req.userId, movie_id]);
            return res.status(200).json({"message": "Rating updated successfully"})
        } catch (err) {
            console.error(err);
            return res.status(500).json({"error": "Internal server error"})
        }
    } else if (review !== undefined) {
        try {
            await db.query('UPDATE movies_seen SET review = $1 WHERE user_id = $2 AND movie_id = $3', [review, req.userId, movie_id]);
            return res.status(200).json({"message": "Review updated successfully"})
        } catch (err) {
            console.error(err);
            return res.status(500).json({"error": "Internal server error"})
        }
    }
};

module.exports = {getSeenMovies, addSeenMovie, removeSeenMovie, patchSeenMovie};