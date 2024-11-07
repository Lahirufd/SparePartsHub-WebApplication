import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/us-api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Fetch user ID from the backend
        const userIdResponse = await fetch(`http://localhost:8080/us-api/users?username=${username}`);
        if (userIdResponse.ok) {
          const userId = await userIdResponse.json();
          localStorage.setItem('userId', userId); // Save user ID to local storage
        } else {
          setError('Failed to retrieve user ID.');
          return;
        }

        // Fetch user role from the backend
        const roleResponse = await fetch(`http://localhost:8080/us-api/users/role?username=${username}`);
        if (roleResponse.ok) {
          const role = await roleResponse.text();
          
          // Redirect based on the user's role
          if (role === 'customer') {
            navigate('/cushome');
          } else if (role === 'supplier') {
            navigate('/suphome');
          } else {
            setError('Invalid role detected.');
          }
        } else {
          setError('Failed to retrieve user role.');
        }
      } else {
        const errorMsg = await response.text();
        setError(errorMsg);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.centerWrapper}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Login</button>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
          <div className={styles.accountOptions}>
            <p>Don't have an account? <a href="/signup">Create your account.</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
