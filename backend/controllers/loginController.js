const bcrypt = require('bcrypt');
const db = require('../db');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({"message": "No body sent"});
    }
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(401).json({"message": "Invalid login data"});
    }
    const user = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (!user.rows[0]) {
        return res.status(400).json({"message": "User not found"});
    } else {
        const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!isPasswordMatch) {
            return res.status(403).json({"message": "Error: Login unsuccessful"});
        }
    }
    const token = jwt.sign({userId: user.rows[0].id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false, //DEV ONLY
        sameSite: 'Lax',
        maxAge: 3600000,
        path: '/'
    });
    return res.status(200).json({"message": "User log in successful"});
}

module.exports = {handleLogin};