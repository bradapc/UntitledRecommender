const bcrypt = require('bcrypt');
const db = require('../db');

const signup = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({'message': 'Bad data'});
    }
    const {username, password, email} = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({'message': 'Bad data'});
    }

    //Check database for existing data
    const userResult = await getUserByUsername(username);
    if (userResult) {
        return res.status(409).json({'message': 'User already exists.'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        email,
        hashedPassword
    };
    try {
        await db.query('INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
    } catch (err) {
        console.error(err);
    }
    return res.status(201).json({
        message: `User ${newUser.username} created successfully`
    })
}

const getUserByUsername = async (username) => {
    const dbres = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return dbres.rows[0];
};

module.exports = {signup};