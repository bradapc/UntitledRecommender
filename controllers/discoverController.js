const {options, getRandomPage, parseMovieJson, getTotalPages, getAvailableGenres} = require('../config/apiOptions');
const discoverUrlBase = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en"
const numQueries = 5;

const discoverMovie = async (req, res) => {
    if (!req.body) {
        const movieRes = await getRandomMovieBuffer();
        return res.status(200).json(movieRes);
    };

    const discoverUrl = await getParameterizedDiscoverUrl(req.body);
    if (!discoverUrl) {
        return res.status(400).json({"message": "No results found with filter parameters."});
    } else if (discoverUrl.hasOwnProperty("error")) {
        return res.status(400).json(discoverUrl);
    };

    let movieBuffer = await getParameterizedMovieBuffer(discoverUrl);
    let yearFilteredMovies;

    if ((req.body.maxYear || req.body.minYear) && req.body.maxYear != req.body.minYear) {
        const minYear = req.body.minYear ? req.body.minYear : 0;
        const maxYear = req.body.maxYear ? req.body.maxYear : 3000;

        yearFilteredMovies = movieBuffer.filter(movie => {
            const year = movie.release_date.split("-")[0];
            return year >= minYear && year <= maxYear;
        });
        movieBuffer = yearFilteredMovies;
    }
    return res.status(200).json(movieBuffer);
};

const getParameterizedMovieBuffer = async (discoverUrl) => {
    const totalPages = await getTotalPages(discoverUrl);
    const visitedPages = [];
    const safeNumQueries = totalPages < 5 ? totalPages : numQueries; // prevent infinite loop if totalPages < numQueries default
    let movieBuffer = [];
    for (let i = 0; i < safeNumQueries; i++) {
        let rand;
        while (!rand || visitedPages.includes(rand)) {
            rand = getRandomPage(totalPages);
        }
        visitedPages.push(rand);
        const result = await fetch(discoverUrl + `&page=${rand}`, options);
        const resJson = await result.json();
        const parsedResJson = parseMovieJson(resJson);
        parsedResJson.forEach(movie => {
            movieBuffer.push(movie);
        });
    }
    return movieBuffer;
}

const getParameterizedDiscoverUrl = async (filterParams) => {
    let discoverUrl = discoverUrlBase;
    if (filterParams.genre) {
        if (getAvailableGenres().includes(filterParams.genre)) {
            const genreIds = Array.isArray(filterParams.genre) ? filterParams.genre : [filterParams.genre];
            const genreStr = genreIds.join("|");
            discoverUrl += `&with_genres=${genreStr}`;
        } else {
            return {"error": "Invalid genre in filter query"};
        }
    }

    if (filterParams.minYear && filterParams.maxYear && (filterParams.minYear === filterParams.maxYear)) {
        discoverUrl += `&year=${filterParams.minYear}`;
    }

    const totalPages = await getTotalPages(discoverUrl);
    if (totalPages == 0) {
        return undefined;
    }
    return discoverUrl;
};

const getRandomMovieBuffer = async () => {
    const visitedPages = [];
    let movieBuffer = [];
    for (let i = 0; i < numQueries; i++) {
        let rand;
        while (!rand || visitedPages.includes(rand)) {
            rand = getRandomPage();
        }
        visitedPages.push(rand);
        const result = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${rand}&with_original_language=en`, options)
        const resJson = await result.json();
        const parsedResJson = parseMovieJson(resJson);
        parsedResJson.forEach(movie => {
            movieBuffer.push(movie);
        });
    }
    return movieBuffer;
};

module.exports = {discoverMovie};