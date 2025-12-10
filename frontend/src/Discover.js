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
        : (
          <div className="MovieCarousel">
            <h1>Loading...</h1>
          </div>
        )}
        <FilterSelector />
    </div>
  )
}

export default Discover
