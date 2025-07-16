import {createContext} from 'react';
import {useState, useEffect, useContext} from 'react';
import Movie from '../Movie';
import {DataContext} from './DataContext';

export const DiscoverContext = createContext();

export const DiscoverContextProvider = ({children}) => {
    const {apiUrl} = useContext(DataContext);
    const [discover, setDiscover] = useState([]);
    const [requestNewDiscover, setRequestNewDiscover] = useState(false);
    const [requestClearDiscover, setRequestClearDiscover] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieComponents, setMovieComponents] = useState([]);
    const currentMovie = movieComponents[currentIndex];

    //Filter Options
    const [sortBySelection, setSortBySelection] = useState('random');
    const [genreCheckboxes, setGenreCheckboxes] = useState([]);
    const [minYearSelection, setMinYearSelection] = useState('');
    const [maxYearSelection, setMaxYearSelection] = useState('');
    const [englishOnly, setEnglishOnly] = useState(false);

    useEffect(() => {
        const getParameterizedUrl = () => {
            let discoverUrl = `${apiUrl}/discover?`;
            discoverUrl += (sortBySelection === 'random') ? '' : `&sortBy=${sortBySelection}`;
            discoverUrl += (getSelectedGenres().length === 0) ? '' : `&genre=${getSelectedGenres().join(',')}`;
            discoverUrl += (minYearSelection) ? `&minYear=${minYearSelection}` : '';
            discoverUrl += (maxYearSelection) ? `&maxYear=${maxYearSelection}` : '';
            discoverUrl += englishOnly ? `&englishOnly=true` : '';
            return discoverUrl;
        };

        const handleDiscoverRequest = async () => {
        try {
            const response = await fetch(getParameterizedUrl());
            const result = await response.json();
            setDiscover(prevDiscover => [...prevDiscover, ...result]);
        } catch (err) {
            console.log(err);
        }
        };
        handleDiscoverRequest();
    }, [requestNewDiscover])

    useEffect(() => {

        const movieComps = discover.map(movie => (
            <Movie 
                key={movie.id}
                movie={movie}
            />
        ));
        setMovieComponents(movieComps);
    }, [discover]);

    useEffect(() => {
        setDiscover([]);
        setRequestNewDiscover(!requestNewDiscover);
    }, [requestClearDiscover]);

    const getSelectedGenres = () => {
        return genreCheckboxes.filter(genreCbx => genreCbx.checked).map(genreCbx => genreCbx.id);
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setRequestClearDiscover(!requestClearDiscover);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setSortBySelection('random');
        setGenreCheckboxes(genreCheckboxes.map(genre => {
            return {...genre, checked: false}
        }))
        setMinYearSelection('');
        setMaxYearSelection('');
        setEnglishOnly(false);
        setRequestClearDiscover(!requestClearDiscover);
    }

    const handleScrollForward = () => {
        if (currentIndex === discover.length - 1) {
            setRequestNewDiscover(!requestNewDiscover);
        }
        return setCurrentIndex(currentIndex+1);
    }

    const handleScrollBack = () => {
        if (currentIndex > 0) {
            return setCurrentIndex(currentIndex-1);
        }
    }

    return (
        <DiscoverContext.Provider value ={{
            apiUrl, discover, setDiscover, requestNewDiscover, setRequestNewDiscover, currentIndex, setCurrentIndex, movieComponents, setMovieComponents, sortBySelection, setSortBySelection, genreCheckboxes, setGenreCheckboxes, minYearSelection, setMinYearSelection, maxYearSelection, setMaxYearSelection, englishOnly, setEnglishOnly, handleFilterSubmit, handleScrollForward, handleScrollBack, handleReset, currentMovie
        }}>
            {children}
        </DiscoverContext.Provider>
    )
};