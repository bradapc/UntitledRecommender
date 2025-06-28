const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_KEY_TMDB}`
    }
}

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

module.exports = {options, getRandomPage, parseMovieJson, getTotalPages};