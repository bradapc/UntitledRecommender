import {useContext, useState, useEffect} from 'react';
import { DataContext } from '../context/DataContext';

export function useSearchMovie() {
    const {apiUrl} = useContext(DataContext);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);

    useEffect(() => {
        const getSearchResult = async () => {
            if (!searchQuery || searchQuery.trim() === '') {
                setSearchResult([]);
                setLoading(false);
                return;
            }
            try {
                const getOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const response = await fetch(`${apiUrl}/search?title=${encodeURIComponent(searchQuery)}`, getOptions);
                if (!response.ok) {
                    throw new Error('Could not perform search.');
                }
                const resJson = await response.json();
                setSearchResult(resJson);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getSearchResult();
    }, [searchQuery, apiUrl]);
    return {searchResult, isLoading, error, setSearchQuery};
}