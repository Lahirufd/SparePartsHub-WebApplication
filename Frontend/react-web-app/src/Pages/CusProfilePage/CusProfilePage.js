import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';
import styles from './CusProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('userId');

  const handleDeleteAccount = async () => {
    if (!id) {
      alert('No user is logged in.');
      return;
    }

    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const warrantyServiceUrl = `http://localhost:8083/wis-api/user/${id}/items`;
        await axios.delete(warrantyServiceUrl);

        const orderServiceUrl = `http://localhost:8082/os-api/user/${id}/orders`;
        await axios.delete(orderServiceUrl);

        const userServiceUrl = `http://localhost:8080/ums-api/users/${id}`;
        const userResponse = await axios.delete(userServiceUrl);

        if (userResponse.status === 200) {
          alert('Your account has been deleted successfully.');
          localStorage.removeItem('userId');
          navigate('/login');
        } else {
          alert('Failed to delete user account.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account. Please try again later.');
      }
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.profileContentWrapper}>
        <div className={styles.profilecontactContainer}>
          <h1 className={styles.pageHeading}>Welcome to Your Profile</h1>

          <div className={styles.introSection}>
            <p className={styles.introText}>
              This is your personal profile page where you can view and manage your purchased items, warranty claims, and repair requests. Easily update your account settings or explore your order history for a streamlined experience.
            </p>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <a href="orders">
                  <img 
                    src="purchased.png" 
                    alt="Purchased Items" 
                    className={styles.cardImage} 
                  />
                </a>
                <h2>Purchased Items</h2>
                <p>View and manage all the items you have purchased from our store.</p>
              </div>
              <div className={styles.card}>
                <a href="warranty-details">
                  <img 
                    src="warranty.png" 
                    alt="Warranty Items" 
                    className={styles.cardImage} 
                  />
                </a>
                <h2>Warranty Items</h2>
                <p>Check the warranty status of your items and request service if needed.</p>
              </div>
              <div className={styles.card}>
                <a href="repair-details">
                  <img 
                    src="repair.png" 
                    alt="Repair Items" 
                    className={styles.cardImage} 
                  />
                </a>
                <h2>Repair Items</h2>
                <p>Manage your repair requests and track the status of your items undergoing repairs.</p>
              </div>
            </div>
          </div>

          <div className={styles.profileActions}>
            <button className={styles.deleteAccountBtn} onClick={handleDeleteAccount}>Delete Account</button>
            <a href="/">
              <button className={styles.logoutBtn}>Logout</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
