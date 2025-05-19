import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TDashboard.module.css';

const AdminDashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1 className={styles.header}>Technician Dashboard</h1>
            <div className={styles.cardsContainer}>
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
              <a href="repair-items">
                <div className={styles.card}>
                    <img src="repair-items.jpg" alt="Repair Items" className={styles.cardImage} />
                    <h2>Repair Items</h2>
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
