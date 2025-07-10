import {useState, useContext, useEffect} from 'react';
import {DataContext} from '../context/DataContext';

function useCast(id) {
    const {apiUrl} = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        if (!id) return;
        const getCastByID = async () => {
                setLoading(true);
                setError(null);
            try {
                const response = await fetch(`${apiUrl}/search/cast/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch cast");
                }
                const resJson = await response.json();
                setCast(resJson);
            } catch (err) {
                setError(err);
                setCast([]);
            } finally {
                setLoading(false);
            }
        };
        setCast(getCastByID(id));
    }, [id, apiUrl]);
    return {cast, loading, error};
};

export default useCast;