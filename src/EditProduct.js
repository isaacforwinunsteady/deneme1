import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProduct.css';  // CSS dosyanızı import edin

const EditProduct = ({ products, updateProduct, removeProduct }) => {
    const [selectedProductName, setSelectedProductName] = useState('');
    const [product, setProduct] = useState({ name: '', variations: [] });
    const [newVariationName, setNewVariationName] = useState('');
    const [newVariationPrice, setNewVariationPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (products[selectedProductName]) {
            setProduct({ ...products[selectedProductName], name: selectedProductName });
        }
    }, [selectedProductName, products]);

    // Ürünü kaydetme işlemi
    const handleSave = () => {
        updateProduct(selectedProductName, { variations: product.variations });
        navigate('/product-list'); // Düzenleme sonrası listeye dön
    };

    // Ürünü silme işlemi
    const handleDelete = () => {
        removeProduct(selectedProductName);
        navigate('/product-list'); // Silme sonrası listeye dön
    };

    // Varyasyon ekleme işlemi
    const handleAddVariation = () => {
        if (newVariationName && newVariationPrice) {
            setProduct({
                ...product,
                variations: [...product.variations, { name: newVariationName, price: parseFloat(newVariationPrice) }]
            });
            setNewVariationName('');
            setNewVariationPrice('');
        }
    };

    // Varyasyonu silme işlemi
    const handleRemoveVariation = (index) => {
        setProduct({
            ...product,
            variations: product.variations.filter((_, i) => i !== index)
        });
    };

    // Varyasyon güncelleme işlemi
    const handleUpdateVariation = (index, field, value) => {
        const updatedVariations = [...product.variations];
        updatedVariations[index] = { ...updatedVariations[index], [field]: value };
        setProduct({
            ...product,
            variations: updatedVariations
        });
    };

    return (
        <div className="edit-product-form">
            <h2>Ürünü Düzenle</h2>
            
            <label>
                Ürün Seç:
                <select
                    value={selectedProductName}
                    onChange={(e) => setSelectedProductName(e.target.value)}
                >
                    <option value="" disabled>Ürün Seçin</option>
                    {Object.keys(products).map((productName) => (
                        <option key={productName} value={productName}>
                            {productName}
                        </option>
                    ))}
                </select>
            </label>

            {selectedProductName && (
                <>
                    {/* Varyasyonları listele ve düzenle */}
                    <h3>Varyasyonlar</h3>
                    {product.variations && product.variations.map((variation, index) => (
                        <div key={index} className="variation-item">
                            <input
                                type="text"
                                value={variation.name}
                                onChange={(e) => handleUpdateVariation(index, 'name', e.target.value)}
                                placeholder="Varyasyon Adı"
                            />
                            <input
                                type="number"
                                value={variation.price}
                                onChange={(e) => handleUpdateVariation(index, 'price', e.target.value)}
                                placeholder="Fiyat"
                            />
                            <button type="button" onClick={() => handleRemoveVariation(index)}>
                                Varyasyonu Kaldır
                            </button>
                        </div>
                    ))}

                    {/* Yeni varyasyon ekleme */}
                    <div className="add-variation">
                        <input
                            type="text"
                            value={newVariationName}
                            onChange={(e) => setNewVariationName(e.target.value)}
                            placeholder="Yeni Varyasyon Adı"
                        />
                        <input
                            type="number"
                            value={newVariationPrice}
                            onChange={(e) => setNewVariationPrice(e.target.value)}
                            placeholder="Fiyat"
                        />
                        <button type="button" onClick={handleAddVariation}>Varyasyon Ekle</button>
                    </div>

                    <button onClick={handleSave}>Kaydet</button>
                    <button className="delete" onClick={handleDelete}>Sil</button>
                </>
            )}
        </div>
    );
};

export default EditProduct;
