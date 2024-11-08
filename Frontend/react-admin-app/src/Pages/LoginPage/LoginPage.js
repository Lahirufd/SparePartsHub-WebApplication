import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/as-api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Fetch user role from the backend
        const roleResponse = await fetch(`http://localhost:8081/as-api/admins/role?username=${username}`);
        if (roleResponse.ok) {
          const role = await roleResponse.text();
          
          // Redirect based on the user's role
          if (role === 'Director') {
            navigate('/ddashboard');
          } else if (role === 'Manager') {
            navigate('/mdashboard');
          } else if (role === 'Technician') {
            navigate('/tdashboard');
          } else if (role === 'Stock Handler') {
            navigate('/shdashboard');
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
      <div className={styles.centerWrapper}>
        <div className={styles.loginContainer}>
          <h2>Admin Login</h2>
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
            <p>Don't have an admin account? <a href="/signup">Create your account as an admin.</a></p>
          </div>
          <button className={styles.adminButton} onClick={() => window.location.href = '/'}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
