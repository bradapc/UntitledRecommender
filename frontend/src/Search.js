import { useSearchParams } from "react-router-dom"
import { useSearchMovie } from "./hooks/useSearchMovie";
import { useEffect } from "react";

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
                <div key={movie.id}>
                    <img style={{width: '50px', height: '50px'}} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="MoviePoster"></img>
                    <span>{movie.title}</span>
                    <span>{movie.release_date}</span>
                </div>
            ))
        )}
        {!searchResult && <p>No Results Found.</p>}
    </div>
  )
}

export default Search
