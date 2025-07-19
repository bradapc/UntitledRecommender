import {useContext, useEffect, useState} from 'react';
import { DataContext } from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useSeen } from './hooks/useSeen';
import './css/Seen.css';
import SeenMovie from './SeenMovie';

const Seen = () => {
  const {isAuth} = useContext(DataContext);
  const navigate = useNavigate();
  const {seenList, setSeenList} = useSeen();
  const [filteredSeenList, setFilteredSeenList] = useState(seenList);
  const [filterRating, setFilterRating] = useState('any');
  const [reviewedStatus, setReviewedStatus] = useState('any');
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
      let filterList;
      filterList = filterRating === 'any' ? seenList : seenList.filter(movie => Number(movie.rating) === Number(filterRating));
      filterList = reviewedStatus === 'any' ? filterList : reviewedStatus === 'reviewed' ? filterList.filter(movie => movie.review != null) : filterList.filter(movie => movie.review === null);
      filterList = filterList.filter(movie => movie.title.toLowerCase().includes(filterText.toLowerCase()));
      console.log(filterList);
      setFilteredSeenList(filterList);
  }, [filterRating, seenList, reviewedStatus, filterText]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="Seen">
      <h1>You've watched {seenList.length} movies</h1>
      <div className="SeenFilter">
          <form>
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
            </div>
            <input type="text" placeholder="Search movie titles..." value={filterText} onChange={(e) => setFilterText(e.target.value)}></input>
            <div className="SeenFilterSort">

            </div>
          </form>
      </div>
        {filteredSeenList.length > 0 && (
          filteredSeenList.map(movie => (
              <SeenMovie key={movie.movie_id} movie={movie} setSeenList={setSeenList} />
          ))
        )}
        {filteredSeenList.length == 0 && (
          <span>Your search yielded no results. Please try again.</span>
        )}
    </div>
  )
}

export default Seen
