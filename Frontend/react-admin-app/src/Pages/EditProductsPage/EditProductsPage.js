import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EditProductsPage.module.css';

const EditItemsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    stockQuantity: ''
  });

  const BASE_URL = 'http://localhost:8082/ps-api';

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products`);
      const productsArray = Array.isArray(response.data) ? response.data : [response.data];
      // Ensure stock quantity is properly extracted
      const processedProducts = productsArray.map(product => ({
        ...product,
        stockQuantity: product.stockQuantity ?? product.stock?.quantity ?? product.stock?.stockQuantity ?? 'N/A'
      }));
      setProducts(processedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const searchProductByName = async (name) => {
    if (!name.trim()) {
      fetchProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products`, {
        params: { name }
      });
      setProducts(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProductByName(searchTerm);
  };

  // FIXED: Updated selectProduct function to properly handle stock quantity
  const selectProduct = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      categoryId: product.category?.id || '',
      // Fixed: Use the processed stockQuantity directly
      stockQuantity: product.stockQuantity || ''
    });
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    try {
      const updateData = {
        name: editForm.name,
        description: editForm.description,
        price: parseFloat(editForm.price),
        category: {
          id: parseInt(editForm.categoryId)
        },
        stock: {
          quantity: parseInt(editForm.stockQuantity)
        }
      };

      await axios.put(`${BASE_URL}/products/${selectedProduct.id}`, updateData);
      alert('Product updated successfully');
      fetchProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const getCategoryName = (category) => category?.name || 'Unknown';

  // FIXED: Improved image URL handling
  const getImageUrl = (product) => {
    if (product.imageUrl) {
      // If imageUrl is a full URL (starts with http/https), use it directly
      if (product.imageUrl.startsWith('http')) {
        return product.imageUrl;
      }
      // If it's a relative path, construct the full URL
      return `${BASE_URL}${product.imageUrl}`;
    }
    // Fallback to a default placeholder
    return 'https://via.placeholder.com/150x150?text=No+Image';
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Edit Products</h1>

        <div className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Search</button>
            <button
              type="button"
              onClick={() => { setSearchTerm(''); fetchProducts(); }}
              className={styles.clearButton}
            >
              Clear
            </button>
          </form>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.productsSection}>
            <h2>Products List</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className={styles.productsList}>
        {products.length === 0 ? (
          <p className={styles.noProducts}>No products found</p>
        ) : (
          products.map(product => (
            <div
              key={product.id}
              className={`${styles.productCard} ${selectedProduct?.id === product.id ? styles.selected : ''}`}
              onClick={() => selectProduct(product)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={getImageUrl(product)}
                  alt={product.name}
                  className={styles.productImage}
                  onError={(e) => {
                    e.target.onerror = null;
                    // Use a reliable placeholder service as fallback
                    e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                  }}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.price}>Price: ${parseFloat(product.price || 0).toFixed(2)}</p>
                <p className={styles.stock}>
                  Stock: {product.stockQuantity ?? product.stock?.quantity ?? product.stock?.stockQuantity ?? 'N/A'}
                </p>
                <p className={styles.category}>Category: {getCategoryName(product.category)}</p>
              </div>
            </div>
          ))
        )}
              </div>
            )}
          </div>

          {selectedProduct && (
            <div className={styles.editSection}>
              <h2>Edit Product</h2>
              <form onSubmit={updateProduct} className={styles.editForm}>
                <label>Product Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  required
                />

                <label>Description:</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleEditFormChange('description', e.target.value)}
                  required
                />

                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={editForm.price}
                  onChange={(e) => handleEditFormChange('price', e.target.value)}
                  required
                />

                <label>Category:</label>
                <select
                  value={editForm.categoryId}
                  onChange={(e) => handleEditFormChange('categoryId', e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>

                <label>Stock Quantity:</label>
                <input
                  type="number"
                  value={editForm.stockQuantity}
                  onChange={(e) => handleEditFormChange('stockQuantity', e.target.value)}
                  required
                />

                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.updateButton}>Update Product</button>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditItemsPage;