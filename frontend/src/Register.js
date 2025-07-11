import './css/Register.css';
import {Link} from "react-router-dom";

const Register = () => {
  return (
    <div className="Register">
        <form className="RegisterForm">
            <div className="RegisterTextWrapper">
                <h3>Register</h3>
                <p>Register to Discover Great Movies</p>
            </div>
            <input placeholder="Username" id="username" type="text" required></input>
            <input placeholder="Email" id="email" type="email" required></input>
            <input placeholder="Password" id="password" type="password" required></input>
            <button type="submit" className="RegisterButton">Register</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default Register
