import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = ({ addProduct }) => {
    const [name, setName] = useState('');
    const [variationName, setVariationName] = useState('');
    const [variationPrice, setVariationPrice] = useState('');
    const [variations, setVariations] = useState([]);

    const handleAddVariation = () => {
        if (variationName && variationPrice) {
            setVariations([...variations, { name: variationName, price: parseFloat(variationPrice) }]);
            setVariationName('');
            setVariationPrice('');
        }
    };

    const handleRemoveVariation = (index) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct({ name, variations });
        setName('');
        setVariations([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Ürün Ekle</h2>

            <label>Ürün Adı</label>
            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ürün adı girin"
                required 
            />

            <label>Varyasyon Adı</label>
            <input 
                type="text" 
                value={variationName}
                onChange={(e) => setVariationName(e.target.value)}
                placeholder="Varyasyon adı girin (ör. Küçük)"
            />

            <label>Fiyat</label>
            <input 
                type="number" 
                value={variationPrice}
                onChange={(e) => setVariationPrice(e.target.value)}
                placeholder="Fiyat girin"
            />

            <button type="button" onClick={handleAddVariation}>
                Varyasyon Ekle
            </button>

            {/* Varyasyon Listesi */}
            <div className="variation-list">
                {variations.map((variation, index) => (
                    <div key={index} className="variation-item">
                        <span>{variation.name}: {variation.price}₺</span>
                        <button type="button" onClick={() => handleRemoveVariation(index)}>
                            Kaldır
                        </button>
                    </div>
                ))}
            </div>

            <button type="submit">Ürünü Ekle</button>
        </form>
    );
};

export default AddProduct;
