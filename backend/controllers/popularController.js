const {options} = require('../config/apiOptions');

const getPopularMovies = async (req, res) => {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
    const resJson = await response.json();
    return res.status(200).json(resJson);
};

module.exports = {getPopularMovies};