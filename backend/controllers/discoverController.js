const {options, getSortByOptions, getRandomPage, parseMovieJson, getTotalPages, getAvailableGenres} = require('../config/apiOptions');
const discoverUrlBase = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false"
const numQueries = 5;
const db = require('../db');

const discoverMovie = async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        const movieRes = await getRandomMovieBuffer();
        return res.status(200).json(movieRes);
    };

    const discoverUrl = await getParameterizedDiscoverUrl(req.query);
    if (!discoverUrl) {
        return res.status(400).json({"message": "No results found with filter parameters."});
    } else if (discoverUrl.hasOwnProperty("error")) {
        return res.status(400).json(discoverUrl);
    };

    let movieBuffer = await getParameterizedMovieBuffer(discoverUrl);
    let yearFilteredMovies;

    if ((req.query.maxYear || req.query.minYear) && req.query.maxYear != req.query.minYear) {
        const minYear = req.query.minYear ? req.query.minYear : 0;
        const maxYear = req.query.maxYear ? req.query.maxYear : 3000;

        yearFilteredMovies = movieBuffer.filter(movie => {
            const year = movie.release_date.split("-")[0];
            return year >= minYear && year <= maxYear;
        });
        movieBuffer = yearFilteredMovies;
    }

    //If logged in, don't show movies in the user's seen movies list
    if (req.userId) {
        const seenMoviesResult = await db.query('SELECT movie_id FROM movies_seen WHERE user_id = $1', [req.userId]);
        if (seenMoviesResult.rowCount > 0) {
            const seenMovieIds = seenMoviesResult.rows.map(row => row.movie_id);
            movieBuffer = movieBuffer.filter(movie => !seenMovieIds.includes(movie.id));
        }
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
        const genreIds = filterParams.genre.split(',');
        genreIds.forEach(id => {
            if (!getAvailableGenres().includes(Number(id))) {
                return {"error": "Invalid genre in filter query"};
            }
        });
        const genreStr = genreIds.join("|");
        discoverUrl += `&with_genres=${genreStr}`;
    }

    if (filterParams.minYear && filterParams.maxYear && (filterParams.minYear === filterParams.maxYear)) {
        discoverUrl += `&year=${filterParams.minYear}`;
    }

    if (filterParams.englishOnly) {
        discoverUrl += '&original_language=en-US&language=en-US';
    }

    if (filterParams.sortBy && getSortByOptions.includes(filterParams.sortBy)) {
        discoverUrl += `&sort_by=${filterParams.sortBy}`;
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
        const result = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=${rand}`, options)
        const resJson = await result.json();
        const parsedResJson = parseMovieJson(resJson);
        parsedResJson.forEach(movie => {
            movieBuffer.push(movie);
        });
    }
    return movieBuffer;
};

module.exports = {discoverMovie};