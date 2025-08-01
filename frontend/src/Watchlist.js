import {useNavigate} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {DataContext} from './context/DataContext';
import ListMovie from './ListMovie';
import './css/Watchlist.css';
import {useRemoveFromWatchlist} from './hooks/useWatchlistOperations';
import {useAddToSeen} from './hooks/useSeenOperations';
import { WatchlistContext } from './context/WatchlistContext';
import { SeenContext } from './context/SeenContext';

const Watchlist = () => {
    const {isAuth} = useContext(DataContext);
    const {watchlist, isLoading, error} = useContext(WatchlistContext);
    const {refresh} = useContext(SeenContext);
    const useRemove = useRemoveFromWatchlist();
    const useSeen = useAddToSeen();
    const navigate = useNavigate();

    const handleRemoveClicked = (e, movie_id) => {
      e.stopPropagation();
      useRemove.removeFromWatchlist(movie_id);
    };

    const handleWatchedClicked = async (e, movie_id) => {
      e.stopPropagation();
      await useSeen.addToSeen(movie_id);
      refresh();
    };

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);
  

  return (
    <div className="Watchlist">
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p style={{color: "red"}}>{error.message}</p>}
        {!isLoading && !error && watchlist && (
          <div className="WatchlistWrapper">
            <h1>Your Watchlist</h1>
            <h3>{watchlist.length} Movies</h3>
            <div className="WatchlistDataWrapper">
              {watchlist.map(movie => (
                  <ListMovie key={movie.id} movie={movie} handleRemoveClicked={handleRemoveClicked} handleWatchedClicked={handleWatchedClicked}/>
              ))}
              </div>
            </div>
        )}
        {!isLoading && !error && !watchlist.length === 0 && <p>No movies found.</p>}
    </div>
  )
}

export default Watchlist
