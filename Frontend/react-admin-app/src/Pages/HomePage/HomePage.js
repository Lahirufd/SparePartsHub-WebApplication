import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.minHScreen}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <div className={`${styles.icon} ${styles.buildingIcon}`}>🏢</div>
            <h1>Thelee Group Admin</h1>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => navigate('/signup')} className={`${styles.btn} ${styles.btnOutline}`}>
              Sign Up
            </button>
            <button onClick={() => navigate('/login')} className={`${styles.btn} ${styles.btnPrimary}`}>
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h2>Welcome to Thelee Group Management Portal</h2>
          <p>Streamline your operations and manage inventory efficiently</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statsGrid}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>🚗</div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Vehicle Parts</p>
                <p className={styles.statValue}>2,500+</p>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>👥</div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Active Customers</p>
                <p className={styles.statValue}>500+</p>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>📦</div>
              <div className={styles.statInfo}>
                <p className={styles.statLabel}>Orders Processed</p>
                <p className={styles.statValue}>10,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className={styles.featuresContainer}>
        <h3 className={styles.sectionTitle}>Key Features</h3>
        <div className={styles.featuresGrid}>
          <div className={`${styles.card} ${styles.featureCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>📊</div>
              <h4>Inventory Management</h4>
              <p>Track and manage your extensive collection of European and Japanese vehicle parts.</p>
            </div>
          </div>
          <div className={`${styles.card} ${styles.featureCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>👥</div>
              <h4>Customer Relations</h4>
              <p>Manage customer information and maintain strong relationships with your clients.</p>
            </div>
          </div>
          <div className={`${styles.card} ${styles.featureCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.icon}>⚙️</div>
              <h4>Order Processing</h4>
              <p>Efficiently process and track orders from receipt to delivery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className={styles.companyInfo}>
        <div className={styles.companyContent}>
          <h3>About Thelee Group</h3>
          <p>
            Established in 2021 by Mr. Uvindu Amarasinghe, Thelee Group Pvt. Ltd. is a premier spare parts warehouse 
            located in Ratmalana. We specialize in high-quality used and brand new imported spare parts for European 
            and Japanese vehicles, setting new standards in the industry through our commitment to authenticity, 
            quality, and customer satisfaction.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Thelee Group Pvt. Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
