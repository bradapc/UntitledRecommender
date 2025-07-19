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

  useEffect(() => {
      let filterList;
      if (filterRating === 'any') {
        setFilteredSeenList(seenList);
        return;
      }
      filterList = filterRating === 'any' ? filteredSeenList : seenList.filter(movie => Number(movie.rating) === Number(filterRating));
      setFilteredSeenList(filterList);
  }, [filterRating, seenList]);

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
            <div className="SeenFilterSort">

            </div>
          </form>
      </div>
        {filteredSeenList.length > 0 && (
          filteredSeenList.map(movie => (
              <SeenMovie key={movie.movie_id} movie={movie} setSeenList={setSeenList} />
          ))
        )}
    </div>
  )
}

export default Seen
