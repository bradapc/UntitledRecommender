import Header from './Header';
import Discover from './Discover';
import { DataContextProvider } from './context/DataContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MoviePage from './MoviePage';
import Register from './Register';
import Login from './Login';

function App() {

  return (
    <div className="App">
        <DataContextProvider>
          <Router>
            <Header />
            <Routes>
              <Route path='/discover' element={<Discover />} />
              <Route path='/movie/:id' element={<MoviePage />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Router>
        </DataContextProvider>
    </div>
  );
}

export default App;
