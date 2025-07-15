import { useSearchParams, Link } from "react-router-dom"
import { useSearchMovie } from "./hooks/useSearchMovie";
import { useEffect } from "react";
import './css/Search.css';

const Search = () => {
    const [searchParams] = useSearchParams();
    const {searchResult, isLoading, error, setSearchQuery} = useSearchMovie();

    useEffect(() => {
        setSearchQuery(searchParams.get('title'));
    }, [searchParams]);

  return (
    <div className="Search">
        <h3>
            Showing results for {searchParams.get('title')}
        </h3>
        {searchResult && searchResult.movieResult && (
            searchResult.movieResult.results.map(movie => (
                <div key={movie.id} className="SearchMovieContainer">
                    <img className="SearchMoviePoster" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="MoviePoster"></img>
                    <div className="SearchMovieTextWrapper">
                        <Link to={`/movie/${movie.id}`}><span className="SearchMovieTitle">{movie.title} ({movie.release_date.split('-')[0]})</span></Link>
                        <span className="SearchMovieOverview">{movie.overview}</span>
                    </div>
                </div>
            ))
        )}
        {!searchResult && <p>No Results Found.</p>}
    </div>
  )
}

export default Search
