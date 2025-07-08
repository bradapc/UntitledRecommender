import {useContext, useState, useEffect} from 'react';
import {DataContext} from './context/DataContext';

const FilterSelector = ({
    sortBySelection, setSortBySelection, genresSelection, setGenresSelection, minYearSelection, setMinYearSelection, maxYearSelection, setMaxYearSelection, handleFilterSubmit,
    englishOnly, setEnglishOnly
}) => {
    const {genres} = useContext(DataContext);
    const {sortBy} = useContext(DataContext);
    const [genreCheckboxes, setGenreCheckboxes] = useState([]);

    const handleCheckedGenre = (e) => {
        const updatedGenreCheckboxes = genreCheckboxes.map(genreCbx => 
            genreCbx.id === e.target.id ?
            {...genreCbx, checked: !genreCbx.checked}
            : genreCbx
        );
        setGenreCheckboxes(updatedGenreCheckboxes);
    };

    useEffect(() => {
        const checkedGenres = genreCheckboxes.filter(genre => genre.checked).map(genre => genre.id);
        setGenresSelection(checkedGenres);
    }, [genreCheckboxes, setGenresSelection]);

    useEffect(() => {
        setGenreCheckboxes(Object.keys(genres).map(key => ({
        id: key,
        name: genres[key],
        checked: false
        })))
    }, [genres])


  return (
    <form className="FilterSelector">
        <span className="genreWrapperLabel">Genres</span>
        <div className="genreFilterWrapper">
                {genreCheckboxes.map(genre => (
                    <div key={genre.id}>
                        <label htmlFor={genre.id}>{genre.name}</label>
                        <input type="checkbox" checked={genre.checked} id={genre.id} onChange={(e) => handleCheckedGenre(e)}></input>
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
            <button className="FilterSelectorButton" type="reset">Reset</button>
            <div>
                <input id="englishCbx" type="checkbox" checked={englishOnly} onChange={() => setEnglishOnly(!englishOnly)}></input>
                <label htmlFor="englishCbx">English Only</label>
            </div>
        </div>
    </form>
  )
}

export default FilterSelector
