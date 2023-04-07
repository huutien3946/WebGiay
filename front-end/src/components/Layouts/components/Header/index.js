import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from 'react-bootstrap';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import jwt_decode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const imageName = require('./logo.jpg');

function Header() {
    const token = localStorage.getItem('token');
    var username;
    var isLoggedIn = false;

    if (token) {
        const decoded = jwt_decode(token);
        username = decoded.username;
        isLoggedIn = true;
    } else {
        username = null;
    }

    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    function handleClick() {
        navigate('/login');
    }

    function handleBrandClick(brandId) {
        navigate(`/brand/${brandId}`); // Chuyển đến trang tương ứng với brandId
    }

    useEffect(() => {
        axios
            .get('http://localhost:8000/brands/')
            .then((response) => {
                setBrands(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img width="120" alt="Shoe Web" src={imageName} />
                </div>
                <button className={cx('nav-btn')} onClick={() => navigate('/')}>
                    Home
                </button>
                <button className={cx('nav-btn')} onClick={() => navigate('/about')}>
                    About
                </button>
                <button className={cx('nav-btn')} onClick={() => navigate('/contact')}>
                    Contact
                </button>
                {/* dropdown */}
                <Dropdown>
                    <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{ fontSize: '16px', fontWeight: 700 }}
                    >
                        Brands
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ fontSize: '16px', fontWeight: 700 }}>
                        {brands.map((brand) => (
                            <Dropdown.Item key={brand.id} onClick={() => handleBrandClick(brand._id)}>
                                {brand.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <div className={cx('search')}>
                    <input placeholder="Search shoes..." spellcheck={false} />
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <Tippy content="Tìm kiếm">
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </Tippy>
                </div>
                <Link to="/cart">
                    <button className={cx('cart-btn')}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </button>
                </Link>

                {!isLoggedIn ? (
                    <button className={cx('login-btn')} onClick={handleClick}>
                        Log in
                    </button>
                ) : (
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                            style={{ fontSize: '16px', fontWeight: 700 }}
                        >
                            {username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                            style={{ fontSize: '16px', fontWeight: 700, width: '100%', textAlign: 'center' }}
                        >
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/order">Order</Link>{' '}
                            </Dropdown.Item>
                            <Dropdown.Item
                                href="/login"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                }}
                            >
                                Log out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </div>
        </header>
    );
}

export default Header;
