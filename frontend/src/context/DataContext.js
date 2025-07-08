import {createContext} from 'react';
import {useState, useEffect} from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API_URL || '');
    const [genres, setGenres] = useState({});

    useEffect(() => {
        const getGenresFromApi = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/genres`);
            const jsonArray = await response.json();
            const genreMap = {};
            jsonArray.genres.forEach(genre => genreMap[genre.id] = genre.name);
            setGenres(genreMap);
        };

        getGenresFromApi();
    }, []);

    return (
        <DataContext.Provider value={{
            apiUrl, setApiUrl, genres
        }}>
            {children}
        </DataContext.Provider>
    )
};