const db = require('../db');

const getWatchlist = async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({"message": 'Unauthorized: userId missing'});
    }
    try {
        const dbres = await db.query('SELECT * FROM watchlist WHERE user_id = $1', [req.userId]);
        return res.status(200).json(dbres.rows);
    } catch (err) {
        console.error(err);
        return res.status(500).json({"message": "Internal server error"});
    }
};

module.exports = {getWatchlist};