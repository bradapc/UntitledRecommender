const options = require('../config/apiOptions');

const searchById = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    const jsonObj = await response.json();
    return jsonObj;
};

const searchByTitle = async (title) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=true&language=en-US&page=1`, options)
    const jsonObj = await response.json();
    return jsonObj;
};

module.exports = {searchById, searchByTitle};