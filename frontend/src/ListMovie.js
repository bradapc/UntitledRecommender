import './css/ListMovie.css';
import {useNavigate} from "react-router-dom";

const ListMovie = ({movie}) => {
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
    </div>
  )
}

export default ListMovie
