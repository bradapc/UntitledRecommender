import {useContext} from 'react';
import { DataContext } from './context/DataContext';
import {useState} from 'react';

const Movie = ({movie}) => {
  const {genres} = useContext(DataContext);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="Movie">
        <div className="genreTags">
            {movie.genre_ids.map(id => (
                <span className="genreTag" key={id}>{genres[id]} </span>
            ))}
        </div>
          <div className="MoviePosterWrapper">
          {!isLoaded && <div className="placeholder-movie-poster">Loading...</div>}
          <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          className="MoviePoster"
          onLoad={() => setIsLoaded(true)}></img>
        </div>
        <h2 className="movie-title">{movie.title}</h2>
        <span className="movie-release">{movie.release_date}</span>
        {movie.overview.length < 250 ?
        <span className="movie-overview">{movie.overview}</span> : (
          <div className="movie-overview">
            <span>{movie.overview.slice(0, movie.overview.slice(0, 250).lastIndexOf(' '))}... </span>
            <span className="readMoreText">read more</span>
          </div>
          )}
    </div>
  )
}

export default Movie
