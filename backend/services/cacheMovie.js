const db = require('../db');
const {addMovieGenres} = require('./addMovieGenres');
const {addMovieCast} = require('./addMovieCast');

const cacheMovie = async (movieResult) => {
    try {
        await db.query('BEGIN');
        const releaseDate = movieResult.release_date?.trim() ? movieResult.release_date : null;
        await db.query("INSERT INTO movie (id, title, poster_path, release_date, overview, budget, runtime, revenue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING", 
                    [movieResult.id, movieResult.title, movieResult.poster_path, releaseDate, movieResult.overview, movieResult.budget, movieResult.runtime, movieResult.revenue])
        await addMovieGenres(movieResult);
        await addMovieCast(movieResult.id);
        await db.query('COMMIT');
        return 0;
    } catch(err) {
        await db.query('ROLLBACK');
        console.error(err);
        return -1;
    }
};

module.exports = {cacheMovie};