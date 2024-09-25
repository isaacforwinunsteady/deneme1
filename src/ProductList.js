import React from 'react';
import './ProductList.css';  // CSS dosyanızı import edin


const ProductList = ({ products, updateProduct }) => {
    const handleIncrease = (productName, variationIndex) => {
        const product = products[productName];
        const updatedVariations = [...product.variations];
        updatedVariations[variationIndex].quantity = (updatedVariations[variationIndex].quantity || 0) + 1;
        updateProduct(productName, { ...product, variations: updatedVariations });
    };

    const handleDecrease = (productName, variationIndex) => {
        const product = products[productName];
        const updatedVariations = [...product.variations];
        if (updatedVariations[variationIndex].quantity > 0) {
            updatedVariations[variationIndex].quantity -= 1;
        }
        updateProduct(productName, { ...product, variations: updatedVariations });
    };

    return (
        <div className="product-list-container">
            {Object.keys(products).map((productName) => {
                const product = products[productName];
                return (
                    <div key={productName} className="product-card">
                        <div className="product-name">
                            <h3>{productName}</h3>
                        </div>

                        {product.variations.map((variation, index) => (
                            <div key={index} className="variation-item">
                                <div>
                                    <span className="variation-name">{variation.name}</span>
                                    <p className="variation-details">Fiyat: {variation.price}₺</p>
                                </div>

                                <div className="product-buttons">
                                    <button onClick={() => handleDecrease(productName, index)} disabled={variation.quantity === 0}>
                                        -
                                    </button>
                                    <span className="quantity-label">{variation.quantity || 0}</span>
                                    <button onClick={() => handleIncrease(productName, index)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
