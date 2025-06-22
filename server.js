const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');

app.use(express.json());

app.use(cookieParser());

app.use("/login", require(path.join(__dirname, 'routes', 'login.js')));
app.use("/signup", require(path.join(__dirname, 'routes', 'signup.js')));
app.use("/search", require(path.join(__dirname, 'routes', 'searchTitle.js')));
app.use("/search/genre", require(path.join(__dirname, 'routes', 'searchGenre.js')));

app.use(verifyJWT);
app.use("/addToWhitelist", require(path.join(__dirname, 'routes', 'addToWhitelist.js')));

app.get("/", (req, res) => {
    res.json({
        status: 'API is running',
        version: '1.0.0',
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});