import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { Dropdown } from 'react-bootstrap';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const imageName = require('./logo.jpg');


function Header() {
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
                <button className={cx('home-btn')}  onClick={() => navigate('/')}>
                Home
            </button>{' '}
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
                            <Dropdown.Item key={brand.id} onClick={() => handleBrandClick(brand._id)}>{brand.name}</Dropdown.Item>
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
            </div>
            <button className={cx('cart-btn')}>
                <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button className={cx('login-btn')} onClick={handleClick}>
                Log in
            </button>{' '}
        </header>
    );
}

export default Header;
