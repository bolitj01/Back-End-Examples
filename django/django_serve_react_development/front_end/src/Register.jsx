import { useState } from 'react';
import axios from 'axios';
import { useCSRFToken } from './CSRFTokenContext';
import { Link } from 'react-router-dom';

const Register = () => {

    const csrfToken = useCSRFToken();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Registering user', userData, csrfToken);
        try {
            const response = await axios.post(
                'backend/user/create_user/',
                userData,
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                }
            );
            console.log('Registration successful', response.data);
            // Redirect or show success message
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            <Link to="/login">Login</Link>
        </>
    );
};

export default Register;
