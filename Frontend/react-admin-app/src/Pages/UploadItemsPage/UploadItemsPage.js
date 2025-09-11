
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UploadItemsPage.module.css';

const UploadProductPage = () => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [stockQuantity, setStockQuantity] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const fetchCategories = () => {
    axios.get('http://localhost:8082/ps-api/categories')
      .then((response) => {
        const data = response.data;
        const categoriesArray = Array.isArray(data) ? data : [data];
        setCategories(categoriesArray);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setItemName('');
    setDescription('');
    setPrice('');
    setCategoryId('');
    setStockQuantity('');
    setSelectedFile(null);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', itemName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', selectedFile);
    formData.append('categoryId', parseInt(categoryId));
    formData.append('stockQuantity', parseInt(stockQuantity));

    try {
      await axios.post('http://localhost:8082/ps-api/products', formData);
      alert('Product uploaded successfully');
      resetForm();
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('An error occurred. Please try again: ' + error.message);
    }
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    axios.post('http://localhost:8082/ps-api/categories', {
      name: newCategoryName
    })
      .then(() => {
        setNewCategoryName('');
        fetchCategories();
        alert('Category added');
      })
      .catch(err => {
        console.error('Add category error:', err);
        alert('Error adding category');
      });
  };

  const handleDeleteCategory = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    axios.delete(`http://localhost:8082/ps-api/categories/${id}`)
      .then(() => {
        fetchCategories();
        alert('Category deleted');
      })
      .catch(err => {
        console.error('Delete category error:', err);
        alert('Error deleting category');
      });
  };

  return (
  <div className={styles.container}>
  <h2>Upload New Product</h2>

  <form onSubmit={onFormSubmit}>
  <label>Product Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className={styles.input}
          required
        />

  <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
          required
        />

  <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
          required
        />

  <label>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className={styles.input}
          required
        >
          <option value="">Select a category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

  <label>Initial Stock Quantity:</label>
        <input
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          className={styles.input}
          required
        />

  <label>Product Image:</label>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className={styles.input}
          required
        />

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.button}>
            Upload Product
          </button>
        </div>
      </form>

      {/* Category Management Section */}
      <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #e0e0e0', marginTop: 40 }}>
  <h2 style={{ color: '#343a40', fontSize: 24, fontWeight: 600, marginBottom: 24, paddingBottom: 12 }}>Manage Categories</h2>
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New category name"
            className={styles.input}
          />
          <button onClick={handleAddCategory} className={styles.button}>
            Add Category
          </button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {categories.map((cat) => (
            <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, marginBottom: 12, background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: 8, fontWeight: 500, color: '#495057', transition: 'background 0.3s, border 0.3s, transform 0.3s' }}>
              {cat.name}
              <button
                onClick={() => handleDeleteCategory(cat.id)}
                className={styles.button}
                style={{ background: '#dc3545', width: 100, fontSize: 13 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {/* Back button under Manage Categories */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 30 }}>
          <a href="/imdashboard">
            <button type="button" className={styles.backButton}>Back</button>
          </a>
        </div>
  </div>
    </div>
  );
};

export default UploadProductPage;