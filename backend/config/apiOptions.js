let availableGenres = [];
let availableGenresMap = [];
const sortByOptions = [
    "random",
    "popularity.desc",
    "popularity.asc",
    "vote_average.desc",
    "vote_average.asc",
    "vote_count.desc",
    "vote_count.asc"
];

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY_TMDB}`
    }
}

const getSortByOptions = () => {
    return sortByOptions;
};

const updateAvailableGenres = async () => {
    const result = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const resJson = await result.json();
    availableGenresMap = resJson;
    availableGenres = resJson.genres.map(genre => {
        return genre.id;
    });
};

const getAvailableGenresMap = () => {
    return availableGenresMap;
}

const getAvailableGenres = () => {
    return availableGenres;
};

const getTotalPages = async (discoverUrl) => {
    const result = await fetch(discoverUrl, options);
    const resJson = await result.json();
    return resJson.total_pages;
};

const parseMovieJson = (resJson) => {
    const movieRes = resJson.results.map(movie => ({
        id: movie.id,
        genre_ids: movie.genre_ids,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        overview: movie.overview
    }));
    return movieRes;
};

const getRandomPage = (totalPages) => {
    totalPages = totalPages ? totalPages : 500;
    if (totalPages > 500) {
        totalPages = 500;
    }
    return Math.floor(Math.random() * totalPages + 1);
};

module.exports = {options, getRandomPage, parseMovieJson, getTotalPages, updateAvailableGenres, getAvailableGenres, getAvailableGenresMap, getSortByOptions};