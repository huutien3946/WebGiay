import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Product() {
    const [product, setProduct] = useState({});
    const { productId } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/products/${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [productId]);
    return (
        <div>
            <h1>Product Detail</h1>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.brandId && product.brandId.name}</p>
            <img src={product.image} alt={product.name} />
        </div>
    );
}

export default Product;
