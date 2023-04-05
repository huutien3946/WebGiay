import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([]);

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
                console.log(error.response.data.message);
            });
    }, []);

    // Hàm xử lý sự kiện khi click vào nút Xóa sản phẩm
    const handleRemoveProduct = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    // Hàm tính tổng số tiền các sản phẩm trong giỏ hàng
    const calculateTotalPrice = () => {
        let total = 0;
        if (cartItems && cartItems.length) {
            for (let i = 0; i < cartItems.length; i++) {
                total += cartItems[i].price * cartItems[i].quantity;
            }
        }
        return total;
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Giỏ hàng</h1>
            {cartItems.length > 0 ? (
                <>
                    <table className={cx('table')}>
                        <thead className={cx('thead')}>
                            <tr>
                                <th></th>
                                <th>Sản phẩm</th>
                                <th>Size</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={cx('tbody')}>
                            {cartItems.map((item, index) => (
                                <tr key={index}>
                                    <td className={cx('td')}>
                                        <img src={item.sizeId.productId.image} />
                                    </td>
                                    <td className={cx('td')}>{item.sizeId.productId.name}</td>
                                    <td className={cx('td')}>{item.sizeId.size}</td>
                                    <td className={cx('td')}>{item.price} VND</td>
                                    <td className={cx('td')}>{item.quantity}</td>
                                    <td className={cx('td')}>{item.price * item.quantity}</td>
                                    <td className={cx('td')}>
                                        <button onClick={() => handleRemoveProduct(index)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className={cx('tfoot')}>
                            <tr>
                                <td className={cx('td')} colSpan="3">
                                    Tổng tiền:
                                </td>
                                <td className={cx('td')} colSpan="2">
                                    {calculateTotalPrice()} đ
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="actions">
                        <button className={cx('btn-tt')}>Tiếp tục mua hàng</button>
                        <button className={cx('btn-tt')}>Thanh toán</button>
                    </div>
                </>
            ) : (
                <p>Giỏ hàng của bạn trống.</p>
            )}
        </div>
    );
}

export default Cart;
