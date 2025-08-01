import { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataContext";

function useCastMember(id) {
    const {apiUrl} = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);
    const [castInfo, setCastInfo] = useState({});

    useEffect(() => {
        if (!id) return;
        const getCastMember = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${apiUrl}/search/person/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error("Could not fetch cast member data");
                }
                const jsonObj = await response.json();
                setCastInfo(jsonObj.personResult);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getCastMember();
    }, [id, apiUrl]);
    return {castInfo, loading, error};
};

export default useCastMember;