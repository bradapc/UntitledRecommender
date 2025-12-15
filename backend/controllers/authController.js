const jwt = require('jsonwebtoken');
require('dotenv').config();
require('cookie-parser');

const checkAuth = (req, res) => {
    const token = req.cookies.jwt;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({isAuthenticated: true, userId: decoded.userId});
    } catch (err) {
        res.status(401).json({isAuthenticated: false});
    }
};

module.exports = {checkAuth}