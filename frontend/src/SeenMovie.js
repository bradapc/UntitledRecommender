import { useContext } from 'react';
import RatingBox from './RatingBox';
import ReviewBox from './ReviewBox';
import { DataContext } from './context/DataContext';
import { useAddSeenReview, useRemoveSeenMovie } from './hooks/useSeenOperations';
import { Link } from 'react-router-dom';

const SeenMovie = ({movie, setSeenList, handleDeleteSeenMovie}) => {
    const {genres} = useContext(DataContext);
    const {updateSeenReview} = useAddSeenReview();
    const {removeSeenMovie} = useRemoveSeenMovie();

    const handleDeleteClicked = async () => {
        const res = await removeSeenMovie(movie.movie_id)
        if (res === 200) {
            setSeenList(prevSeenList => (
                prevSeenList.filter(seenMovie => {
                    return seenMovie.movie_id !== movie.movie_id
                })
            ))
        }
    };

    const handleSubmitClicked = (e, review) => {
          e.preventDefault();
          setSeenList(prevSeenList => (
            prevSeenList.map(seenMovie => {
                return seenMovie.movie_id === movie.movie_id ? {...seenMovie, review: review} : {...seenMovie}
            })
          ))
          updateSeenReview(movie.movie_id, review)
      };

  return (
    <div className="SeenMovie" key={movie.movie_id}>
        <img className="SeenMoviePoster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="MoviePoster"></img>
        <div className="SeenInfoText">
            <div className="SeenInfoHead">
                <div className="genreTags">
                    {movie.genres && movie.genres.map(genre => (
                        <span key={genre} className="genreTag">{genres[genre]}</span>
                    ))}
                </div>
                <div>
                <div className="WatchedAtText">
                    {movie.watched_at.split('T')[0]}
                    <span className="WatchedAtTooltip">Date added</span>
                    </div>
                    <button className="DeleteSeenButton" onClick={() => handleDeleteClicked()}>X</button>
                </div>
            </div>
            <Link to={`/movie/${movie.movie_id}`}><h3>{movie.title} ({movie.release_date.slice(0, 4)})</h3> </Link>
            <span>{movie.overview}</span>
            <RatingBox movie_id={movie.movie_id} currentRating={movie.rating}/>
            {movie.review != null ? (
                <div className="AddedReview">
                    <span>{movie.review}</span>
                    <button onClick={(e) => handleSubmitClicked(e, null)}>Delete Review</button>
                </div>
            ) : (
                <ReviewBox movie_id={movie.movie_id} handleSubmitClicked={handleSubmitClicked} />
            )}
        </div>
    </div>
  )
}

export default SeenMovie
