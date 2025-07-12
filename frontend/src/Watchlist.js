import {useNavigate} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {DataContext} from './context/DataContext';
import useWatchlist from './hooks/useWatchlist';
import ListMovie from './ListMovie';
import './css/Watchlist.css';

const Watchlist = () => {
    const {isAuth} = useContext(DataContext);
    const {watchlist, isLoading, error} = useWatchlist();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);
  

  return (
    <div className="Watchlist">
        {isLoading && <p>Loading...</p>}
        {!isLoading && error && <p style={{color: "red"}}>{error}</p>}
        {!isLoading && !error && watchlist && (
            watchlist.map(movie => (
                <ListMovie key={movie.id} movie={movie} />
            ))
        )}
        {!isLoading && !error && !watchlist.length === 0 && <p>No movies found.</p>}
    </div>
  )
}

export default Watchlist
