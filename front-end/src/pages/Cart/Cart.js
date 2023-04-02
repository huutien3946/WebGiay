import React from 'react';
import { Container } from 'react-bootstrap';
import CartList from './CartList';
import CartSummary from './CartSummary';

function Cart() {
    return (
        <Container>
            <h1 className="my-4">Cart</h1>
            <CartList />
            <hr />
            <CartSummary />
        </Container>
    );
}

export default Cart;
