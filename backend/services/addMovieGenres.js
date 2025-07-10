const db = require('../db');

const addMovieGenres = async (movie) => {
    const {genres} = movie;
    const genreIds = genres.map(genre => genre.id);
    try {
        for (let id of genreIds) {
            await db.query('INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2) ON CONFLICT (movie_id, genre_id) DO NOTHING', [movie.id, id])
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {addMovieGenres}