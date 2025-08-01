import { useNavigate } from "react-router-dom"

const CastMovieMini = ({movie}) => {
    const navigate = useNavigate();

  return (
    <div className="CastMovieMini" onClick={() => navigate(`/movie/${movie.movie_id}`)}>
      <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="CastMovieImage"
            alt="Movie Poster"></img>
        <span className="CastMovieMiniTitle">{movie.title}</span>
        <span className="CastMovieMiniCharacter">{movie.character}</span>
    </div>
  )
}

export default CastMovieMini
