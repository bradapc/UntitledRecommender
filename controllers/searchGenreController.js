require('dotenv').config();
const options = require('../config/apiOptions');

const searchByGenre = async (req, res) => {
    const randomPage = Math.floor(Math.random() * 500 + 1);
    const result = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${randomPage}&sort_by=popularity.desc&with_genres=27&with_original_language=en`, options)
    const resJson = await result.json();
    const returnData = resJson.results.map(movie => ({
        id: movie.id,
        title: movie.original_title,
        overview: movie.overview,

    }));
    return res.status(200).json({returnData})
};

module.exports = {searchByGenre};