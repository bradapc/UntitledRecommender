require('dotenv').config();

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY_TMDB}`
    }
}

const searchByTitle = async (req, res) => {
    if (!req || !req.query.title) {
        return res.status(400).json({"message": "Invalid title"});
    }
    
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${req.query.title}&include_adult=true&language=en-US&page=1`, options)
    const jsonObj = await response.json();
    return res.status(200).json({jsonObj})
}

module.exports = {searchByTitle};