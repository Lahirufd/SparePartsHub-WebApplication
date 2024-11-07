import React, { useState } from 'react';
import styles from './Supheader.module.css';

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
            <a href="/suphome" className={styles.navLink}>Home</a>
          </li>
          <li className={`${styles.navItem} ${styles.dropdown}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <span className={styles.navLink}>Services</span>
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><a href="/selling-items" className={styles.dropdownLink}>Selling Spare Parts</a></li>
              </ul>
            )}
          </li>
          <li className={styles.navItem}>
            <a href="/supabout" className={styles.navLink}>About us</a>
          </li>
          <li className={styles.navItem}>
            <a href="/supcontact" className={styles.navLink}>Contact us</a>
          </li>
          <li className={styles.navItem}>
            <a href="/supprofile" className={styles.navLink}>Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;