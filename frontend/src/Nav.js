import './css/Nav.css';
import {NavLink} from 'react-router-dom';
import {useContext} from 'react';
import {DataContext} from './context/DataContext';

const Nav = () => {
  const {isAuth} = useContext(DataContext);

  return (
    <div className="Nav">
        <NavLink to="/" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Home</NavLink>
        <NavLink to="/discover" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Discover</NavLink>
        <NavLink to="/popular" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Popular</NavLink>
        <NavLink to="/top-rated" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Top Rated</NavLink>
        {isAuth ? (
          <NavLink to="/logout" className="NavLink">Logout</NavLink>
        ) : (
          <>
            <NavLink to="/login" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Login</NavLink>
            <NavLink to="/register" className={({isActive}) => (isActive ? "NavLink active" : "NavLink")}>Register</NavLink>
          </>
        )}
    </div>
  )
}

export default Nav
