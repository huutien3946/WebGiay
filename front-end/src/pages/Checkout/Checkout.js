import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './CheckoutStyles.module.scss';
import {} from 'bootstrap';

const cx = classNames.bind(styles);
function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [price, setPrice] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get('http://localhost:8000/cart', {
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

    return (
        <div className={cx('wrapper')}>
            <div class="row">
                <div className={cx('panel panel-primary col-md-6')}>
                    <h4 style={{ padding: ' 2rem 0', borderBottom: '1px solid black' }}>Nhập thông tin mua hàng </h4>
                    <div className={cx('form-group')}>
                        <label for="usr">Họ và tên:</label>
                        <input required="true" type="text" class="form-control" id="usr" name="fullname" />
                    </div>
                    <div className={cx('form-group')}>
                        <label for="email">Email:</label>
                        <input required="true" type="email" class="form-control" id="email" name="email" />
                    </div>
                    <div className={cx('form-group')}>
                        <label for="phone_number">Số điện thoại:</label>
                        <input required="true" type="text" class="form-control" id="phone_number" name="phone_number" />
                    </div>
                    <div className={cx('form-group')}>
                        <label for="address">Địa chỉ:</label>
                        <input required="true" type="text" class="form-control" id="address" name="address" />
                    </div>
                    <div className={cx('form-group')}>
                        <label for="note">Ghi chú:</label>
                        <textarea className={cx('form-control')} rows="3" name="note" id="note"></textarea>
                    </div>
                </div>

                <div className={cx('panel panel-primary col-md-6')}>
                    <h4 style={{ padding: '2rem 0', borderBottom: '1px solid black' }}>Đơn hàng</h4>
                    <table className={cx('table table-bordered table-hover none')}>
                        <thead>
                            <tr style={{ fontWeight: '500', textAlign: 'center' }}>
                                <th width="50px">STT</th>
                                <th>Hình ảnh</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Size</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className={cx('td')}>
                                        <img src={item.sizeId.productId.image} />
                                    </td>
                                    <td className={cx('td')}>{item.sizeId.productId.name}</td>
                                    <td className={cx('td')}>{item.sizeId.size}</td>
                                    <td className={cx('td')}>{item.quantity}</td>
                                    <td className={cx('td')}>{item.price} VND</td>
                                    <td className={cx('td')}>{item.price * item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>
                        Tổng đơn hàng: <span class="bold red">{price}</span>
                    </p>
                    <a href="dashboard.php">
                        <button className={cx('btn btn-success')}>Đặt hàng</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
