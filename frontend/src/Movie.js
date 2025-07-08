const Movie = ({movie}) => {
  return (
    <div className="Movie">
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="Movie Poster"
        className="MoviePoster"></img>
        <h2 className="movie-title">{movie.title}</h2>
        <span>{movie.release_date}</span>
        {movie.overview.length < 250 ? <span>{movie.overview}</span> : (
          <div>
            <span>{movie.overview.slice(0, movie.overview.slice(0, 250).lastIndexOf(' '))}...</span>
            <span className="readMoreText"> read more</span>
          </div>
          )}
        <p>{movie.genre_ids.join(', ')}</p>
    </div>
  )
}

export default Movie
