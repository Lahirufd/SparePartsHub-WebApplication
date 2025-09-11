import React, { useState } from 'react';
import Header from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import styles from './ComplaintsPage.module.css';

const initialComplaints = [
  {
    id: 1,
    name: 'Saman Perera',
    date: '2025-08-09',
    status: 'Resolved',
    subject: 'Late Delivery',
    message: 'My order arrived 3 days late. Please improve delivery times.',
    response: 'We apologize for the delay. We are working to improve our logistics.'
  },
  {
    id: 2,
    name: 'Ayesha Fernando',
    date: '2025-08-13',
    status: 'Pending',
    subject: 'Wrong Item',
    message: 'Received a different part than ordered.',
    response: ''
  },
  {
    id: 2,
    name: 'Ayesha Fernando',
    date: '2025-08-13',
    status: 'Pending',
    subject: 'Wrong Item',
    message: 'Received a different part than ordered.',
    response: ''
  },
  {
    id: 2,
    name: 'Ayesha Fernando',
    date: '2025-08-13',
    status: 'Pending',
    subject: 'Wrong Item',
    message: 'Received a different part than ordered.',
    response: ''
  },
  {
    id: 1,
    name: 'Saman Perera',
    date: '2025-08-09',
    status: 'Resolved',
    subject: 'Late Delivery',
    message: 'My order arrived 3 days late. Please improve delivery times.',
    response: 'We apologize for the delay. We are working to improve our logistics.'
  },
];


function ComplaintsPage() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [form, setForm] = useState({ name: '', subject: '', description: '', message: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.subject || !form.message) return;
    setComplaints([
      ...complaints,
      {
        id: Date.now(),
        name: form.name,
        date: new Date().toISOString().slice(0, 10),
        status: 'Pending',
        subject: form.subject,
        description: form.description,
        message: form.message,
        response: ''
      },
    ]);
    setForm({ name: '', subject: '', description: '', message: '' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Customer Complaints</h1>
        <p style={{ maxWidth: '900px', margin: '0 auto 1.5rem auto', fontSize: '1.15rem', color: '#444', textAlign: 'center' }}>
          If you have experienced any issues with our service or products, please let us know by submitting your complaint below. We are committed to resolving your concerns as quickly as possible.
        </p>
        <div className={styles.complaintsContainer}>
          {complaints.length === 0 ? (
            <div className={styles.emptyMsg}>No complaints submitted yet.</div>
          ) : (
            <div className={styles.complaintsListScrollable}>
              {complaints.map(c => (
                <div key={c.id} className={styles.complaintCard}>
                  <div className={styles.complaintHeader}>
                    <span className={styles.complaintName}>{c.name}</span>
                    <span className={styles.complaintDate}>{c.date}</span>
                    <span className={c.status === 'Resolved' ? styles.statusResolved : styles.statusPending}>{c.status}</span>
                  </div>
                  {c.description && <div className={styles.complaintDescription}>{c.description}</div>}
                  <div className={styles.complaintSubject}><b>Subject:</b> {c.subject}</div>
                  <div className={styles.complaintMessage}>{c.message}</div>
                  {c.response && <div className={styles.complaintResponse}><b>Response:</b> {c.response}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Submit a Complaint</h2>
          <form className={styles.complaintForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
                required
                autoComplete="off"
                style={{ background: '#f0f7fa', fontWeight: 500 }}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className={styles.input}
                required
                autoComplete="off"
                style={{ background: '#f0f7fa', fontWeight: 500 }}
              />
            </div>
            {/* <div className={styles.formRowFull}>
              <textarea
                name="description"
                placeholder="Short Description (optional)"
                value={form.description}
                onChange={handleChange}
                className={styles.input}
                rows={2}
                style={{ background: '#f8fbff', fontSize: '1.08rem', border: '1.5px solid #b0d4f1', borderRadius: '10px' }}
              />
            </div> */}
            <div className={styles.formRowFull}>
              <textarea
                name="message"
                placeholder="Describe your issue"
                value={form.message}
                onChange={handleChange}
                className={styles.input}
                rows={4}
                required
                style={{ background: '#f8fbff', fontSize: '1.08rem', border: '1.5px solid #b0d4f1', borderRadius: '10px' }}
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.submitBtn} type="submit">Submit Complaint</button>
            </div>
          </form>
        </div>
        {/* Back Button inside container */}
        <div className={styles.backButtonContainer}>
          <button
            className={styles.backButton}
            onClick={() => navigate(-1)}
            type="button"
          >
            Back
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ComplaintsPage;
