import {useContext, useState, useEffect} from 'react';
import {DataContext} from '../context/DataContext';

function useMovie(id) {
    const {apiUrl} = useContext(DataContext);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const getMovieById = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${apiUrl}/movie/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const resJson = await response.json();
                setMovie(resJson.movieResult);
            } catch (err) {
                setError(err);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };
        setMovie(getMovieById(id));
    }, [id, apiUrl])
    return {movie, loading, error};
}

export default useMovie;