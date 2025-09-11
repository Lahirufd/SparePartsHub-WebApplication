import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';
import styles from './FeedbacksPage.module.css';

const initialFeedbacks = [
  {
    id: 1,
    name: 'John Doe',
    date: '2025-08-10',
    rating: 5,
    comment: 'Great service and fast delivery! Highly recommended.',
    description: 'Very satisfied with the service.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    date: '2025-08-12',
    rating: 4,
    comment: 'Good quality parts, but packaging could be improved.',
    description: 'Packaging was a bit weak.'
  },
  {
    id: 3,
    name: 'Ravi Perera',
    date: '2025-08-15',
    rating: 5,
    comment: 'Excellent customer support and genuine products.',
    description: 'Support was very helpful.'
  },
  {
    id: 4,
    name: 'Ayesha Fernando',
    date: '2025-08-18',
    rating: 3,
    comment: 'Average experience, but the staff was friendly.',
    description: 'Could improve delivery time.'
  },
  {
    id: 5,
    name: 'Michael Lee',
    date: '2025-08-19',
    rating: 4,
    comment: 'Parts were genuine and fit perfectly. Will buy again.',
    description: 'Easy to find what I needed.'
  },
  {
    id: 6,
    name: 'Saman Kumara',
    date: '2025-08-20',
    rating: 5,
    comment: 'Outstanding! The best spare parts shop online.',
    description: 'Highly recommend to everyone.'
  },
];

function FeedbacksPage() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [form, setForm] = useState({ name: '', subject: '', rating: 5, description: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setForm(f => ({ ...f, rating }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.description) return;
    setFeedbacks([
      ...feedbacks,
      {
        id: Date.now(),
        name: form.name,
        date: new Date().toISOString().slice(0, 10),
        rating: form.rating,
        comment: form.subject,
        description: form.description
      },
    ]);
    setForm({ name: '', subject: '', rating: 5, description: '' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Customer Feedbacks</h1>
        <p style={{ maxWidth: '900px', margin: '0 auto 1.5rem auto', fontSize: '1.15rem', color: '#444', textAlign: 'center' }}>
          We value your opinion! Please share your experience and feedback about our company. Your feedback helps us improve our service and provide you with the best experience possible.
        </p>
        <div className={styles.feedbackContainer}>
          {feedbacks.length === 0 ? (
            <div className={styles.emptyMsg}>No feedbacks yet.</div>
          ) : (
            <div className={styles.feedbackListScrollable}>
              {feedbacks.map(fb => (
                <div key={fb.id} className={styles.feedbackCard}>
                  <div className={styles.feedbackHeader}>
                    <span className={styles.feedbackName}>{fb.name}</span>
                    <span className={styles.feedbackDate}>{fb.date}</span>
                  </div>
                  {fb.description && <div className={styles.feedbackDescription}>{fb.description}</div>}
                  <div className={styles.feedbackRating}>{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</div>
                  <div className={styles.feedbackComment}>{fb.comment}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Leave Your Feedback</h2>
          <form className={styles.feedbackForm} onSubmit={handleSubmit}>
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
            <div className={styles.formRowFull}>
              <textarea
                name="description"
                placeholder="Share your feedback..."
                value={form.description}
                onChange={handleChange}
                className={styles.input}
                rows={4}
                required
                style={{ background: '#f8fbff', fontSize: '1.08rem', border: '1.5px solid #b0d4f1', borderRadius: '10px' }}
              />
            </div>
            <div className={styles.formActions}>
              <div className={styles.starRatingInput}>
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    className={star <= form.rating ? styles.starActive : styles.star}
                    onClick={() => handleStarClick(star)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Rate ${star} star${star>1?'s':''}`}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleStarClick(star)}
                    style={{ fontSize: '2rem', marginRight: '0.15rem', transition: 'transform 0.2s', cursor: 'pointer', transform: star <= form.rating ? 'scale(1.15)' : 'scale(1)' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <button className={styles.submitBtnCreative} type="submit">Submit Feedback</button>
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

export default FeedbacksPage;
