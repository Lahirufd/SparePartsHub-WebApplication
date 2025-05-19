import React, { useState } from 'react';
import styles from './Cusheader.module.css';

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
            <a href="/cushome" className={styles.navLink}>Home</a>
          </li>
          <li className={`${styles.navItem} ${styles.dropdown}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className={styles.navLink}>Services</span>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><a href="/items" className={styles.dropdownLink}>Buying Spare Parts</a></li>
                <li><a href="/warranty-items" className={styles.dropdownLink}>Claim Warranty</a></li>
                <li><a href="/cart" className={styles.dropdownLink}>Cart Items</a></li>
                <li><a href="/feedbacks" className={styles.dropdownLink}>Feedbacks</a></li>
                <li><a href="/complaints" className={styles.dropdownLink}>Complaints</a></li>
              </ul>
            )}
          </li>
          <li className={styles.navItem}>
            <a href="/cusabout" className={styles.navLink}>About us</a>
          </li>
          <li className={styles.navItem}>
            <a href="/cuscontact" className={styles.navLink}>Contact us</a>
          </li>
          <li className={styles.navItem}>
            <a href="/cusprofile" className={styles.navLink}>Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;