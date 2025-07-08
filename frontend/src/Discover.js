import Movie from './Movie';
import {useState, useEffect, useContext} from 'react';
import {DataContext} from './context/DataContext';
import MovieCarousel from './MovieCarousel';

const Discover = () => {
    const {apiUrl} = useContext(DataContext);
    const [discover, setDiscover] = useState([]);
    const [requestNewDiscover, setRequestNewDiscover] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [movieComponents, setMovieComponents] = useState([]);

    useEffect(() => {
        const handleDiscoverRequest = async () => {
        try {
            const response = await fetch(`${apiUrl}/discover`);
            const result = await response.json();
            setDiscover(result);
        } catch (err) {
            console.log(err);
        }
        };
        handleDiscoverRequest();
    }, [requestNewDiscover])

    useEffect(() => {
        const movieComps = [];

        discover.forEach(movie => {
            movieComps.push(
                <Movie 
                    key={movie.id}
                    movie={movie}
                />
            );
        });
        setMovieComponents(movieComps);
    }, [discover])

    const handleScrollForward = () => {
        if (currentIndex === discover.length - 1) {
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
    </div>
  )
}

export default Discover
