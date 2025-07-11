import './css/Nav.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';

const Nav = () => {
  const [activeNav, setActiveNav] = useState([
    {
      id: 1,
      path: '/',
      text: 'Home',
      active: true
    },
    {
      id: 2,
      path: '/discover',
      text: 'Discover',
      active: false
    },
    {
      id: 3,
      path: '/popular',
      text: 'Popular',
      active: false
    },
    {
      id: 4,
      path: '/top-rated',
      text: 'Top Rated',
      active: false
    },
    {
      id: 5,
      path: '/login',
      text: 'Login',
      active: false
    },
    {
      id: 6,
      path: '/register',
      text: 'Register',
      active: false
    }
  ]);

  const handleNavClick = (key) => {
    setActiveNav(activeNav.map(NavElement => {
      return NavElement.id === key ? {...NavElement, active: true}
      : {...NavElement, active: false}
    }));
  };

  return (
    <div className="Nav">
        {activeNav.map(NavElement => NavElement.active ? (
          <Link to={NavElement.path} className="NavLink" key={NavElement.id} style={{borderBottom: "4px solid #ffffffff"}}>{NavElement.text}</Link>
        )
      : (
          <Link to={NavElement.path} className="NavLink" key={NavElement.id} onClick={() => handleNavClick(NavElement.id)}>{NavElement.text}</Link>
      )
      )}
    </div>
  )
}

export default Nav
