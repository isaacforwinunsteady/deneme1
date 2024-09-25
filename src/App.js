import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css'; // Stil dosyanızı import edin
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import EditProduct from './EditProduct';
import Report from './Report';
import Home from './Home';

const App = () => {
    // LocalStorage'dan ürünleri yükle veya boş bir nesne başlat
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        return savedProducts ? JSON.parse(savedProducts) : {};
    });

    // Ürünleri localStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    // Yeni ürün ekleme fonksiyonu, varyasyonlar da içerecek şekilde düzenlendi
    const addProduct = (product) => {
        setProducts(prev => ({
            ...prev,
            [product.name]: {
                ...product,
                variations: product.variations || []  // Varyasyonlar varsa ekle
            }
        }));
    };

    // Ürünü silme fonksiyonu
    const removeProduct = (name) => {
        setProducts(prev => {
            const newProducts = { ...prev };
            delete newProducts[name];
            return newProducts;
        });
    };

    // Ürünü ve varyasyonları güncelleme fonksiyonu
    const updateProduct = (name, updatedProduct) => {
        setProducts(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                variations: updatedProduct.variations || prev[name].variations  // Varyasyonları güncelle
            }
        }));
    };

    return (
        <Router>
            <div>
                {/* Sabitlenmiş navbar */}
                <nav className="navbar">
                    {/* Menü öğeleri */}
                    <div>
                        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                            Ana Sayfa
                        </NavLink>
                        <NavLink to="/add-product" className={({ isActive }) => (isActive ? "active" : "")}>
                            Ürün Ekle
                        </NavLink>
                        <NavLink to="/product-list" className={({ isActive }) => (isActive ? "active" : "")}>
                            Ürün Listesi
                        </NavLink>
                        <NavLink to="/report" className={({ isActive }) => (isActive ? "active" : "")}>
                            Rapor
                        </NavLink>
                        <NavLink to="/edit-products" className={({ isActive }) => (isActive ? "active" : "")}>
                            Ürünleri Düzenle
                        </NavLink>
                    </div>
                </nav>

                {/* İçerik */}
                <div style={{ padding: '50px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/add-product" element={<AddProduct addProduct={addProduct} />} />
                        <Route path="/product-list" element={
                            <ProductList 
                                products={products} 
                                removeProduct={removeProduct} 
                                updateProduct={updateProduct}
                            />
                        } />
                        <Route path="/edit-product/:productName" element={
                            <EditProduct 
                                products={products} 
                                updateProduct={updateProduct} 
                                removeProduct={removeProduct} 
                            />
                        } />
                        <Route path="/edit-products" element={
                            <EditProduct 
                                products={products} 
                                updateProduct={updateProduct} 
                                removeProduct={removeProduct} 
                            />
                        } />
                        <Route path="/report" element={<Report products={products} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
