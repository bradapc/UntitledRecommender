import Header from './Header';
import {useState, useEffect} from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [discover, setDiscover] = useState([]);

  const handleDiscoverRequest = async () => {
      try {
        const response = await fetch(`${API_URL}/discover`);
        const result = await response.json();
        setDiscover(result);
      } catch (err) {
        console.log(err);
      }
  };

  useEffect(() => {
    handleDiscoverRequest();
  }, [])

  return (
    <div className="App">
        <Header />
        {discover.length ? discover.map(movie => (
            <div>
            <p key={movie.id}>
              {movie.title}
            </p>
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt="Movie Poster"
              style={{width: '300px', height: '300px'}}/>
            </div>
        ))
      : <p>No movies found.</p>}
    </div>
  );
}

export default App;
