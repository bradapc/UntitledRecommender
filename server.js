const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;
const path = require('path');

app.use("/search", require(path.join(__dirname, 'routes', 'searchTitle.js')));

app.get("/", (req, res) => {
    res.json({
        status: 'API is running',
        version: '1.0.0',
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});