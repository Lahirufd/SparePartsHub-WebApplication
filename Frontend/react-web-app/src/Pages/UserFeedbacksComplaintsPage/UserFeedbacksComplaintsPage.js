import React, { useEffect, useState } from 'react';

const FeedbacksComplaintsPage = () => {
  const [productFeedbacks, setProductFeedbacks] = useState([]);
  const [orderComplaints, setOrderComplaints] = useState([]);
  const [companyComplaints, setCompanyComplaints] = useState([]);
  const [companyFeedbacks, setCompanyFeedbacks] = useState([]);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState({});
  const [categories, setCategories] = useState({});
  const [activeTab, setActiveTab] = useState('product-feedback');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const userId = 1; // Current user ID

  // Categories data
  const categoriesData = {
    1: { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
    2: { id: 2, name: 'Clothing', description: 'Fashion and apparel items' },
    3: { id: 3, name: 'Books', description: 'Books and educational materials' },
    4: { id: 4, name: 'Home & Garden', description: 'Home improvement and garden items' },
    5: { id: 5, name: 'Food & Beverage', description: 'Food and drink products' },
    6: { id: 6, name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' }
  };

  // Products data
  const productsData = {
    201: { id: 201, name: 'Wireless Bluetooth Headphones', category_id: 1 },
    202: { id: 202, name: 'Smart Fitness Watch', category_id: 1 },
    203: { id: 203, name: 'Organic Coffee Beans', category_id: 5 },
    204: { id: 204, name: 'Gaming Mechanical Keyboard', category_id: 1 },
    205: { id: 205, name: 'Programming Books Set', category_id: 3 }
  };

  // Orders data
  const ordersData = {
    101: { id: 101, created_at: '2025-08-20T10:15:00', status: 'Delivered', total_price: 139.97 },
    102: { id: 102, created_at: '2025-08-15T14:30:00', status: 'Processing', total_price: 249.99 },
    103: { id: 103, created_at: '2025-07-28T09:00:00', status: 'Delivered', total_price: 269.95 }
  };

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setCategories(categoriesData);
      setProducts(productsData);
      setOrders(ordersData);

      // Mock product feedbacks data
      setProductFeedbacks([
        {
          id: 1,
          comment: 'Amazing sound quality and comfortable to wear for long periods!',
          rating: 5,
          product_id: 201,
          user_id: userId,
          created_at: '2025-08-21T14:30:00'
        },
        {
          id: 2,
          comment: 'Good value for money, delivery was quick.',
          rating: 4,
          product_id: 203,
          user_id: userId,
          created_at: '2025-08-22T09:15:00'
        },
        {
          id: 3,
          comment: 'The watch is great but battery life could be better.',
          rating: 4,
          product_id: 202,
          user_id: userId,
          created_at: '2025-08-25T16:45:00'
        }
      ]);

      // Mock order complaints data
      setOrderComplaints([
        {
          id: 1,
          issue_description: 'Package arrived damaged, outer box was completely torn.',
          order_id: 101,
          user_id: userId,
          status: 'Resolved',
          created_at: '2025-08-21T10:30:00'
        },
        {
          id: 2,
          issue_description: 'Order is delayed beyond the estimated delivery date.',
          order_id: 102,
          user_id: userId,
          status: 'In Progress',
          created_at: '2025-08-26T08:20:00'
        }
      ]);

      // Mock company complaints data
      setCompanyComplaints([
        {
          id: 1,
          name: 'John Doe',
          subject: 'Website Outage',
          issue_description: 'Website was down for several hours during sale period.',
          user_id: userId,
          status: 'Resolved',
          created_at: '2025-08-15T12:00:00'
        },
        {
          id: 2,
          name: 'Jane Smith',
          subject: 'Customer Service Delay',
          issue_description: 'Customer service response time is too slow.',
          user_id: userId,
          status: 'Pending',
          created_at: '2025-08-28T15:30:00'
        }
      ]);

      // Mock company feedback data
      setCompanyFeedbacks([
        {
          id: 1,
          comment: 'Love the new website design and user experience improvements!',
          rating: 5,
          user_id: userId,
          created_at: '2025-08-20T11:15:00'
        },
        {
          id: 2,
          comment: 'Great customer service and fast shipping. Keep it up!',
          rating: 5,
          user_id: userId,
          created_at: '2025-08-24T14:20:00'
        }
      ]);
    }, 300);
  }, [userId]);

  const openModal = (type) => {
    setModalType(type);
    setFormData({});
    setShowModal(true);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    
    switch (modalType) {
      case 'product-feedback':
        if (!formData.comment || !formData.rating || !formData.product_id) {
          alert('Please fill in all fields.');
          return;
        }
        const newProductFeedback = {
          id: Date.now(),
          comment: formData.comment,
          rating: parseInt(formData.rating),
          product_id: parseInt(formData.product_id),
          user_id: userId,
          created_at: timestamp
        };
        setProductFeedbacks(prev => [newProductFeedback, ...prev]);
        break;

      case 'company-feedback':
        if (!formData.name || !formData.subject || !formData.comment || !formData.rating) {
          alert('Please fill in all fields.');
          return;
        }
        const newCompanyFeedback = {
          id: Date.now(),
          name: formData.name,
          subject: formData.subject,
          comment: formData.comment,
          rating: parseInt(formData.rating),
          user_id: userId,
          created_at: timestamp
        };
        setCompanyFeedbacks(prev => [newCompanyFeedback, ...prev]);
        break;

      case 'company-complaint':
        if (!formData.name || !formData.subject || !formData.issue_description) {
          alert('Please fill in all fields.');
          return;
        }
        const newCompanyComplaint = {
          id: Date.now(),
          name: formData.name,
          subject: formData.subject,
          issue_description: formData.issue_description,
          user_id: userId,
          status: 'Pending',
          created_at: timestamp
        };
        setCompanyComplaints(prev => [newCompanyComplaint, ...prev]);
        break;

      case 'order-complaint':
        if (!formData.issue_description || !formData.order_id) {
          alert('Please fill in all fields.');
          return;
        }
        const newOrderComplaint = {
          id: Date.now(),
          issue_description: formData.issue_description,
          order_id: parseInt(formData.order_id),
          user_id: userId,
          status: 'Pending',
          created_at: timestamp
        };
        setOrderComplaints(prev => [newOrderComplaint, ...prev]);
        break;
    }

    alert('Submitted successfully!');
    setShowModal(false);
    setFormData({});
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: '1px solid'
    };
    
    switch (status) {
      case 'Resolved': return { ...baseStyle, background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
      case 'In Progress': return { ...baseStyle, background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' };
      case 'Pending': return { ...baseStyle, background: '#fecaca', color: '#991b1b', borderColor: '#f87171' };
      default: return { ...baseStyle, background: '#f3f4f6', color: '#374151', borderColor: '#d1d5db' };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resolved': return '✅';
      case 'In Progress': return '🔄';
      case 'Pending': return '⏳';
      default: return '📋';
    }
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getFilteredData = (data, hasStatus = false) => {
    let filtered = data;
    
    if (hasStatus && filterStatus !== 'all') {
      filtered = data.filter(item => item.status?.toLowerCase() === filterStatus);
    }
    
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'status':
          return (a.status || '').localeCompare(b.status || '');
        default:
          return 0;
      }
    });
  };

  const getStats = () => {
    const totalFeedbacks = productFeedbacks.length + companyFeedbacks.length;
    const totalComplaints = orderComplaints.length + companyComplaints.length;
    const avgProductRating = productFeedbacks.length > 0 
      ? (productFeedbacks.reduce((sum, f) => sum + f.rating, 0) / productFeedbacks.length).toFixed(1)
      : 0;
    const avgCompanyRating = companyFeedbacks.length > 0
      ? (companyFeedbacks.reduce((sum, f) => sum + f.rating, 0) / companyFeedbacks.length).toFixed(1)
      : 0;
    const resolvedComplaints = [...orderComplaints, ...companyComplaints].filter(c => c.status === 'Resolved').length;

    return { totalFeedbacks, totalComplaints, avgProductRating, avgCompanyRating, resolvedComplaints };
  };

  const stats = getStats();

  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #c7d2fe 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 1.5rem'
    },
    
    header: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem'
    },
    
    subtitle: {
      fontSize: '1.25rem',
      color: '#64748b',
      marginBottom: '2rem'
    },

    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },

    statCard: {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    },

    statIcon: {
      fontSize: '2rem',
      marginBottom: '0.5rem'
    },

    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },

    statLabel: {
      color: '#64748b',
      fontSize: '0.875rem',
      fontWeight: '500'
    },

    tabContainer: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '2rem',
      overflow: 'hidden'
    },

    tabsHeader: {
      display: 'flex',
      background: '#f8fafc',
      borderBottom: '1px solid #e5e7eb'
    },

    tab: {
      flex: 1,
      padding: '1rem 1.5rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
    },

    activeTab: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white'
    },

    inactiveTab: {
      color: '#64748b'
    },

    tabContent: {
      padding: '2rem'
    },

    controlsSection: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '2rem',
      gap: '1rem',
      flexWrap: 'wrap'
    },

    controlsLeft: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },

    input: {
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s ease'
    },

    button: {
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    primaryBtn: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white'
    },

    successBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },

    secondaryBtn: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db'
    },

    itemsGrid: {
      display: 'grid',
      gap: '1.5rem'
    },

    itemCard: {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },

    itemHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      gap: '1rem'
    },

    itemTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem'
    },

    itemMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.875rem',
      color: '#64748b',
      marginBottom: '1rem'
    },

    itemContent: {
      color: '#374151',
      lineHeight: '1.6',
      marginBottom: '1rem'
    },

    ratingDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.25rem'
    },

    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    },

    modalContent: {
      background: 'white',
      borderRadius: '1rem',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },

    modalHeader: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },

    closeBtn: {
      color: 'white',
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      width: '2.5rem',
      height: '2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.2s ease'
    },

    modalBody: {
      padding: '1.5rem'
    },

    formGroup: {
      marginBottom: '1.5rem'
    },

    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '0.5rem'
    },

    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      resize: 'vertical',
      outline: 'none',
      fontFamily: 'inherit',
      minHeight: '120px',
      boxSizing: 'border-box'
    },

    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      background: 'white',
      boxSizing: 'border-box'
    },

    numberInput: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      outline: 'none',
      boxSizing: 'border-box'
    },

    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end'
    },

    emptyState: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#64748b'
    },

    emptyIcon: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },

    emptyText: {
      fontSize: '1.125rem',
      fontWeight: '500'
    }
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'product-feedback': {
        const filteredProductFeedbacks = getFilteredData(productFeedbacks);
        return (
          <div>
            <div style={styles.controlsSection}>
              <div style={styles.controlsLeft}>
                <select
                  style={styles.input}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
              <button
                style={{...styles.button, ...styles.successBtn}}
                onClick={() => openModal('product-feedback')}
              >
                <span>➕</span>
                Leave Product Feedback
              </button>
            </div>
            <div style={styles.itemsGrid}>
              {filteredProductFeedbacks.length > 0 ? filteredProductFeedbacks.map(feedback => {
                const product = products[feedback.product_id];
                const category = categories[product?.category_id];
                return (
                  <div key={feedback.id} style={styles.itemCard}>
                    <div style={styles.itemHeader}>
                      <div>
                        <div style={styles.itemTitle}>
                          {product?.name || `Product #${feedback.product_id}`}
                        </div>
                        <div style={styles.itemMeta}>
                          <span>⭐ Feedback #{feedback.id}</span>
                          <span>📅 {new Date(feedback.created_at).toLocaleDateString()}</span>
                          <span>🏷️ {category?.name || 'Unknown'}</span>
                        </div>
                      </div>
                      <div style={styles.ratingDisplay}>
                        <span>{getRatingStars(feedback.rating)}</span>
                        <span style={{fontSize: '1rem', fontWeight: '600', color: '#1f2937'}}>
                          {feedback.rating}/5
                        </span>
                      </div>
                    </div>
                    <div style={styles.itemContent}>
                      "{feedback.comment}"
                    </div>
                  </div>
                );
              }) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📝</div>
                  <div style={styles.emptyText}>No product feedback yet</div>
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'order-complaints': {
        const filteredOrderComplaints = getFilteredData(orderComplaints.filter(c => filterStatus === 'all' || c.status.toLowerCase() === filterStatus), true);
        return (
          <div>
            <div style={styles.controlsSection}>
              <div style={styles.controlsLeft}>
                <select
                  style={styles.input}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select
                  style={styles.input}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
              <button
                style={{...styles.button, ...styles.primaryBtn}}
                onClick={() => openModal('order-complaint')}
              >
                <span>➕</span>
                New Order Complaint
              </button>
            </div>
            <div style={styles.itemsGrid}>
              {filteredOrderComplaints.length > 0 ? filteredOrderComplaints.map(complaint => {
                const order = orders[complaint.order_id];
                return (
                  <div key={complaint.id} style={styles.itemCard}>
                    <div style={styles.itemHeader}>
                      <div>
                        <div style={styles.itemTitle}>
                          Order #{complaint.order_id} Issue
                        </div>
                        <div style={styles.itemMeta}>
                          <span>📋 Complaint #{complaint.id}</span>
                          <span>📅 {new Date(complaint.created_at).toLocaleDateString()}</span>
                          {order && <span>💰 ${order.total_price.toFixed(2)}</span>}
                        </div>
                      </div>
                      <div style={getStatusStyle(complaint.status)}>
                        <span>{getStatusIcon(complaint.status)}</span>
                        {complaint.status}
                      </div>
                    </div>
                    <div style={styles.itemContent}>
                      {complaint.issue_description}
                    </div>
                  </div>
                );
              }) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📦</div>
                  <div style={styles.emptyText}>No order complaints yet</div>
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'company-complaints': {
        const filteredCompanyComplaints = getFilteredData(companyComplaints.filter(c => filterStatus === 'all' || c.status.toLowerCase() === filterStatus), true);
        return (
          <div>
            <div style={styles.controlsSection}>
              <div style={styles.controlsLeft}>
                <select
                  style={styles.input}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select
                  style={styles.input}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
              <button
                style={{...styles.button, ...styles.primaryBtn}}
                onClick={() => openModal('company-complaint')}
              >
                <span>➕</span>
                New Company Complaint
              </button>
            </div>
            <div style={styles.itemsGrid}>
              {filteredCompanyComplaints.length > 0 ? filteredCompanyComplaints.map(complaint => (
                <div key={complaint.id} style={styles.itemCard}>
                  <div style={styles.itemHeader}>
                    <div>
                      <div style={styles.itemTitle}>
                        Company Service Issue
                      </div>
                      <div style={styles.itemMeta}>
                        <span>📋 Complaint #{complaint.id}</span>
                        <span>📅 {new Date(complaint.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={getStatusStyle(complaint.status)}>
                      <span>{getStatusIcon(complaint.status)}</span>
                      {complaint.status}
                    </div>
                  </div>
                  <div style={styles.itemContent}>
                    {complaint.issue_description}
                  </div>
                </div>
              )) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🏢</div>
                  <div style={styles.emptyText}>No company complaints yet</div>
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'company-feedback': {
        const filteredCompanyFeedbacks = getFilteredData(companyFeedbacks);
        return (
          <div>
            <div style={styles.controlsSection}>
              <div style={styles.controlsLeft}>
                <select
                  style={styles.input}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
              <button
                style={{...styles.button, ...styles.successBtn}}
                onClick={() => openModal('company-feedback')}
              >
                <span>➕</span>
                Leave Company Feedback
              </button>
            </div>
            <div style={styles.itemsGrid}>
              {filteredCompanyFeedbacks.length > 0 ? filteredCompanyFeedbacks.map(feedback => (
                <div key={feedback.id} style={styles.itemCard}>
                  <div style={styles.itemHeader}>
                    <div>
                      <div style={styles.itemTitle}>
                        Company Experience
                      </div>
                      <div style={styles.itemMeta}>
                        <span>💬 Feedback #{feedback.id}</span>
                        <span>📅 {new Date(feedback.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={styles.ratingDisplay}>
                      <span>{getRatingStars(feedback.rating)}</span>
                      <span style={{fontSize: '1rem', fontWeight: '600', color: '#1f2937'}}>
                        {feedback.rating}/5
                      </span>
                    </div>
                  </div>
                  <div style={styles.itemContent}>
                    "{feedback.comment}"
                  </div>
                </div>
              )) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>💬</div>
                  <div style={styles.emptyText}>No company feedback yet</div>
                </div>
              )}
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'product-feedback': return 'Leave Product Feedback';
      case 'company-feedback': return 'Leave Company Feedback';
      case 'company-complaint': return 'Submit Company Complaint';
      case 'order-complaint': return 'Submit Order Complaint';
      default: return 'Form';
    }
  };

  const getModalContent = () => {
    switch (modalType) {
      case 'product-feedback':
        return (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Product</label>
              <select
                style={styles.select}
                value={formData.product_id || ''}
                onChange={(e) => handleFormChange('product_id', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="">Choose a product...</option>
                {Object.values(products).map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Feedback</label>
              <textarea
                style={styles.textarea}
                placeholder="Share your experience with this product..."
                value={formData.comment || ''}
                onChange={(e) => handleFormChange('comment', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rating (1-5 stars)</label>
              <input
                type="number"
                style={styles.numberInput}
                placeholder="Rate from 1 to 5"
                min="1"
                max="5"
                value={formData.rating || ''}
                onChange={(e) => handleFormChange('rating', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>
        );

      case 'company-feedback':
        return (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                type="text"
                style={{...styles.input, maxWidth: '516px', width: '100%'}}
                placeholder="Enter your name"
                value={formData.name || ''}
                onChange={(e) => handleFormChange('name', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                style={{...styles.input, maxWidth: '516px', width: '100%'}}
                placeholder="Enter subject"
                value={formData.subject || ''}
                onChange={(e) => handleFormChange('subject', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Experience</label>
              <textarea
                style={styles.textarea}
                placeholder="Share your overall experience with our company..."
                value={formData.comment || ''}
                onChange={(e) => handleFormChange('comment', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rating (1-5 stars)</label>
              <input
                type="number"
                style={styles.numberInput}
                placeholder="Rate from 1 to 5"
                min="1"
                max="5"
                value={formData.rating || ''}
                onChange={(e) => handleFormChange('rating', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>
        );

      case 'company-complaint':
        return (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Name</label>
              <input
                type="text"
                style={{...styles.input, maxWidth: '516px', width: '100%'}}
                placeholder="Enter your name"
                value={formData.name || ''}
                onChange={(e) => handleFormChange('name', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Subject</label>
              <input
                type="text"
                style={{...styles.input, maxWidth: '516px', width: '100%'}}
                placeholder="Enter subject"
                value={formData.subject || ''}
                onChange={(e) => handleFormChange('subject', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Issue Description</label>
              <textarea
                style={styles.textarea}
                placeholder="Describe your issue with our company services..."
                value={formData.issue_description || ''}
                onChange={(e) => handleFormChange('issue_description', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>
        );

      case 'order-complaint':
        return (
          <div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Select Order</label>
              <select
                style={styles.select}
                value={formData.order_id || ''}
                onChange={(e) => handleFormChange('order_id', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              >
                <option value="">Choose an order...</option>
                {Object.values(orders).map(order => (
                  <option key={order.id} value={order.id}>
                    Order #{order.id} - ${order.total_price.toFixed(2)} ({order.status})
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Issue Description</label>
              <textarea
                style={styles.textarea}
                placeholder="Describe the issue with your order..."
                value={formData.issue_description || ''}
                onChange={(e) => handleFormChange('issue_description', e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Feedback & Complaints</h1>
          <p style={styles.subtitle}>Your voice matters - share your experiences and help us improve</p>
        </div>

        {/* Statistics Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📊</div>
            <div style={styles.statValue}>{stats.totalFeedbacks}</div>
            <div style={styles.statLabel}>Total Feedbacks</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚠️</div>
            <div style={styles.statValue}>{stats.totalComplaints}</div>
            <div style={styles.statLabel}>Total Complaints</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>⭐</div>
            <div style={styles.statValue}>{stats.avgProductRating}</div>
            <div style={styles.statLabel}>Avg Product Rating</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>🏢</div>
            <div style={styles.statValue}>{stats.avgCompanyRating}</div>
            <div style={styles.statLabel}>Avg Company Rating</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>✅</div>
            <div style={styles.statValue}>{stats.resolvedComplaints}</div>
            <div style={styles.statLabel}>Resolved Issues</div>
          </div>
        </div>

        {/* Tabs Container */}
        <div style={styles.tabContainer}>
          <div style={styles.tabsHeader}>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'product-feedback' ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab('product-feedback')}
            >
              <span>📝</span>
              Product Feedback
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'order-complaints' ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab('order-complaints')}
            >
              <span>📦</span>
              Order Complaints
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'company-complaints' ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab('company-complaints')}
            >
              <span>🏢</span>
              Company Complaints
            </button>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'company-feedback' ? styles.activeTab : styles.inactiveTab)
              }}
              onClick={() => setActiveTab('company-feedback')}
            >
              <span>💬</span>
              Company Feedback
            </button>
          </div>
          <div style={styles.tabContent}>
            {getTabContent()}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div style={styles.modal} onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
            <div style={styles.modalContent}>
              <div style={styles.modalHeader}>
                <div style={styles.modalTitle}>{getModalTitle()}</div>
                <button
                  style={styles.closeBtn}
                  onClick={() => setShowModal(false)}
                  onMouseEnter={e => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  ×
                </button>
              </div>
              <div style={styles.modalBody}>
                {getModalContent()}
                <div style={styles.buttonGroup}>
                  <button
                    style={{...styles.button, ...styles.secondaryBtn}}
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    style={{...styles.button, ...styles.primaryBtn}}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbacksComplaintsPage;