import {DataContext} from '../context/DataContext';
import {useContext, useState} from 'react';

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
        } catch (err) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return {addToSeen, error, isLoading};
}