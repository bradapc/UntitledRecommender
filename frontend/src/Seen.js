import {useContext, useEffect} from 'react';
import { DataContext } from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useSeen } from './hooks/useSeen';
import './css/Seen.css';
import SeenMovie from './SeenMovie';

const Seen = () => {
  const {isAuth} = useContext(DataContext);
  const navigate = useNavigate();
  const {seenList, setSeenList} = useSeen();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  return (
    <div className="Seen">
        {seenList.length > 0 && (
          seenList.map(movie => (
              <SeenMovie movie={movie} setSeenList={setSeenList} />
          ))
        )}
    </div>
  )
}

export default Seen
