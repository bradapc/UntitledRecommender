import {useContext, useEffect} from 'react';
import {DataContext} from './context/DataContext';
import { DiscoverContext } from './context/DiscoverContext';

const FilterSelector = () => {
    const {genres, sortBy} = useContext(DataContext);
    const {
    sortBySelection, setSortBySelection, genreCheckboxes, setGenreCheckboxes, minYearSelection, setMinYearSelection, maxYearSelection, setMaxYearSelection, handleFilterSubmit,
    englishOnly, setEnglishOnly, handleReset} = useContext(DiscoverContext);

    const handleCheckedGenre = (e) => {
        const updatedGenreCheckboxes = genreCheckboxes.map(genreCbx => 
            genreCbx.id === e.target.id ?
            {...genreCbx, checked: !genreCbx.checked}
            : genreCbx
        );
        setGenreCheckboxes(updatedGenreCheckboxes);
    };

    useEffect(() => {
        setGenreCheckboxes(Object.keys(genres).map(key => ({
        id: key,
        name: genres[key],
        checked: false
        })))
    }, [genres])


  return (
    <form className="FilterSelector">
        <span className="filtersWrapperLabel">Filters</span>
        <div className="genreFilterWrapper">
                {genreCheckboxes.map(genre => (
                    <div key={genre.id}>
                        <label htmlFor={genre.id}>{genre.name}</label>
                        <input className="filterCbx" type="checkbox" checked={genre.checked} id={genre.id} onChange={(e) => handleCheckedGenre(e)}></input>
                    </div>
                ))}
            </div>
        <div className="yearFilterWrapper">
            <label htmlFor="minYear">Min Year</label>
            <input id="minYear" type="text" className="yearBox" placeholder="0000" value={minYearSelection} onChange={(e) => setMinYearSelection(e.target.value)}></input>
            <label htmlFor="maxYear">Max Year</label>
            <input id="maxYear" type="text" className="yearBox" placeholder={new Date().getFullYear()} value={maxYearSelection} onChange={(e) => setMaxYearSelection(e.target.value)}></input>
            <label htmlFor="sortByOption">Sort By</label>
        {sortBy.length > 0 && 
        <select id="sortByOption" value={sortBySelection} onChange={(e) => setSortBySelection(e.target.value)}>
            {sortBy.map((sortOpt, index) => (
                <option value={sortOpt} key={index}>{sortOpt}</option>
            ))}
        </select>
         }
        </div>
        <div className="FilterButtonWrapper">
            <button className="FilterSelectorButton" type="submit" onClick={(e) => handleFilterSubmit(e)}>Filter</button>
            <button className="FilterSelectorButton" type="reset" onClick={(e) => handleReset(e)}>Reset</button>
            <div>
                <input className="filterCbx" id="englishCbx" type="checkbox" checked={englishOnly} onChange={() => setEnglishOnly(!englishOnly)}></input>
                <label htmlFor="englishCbx">English Only</label>
            </div>
        </div>
    </form>
  )
}

export default FilterSelector
