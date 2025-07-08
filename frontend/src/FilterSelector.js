import {useContext} from 'react';
import {DataContext} from './context/DataContext';

const FilterSelector = () => {
    const {genres} = useContext(DataContext);
    const {sortBy} = useContext(DataContext);

  return (
    <div className="FilterSelector">
        <span className="genreWrapperLabel">Genres</span>
        <div className="genreFilterWrapper">
                {Object.keys(genres).map((key) => (
                    <div key={key}>
                        <label htmlFor={key}>{genres[key]}</label>
                        <input type="checkbox"></input>
                    </div>
                ))}
            </div>
        <div className="yearFilterWrapper">
            <label htmlFor="minYear">Min Year</label>
            <input type="text" className="yearBox"></input>
            <label htmlFor="maxYear">Max Year</label>
            <input type="text" className="yearBox"></input>
            <label htmlFor="sortByOption">Sort By</label>
        <select name="sortByOption">
            {sortBy.map(sortOpt => (
                <option value={sortOpt}>{sortOpt}</option>
            ))}
        </select>
        </div>
        
    </div>
  )
}

export default FilterSelector
