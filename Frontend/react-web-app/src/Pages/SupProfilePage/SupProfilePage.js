import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/Supheader/Supheader';
import Footer from '../../Components/Footer/Footer';
import styles from './SupProfilePage.module.css';

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
        const sellServiceUrl = `http://localhost:8084/sell-api/user/${id}/items`;
        await axios.delete(sellServiceUrl);

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
            Here, you can manage your listed items, track your sales history, and connect with dedicated support to ensure a smooth and successful selling experience on our platform. Stay organized, monitor performance, and reach your customers effectively.
            </p>
          </div>

          <div className={styles.profileContent}>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <a href="/sell-history">
                  <img 
                    src="sell-history.png" 
                    alt="Sell History" 
                    className={styles.cardImage} 
                  />
                </a>
                <h2>Sell History</h2>
                <p>View the history of all items you have sold on our platform.</p>
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
