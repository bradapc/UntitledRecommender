import React from 'react'
import useUserSummary from './hooks/useUserSummary'
import { useParams } from 'react-router-dom';
import './css/User.css';

const User = () => {
    const {id} = useParams();
    const {userData, error, loading} = useUserSummary(id)
    console.log(userData);
  return (
    <div className="UserPage">
      {error && !loading && <span>{error.message}</span>}
      {loading && !error && <span>Loading...</span>}
      {!error && !loading && userData && (
        <div className="UserInfoContainer">
            <h1 className="Username">{userData["username"]}</h1>
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
            <div className="UserWatchlist">
                {userData.watchlist.map((movie) => {
                    <span>{movie.movie_id}</span>
                })}
            </div>
        </div>
      )}
    </div>
  )
}

export default User
