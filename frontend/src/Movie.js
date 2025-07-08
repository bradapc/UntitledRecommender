const Movie = ({movie}) => {
  return (
    <div className="Movie">
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
        <p>{movie.overview}</p>
        <p>{movie.genre_ids.join(', ')}</p>
        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
        alt="Movie Poster"
        className="MoviePoster"></img>
    </div>
  )
}

export default Movie
