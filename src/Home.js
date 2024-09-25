import React from 'react';
import './Home.css';  // CSS dosyasını import edin

const Home = () => {
    return (
        <div className="home">
            <h1>atkreatif.com</h1>
            <p>
                Bu uygulama ile ürünlerinizi ekleyebilir, fiyatlarını güncelleyebilir ve raporlar oluşturabilirsiniz.
                Ürünlerinizi kolayca yönetin ve iş akışınızı hızlandırın.
            </p>
            <button onClick={() => window.location.href = '/add-product'}>
                Ürün Ekle
            </button>
        </div>
    );
};

export default Home;
