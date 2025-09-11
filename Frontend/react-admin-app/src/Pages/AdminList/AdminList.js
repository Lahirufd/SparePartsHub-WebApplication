import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminList.module.css';


const AdminListPage = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:8081/as-api/admins');
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  const deleteAdmin = async (adminId) => {
    if (window.confirm('Are you sure you want to delete this admin account?')) {
      try {
        const adminServiceUrl = `http://localhost:8081/as-api/admins/${adminId}`;
        const adminResponse = await axios.delete(adminServiceUrl);
        if (adminResponse.status === 200) {
          alert('Admin account has been deleted successfully.');
          setAdmins(admins.filter(admin => admin.id !== adminId));
        } else {
          alert('Failed to delete admin account.');
        }
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('An error occurred while deleting the admin. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Admin Users List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Telephone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.username}</td>
              <td>{admin.address}</td>
              <td>{admin.telNumber}</td>
              <td>{admin.role}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteAdmin(admin.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.backButtonContainer}>
        <a href="ddashboard">
          <button className={styles.backButton}>Back</button>
        </a>
      </div>
    </div>
  );
};

export default AdminListPage;
