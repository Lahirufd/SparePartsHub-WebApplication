
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8082/ps-api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.itemsContainer}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.itemsContainer} style={{ color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  const BASE_IMAGE_URL = "http://localhost:8082/ps-api/images/";

  return (
    <div className={styles.itemsPageWrapper}>
      <div className={styles.itemsContainer}>
        <h1>Our Products</h1>
        <div className={styles.itemsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.itemCard}>
              <img
                src={`${BASE_IMAGE_URL}${product.imagePath}`}
                alt={product.name}
                className={styles.itemImage}
              />
              <div className={styles.itemName}>{product.name}</div>
              <div className={styles.itemDescription}>{product.description}</div>
              <div style={{ marginBottom: 8, color: '#888', fontSize: 13 }}>
                {product.category?.name || 'Uncategorized'}
              </div>
              <div style={{ fontWeight: 'bold', color: '#007bff', fontSize: 18, margin: '8px 0' }}>
                Rs.{product.price?.toFixed(2) || '0.00'}
              </div>
              <div style={{ fontSize: 14, color: product.stock?.quantity > 0 ? '#28a745' : '#dc3545' }}>
                {product.stock?.quantity > 0
                  ? `In Stock: ${product.stock.quantity}`
                  : 'Out of Stock'}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={() => navigate(-1)}
            className={styles.buyButton}
            style={{ fontWeight: 600, padding: '12px 40px', fontSize: 16, marginTop: 16 }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;