import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

function CartItem({ item }) {
    return (
        <Col md={4} className="mb-4">
            <Card>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price} VND</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <Button variant="danger">Remove</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CartItem;
