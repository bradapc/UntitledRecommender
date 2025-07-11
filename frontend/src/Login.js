import './css/Login.css';
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from 'react';
import {DataContext} from './context/DataContext';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const {apiUrl} = useContext(DataContext);
    const {isAuth, setIsAuth} = useContext(DataContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorStatus, setErrorStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (isAuth) {
        navigate('/');
      }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const postOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({username, password})
        };
        const response = await fetch(`${apiUrl}/login`, postOptions);
        if (!response.ok) {
          setErrorStatus(response.status);
        } else {
          const test = await fetch(`${apiUrl}/watchlist`, {
            credentials: 'include'
          })
          setIsAuth(true);
          navigate('/');
        }
    };

  return (
    <div className="Login">
        {errorStatus != null && (
          <div className="ErrorLogin">
            <span>Error: Username and Password Combination Incorrect</span>
          </div>
        )}
        <form className="LoginForm">
            <div className="LoginTextWrapper">
                <h3>Login</h3>
                <p>Discover Great Movies</p>
            </div>
            <input placeholder="Username" id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input placeholder="Password" id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" className="LoginButton" onClick={(e) => handleLogin(e)}>Login</button>
            <p>Forgot username or password?</p>
        </form>
    </div>
  )
}

export default Login
