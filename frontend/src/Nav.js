import './css/Nav.css';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <div className="Nav">
        <Link to="/" className="NavLink">Home</Link>
        <Link to="/discover" className="NavLink">Discover</Link>
        <Link to="/popular" className="NavLink">Popular</Link>
        <Link to="/top-rated" className="NavLink">Top Rated</Link>
        <Link to="/login" className="NavLink">Login</Link>
        <Link to="/register" className="NavLink">Register</Link>
    </div>
  )
}

export default Nav
