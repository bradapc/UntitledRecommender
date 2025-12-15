const db = require('../db');
const {userExists, getWatchlist, getSeenlist, getAverageRating} = require('../services/userService')
const {getGenres} = require('../services/genreService');

const getWatchlistByID = async (req, res) => {
    const userId = req.params.userId;
    try {
        const isUserValid = await userExists(userId)
        if (!isUserValid) {
            return res.status(404).json({"message": `User with ID ${userId} does not exist.`});
        }
        const userWatchlist = await getWatchlist(userId);
        return res.status(200).json({userId, watchlist: userWatchlist.rows});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to retrieve from database"});
    }
};

const getSeenByID = async (req, res) => {
    const userId = req.params.userId;
    try {
        const isUserValid = await userExists(userId)
        if (!isUserValid) {
            return res.status(404).json({"message": `User with ID ${userId} does not exist.`});
        }
    const userSeen = await getSeenlist(userId);
    return res.status(200).json({userId, seen: userSeen.rows});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to retrieve from database"});
    }
};

const getUserByID = async (req, res) => {
    const userId = req.params.userId;
    try {
        const isUserValid = await userExists(userId)
        if (!isUserValid) {
            return res.status(404).json({"message": `User with ID ${userId} does not exist.`});
        }
        const userSeen = await getSeenlist(userId);
        const userWatchlist = await getWatchlist(userId);
        const stats = {
            total_movies_watched: userSeen.rowCount,
            total_movies_watchlisted: userWatchlist.rowCount,
            average_rating: await getAverageRating(userSeen.rows)
        }
        const response = {
            userId,
            stats,
            watchlist: userWatchlist.rows,
            seen: userSeen.rows,
        }
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to retrieve user summary from database"})
    }
};

module.exports = {getWatchlistByID, getSeenByID, getUserByID};