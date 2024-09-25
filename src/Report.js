import React from 'react';
import * as XLSX from 'xlsx';
import './Report.css';

const Report = ({ products }) => {
    // Toplam gelir hesaplama
    const totalRevenue = Object.keys(products).reduce((total, productName) => {
        const product = products[productName];
        return total + product.variations.reduce((variationTotal, variation) => {
            return variationTotal + (variation.price * (variation.quantity || 0)); // Fiyat x miktar
        }, 0);
    }, 0);

    // Excel dosyasını indirme fonksiyonu
    const downloadExcel = () => {
        const reportData = [];

        // Her ürün ve varyasyonu için Excel'de kullanılacak veri hazırlama
        Object.keys(products).forEach((productName) => {
            const product = products[productName];
            product.variations.forEach((variation) => {
                reportData.push({
                    "Ürün Adı": productName,
                    "Varyasyon": variation.name,
                    "Fiyat (₺)": variation.price,
                    "Miktar": variation.quantity || 0,
                    "Toplam (₺)": variation.price * (variation.quantity || 0)
                });
            });
        });

        // Toplam gelir satırını ekleyelim
        reportData.push({
            "Ürün Adı": "Toplam Gelir",
            "Varyasyon": "",
            "Fiyat (₺)": "",
            "Miktar": "",
            "Toplam (₺)": totalRevenue
        });

        // Excel çalışma kitabı oluşturma
        const worksheet = XLSX.utils.json_to_sheet(reportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Rapor");

        // Excel dosyasını indirme
        XLSX.writeFile(workbook, `gun_sonu_raporu.xlsx`);
    };

    return (
        <div className="report-container">
            <h2>Gün Sonu Raporu</h2>

            {/* Rapor tablosu */}
            <table className="report-table">
                <thead>
                    <tr>
                        <th>Ürün Adı</th>
                        <th>Varyasyon</th>
                        <th>Fiyat (₺)</th>
                        <th>Miktar</th>
                        <th>Toplam (₺)</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(products).map((productName) => {
                        const product = products[productName];
                        return product.variations.map((variation, index) => (
                            <tr key={`${productName}-${index}`}>
                                <td>{productName}</td>
                                <td>{variation.name}</td>
                                <td>{variation.price} ₺</td>
                                <td>{variation.quantity || 0}</td>
                                <td>{variation.price * (variation.quantity || 0)} ₺</td>
                            </tr>
                        ));
                    })}
                    {/* Toplam gelir satırı */}
                    <tr className="total-row">
                        <td>Toplam Gelir</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{totalRevenue} ₺</td>
                    </tr>
                </tbody>
            </table>

            {/* Excel indirme düğmesi */}
            <button className="download-btn" onClick={downloadExcel}>Excel İndir</button>
        </div>
    );
};

export default Report;
