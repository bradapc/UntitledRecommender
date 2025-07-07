import Header from './Header';
import {useState, useEffect} from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [discover, setDiscover] = useState([]);

  const handleDiscoverRequest = async () => {
      try {
        const response = await fetch(`${API_URL}/discover`);
        console.log(API_URL);
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
        {discover ? discover.map(movie => (
            <p>{movie.name}</p>
        ))
      : <p>No movies found.</p>}
    </div>
  );
}

export default App;
