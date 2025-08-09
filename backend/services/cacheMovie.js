const db = require('../db');
const {addMovieGenres} = require('./addMovieGenres');
const {addMovieCast} = require('./addMovieCast');

const cacheMovie = async (movieResult) => {
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');
        const releaseDate = movieResult.release_date?.trim() ? movieResult.release_date : null;
        const movieInsert = await client.query("INSERT INTO movie (id, title, poster_path, release_date, overview, budget, runtime, revenue) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO NOTHING", 
                    [movieResult.id, movieResult.title, movieResult.poster_path, releaseDate, movieResult.overview, movieResult.budget, movieResult.runtime, movieResult.revenue])
        if (movieInsert.rowCount === 0) {
            const check = await client.query('SELECT id FROM movie WHERE id = $1', [movieResult.id]);
            if (check.rowCount === 0) {
                throw new Error(`Movie ${movieResult.id} could not be found in movie table. Aborting cacheMovie`);
            }
        }
        await addMovieGenres(movieResult, client);
        await addMovieCast(movieResult.id, client);
        await client.query('COMMIT');
        return 0;
    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
        return -1;
    } finally {
        client.release();
    }
};

module.exports = {cacheMovie};