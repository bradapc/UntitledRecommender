import {DataContext} from '../context/DataContext';
import {useContext, useState} from 'react';

export function useRemoveFromWatchlist() {
    const {apiUrl, triggerRefresh} = useContext(DataContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

        const removeFromWatchlist = async (id) => {
            try {
                setError(null);
                setIsLoading(true);
                const deleteOptions = {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const response = await fetch(`${apiUrl}/watchlist/${id}`, deleteOptions);
                if (!response.ok) {
                    throw new Error("Could not delete movie id from watchlist");
                }
                triggerRefresh();
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
    return {removeFromWatchlist, error, isLoading};
}

export function useAddToWatchlist() {
    const {apiUrl} = useContext(DataContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

        const addToWatchlist = async (id) => {
            try {
                setIsLoading(true);
                setError(null);
                const postOptions = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({movieId: id})
                };
                const response = await fetch(`${apiUrl}/watchlist`, postOptions);
                if (!response.ok) {
                    throw new Error('Could not add movie to watchlist');
                }
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

    return {addToWatchlist, isLoading, error};
}

export default useAddToWatchlist;