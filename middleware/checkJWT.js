const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const tokenHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = tokenHeader || req.cookies?.jwt;

    if (!token) {
        req.userId = -1;
        return next();
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {
            req.userId = decoded ? decoded.userId : -1;
            next();
        }
    )
}

module.exports = checkJWT;