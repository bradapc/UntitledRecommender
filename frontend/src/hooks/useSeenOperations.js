import {DataContext} from '../context/DataContext';
import {useContext, useState} from 'react';
import { SeenContext } from '../context/SeenContext';

export function useRemoveSeenMovie() {
    const {apiUrl} = useContext(DataContext);
    const removeSeenMovie = async (movie_id) => {
        if (!movie_id) {
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/seen/${movie_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (!response.ok) {
                throw new Error("Could not delete movie from database.");
            }
            return response.status;
        } catch (err) {
            console.error(err);
        }
    };
    return {removeSeenMovie};
}

export function useAddSeenReview() {
    const {apiUrl} = useContext(DataContext);
    const updateSeenReview = async (movie_id, review) => {
        if (!movie_id) {
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/seen/${movie_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({review})
            })
            if (!response.ok) {
                console.error('Failed to update review');
            }
        } catch (err) {
            console.error(err);
        }
    };
    return {updateSeenReview};
}

export function useUpdateSeenRating() {
    const {apiUrl} = useContext(DataContext);
    const {refresh} = useContext(SeenContext);
    const updateSeenRating = async (movie_id, rating) => {
        if (!movie_id || rating === undefined || rating == null || rating < 0 || rating > 5) {
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/seen/${movie_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({rating})
            });
            if (!response.ok) {
                console.error(`Failed to update rating ${response.status}`);
            }
            refresh();
        } catch (err) {
            console.error(err);
        }
    };
    return {updateSeenRating};
}

export function useAddToSeen() {
    const {apiUrl, triggerRefresh} = useContext(DataContext);
    const [error, setError] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const addToSeen = async (id) => {
        try {
            setError(null);
            setLoading(false);
            const postOptions = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({movieId: id})
            };
            const response = await fetch(`${apiUrl}/seen`, postOptions);
            if (!response.ok) {
                throw new Error("Could not add movie to seen list");
            }
            triggerRefresh();
            return response.status;
        } catch (err) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return {addToSeen, error, isLoading};
}