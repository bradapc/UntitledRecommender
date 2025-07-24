import {useContext, useEffect, useState} from 'react';
import { DataContext } from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useSeen } from './hooks/useSeen';
import './css/Seen.css';
import SeenMovie from './SeenMovie';
import { SeenContext } from './context/SeenContext';

const Seen = () => {
  const {isAuth} = useContext(DataContext);
  const navigate = useNavigate();
  const {seenList, setSeenList, refresh} = useContext(SeenContext);
  const [filteredSeenList, setFilteredSeenList] = useState(seenList);
  const [filterRating, setFilterRating] = useState('any');
  const [reviewedStatus, setReviewedStatus] = useState('any');
  const [filterText, setFilterText] = useState('');
  const [sortByProperty, setSortByProperty] = useState('title');
  const [sortByDirection, setSortByDirection] = useState('ASC');

  const handleDirectionToggle = (e) => {
    e.preventDefault();
    setSortByDirection(prev => prev === 'ASC' ? 'DESC' : 'ASC');
  };

  useEffect(() => {
    refresh();
  }, [])

  useEffect(() => {
      let filterList;
      //Filters
      filterList = filterRating === 'any' ? seenList : seenList.filter(movie => Number(movie.rating) === Number(filterRating));
      filterList = reviewedStatus === 'any' ? filterList : reviewedStatus === 'reviewed' ? filterList.filter(movie => movie.review != null) : filterList.filter(movie => movie.review === null);
      filterList = filterList.filter(movie => movie.title.toLowerCase().includes(filterText.toLowerCase()));

      //Sort By
      switch (sortByProperty) {
        case 'title':
          filterList = sortByDirection === 'ASC' ? filterList.sort((movie1, movie2) => movie1.title > movie2.title) : filterList.sort((movie1, movie2) => movie1.title < movie2.title);
          break;
        case 'year':
          filterList = sortByDirection === 'ASC' ? filterList.sort((movie1, movie2) => movie1.release_date > movie2.release_date) : filterList.sort((movie1, movie2) => movie1.release_date < movie2.release_date);
          break;
        case 'rating':
          filterList = sortByDirection === 'ASC' ? filterList.sort((movie1, movie2) => movie1.rating > movie2.rating) : filterList.sort((movie1, movie2) => movie1.rating < movie2.rating);
          break;
        case 'dateAdded':
          filterList = sortByDirection === 'ASC' ? filterList.sort((movie1, movie2) => movie1.watched_at > movie2.watched_at) : filterList.sort((movie1, movie2) => movie1.watched_at < movie2.watched_at);
          break;
        case 'runtime':
          filterList = sortByDirection === 'ASC' ? filterList.sort((movie1, movie2) => movie1.runtime > movie2.runtime) : filterList.sort((movie1, movie2) => movie1.runtime < movie2.runtime);
          break;
        default:
            break;
        }

      setFilteredSeenList(filterList);
  }, [filterRating, seenList, reviewedStatus, filterText, sortByDirection, sortByProperty]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="Seen">
      <h1>You've watched {seenList.length} movies</h1>
      <div className="SeenFilter">
          <form className="SeenFilterForm">
            <input type="text" placeholder="Search movie titles..." value={filterText} onChange={(e) => setFilterText(e.target.value)}></input>
            <div className="SeenFilterOptions">
              <div>
                <label htmlFor="rating">Rating</label>
                  <select name="rating" id="rating" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="5">★★★★★</option>
                    <option value="4">★★★★</option>
                    <option value="3">★★★</option>
                    <option value="2">★★</option>
                    <option value="1">★</option>
                  </select>
              </div>
              <div>
                <label htmlFor="reviewed">Reviewed</label>
                <select name="reviewed" id="reviewed" value={reviewedStatus} onChange={(e) => setReviewedStatus(e.target.value)}>
                  <option value="any">Any</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="notreviewed">Not Reviewed</option>
                </select>
              </div>
              <div>
                <label htmlFor="sortby">Sort By</label>
                <select name="sortby" id="sortby" value={sortByProperty} onChange={(e) => setSortByProperty(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="year">Release Year</option>
                    <option value="rating">User Rating</option>
                    <option value="dateAdded">Date Added</option>
                    <option value="runtime">Runtime</option>
                </select>
              </div>
              <div>
              <label htmlFor="sortByDirectionButton">{sortByDirection}</label>
              <button id="sortByDirectionButton" value={sortByDirection} onClick={(e) => handleDirectionToggle(e)}>{sortByDirection === 'ASC' ? `\u2191` : `\u2193`}</button>
              </div>
            </div>
          </form>
      </div>
        {filteredSeenList.length > 0 && (
          filteredSeenList.map(movie => (
              <SeenMovie key={movie.movie_id} movie={movie} setSeenList={setSeenList} />
          ))
        )}
        {filteredSeenList.length === 0 && (
          <span>Your search yielded no results. Please try again.</span>
        )}
    </div>
  )
}

export default Seen
