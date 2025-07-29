const {options} = require('../config/apiOptions');

const searchById = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    const jsonObj = await response.json();
    return jsonObj;
};

const searchByTitle = async (title) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options)
    const jsonObj = await response.json();
    return jsonObj;
};

const searchCastByID = async (id) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options);
    const jsonObj = await response.json();
    return jsonObj; 
};

const searchPersonById = async (cast_id) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${cast_id}?language=en-US`, options);
    const jsonObj = await response.json();
    return jsonObj;
};

const searchCastedInByCastId = async (cast_id) => {
    const response = await fetch(`https://api.themoviedb.org/3/person/${cast_id}/movie_credits?language=en-US`, options);
    const jsonObj = await response.json();
    return jsonObj
};

module.exports = {searchById, searchByTitle, searchCastByID, searchPersonById, searchCastedInByCastId};