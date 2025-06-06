const express = require('express');
const app = express();
const PORT = process.env.PORT || 3300;

app.get("/", (req, res) => {
    res.json({
        status: 'API is running',
        version: '1.0.0',
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});