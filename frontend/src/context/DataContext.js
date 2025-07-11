import {createContext} from 'react';
import {useState, useEffect} from 'react';

export const DataContext = createContext();

export const DataContextProvider = ({children}) => {
    const [apiUrl, setApiUrl] = useState(process.env.REACT_APP_API_URL || '');
    const [genres, setGenres] = useState({});
    const [sortBy, setSortBy] = useState({});
    const [isAuth, setIsAuth] = useState(() => {
        return localStorage.getItem('isAuth') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isAuth', isAuth);
    }, [isAuth])

    useEffect(() => {
        const getSortByOptionsFromApi = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/filters/sortby`);
            const resJson = await response.json();
            setSortBy(resJson);
        };

        getSortByOptionsFromApi();
    }, []);

    useEffect(() => {
        const getGenresFromApi = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/filters/genres`);
            const jsonArray = await response.json();
            const genreMap = {};
            jsonArray.genres.forEach(genre => genreMap[genre.id] = genre.name);
            setGenres(genreMap);
        };

        getGenresFromApi();
    }, []);

    return (
        <DataContext.Provider value={{
            apiUrl, setApiUrl, genres, sortBy, isAuth, setIsAuth
        }}>
            {children}
        </DataContext.Provider>
    )
};