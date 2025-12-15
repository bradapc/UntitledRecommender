const db = require('../db')

const userExists = async (userId) => {
    const user = await db.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (user.rowCount === 0) {
        return false
    }
    return true
};

const getWatchlistByID = async (userId) => {
    return await db.query('SELECT movie.*, watchlist.*, ARRAY_AGG(movie_genre.genre_id) AS genres FROM watchlist JOIN movie ON watchlist.movie_id=movie.id JOIN movie_genre ON watchlist.movie_id=movie_genre.movie_id WHERE user_id = $1 GROUP BY watchlist.id, movie.id', [userId]);
}

const getSeenlist = async (userId) => {
    return await db.query('SELECT * FROM movies_seen WHERE user_id = $1', [userId]);
}

const getAverageRating = async (seenList) => {
    let count = 0;
    let rating = 0;
    for (const movie of seenList) {
        if (movie.rating !== null) {
            count++;
            rating += Number(movie.rating);
        }
    }
    return (rating / count).toFixed(1);
}

const getUsernameByID = async (userId) => {
    result = await db.query('SELECT username FROM users WHERE id = $1', [userId]);
    const username = result?.rows[0]?.username || null;
    return username;
}

module.exports = {userExists, getWatchlistByID, getSeenlist, getAverageRating, getUsernameByID}