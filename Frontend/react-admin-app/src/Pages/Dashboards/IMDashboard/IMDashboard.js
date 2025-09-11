import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Dashboards.module.css';

const AdminDashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1 className={styles.header}>Inventory Manager Dashboard</h1>
            <div className={styles.cardsContainer}>
              <a href="upload-items">
                <div className={styles.card}>
                    <img src="upload-items.jpg" alt="Upload Items" className={styles.cardImage} />
                    <h2>Upload Items</h2>
                </div>
              </a>
              <a href="edit-items">
                <div className={styles.card}>
                    <img src="edit-items.jpg" alt="Edit Items" className={styles.cardImage} />
                    <h2>Edit Items and Stock</h2>
                </div>
              </a>
              <a href="view-items">
                <div className={styles.card}>
                    <img src="items.jpg" alt="Items" className={styles.cardImage} />
                    <h2>Items</h2>
                </div>
              </a>
              <a href="supply-items">
                <div className={styles.card}>
                    <img src="supply-items.jpg" alt="Supply Items" className={styles.cardImage} />
                    <h2>Supply Items</h2>
                </div>
              </a>
              <a href="warranty-items">
                <div className={styles.card}>
                    <img src="warranty-items.jpg" alt="Warranty Items" className={styles.cardImage} />
                    <h2>Warranty Items</h2>
                </div>
              </a>
            </div>
            <Link to="/">
              <button className={styles.logoutButton}>
                 Logout
              </button>
            </Link>
        </div>
        </div>
    );
};

export default AdminDashboard;
