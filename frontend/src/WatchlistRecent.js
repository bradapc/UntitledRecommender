import React, { useContext, useState, useEffect } from 'react'
import { WatchlistContext } from './context/WatchlistContext'
import './css/WatchlistRecent.css'
import { useNavigate } from 'react-router-dom'

const WatchlistRecent = () => {
    const {watchlist, isLoading, error} = useContext(WatchlistContext)
    const [top5Watchlist, setTop5Watchlist] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        if (watchlist !== undefined) {
            const sortedWatchlist = structuredClone(watchlist)
            .sort((a, b) => b.added_at.localeCompare(a.added_at))
            .slice(0, 5);
            setTop5Watchlist(sortedWatchlist)
        }
    }, [watchlist])

  return (
    <div className="WatchlistRecent">
        <h3>Recent Watchlist Additions</h3>
        <div className="WatchlistRecentContainer">
            {top5Watchlist.length == 0 && <p>No movies found. Start browsing to add some!</p>}
            {top5Watchlist?.length > 0 && top5Watchlist.map((movie) => (
                <div className="RecentWatchlistMovie" key={movie.id}
                onClick={() => navigate(`/movie/${movie.movie_id}`)}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                    <span>{movie.title}</span>
                    <span>Added on</span>
                    <span>{movie.added_at.split("T")[0]}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default WatchlistRecent
