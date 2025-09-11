import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './SupplierList.module.css';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://localhost:8080/us-api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier account?')) {
      try {
        const deleteUrl = `http://localhost:8080/us-api/users/${supplierId}`;
        const response = await axios.delete(deleteUrl);
        if (response.status === 200) {
          alert('Supplier account has been deleted successfully.');
          setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
        } else {
          alert('Failed to delete supplier account.');
        }
      } catch (error) {
        console.error('Error deleting supplier:', error);
        alert('An error occurred while deleting the supplier. Please try again later.');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Supplier List</h1>
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
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.address}</td>
              <td>{supplier.name}</td>
              <td>{supplier.password}</td>
              <td>{supplier.role}</td>
              <td>{supplier.telNumber}</td>
              <td>{supplier.username}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteSupplier(supplier.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default SupplierList;
