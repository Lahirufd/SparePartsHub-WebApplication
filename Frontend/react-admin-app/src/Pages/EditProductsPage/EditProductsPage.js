import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './EditProductsPage.module.css';

const EditItemsPage = () => {
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
      const processedProducts = productsArray.map(product => ({
        ...product,
        stockQuantity: product.stockQuantity ?? product.stock?.quantity ?? product.stock?.stockQuantity ?? 'N/A'
      }));
      setAllProducts(processedProducts);
      setFilteredProducts(processedProducts); // Initialize filtered products with all products
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredProducts(allProducts); // Reset to all products if search term is empty
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTermLower) ||
      (product.description && product.description.toLowerCase().includes(searchTermLower)) ||
      (product.category?.name && product.category.name.toLowerCase().includes(searchTermLower))
    );
    setFilteredProducts(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredProducts(allProducts); // Reset to all products
  };

  const selectProduct = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      categoryId: product.category?.id || '',
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
      
      // Refresh the products list
      const updatedProducts = allProducts.map(p => 
        p.id === selectedProduct.id ? { ...p, ...updateData } : p
      );
      setAllProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      alert('Product deleted successfully');
      
      // Update the products list
      const updatedProducts = allProducts.filter(p => p.id !== id);
      setAllProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      
      // Clear selection if the deleted product was selected
      if (selectedProduct?.id === id) {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const getCategoryName = (category) => category?.name || 'Unknown';

  const BASE_IMAGE_URL = "http://localhost:8082/ps-api/images/";

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
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
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className={`${styles.button} ${styles.searchButton}`}>
                Search
              </button>
              <button
                type="button"
                onClick={clearSearch}
                className={`${styles.button} ${styles.clearButton}`}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.productsSection}>
            <h2 className={styles.sectionTitle}>Products List</h2>
            {loading ? (
              <p className={styles.loading}>Loading...</p>
            ) : (
              <div className={styles.productsContainer}>
                {filteredProducts.length === 0 ? (
                  <p className={styles.emptyState}>No products found</p>
                ) : (
                  filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className={`${styles.productCard} ${selectedProduct?.id === product.id ? styles.selected : ''}`}
                    >
                      <div className={styles.productImage}>
                        <img src={`${BASE_IMAGE_URL}${product.imagePath}`} alt="product" />
                      </div>
                      <div className={styles.productDetails} onClick={() => selectProduct(product)}>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.productPrice}>Price: Rs.{parseFloat(product.price || 0).toFixed(2)}</p>
                        <p className={styles.productStock}>Stock: {product.stockQuantity}</p>
                        <p className={styles.productCategory}>Category: {getCategoryName(product.category)}</p>
                      </div>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {selectedProduct && (
            <div className={styles.editSection}>
              <h2 className={styles.editTitle}>Edit Product</h2>
              <form onSubmit={updateProduct} className={styles.form}>
                <label>Product Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  required
                  className={styles.input}
                />
                <label>Description:</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => handleEditFormChange('description', e.target.value)}
                  required
                  className={styles.input}
                />
                <label>Price:</label>
                <input
                  type="number"
                  step="0.01"
                  value={editForm.price}
                  onChange={(e) => handleEditFormChange('price', e.target.value)}
                  required
                  className={styles.input}
                />
                <label>Category:</label>
                <select
                  value={editForm.categoryId}
                  onChange={(e) => handleEditFormChange('categoryId', e.target.value)}
                  required
                  className={styles.input}
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
                  className={styles.input}
                />
                <div className={styles.buttonRow}>
                  <button type="submit" className={`${styles.button} ${styles.updateButton}`}>
                    Update Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className={`${styles.button} ${styles.cancelButton}`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemsPage;