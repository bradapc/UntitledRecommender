import {useContext, useEffect} from 'react';
import { DataContext } from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useSeen } from './hooks/useSeen';
import './css/Seen.css';
import RatingBox from './RatingBox';
import ReviewBox from './ReviewBox';

const Seen = () => {
  const {isAuth, genres} = useContext(DataContext);
  const navigate = useNavigate();
  const {seenList} = useSeen();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="Seen">
        {seenList.length > 0 && (
          seenList.map(movie => (
            <div className="SeenMovie" key={movie.movie_id}>
              <img className="SeenMoviePoster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="MoviePoster"></img>
              <div className="SeenInfoText">
                <div className="genreTags">
                {movie.genres && movie.genres.map(genre => (
                  <span key={genre} className="genreTag">{genres[genre]}</span>
                ))}
              </div>
                <h3>{movie.title}</h3>
                <span>{movie.overview}</span>
                <RatingBox movie_id={movie.movie_id} currentRating={movie.rating}/>
                {movie.review != null ? movie.review : (
                  <ReviewBox />
                )}
              </div>
            </div>
          ))
        )}
    </div>
  )
}

export default Seen
