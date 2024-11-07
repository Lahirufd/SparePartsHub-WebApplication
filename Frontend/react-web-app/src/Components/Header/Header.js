import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="logo.jpg" alt="The Pits Logo" />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="/" className={styles.navLink}>Home</a>
          </li>
          <li className={styles.navItem}>
            <a href="/products" className={styles.navLink}>Products</a>
          </li>
          <li className={styles.navItem}>
            <a href="/about" className={styles.navLink}>About us</a>
          </li>
          <li className={styles.navItem}>
            <a href="/contact" className={styles.navLink}>Contact us</a>
          </li>
        </ul>
      </nav>
      {/* Login and Sign Up buttons */}
      <div className={styles.authButtons}>
        <button
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
