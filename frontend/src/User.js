import React from 'react'
import useUserSummary from './hooks/useUserSummary'
import { useNavigate, useParams } from 'react-router-dom';
import './css/User.css';

const User = () => {
    const {id} = useParams();
    const {userData, error, loading} = useUserSummary(id)
    const navigate = useNavigate();

  return (
    <div className="UserPage">
      {error && !loading && <span>{error.message}</span>}
      {loading && !error && <span>Loading...</span>}
      {!error && !loading && userData && (
        <div className="UserInfoContainer">
            <h1 className="UserInfoTitle">{userData["username"]}</h1>
            <div className="UserStats">
                <div className="UserStatContainer">
                    <span className="UserDataStat">{userData.stats.total_movies_watched}</span>
                    <h3>Movies Seen</h3>
                </div>
                <div className="UserStatContainer">
                    <span className="UserDataStat">{userData.stats.total_movies_watchlisted}</span>
                    <h3>Movies Watchlisted</h3>
                </div>
                <div className="UserStatContainer">
                    <span className="UserDataStat">{userData.stats.average_rating}</span>
                    <h3>Average Rating</h3>
                </div>
            </div>
            <h1 className="UserInfoTitle">Watchlist</h1>
            <div className="UserMovieList">
                {userData.watchlist.map((movie) => (
                    <div key={movie.id} className="UserMovie"
                    onClick={() => navigate(`/movie/${movie.movie_id}`)}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                        <div className="UserMovieTextContainer">
                            <span className="UserMovieTitle">{movie.title}</span>
                            {movie.added_at && <span className="UserAddedOn">Added on {movie.added_at.split("T")[0]}</span>}
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="UserInfoTitle">Seen</h1>
            <div className="UserMovieList">
                {userData.seen.map((movie) => (
                    <div key={movie.id} className="UserMovie"
                    onClick={() => navigate(`/movie/${movie.movie_id}`)}>
                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                        <div className="UserMovieTextContainer">
                            <span className="UserMovieTitle">{movie.title}</span>
                            {movie.watched_at && <span className="UserAddedOn">Watched {movie.watched_at.split("T")[0]}</span>}
                            {movie.rating && <span>{movie.rating}<span className="Star checked">★</span></span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  )
}

export default User
