import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './HomeStyles.scss';

function Home() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/products/newProducts')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8000/products/')
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <h1 className="text-center my-5">New Products</h1>
            <Carousel>
                {products.map((product) => (
                    <Carousel.Item>
                        <img className="d-block w-100" src={product.image} alt="First slide" />
                        <Carousel.Caption>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            {/* <h1 className="text-center my-5">New Products</h1>
            <Row xs={1} sm={2} md={4} className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card>
                            <Card.Img variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.description}</Card.Text>
                                <Card.Text>{product.price}</Card.Text>
                                <button className="btn btn-primary">Add Cart</button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> */}

            <h1 className="text-center my-5">All Product</h1>
            <Row xs={1} sm={2} md={4} className="g-4">
                {allProducts.map((allProducts) => (
                    <Col key={allProducts.id}>
                        <Card>
                            <Card.Img variant="top" src={allProducts.image} />
                            <Card.Body>
                                <Card.Title>{allProducts.name}</Card.Title>
                                <Card.Text>{allProducts.description}</Card.Text>
                                <Card.Text>{allProducts.price}</Card.Text>
                                <Button className="btn btn-primary">Add Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Home;
