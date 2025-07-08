import {useContext} from 'react';
import {DataContext} from './context/DataContext';

const FilterSelector = () => {
    const {genres} = useContext(DataContext);

  return (
    <div className="FilterSelector">
        <span className="genreWrapperLabel">Genres</span>
        <div className="genreFilterWrapper">
                {Object.keys(genres).map((key) => (
                    <div>
                        <label htmlFor={key}>{genres[key]}</label>
                        <input type="checkbox" key={key}></input>
                    </div>
                ))}
            </div>
        <div className="yearFilterWrapper">
            <label htmlFor="minYear">Minimum Year</label>
            <input type="text" className="yearBox"></input>
            <label htmlFor="maxYear">Maximum Year</label>
            <input type="text" className="yearBox"></input>
        </div>
    </div>
  )
}

export default FilterSelector
