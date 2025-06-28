const {options, getRandomPage, parseMovieJson, getTotalPages} = require('../config/apiOptions');
const discoverUrlBase = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en"

const discoverMovie = async (req, res) => {
    if (!req.body) {
        const movieRes = await getRandomMovieBuffer();
        return res.status(200).json(movieRes);
    };

    const discoverUrl = await getParameterizedDiscoverUrl(req.body);
    if (!discoverUrl) {
        return res.status(400).json({"message": "No results found with filter parameters."});
    }
    const result = await fetch(discoverUrl, options);
    const resJson = await result.json();

    let movieRes = parseMovieJson(resJson);
    let yearFilteredMovies;

    if ((req.body.maxYear || req.body.minYear) && req.body.maxYear != req.body.minYear) {
        const minYear = req.body.minYear ? req.body.minYear : 0;
        const maxYear = req.body.maxYear ? req.body.maxYear : 3000;

        yearFilteredMovies = movieRes.filter(movie => {
            const year = movie.release_date.split("-")[0];
            return year >= minYear && year <= maxYear;
        });
        movieRes = yearFilteredMovies;
    }
    return res.status(200).json(movieRes);
};

const getParameterizedDiscoverUrl = async (filterParams) => {
    let discoverUrl = discoverUrlBase;
    if (filterParams.genre) {
        const genreIds = Array.isArray(filterParams.genre) ? filterParams.genre : [filterParams.genre];
        const genreStr = genreIds.join("|");
        discoverUrl += `&with_genres=${genreStr}`;
    }

    if (filterParams.minYear && filterParams.maxYear && (filterParams.minYear === filterParams.maxYear)) {
        discoverUrl += `&year=${filterParams.minYear}`;
    }

    const totalPages = await getTotalPages(discoverUrl);
    if (totalPages == 0) {
        return undefined;
    }

    discoverUrl += `&page=${getRandomPage(totalPages)}`;
    return discoverUrl;
};

const getRandomMovieBuffer = async () => {
    const result = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${getRandomPage()}&with_original_language=en`, options)
    const resJson = await result.json();
    return parseMovieJson(resJson);
};

module.exports = {discoverMovie};