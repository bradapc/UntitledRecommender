import Header from './Header';
import Discover from './Discover';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MoviePage from './MoviePage';
import Register from './Register';
import Login from './Login';
import { useEffect, useContext } from 'react';
import {DataContext} from './context/DataContext';

function App() {
  const {apiUrl} = useContext(DataContext);
  const {setIsAuth} = useContext(DataContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/auth/check`, {
          credentials: 'include'
        })
        const resJson = await response.json();
        setIsAuth(resJson.isAuthenticated);
      } catch (err) {
        setIsAuth(false);
      }
    };
    
    checkAuth();
  }, []);

  return (
    <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path='/discover' element={<Discover />} />
              <Route path='/movie/:id' element={<MoviePage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Router>
    </div>
  );
}

export default App;
