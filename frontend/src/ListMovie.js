import './css/ListMovie.css';
import {useNavigate} from "react-router-dom";

const ListMovie = ({movie, handleRemoveClicked}) => {
    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/movie/${movie.movie_id}`)
    };

  return (
    <div className="ListMovie" onClick={handleMovieClick} >
        <img className="ListMoviePoster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Movie"></img>
        <span>{movie.title} ({movie.release_date.split("-")[0]})</span>
        <span>Priority: {movie.priority}</span>
        <span>Added on: {movie.added_at.split("T")[0]}</span>
        {movie.notes && <span>Notes</span>}
        <div className="ListMovieButtonWrapper">
          <button className="WatchedButton" >Watched</button>
          <button className="RemoveButton" onClick={(e) => handleRemoveClicked(e, movie.movie_id)}>Remove</button>
        </div>
    </div>
  )
}

export default ListMovie
