import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <li className={styles.navItem}>
            <a href="/login" className={styles.loginSignupButton}>Login/Signup</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
