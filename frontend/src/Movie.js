import {useContext} from 'react';
import { DataContext } from './context/DataContext';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Movie = ({movie}) => {
  const {genres} = useContext(DataContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="Movie" onClick={() => navigate(`/movie/${movie.id}`)}>
        <div className="genreTags">
            {movie.genre_ids.map(id => (
                <span className="genreTag" key={id}>{genres[id]} </span>
            ))}
        </div>
          <div className="MoviePosterWrapper">
          {!isLoaded && movie.poster_path != null && <div className="placeholder-movie-poster">Loading...</div>}
          <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          className="MoviePoster"
          alt="Movie Poster"
          onLoad={() => setIsLoaded(true)}></img>
        </div>
        <h2 className="movie-title">{movie.title}</h2>
        <span className="movie-release">{movie.release_date}</span>

        {!movie.overview ? <span><em>No overview could be found for this movie</em></span> : movie.overview.length < 250 ?
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
