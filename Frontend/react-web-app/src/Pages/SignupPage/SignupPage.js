import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './SignupPage.module.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    address: '',
    telephone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/ums-api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert('Successfully created your account!');
      navigate('/login');
    });
  };

  return (
    <div>
      <Header />
      <div className={styles.centerWrapper}>
        <div className={styles.signupContainer}>
          <h2>Create Account</h2>
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="username">Create your Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Create Your Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telephone">Telephone Number</label>
              <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.createAccountButton}>Create Account</button>
          </form>
          <div className={styles.accountOptions}>
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
          <button className={styles.adminButton} onClick={() => window.location.href = '/admin'}>Admin</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
