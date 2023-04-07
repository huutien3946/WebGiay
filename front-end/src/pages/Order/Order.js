import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './OrderStyles.module.scss';
const cx = classNames.bind(styles);

function Order() {
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/cart/price', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => {
                setPrice(response.data.total);
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response.data.message == 'Token expired!') {
                    localStorage.removeItem('token');
                    navigate('/login');
                    alert('Please Login again');
                }
            });
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get('http://localhost:8000/orders', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })
            .then((response) => {
                setCartItems(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                if (error.response.data.message == 'Token expired!') {
                    localStorage.removeItem('token');
                    navigate('/login');
                    alert('Please Login again');
                }
            });
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('panel panel-primary col-md-6')}>
                <h4 style={{ padding: '2rem 0', borderBottom: '1px solid black' }}>Đơn hàng</h4>
                <table className={cx('table table-bordered table-hover none')}>
                    <thead>
                        <tr style={{ fontWeight: '500', textAlign: 'center' }}>
                            <th width="50px">STT</th>
                            <th>Họ tên</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Địa chỉ giao hàng</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className={cx('tbody')}>
                        {cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td className={cx('td')}>{item.name}</td>
                                <td className={cx('td')}>{item.phone}</td>
                                <td className={cx('td')}>{item.email} </td>
                                <td className={cx('td')}>{item.address} </td>
                                <td className={cx('td')}>{item.orderStatus} </td>
                                <td className={cx('td')}>
                                    <button
                                        className={cx('btn-delete')}
                                        onClick={() => navigate(`/orderdetail/${item._id}`)}
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Order;
