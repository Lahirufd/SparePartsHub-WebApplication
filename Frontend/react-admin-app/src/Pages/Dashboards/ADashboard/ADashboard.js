import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Dashboards.module.css';

const AdminDashboard = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
            <h1 className={styles.header}>Accountant Dashboard</h1>
            <div className={styles.cardsContainer}>
              <a href="payments">
                <div className={styles.card}>
                    <img src="payments.jpg" alt="Payments" className={styles.cardImage} />
                    <h2>Payments</h2>
                </div>
              </a>
              <a href="orders">
                <div className={styles.card}>
                    <img src="orders.jpg" alt="Orders" className={styles.cardImage} />
                    <h2>Orders</h2>
                </div>
              </a>
              <a href="Reports">
                <div className={styles.card}>
                    <img src="reports.jpg" alt="Reports" className={styles.cardImage} />
                    <h2>Reports</h2>
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
