import React, { useState } from 'react';
import Header from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import styles from './WarrantyItemsPage.module.css';


function WarrantyItemsPage() {
    // Mock data for warranty claims (replace with API call in real app)
    const [claims] = useState([
        {
            id: 1,
            claim_reason: 'Defective part',
            image_path: '/public/warranty.png',
            order_id: 1001,
            status: 'Pending',
            submitted_at: '2025-08-15 10:30:00',
            user_id: 5,
            product_id: 201,
        },
        {
            id: 2,
            claim_reason: 'Wrong item delivered',
            image_path: '/public/warranty.png',
            order_id: 1002,
            status: 'Approved',
            submitted_at: '2025-08-16 14:20:00',
            user_id: 5,
            product_id: 202,
        },
    ]);

    const [picture, setPicture] = useState(null);
    const [claimReason, setClaimReason] = useState('');
    const [orderId, setOrderId] = useState('');
    const [productId, setProductId] = useState('');
    const [orderItems, setOrderItems] = useState([]);

    // Dummy order items by orderId
    const dummyOrderItems = {
        '1001': [
            { id: '201', name: 'Brake Pad' },
            { id: '202', name: 'Oil Filter' },
        ],
        '1002': [
            { id: '203', name: 'Air Filter' },
            { id: '204', name: 'Spark Plug' },
        ],
    };

    const handlePictureChange = (e) => {
        setPicture(e.target.files[0]);
    };
    const handleClaimReasonChange = (e) => {
        setClaimReason(e.target.value);
    };
    const handleOrderIdChange = (e) => {
        const value = e.target.value;
        setOrderId(value);
        setProductId('');
        if (dummyOrderItems[value]) {
            setOrderItems(dummyOrderItems[value]);
        } else {
            setOrderItems([]);
        }
    };
    const handleProductIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Placeholder for form submission logic
        alert('Warranty claim submitted! (Demo only)');
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <main className={styles.main}>
                    <section className={styles.introSection}>
                        <h1 className={styles.pageTitle}>Warranty Claims</h1>
                        <p className={styles.introText}>
                            Welcome to the Warranty Claims page. Here you can submit a claim for any product purchased through our platform that is still under warranty. Please provide a clear reason for your claim, attach a relevant image, and specify your order ID. Our team will review your claim and update the status as soon as possible.
                        </p>
                    </section>

                    <section className={styles.claimsSection}>
                        <h2>Your Warranty Claims</h2>
                        <div className={styles.claimsTableWrapper}>
                            <table className={styles.claimsTable}>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Reason</th>
                                        <th>Image</th>
                                        <th>Order ID</th>
                                        <th>Status</th>
                                        <th>Submitted At</th>
                                        <th>Product ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {claims.map((claim) => (
                                        <tr key={claim.id}>
                                            <td>{claim.id}</td>
                                            <td>{claim.claim_reason}</td>
                                            <td>
                                                <img src={claim.image_path} alt="Claim" style={{ width: 60, borderRadius: 4 }} />
                                            </td>
                                            <td>{claim.order_id}</td>
                                            <td>
                                                <span className={
                                                    claim.status === 'Approved' ? styles.statusApproved :
                                                    claim.status === 'Pending' ? styles.statusPending :
                                                    styles.statusOther
                                                }>
                                                    {claim.status}
                                                </span>
                                            </td>
                                            <td>{claim.submitted_at}</td>
                                            <td>{claim.product_id}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className={styles.formSectionWide}>
                        <h2>Submit a New Warranty Claim</h2>
                        <form onSubmit={handleSubmit} className={styles.formWide}>
                            <div className={styles.formGroup}>
                                <label htmlFor="claimReason">Claim Reason:</label>
                                <textarea id="claimReason" value={claimReason} onChange={handleClaimReasonChange} required placeholder="Describe the issue..." />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="orderId">Order ID:</label>
                                <input
                                    type="number"
                                    id="orderId"
                                    value={orderId}
                                    onChange={handleOrderIdChange}
                                    required
                                    placeholder="Enter your order ID"
                                    className={styles.inputTall}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="productId">Product:</label>
                                <select
                                    id="productId"
                                    value={productId}
                                    onChange={handleProductIdChange}
                                    required
                                    disabled={!orderId || orderItems.length === 0}
                                    className={styles.inputTall}
                                >
                                    <option value="" disabled>
                                        {orderId ? (orderItems.length > 0 ? 'Select a product' : 'No items found') : 'Enter Order ID first'}
                                    </option>
                                    {orderItems.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="picture">Upload Image:</label>
                                <input type="file" id="picture" onChange={handlePictureChange} required />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button type="submit" className={styles.submitButtonSmall}>Submit</button>
                            </div>

                        </form>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <button className={styles.backButton} onClick={() => window.history.back()}>
                                Back
                            </button>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default WarrantyItemsPage;
