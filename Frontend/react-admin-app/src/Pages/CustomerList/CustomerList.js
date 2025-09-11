
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CustomerList.module.css';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:8080/us-api/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  const deleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer account?')) {
      try {
        const deleteUrl = `http://localhost:8080/us-api/users/${customerId}`;
        const response = await axios.delete(deleteUrl);
        if (response.status === 200) {
          alert('Customer account has been deleted successfully.');
          setCustomers(customers.filter(customer => customer.id !== customerId));
        } else {
          alert('Failed to delete customer account.');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
        alert('An error occurred while deleting the customer. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Customer List</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Address</th>
            <th>Name</th>
            <th>Password</th>
            <th>Role</th>
            <th>Telephone</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.address}</td>
              <td>{customer.name}</td>
              <td>{customer.password}</td>
              <td>{customer.role}</td>
              <td>{customer.telNumber}</td>
              <td>{customer.username}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteCustomer(customer.id)}
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

export default CustomersList;
