import React, { useState } from 'react';

import classNames from 'classnames';
const Brands = () => {
    const [showBrands, setShowBrands] = useState(false);

    const handleMouseOver = () => {
        setShowBrands(true);
    };

    const handleMouseOut = () => {
        setShowBrands(false);
    };

    return (
        <div className="brands-container">
            <span className="brands-label" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                Brands:
            </span>
            {showBrands && (
                <ul className="brands-list">
                    <li>Vans</li>
                    <li>Converse</li>
                    <li>Balenciaga</li>
                </ul>
            )}
        </div>
    );
};

export default Brands;
