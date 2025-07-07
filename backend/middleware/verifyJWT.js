const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const tokenHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = tokenHeader || req.cookies?.jwt;

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({"message": "You must be logged in."});
            req.userId = decoded.userId;
            next();
        }
    )
}

module.exports = verifyJWT;