import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './OrderDetailStyles.module.scss';
const cx = classNames.bind(styles);

function OrderDetail() {
    const [cartItems, setCartItems] = useState([]);
    const { orderId } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`http://localhost:8000/orderdetails/${orderId}`, {
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
            <div>
                <h4 style={{ padding: '4rem 0', borderBottom: '1px solid black', width: '100%' }}>Đơn hàng</h4>
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
                                <td className={cx('td')}>{item.sizeId.productId.price} $</td>
                                <td className={cx('td')}>{item.sizeId.productId.price * item.quantity} $</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
