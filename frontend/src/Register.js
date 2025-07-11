import './css/Register.css';
import {Link} from "react-router-dom";
import {useContext, useState} from 'react';
import {DataContext} from './context/DataContext';
import {useNavigate} from "react-router-dom";

const Register = () => {
    const {apiUrl} = useContext(DataContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorStatus, setErrorStatus] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const postOptions = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        }
        const response = await fetch(`${apiUrl}/signup`, postOptions)
        if (!response.ok) {
            setErrorStatus(response.status);
        } else {
            //LOGIN USER HERE
            navigate('/');
        }
    };

  return (
    <div className="Register">
        {errorStatus != null && (errorStatus === 409 ? (
            <div className="ErrorRegister">
                <span>Username/Email already taken</span>
            </div>
            ) : 
            <div className="ErrorRegister">
                <span>Registration Error</span>
            </div>
        )}
        <form className="RegisterForm">
            <div className="RegisterTextWrapper">
                <h3>Register</h3>
                <p>Discover Great Movies</p>
            </div>
            <input placeholder="Username" id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <input placeholder="Email" id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input placeholder="Password" id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <button type="submit" className="RegisterButton" onClick={(e) => handleRegister(e)}>Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Register
