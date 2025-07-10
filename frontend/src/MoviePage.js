import './css/MoviePage.css';
import useMovie from './hooks/useMovie';
import useCast from './hooks/useCast';
import {useParams} from 'react-router-dom';
import {DataContext} from './context/DataContext';
import {useContext} from 'react';

const MoviePage = () => {
    const {id} = useParams();
    const movieSearch = useMovie(id);
    const castSearch = useCast(id);
    const {movie} = movieSearch;
    const {cast} = castSearch;
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
        {cast.length && (
            <div className="CastContainer">
                <h2 style={{textAlign: "center"}}>Cast</h2>
                <div className="CastWrapper">
                    {cast.map(castMember => (
                        <div className="Cast" key={castMember.id}>
                            <img className="CastImage" src={`https://image.tmdb.org/t/p/w185/${castMember.profile_path}`} alt="Cast Member"></img>
                            <span className="CastName">{castMember.name}</span>
                            <span className="CastCharacter">{castMember.character}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default MoviePage
