import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MDashboard.module.css';

const AdminDashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1 className={styles.header}>Manager Dashboard</h1>
            <div className={styles.cardsContainer}>
              <a href="view-items">
                <div className={styles.card}>
                    <img src="items.jpg" alt="Items" className={styles.cardImage} />
                    <h2>Items</h2>
                </div>
              </a>
              <a href="orders">
                <div className={styles.card}>
                    <img src="orders.jpg" alt="Orders" className={styles.cardImage} />
                    <h2>Orders</h2>
                </div>
              </a>
              <a href="customers">
                <div className={styles.card}>
                    <img src="customers.jpg" alt="Customers" className={styles.cardImage} />
                    <h2>Customers</h2>
                </div>
              </a>
              <a href="suppliers">
                <div className={styles.card}>
                    <img src="suppliers.jpg" alt="Suppliers" className={styles.cardImage} />
                    <h2>Suppliers</h2>
                </div>
              </a>
              <a href="feedbacks">
                <div className={styles.card}>
                    <img src="feedbacks.jpg" alt="Feedbacks" className={styles.cardImage} />
                    <h2>Feedbacks</h2>
                </div>
              </a>
              <a href="Complains">
                <div className={styles.card}>
                    <img src="complains.jpg" alt="Complains" className={styles.cardImage} />
                    <h2>Complains</h2>
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
