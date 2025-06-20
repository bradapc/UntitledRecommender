const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;
const path = require('path');

app.use("/search", require(path.join(__dirname, 'routes', 'searchTitle.js')));

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY_TMDB}`
    }
}

app.use("/search/genre", require(path.join(__dirname, 'routes', 'searchGenre.js')));

app.get("/", (req, res) => {
    res.json({
        status: 'API is running',
        version: '1.0.0',
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});