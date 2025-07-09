import './css/MoviePage.css';
import useMovie from './hooks/useMovie';
import {useParams} from 'react-router-dom';
import {DataContext} from './context/DataContext';
import {useContext} from 'react';

const MoviePage = () => {
    const {id} = useParams();
    const movieSearch = useMovie(id);
    const {movie} = movieSearch;
    const {genres} = useContext(DataContext);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })

  return (
    <div className="MoviePage">
        {movieSearch.loading && <span>Loading...</span>}
        {movieSearch.error && !movieSearch.loading && <span style={{color: "red"}}>{`${movieSearch.error}`}</span>}
        {movieSearch.movie && (
        <div className="MovieMainWrapper">
            <div className="MoviePosterWrapper">
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="MoviePoster"
                alt="Movie Poster"></img>
            </div>
            <div className="MainMovieInfoWrapper">
                <h1 className="movie-title">{movie.title}</h1>
                {movie.genres && (
                    <div className="genreTags">
                    {movie.genres.map(genre => (
                        <span className="genreTag" key={genre.id}>{genres[genre.id]} </span>
                    ))}
                </div>
                )}
                <p className="movie-release-date">{movie.release_date}</p>
                {movie.runtime < 60 ? (
                    <p className="movie-runtime"><strong>Runtime:</strong> {movie.runtime}m</p>
                ) : (
                    <p className="movie-runtime"><strong>Runtime:</strong> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
                )}
                <p className="movie-overview">{movie.overview}</p>
                <p className="movie-budget"><strong>Budget:</strong> {formatter.format(movie.budget)}</p>
                <p className="movie-revenue"><strong>Revenue:</strong> {formatter.format(movie.revenue)}</p>
            </div>
        </div>
        )}
    </div>
  )
}

export default MoviePage
