import {useContext} from 'react';
import { DiscoverContext } from './context/DiscoverContext';
import MovieCarousel from './MovieCarousel';
import FilterSelector from './FilterSelector';

const Discover = () => {
    const {discover} = useContext(DiscoverContext);

  return (
    
    <div>
        {discover.length ?
            <MovieCarousel movieContext={DiscoverContext}/>
        : <p>No movies found.</p>}
        <FilterSelector />
    </div>
  )
}

export default Discover
