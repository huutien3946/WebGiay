import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import CartItem from './CartItem';

function CartList() {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', price: 100, quantity: 2 },
        { id: 2, name: 'Product 2', price: 200, quantity: 3 },
        { id: 3, name: 'Product 3', price: 300, quantity: 1 },
    ]);

    return (
        <>
            {cartItems.length === 0 ? (
                <p>Your cart is currently empty.</p>
            ) : (
                <Row>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </Row>
            )}
        </>
    );
}

export default CartList;
