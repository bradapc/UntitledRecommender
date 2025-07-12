import {useNavigate} from 'react-router-dom';
import {useEffect, useContext} from 'react';
import {DataContext} from './context/DataContext';

const Logout = () => {
    const {setIsAuth, apiUrl} = useContext(DataContext);
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            localStorage.setItem('isAuth', false);
            setIsAuth(false);

            await fetch(`${apiUrl}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            navigate('/');
        }

        handleLogout();
    }, []);
}

export default Logout
