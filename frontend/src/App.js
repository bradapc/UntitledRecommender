import Header from './Header';
import Discover from './Discover';
import { DataContextProvider } from './context/DataContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MoviePage from './MoviePage';

function App() {

  return (
    <div className="App">
        <DataContextProvider>
          <Header />
          <Router>
            <Routes>
              <Route path='/' element={<Discover />} />
              <Route path='/movie/:id' element={<MoviePage />} />
            </Routes>
          </Router>
        </DataContextProvider>
    </div>
  );
}

export default App;
