const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;
const path = require('path');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middleware/verifyJWT');
const apiOptions = require(path.join(__dirname, 'config', 'apiOptions.js'));
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use("/login", require(path.join(__dirname, 'routes', 'login.js')));
app.use("/signup", require(path.join(__dirname, 'routes', 'signup.js')));
app.use("/discover", require('./middleware/checkJWT'), require(path.join(__dirname, 'routes', 'discover.js')));
app.use("/popular", require(path.join(__dirname, 'routes', 'popular.js')));
app.use("/search/title", require(path.join(__dirname, 'routes', 'searchTitle.js')));
app.use("/search/genre", require(path.join(__dirname, 'routes', 'searchGenre.js')));
app.use("/filters", require(path.join(__dirname, 'routes', 'filters')));

app.use("/users", require(path.join(__dirname, 'routes', 'users')));

app.get("/", (req, res) => {
    return res.json({
        status: 'API is running',
        version: '1.0.0',
    })
});

//Login-required routes
app.use("/watchlist", verifyJWT, require(path.join(__dirname, 'routes', 'watchlist.js')));
app.use("/seen", verifyJWT, require(path.join(__dirname, 'routes', 'seen.js')));

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    apiOptions.updateAvailableGenres();
});