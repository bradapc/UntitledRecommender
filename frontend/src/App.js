import Header from './Header';
import {useState, useEffect} from 'react';
import Movie from './Movie';

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
              <Movie 
                key={movie.id}
                movie={movie}
              />
            </div>
        ))
      : <p>No movies found.</p>}
    </div>
  );
}

export default App;
