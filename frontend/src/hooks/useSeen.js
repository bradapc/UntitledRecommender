import { useState, useEffect, useContext } from 'react';
import { DataContext } from '../context/DataContext';

export function useSeen() {
    const {apiUrl, isAuth} = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seenList, setSeenList] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!isAuth) return;

        const getSeenMovies = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch(`${apiUrl}/seen`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch seen movie data");
                }
                const result = await response.json();
                const seenList = result.seen;
                setSeenList(seenList);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false)
            }
        };
        getSeenMovies();
    }, [apiUrl, refresh, isAuth]);

    return {seenList, error, isLoading};
}