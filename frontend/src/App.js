import Header from './Header';
import Discover from './Discover';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MoviePage from './MoviePage';
import Register from './Register';
import Login from './Login';
import Watchlist from './Watchlist';
import { useEffect, useContext } from 'react';
import {DataContext} from './context/DataContext';
import Logout from './Logout';
import Home from './Home';
import Search from './Search';
import Seen from './Seen';
import Popular from './Popular';
import Cast from './Cast';
import Footer from './Footer';

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
              <Route path='/' element={<Home />} />
              <Route path='/discover' element={<Discover />} />
              <Route path='/movie/:id' element={<MoviePage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/watchlist' element={<Watchlist />} />
              <Route path='/seen' element={<Seen />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/search' element={<Search />} />
              <Route path='/popular' element={<Popular />} />
              <Route path='/cast/:id' element={<Cast />} />
            </Routes>
            <Footer />
          </Router>
    </div>
  );
}

export default App;
