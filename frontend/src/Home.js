import { useState } from 'react';
import './css/Home.css';
import {Link, useNavigate} from 'react-router-dom';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate({
      pathname: '/search',
      search: `?title=${searchText}`
    });
  };

  return (
    <div className="Home">
        <div className="SearchWrapper">
          <span>Search for a Movie</span>
          <form className="SearchForm">
              <input className="SearchMovie" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} required></input>
              <button type="submit" className="SubmitSearch" onClick={(e) => handleSearchClick(e)}>Search</button>
          </form>
        </div>
        <div className="MovieCategoriesWrapper">
          <Link to="/discover">
            <div className="MovieCategory discover">
                <h3>Discover</h3>
                <p>Not sure what to watch? Browse random movies, filter to your preferences, and see what catches your eye!</p>
            </div>
          </Link>
          <Link to="/popular">
            <div className="MovieCategory popular">
                <h3>Popular Now</h3>
                <p>What are people watching? Find popular movies based on votes, views, and more.</p>
            </div>
          </Link>
          <Link to="/top-rated">
            <div className="MovieCategory top">
                <h3>Top Rated</h3>
                <p>You can't go wrong with a list of the top rated movies, selected by fellow movie-lovers.</p>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default Home
