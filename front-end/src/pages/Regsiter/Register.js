import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './RegisterStyles.module.scss';

const cx = classNames.bind(styles);
function RegisterForm() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsernamel] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const handleUserNameChange = (event) => {
        setUsernamel(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRePasswordChange = (event) => {
        setRePassword(event.target.value);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios
            .post('http://localhost:8000/auth/register', {
                username,
                password,
                rePassword,
                name,
                phone,
                email,
                address,
            })
            .then((response) => {
                alert(response.data.message);
                navigate('/login');
            })
            .catch((error) => {
                setErrorMessage(error.response.data.message);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('Register')} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className={cx('mb-3')}>
                    <label htmlFor="name" className={cx('form-label')}>
                        Full Name
                    </label>
                    <input type="Text" className={cx('form-control')} id="name" onChange={handleNameChange} />
                </div>
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
                <div className={cx('mb-3')}>
                    <label htmlFor="re-password" className={cx('form-label')}>
                        re-password
                    </label>
                    <input
                        type="password"
                        className={cx('form-control')}
                        id="rePassword"
                        onChange={handleRePasswordChange}
                    />
                </div>
                <div className={cx('mb-3')}>
                    <label htmlFor="email" className={cx('form-label')}>
                        Email
                    </label>
                    <input type="email" className={cx('form-control')} id="email" onChange={handleEmailChange} />
                </div>
                <div className={cx('mb-3')}>
                    <label htmlFor="phone" className={cx('form-label')}>
                        phone
                    </label>
                    <input type="Text" className={cx('form-control')} id="phone" onChange={handlePhoneChange} />
                </div>
                <div className={cx('mb-3')}>
                    <label htmlFor="address" className={cx('form-label')}>
                        address
                    </label>
                    <input type="Text" className={cx('form-control')} id="address" onChange={handleAddressChange} />
                </div>
                <button type="submit" className={cx('btn-primary')}>
                    Sign Up
                </button>
                {errorMessage && <div className={cx('alert alert-danger mt-3')}>{errorMessage}</div>}
            </form>
        </div>
    );
}

export default RegisterForm;
