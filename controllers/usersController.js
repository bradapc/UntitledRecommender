const db = require('../db');

const getWatchlistByID = async (req, res) => {
    const userId = req.params.userId;
    try {
    const userExists = await db.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (userExists.rowCount === 0) {
        return res.status(404).json({"message": `User with ID ${userId} does not exist.`});
    }

    const userWatchlist = await db.query('SELECT * FROM watchlist WHERE user_id = $1', [userId]);
    return res.status(200).json({userId, watchlist: userWatchlist.rows});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to retrieve from database"});
    }
};

const getSeenByID = async (req, res) => {
    const userId = req.params.userId;
    try {
    const userExists = await db.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (userExists.rowCount === 0) {
        return res.status(404).json({"message": `User with ID ${userId} does not exist.`});
    }

    const userSeen = await db.query('SELECT * FROM movies_seen WHERE user_id = $1', [userId]);
    return res.status(200).json({userId, seen: userSeen.rows});
    } catch (err) {
        console.log(err);
        return res.status(500).json({"message": "Error when attempting to retrieve from database"});
    }
};

module.exports = {getWatchlistByID, getSeenByID};