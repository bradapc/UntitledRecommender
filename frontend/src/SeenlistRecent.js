import React, { useContext, useState, useEffect } from 'react'
import { SeenContext } from './context/SeenContext'
import './css/WatchlistRecent.css'
import { useNavigate } from 'react-router-dom'

const SeenlistRecent = () => {
    const {seenList, isLoading, error} = useContext(SeenContext)
    const [top5Seen, setTop5Seen] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        if (seenList !== undefined) {
            const sortedSeen = structuredClone(seenList)
            .sort((a, b) => b.watched_at.localeCompare(a.watched_at))
            .slice(0, 5);
            setTop5Seen(sortedSeen)
        }
    }, [seenList])

  return (
    <div className="WatchlistRecent">
        <h3>Recently Seen Movies</h3>
        <div className="WatchlistRecentContainer">
            {top5Seen.length == 0 && <p>No movies found. Start browsing to add some!</p>}
            {top5Seen?.length > 0 && top5Seen.map((movie) => (
                <div className="RecentWatchlistMovie" key={movie.id}
                onClick={() => navigate(`/movie/${movie.movie_id}`)}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                    <span>{movie.title}</span>
                    <span>Added on</span>
                    <span>{movie.watched_at.split("T")[0]}</span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SeenlistRecent
