import './css/Nav.css';
import {NavLink} from 'react-router-dom';
import {useContext, useState} from 'react';
import {DataContext} from './context/DataContext';

const Nav = () => {
  const {isAuth} = useContext(DataContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => setIsDropdownOpen(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  return (
    <div className="Nav">
        <div className="NavMiddle">
          <NavLink to="/" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Home</NavLink>
          <NavLink to="/discover" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Discover</NavLink>
          <NavLink to="/popular" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Popular</NavLink>
          <NavLink to="/top-rated" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Top Rated</NavLink>
        </div>
        <div className="NavRight">
          {isAuth ? (
            <div className="NavRightWrapper">
              <div className="dropdown-user" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <span className="NavLink">User</span>
              {isDropdownOpen && <div className="nav-dropdown-content">
                  <NavLink to="/watchlist" className="NavLink" onClick={closeDropdown}>Watchlist</NavLink>
                  <NavLink to="/seen" className="NavLink" onClick={closeDropdown}>Seen</NavLink>
              </div>
              }
              </div>
              <NavLink to="/logout" className="NavLink">Logout</NavLink>
            </div>
          ) : (
            <>
              <NavLink to="/login" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Login</NavLink>
              <NavLink to="/register" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Register</NavLink>
            </>
          )}
        </div>
    </div>
  )
}

export default Nav
