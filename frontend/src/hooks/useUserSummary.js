import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";

function useUserSummary(id) {
    const {apiUrl} = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!id) return;
        const getUserSummaryByID = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${apiUrl}/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch user summary data")
                }
                const resJson = await response.json();
                setUserData(resJson);
            } catch (err) {
                setUserData(null);
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        setUserData(getUserSummaryByID())
    }, [id, apiUrl]);
    return {userData, loading, error}
}

export default useUserSummary;