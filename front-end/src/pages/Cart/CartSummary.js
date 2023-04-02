import React from 'react';

const CartSummary = ({ cartItems }) => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    return <h3>Total: ${total}</h3>;
};

export default CartSummary;
