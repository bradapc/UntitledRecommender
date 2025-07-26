import { createContext, useContext, useState, useEffect } from "react";
import {DataContext} from './DataContext';
import Movie from '../Movie';

export const PopularContext = createContext();

export const PopularContextProvider = ({children}) => {
    const {apiUrl} = useContext(DataContext);
    const [popularMovies, setPopularMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieComponents, setMovieComponents] = useState([]);
    const currentMovie = movieComponents[currentIndex];

    const getPopularMovies = async () => {
        const response = await fetch(`${apiUrl}/popular`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.error("Error: Could not fetch popular movies.");
        }
        const resJson = await response.json();
        setPopularMovies(resJson.results);
    };

    const handleScrollForward = () => {
        if (currentIndex < popularMovies.length - 1) {
            return setCurrentIndex(currentIndex+1);
        }
    }

    const handleScrollBack = () => {
        if (currentIndex > 0) {
            return setCurrentIndex(currentIndex-1);
        }
    }

    useEffect(() => {

        const movieComps = popularMovies.map(movie => (
            <Movie 
                key={movie.id}
                movie={movie}
            />
        ));
        setMovieComponents(movieComps);
    }, [popularMovies]);

    useEffect(() => {
        getPopularMovies();
    }, []);

    return (
        <PopularContext.Provider value={{
            popularMovies, handleScrollBack, handleScrollForward, currentMovie
        }}>
            {children}
        </PopularContext.Provider>
    )
};