import './css/ListMovie.css';
import {useNavigate} from "react-router-dom";

const ListMovie = ({movie, handleRemoveClicked, handleWatchedClicked}) => {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movie/${movie.movie_id}`)
    };

  return (
    <div className="ListMovie" onClick={handleMovieClick} >
        <div className="ListMoviePosterWrapper">
          <img className="ListMoviePoster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Movie"></img>
          <span className="ListMovieOverview">{movie.overview}</span>
        </div>
        <span>{movie.title} ({movie.release_date.split("-")[0]})</span>
        <span>Priority: {movie.priority}</span>
        <span>Added on {movie.added_at.split("T")[0]}</span>
        {movie.notes && <span>Notes</span>}
        <div className="ListMovieButtonWrapper">
          <button className="WatchedButton" onClick={(e) => handleWatchedClicked(e, movie.movie_id)}>Watched</button>
          <button className="RemoveButton" onClick={(e) => handleRemoveClicked(e, movie.movie_id)}>Remove</button>
        </div>
    </div>
  )
}

export default ListMovie
