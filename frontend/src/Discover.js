import Movie from './Movie';
import {useState, useEffect, useContext} from 'react';
import {DataContext} from './context/DataContext';
import MovieCarousel from './MovieCarousel';
import FilterSelector from './FilterSelector';

const Discover = () => {
    const {apiUrl} = useContext(DataContext);
    const [discover, setDiscover] = useState([]);
    const [requestNewDiscover, setRequestNewDiscover] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieComponents, setMovieComponents] = useState([]);

    //Filter Options
    const [sortBySelection, setSortBySelection] = useState('random');
    const [genreCheckboxes, setGenreCheckboxes] = useState([]);
    const [minYearSelection, setMinYearSelection] = useState('');
    const [maxYearSelection, setMaxYearSelection] = useState('');
    const [englishOnly, setEnglishOnly] = useState(false);

    useEffect(() => {
        const handleDiscoverRequest = async () => {
        try {
            const response = await fetch(getParameterizedUrl());
            const result = await response.json();
            setDiscover(result);
        } catch (err) {
            console.log(err);
        }
        };
        handleDiscoverRequest();
    }, [requestNewDiscover, apiUrl])

    useEffect(() => {

        const movieComps = discover.map(movie => (
            <Movie 
                key={movie.id}
                movie={movie}
            />
        ));
        setMovieComponents(movieComps);
    }, [discover])

    const getSelectedGenres = () => {
        return genreCheckboxes.filter(genreCbx => genreCbx.checked).map(genreCbx => genreCbx.id);
    };

    const getParameterizedUrl = () => {
        let discoverUrl = `${apiUrl}/discover?`;
        discoverUrl += (sortBySelection === 'random') ? '' : `&sortBy=${sortBySelection}`;
        discoverUrl += (getSelectedGenres().length === 0) ? '' : `&genre=${getSelectedGenres().join(',')}`;
        discoverUrl += (minYearSelection) ? `&minYear=${minYearSelection}` : '';
        discoverUrl += (maxYearSelection) ? `&maxYear=${maxYearSelection}` : '';
        discoverUrl += englishOnly ? `&englishOnly=true` : '';
        return discoverUrl;
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setRequestNewDiscover(!requestNewDiscover);
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
        setRequestNewDiscover(!requestNewDiscover);
    }

    const handleScrollForward = () => {
        if (currentIndex === discover.length - 1) {
            setRequestNewDiscover(!requestNewDiscover);
            return setCurrentIndex(0);
        }
        return setCurrentIndex(currentIndex+1);
    }

    const handleScrollBack = () => {
        if (currentIndex === 0) {
            return setCurrentIndex(discover.length - 1);
        }
        return setCurrentIndex(currentIndex-1);
    }

  return (
    
    <div>
        {discover.length ?
            <MovieCarousel
            currentMovie={movieComponents[currentIndex]}
            handleScrollBack={handleScrollBack}
            handleScrollForward={handleScrollForward}
            />
        : <p>No movies found.</p>}
        <FilterSelector 
        sortBySelection={sortBySelection}
        setSortBySelection={setSortBySelection}
        genreCheckboxes={genreCheckboxes}
        setGenreCheckboxes={setGenreCheckboxes}
        minYearSelection={minYearSelection}
        setMinYearSelection={setMinYearSelection}
        maxYearSelection={maxYearSelection}
        setMaxYearSelection={setMaxYearSelection}
        handleFilterSubmit={handleFilterSubmit}
        englishOnly={englishOnly}
        setEnglishOnly={setEnglishOnly}
        handleReset={handleReset}
        />
    </div>
  )
}

export default Discover
