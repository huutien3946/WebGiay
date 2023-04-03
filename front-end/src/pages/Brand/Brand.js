import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, Button } from 'react-bootstrap';

import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';

import './BrandStyle.scss';


function Brand() {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const { brandId } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:8000//products/ProductBrand/${brandId}`)
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    return (
        <div className="container">
           
            <h1 className="text-center my-5">Brand</h1>
            <Row xs={1} sm={2} md={4} className="g-4">
                {allProducts.map((allProducts) => (
                    <Col key={allProducts.id}>
                        <Card>
                            <Card.Img variant="top" src={allProducts.image} />
                            <Card.Body>
                                <Card.Title>{allProducts.name}</Card.Title>
                                <Card.Text>{allProducts.description}</Card.Text>
                                <Card.Text>{allProducts.price}</Card.Text>
                                <Button className="btn btn-primary">Detail</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Brand;