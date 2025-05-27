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

  useEffect(() => {
  axios.get('http://localhost:8082/ps-api/categories')
    .then((response) => {
      const data = response.data;
      const categoriesArray = Array.isArray(data) ? data : [data];
      setCategories(categoriesArray);
    })
    .catch((error) => console.error('Error fetching categories:', error));
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload New Product</h1>

      <form className={styles.form} onSubmit={onFormSubmit}>
        <label className={styles.label}>Product Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />

        <label className={styles.label}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Category:</label>
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

        <label className={styles.label}>Initial Stock Quantity:</label>
        <input
          type="number"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          className={styles.input}
          required
        />

        <label className={styles.label}>Product Image:</label>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className={styles.fileInput}
          required
        />

        <div className={styles.buttonRow}>
          <button type="submit" className={styles.button}>
            Upload Product
          </button>

          <a href="/shdashboard">
            <button type="button" className={styles.backButton}>Back</button>
          </a>
        </div>
      </form>
    </div>
  );
};

export default UploadProductPage;
