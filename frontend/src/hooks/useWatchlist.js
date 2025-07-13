import {DataContext} from '../context/DataContext';
import {useContext, useState, useEffect} from 'react';

function useWatchlist() {
    const {isAuth, apiUrl, refresh} = useContext(DataContext);
    const [watchlist, setWatchlist] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getWatchlist = async () => {
            if (!isAuth) {
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${apiUrl}/watchlist`, {
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch watchlist");
                }
                const resJson = await response.json();
                setWatchlist(resJson.watchlist);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };

        getWatchlist();
    }, [isAuth, apiUrl, refresh]);

    return {watchlist, error, isLoading};
}

export default useWatchlist;