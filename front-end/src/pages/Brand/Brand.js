import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import classNames from 'classnames/bind';
import styles from './BrandStyle.module.scss';

const cx = classNames.bind(styles);

function Brand() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { brandId } = useParams();

    var haveProduct = false;

    useEffect(() => {
        axios
            .get(`http://localhost:8000/products/ProductBrand/${brandId}`)
            .then((response) => {
                haveProduct = true;
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [brandId]);

    function handleDetailClick(productId) {
        console.log('click detail');
        navigate(`/product/${productId}`); // Chuyển đến trang tương ứng với brandId
    }

    return (
        <div className={cx('wrapper')}>
            <h1 className="text-center my-5">Brand</h1>
            {products && products.length == 0 && (
                <p style={{ fontSize: '30px', fontWeight: '700', color: 'red' }}>Don't Have Product</p>
            )}

            <Row xs={1} sm={2} md={4} className="g-4">
                {products.map((product) => (
                    <Col key={products.id}>
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>{product.price}</Card.Text>
                                <Button className="btn btn-primary" onClick={() => handleDetailClick(product._id)}>
                                    Detail
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Brand;
