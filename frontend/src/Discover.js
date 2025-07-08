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
    const [genresSelection, setGenresSelection] = useState([]);
    const [minYearSelection, setMinYearSelection] = useState('');
    const [maxYearSelection, setMaxYearSelection] = useState('');

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

    const getParameterizedUrl = () => {
        let discoverUrl = `${apiUrl}/discover?`;
        discoverUrl += 'englishOnly=true';
        discoverUrl += (sortBySelection === 'random') ? '' : `&sortBy=${sortBySelection}`;
        discoverUrl += (genresSelection.length === 0) ? '' : `&genre=${genresSelection.join(',')}`;
        discoverUrl += (minYearSelection) ? `&minYear=${minYearSelection}` : '';
        discoverUrl += (maxYearSelection) ? `&maxYear=${maxYearSelection}` : '';
        return discoverUrl;
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setRequestNewDiscover(!requestNewDiscover);
    };

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
        genresSelection={genresSelection}
        setGenresSelection={setGenresSelection}
        minYearSelection={minYearSelection}
        setMinYearSelection={setMinYearSelection}
        maxYearSelection={maxYearSelection}
        setMaxYearSelection={setMaxYearSelection}
        handleFilterSubmit={handleFilterSubmit}
        />
    </div>
  )
}

export default Discover
