import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState([]);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

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

    //delete all
    const handleRemoveAll = () => {
        axios
            .post(
                'http://localhost:8000/cart/clear',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        // fetch cart items here
    }, [cartItems]);

    // Hàm xử lý sự kiện khi click vào nút Xóa sản phẩm
    const handleRemoveProduct = (index, sizeId) => {
        axios
            .post(
                `http://localhost:8000/cart/removeItem/${sizeId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    // params: {
                    //     sizeId,
                    // },
                },
            )
            .then((response) => {
                // xử lý khi xóa thành công

                const newCartItems = [...cartItems];
                newCartItems.splice(index, 1);
                setCartItems(newCartItems);
                console.log(response.data);
            })
            .catch((error) => {
                // xử lý khi có lỗi xảy ra
                console.log('xay ra loi');

                console.log(error.message);
            });
    };

    // update quantity
    const [quantityList, setQuantityList] = useState({});

    const handleUpdateProductQuantity = (index, newQuantity) => {
        const newQuantityList = { ...quantityList };
        newQuantityList[index] = newQuantity;
        setQuantityList(newQuantityList);
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
            {!token && navigate('/login')}
            <h1>Giỏ hàng</h1>{' '}
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
                                    <td style={{ maxHeight: '300px' }} className={cx('td')}>
                                        {item.sizeId.productId.name}
                                    </td>
                                    <td className={cx('td')}>{item.sizeId.size}</td>
                                    <td className={cx('td')}>{item.price} VND</td>
                                    <td className={cx('td')}>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantityList[index] || item.quantity}
                                            onChange={(e) => handleUpdateProductQuantity(index, e.target.value)}
                                        />

                                        <button
                                            className={cx('btn-update')}
                                            onClick={() => handleUpdateProductQuantity(index, quantity)}
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className={cx('td')}>{item.price * item.quantity}</td>
                                    <td className={cx('td')}>
                                        <button
                                            className={cx('btn-delete')}
                                            onClick={() => handleRemoveProduct(index, item.sizeId._id)}
                                        >
                                            Delete
                                        </button>
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
                                    {calculateTotalPrice()}
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="actions">
                        <button className={cx('btn-tt')}>Tiếp tục mua hàng</button>
                        <Link to="/checkout">
                            <button className={cx('btn-tt')}>Thanh toán</button>
                        </Link>
                        <button className={cx('btn-delete')} onClick={() => handleRemoveAll()}>
                            Delete all
                        </button>
                    </div>
                </>
            ) : (
                <p>Giỏ hàng của bạn trống.</p>
            )}
        </div>
    );
}

export default Cart;
