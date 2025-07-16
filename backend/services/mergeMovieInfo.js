const mergeOnId = (movieList, movieInfo, genres) => {
    return movieList.map(watch => {
        const movie = movieInfo.find(m => m.id === watch.movie_id) || {};
        delete movie.id;
        const moviesGenre = genres.filter(genre => genre.movie_id === watch.movie_id);
        const genreList = moviesGenre.map(entry => entry.genre_id);
        return {...watch, ...movie, genres: genreList};
    });
};

module.exports = {mergeOnId};