import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product() {
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const { productId } = useParams();
    const [selectedButton, setSelectedButton] = useState(null);

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/products/${productId}`, config)
            .then((response) => {
                setProduct(response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                navigate('/login');
            });
    }, [productId]);

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('row')}>
                <div className={cx('column-left')}>
                    <img src={product.image} alt={product.name} style={{ width: '400px' }} />
                </div>
                <div className={cx('column-right')}>
                    <h1>Name: {product.name}</h1>
                    <p>Brand: {product.brandId && product.brandId.name}</p>
                    <p>Description: {product.description}</p>

                    <div className={cx('display-sizes')}>
                        {product.sizes &&
                            product.sizes.map((size) => (
                                <button
                                    className={cx('size-btn')}
                                    key={size._id}
                                    style={{
                                        backgroundColor: selectedButton === size._id ? 'blue' : 'green',
                                    }}
                                    onClick={() => handleButtonClick(size._id)}
                                >
                                    {size.size}
                                </button>
                            ))}
                    </div>
                    <p>Price: {product.price}</p>
                    <button class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Product;
