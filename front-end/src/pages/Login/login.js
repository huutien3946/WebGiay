import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './LoginStyles.module.scss';

const cx = classNames.bind(styles);
function LoginForm() {
    const [username, setUsernamel] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleUserNameChange = (event) => {
        setUsernamel(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios
            .post('http://localhost:8000/auth/login', {
                username: username,
                password: password,
            })
            .then((response) => {
                const token = response.data.accessToken;
                console.log(token);
                localStorage.setItem('token', token); // Lưu token vào local storage

                setIsLoggedIn(true);
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className={cx('wrapper')}>
            {/* <div className="container mt-5"> */}
            <form className={cx('login-form')} onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className={cx('mb-3')}>
                    <label htmlFor="username" className={cx('form-label')}>
                        Username
                    </label>
                    <input type="Text" className={cx('form-control')} id="username" onChange={handleUserNameChange} />
                </div>
                <div className={cx('mb-3')}>
                    <label htmlFor="password" className={cx('form-label')}>
                        Password
                    </label>
                    <input
                        type="password"
                        className={cx('form-control')}
                        id="password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit" className={cx('btn-primary')}>
                    Login
                </button>

                <p>
                    Don't have an account?
                    <Link to="/register" className={cx('link-danger')}>
                        Register
                    </Link>
                </p>

                {errorMessage && <div className={cx('alert alert-danger mt-3')}>{errorMessage}</div>}
            </form>
            {/* </div> */}
        </div>
    );
}

export default LoginForm;
