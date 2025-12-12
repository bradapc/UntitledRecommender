import {useContext, useState, useEffect} from 'react';
import {DataContext} from '../context/DataContext';

function useMovieReviews(id) {
    const {apiUrl} = useContext(DataContext);
    const [movieReviews, setMovieReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const getMovieReviewsById = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${apiUrl}/movie/${id}/reviews`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const resJson = await response.json();
                setMovieReviews(resJson.reviews);
            } catch (err) {
                setError(err);
                setMovieReviews(null);
            } finally {
                setLoading(false);
            }
        };
        setMovieReviews(getMovieReviewsById());
    }, [id, apiUrl])
    return {movieReviews, loading, error};
}

export default useMovieReviews;