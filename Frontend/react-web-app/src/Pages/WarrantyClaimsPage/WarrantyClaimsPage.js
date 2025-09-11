import React, { useEffect, useState } from 'react';

const WarrantyClaimsPage = () => {
  const [warrantyClaims, setWarrantyClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const userId = 'user123';

  // Dummy categories data
  const dummyCategories = {
    1: { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
    2: { id: 2, name: 'Automotive', description: 'Car parts and accessories' },
    3: { id: 3, name: 'Home & Garden', description: 'Home improvement and garden items' },
    4: { id: 4, name: 'Sports & Outdoor', description: 'Sports equipment and outdoor gear' },
    5: { id: 5, name: 'Tools', description: 'Hand tools and power tools' }
  };

  // Dummy products data
  const dummyProducts = {
    201: { 
      id: 201, 
      name: 'Wireless Gaming Headset', 
      description: 'High-quality wireless gaming headset with noise cancellation',
      price: 129.99,
      category_id: 1,
      image_path: '/images/headset.jpg',
      created_at: '2024-01-15T10:30:00'
    },
    202: { 
      id: 202, 
      name: 'Car Dashboard Camera', 
      description: '4K Ultra HD dashboard camera with night vision',
      price: 199.50,
      category_id: 2,
      image_path: '/images/dashcam.jpg',
      created_at: '2024-02-01T14:20:00'
    },
    203: { 
      id: 203, 
      name: 'Smart Home Thermostat', 
      description: 'WiFi-enabled programmable thermostat with app control',
      price: 249.99,
      category_id: 3,
      image_path: '/images/thermostat.jpg',
      created_at: '2024-01-20T09:15:00'
    },
    204: { 
      id: 204, 
      name: 'Bluetooth Fitness Tracker', 
      description: 'Advanced fitness tracker with heart rate monitoring',
      price: 89.99,
      category_id: 4,
      image_path: '/images/fitness-tracker.jpg',
      created_at: '2024-03-01T16:45:00'
    },
    205: { 
      id: 205, 
      name: 'Cordless Power Drill', 
      description: '20V cordless drill with LED light and multiple bits',
      price: 159.99,
      category_id: 5,
      image_path: '/images/drill.jpg',
      created_at: '2024-02-15T11:30:00'
    },
    206: { 
      id: 206, 
      name: 'Smart TV 55 inch', 
      description: '4K Ultra HD Smart LED TV with streaming apps',
      price: 699.99,
      category_id: 1,
      image_path: '/images/smart-tv.jpg',
      created_at: '2024-01-10T13:00:00'
    }
  };

  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      setWarrantyClaims([
        {
          id: 1001,
          claim_reason: 'Product stopped working after 3 months of use. The screen flickers and audio cuts out intermittently.',
          image_path: '/images/claim1.jpg',
          order_id: 5001,
          status: 'Under Review',
          submitted_at: '2025-08-20T14:30:00',
          user_id: userId,
          product_id: 201
        },
        {
          id: 1002,
          claim_reason: 'Camera lens cracked during normal use. The housing also shows signs of manufacturing defect.',
          image_path: '/images/claim2.jpg',
          order_id: 5002,
          status: 'Approved',
          submitted_at: '2025-08-15T09:45:00',
          user_id: userId,
          product_id: 202
        },
        {
          id: 1003,
          claim_reason: 'Device overheats and shuts down randomly. Temperature readings are inaccurate.',
          image_path: '/images/claim3.jpg',
          order_id: 5003,
          status: 'Rejected',
          submitted_at: '2025-08-10T16:20:00',
          user_id: userId,
          product_id: 203
        },
        {
          id: 1004,
          claim_reason: 'Battery drains extremely quickly and heart rate sensor is not functioning properly.',
          image_path: '/images/claim4.jpg',
          order_id: 5004,
          status: 'Completed',
          submitted_at: '2025-08-05T11:15:00',
          user_id: userId,
          product_id: 204
        },
        {
          id: 1005,
          claim_reason: 'Chuck gets stuck and motor makes grinding noise. LED light also stopped working.',
          image_path: '/images/claim5.jpg',
          order_id: 5005,
          status: 'In Progress',
          submitted_at: '2025-07-30T08:30:00',
          user_id: userId,
          product_id: 205
        },
        {
          id: 1006,
          claim_reason: 'Screen has dead pixels and remote control is not responsive. Audio output is distorted.',
          image_path: '/images/claim6.jpg',
          order_id: 5006,
          status: 'Under Review',
          submitted_at: '2025-07-25T12:45:00',
          user_id: userId,
          product_id: 206
        }
      ]);
    }, 300);
  }, [userId]);

  const handleClaimClick = (claim) => {
    setSelectedClaim(claim);
    setShowModal(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Under Review': return '🔍';
      case 'Approved': return '✅';
      case 'Rejected': return '❌';
      case 'Completed': return '🎉';
      case 'In Progress': return '⚙️';
      default: return '📋';
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ";
    switch (status) {
      case 'Under Review': return baseStyle + 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Approved': return baseStyle + 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return baseStyle + 'bg-red-100 text-red-800 border-red-200';
      case 'Completed': return baseStyle + 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return baseStyle + 'bg-purple-100 text-purple-800 border-purple-200';
      default: return baseStyle + 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityLevel = (status, daysAgo) => {
    if (status === 'Under Review' && daysAgo > 7) return 'High';
    if (status === 'In Progress' && daysAgo > 14) return 'High';
    if (daysAgo > 30) return 'Medium';
    return 'Normal';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const filteredClaims = warrantyClaims.filter(claim => {
    const matchesFilter = filterStatus === 'all' || claim.status.toLowerCase().replace(' ', '') === filterStatus;
    const product = dummyProducts[claim.product_id];
    const matchesSearch = claim.id.toString().includes(searchTerm) || 
                         claim.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product && product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const sortedClaims = [...filteredClaims].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.submitted_at) - new Date(a.submitted_at);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'product':
        const productA = dummyProducts[a.product_id]?.name || '';
        const productB = dummyProducts[b.product_id]?.name || '';
        return productA.localeCompare(productB);
      default:
        return 0;
    }
  });

  const totalClaims = warrantyClaims.length;
  const approvedClaims = warrantyClaims.filter(claim => claim.status === 'Approved').length;
  const completedClaims = warrantyClaims.filter(claim => claim.status === 'Completed').length;
  const pendingClaims = warrantyClaims.filter(claim => ['Under Review', 'In Progress'].includes(claim.status)).length;

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
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    
    statCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    
    statIcon: {
      width: '3rem',
      height: '3rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      marginBottom: '1rem'
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
    
    controlsSection: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '2rem'
    },
    
    controlsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem'
    },
    
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    
    claimsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr'
      }
    },
    
    claimCard: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    
    claimHeader: {
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
      padding: '1.5rem',
      color: 'white'
    },
    
    claimHeaderTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    
    claimNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    
    priorityBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '600',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white'
    },
    
    claimBody: {
      padding: '1.5rem'
    },
    
    productSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
      padding: '1rem',
      background: '#f8fafc',
      borderRadius: '0.75rem'
    },
    
    productImage: {
      width: '60px',
      height: '60px',
      borderRadius: '0.5rem',
      background: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    },
    
    productInfo: {
      flex: 1
    },
    
    productName: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.25rem'
    },
    
    productCategory: {
      fontSize: '0.875rem',
      color: '#64748b'
    },
    
    productPrice: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#059669'
    },
    
    claimInfo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#64748b'
    },
    
    infoValue: {
      fontWeight: '600',
      color: '#1f2937'
    },
    
    claimReason: {
      background: '#fef3c7',
      border: '1px solid #fbbf24',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '1.5rem'
    },
    
    reasonTitle: {
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    reasonText: {
      color: '#78350f',
      fontSize: '0.875rem',
      lineHeight: '1.4'
    },
    
    viewDetailsBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem'
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
      maxWidth: '56rem',
      width: '100%',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    
    modalHeader: {
      background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
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
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.25rem',
      borderRadius: '0.25rem',
      transition: 'background 0.2s ease'
    },
    
    modalBody: {
      padding: '1.5rem',
      overflowY: 'auto',
      maxHeight: '70vh'
    },
    
    modalSection: {
      marginBottom: '2rem',
      padding: '1.5rem',
      background: '#f8fafc',
      borderRadius: '0.75rem',
      border: '1px solid #e5e7eb'
    },
    
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    detailsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem'
    },
    
    detailItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    
    detailLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '500'
    },
    
    detailValue: {
      fontSize: '1rem',
      color: '#1f2937',
      fontWeight: '600'
    },
    
    imagePreview: {
      width: '100%',
      height: '200px',
      borderRadius: '0.5rem',
      background: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      color: '#9ca3af',
      marginTop: '1rem'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Your Warranty Claims</h1>
          <p style={styles.subtitle}>Track and manage all your warranty claims in one convenient location</p>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#fef3c7', color: '#d97706'}}>
              📋
            </div>
            <div style={styles.statValue}>{totalClaims}</div>
            <div style={styles.statLabel}>Total Claims</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#dcfce7', color: '#16a34a'}}>
              ✅
            </div>
            <div style={styles.statValue}>{approvedClaims}</div>
            <div style={styles.statLabel}>Approved Claims</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#dbeafe', color: '#2563eb'}}>
              🎉
            </div>
            <div style={styles.statValue}>{completedClaims}</div>
            <div style={styles.statLabel}>Completed Claims</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#fde68a', color: '#d97706'}}>
              ⏳
            </div>
            <div style={styles.statValue}>{pendingClaims}</div>
            <div style={styles.statLabel}>Pending Claims</div>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controlsSection}>
          <div style={styles.controlsGrid}>
            <input
              type="text"
              placeholder="🔍 Search claims..."
              style={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              style={styles.input}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">📋 All Status</option>
              <option value="underreview">🔍 Under Review</option>
              <option value="approved">✅ Approved</option>
              <option value="rejected">❌ Rejected</option>
              <option value="completed">🎉 Completed</option>
              <option value="inprogress">⚙️ In Progress</option>
            </select>
            <select
              style={styles.input}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">📅 Sort by Date</option>
              <option value="status">📊 Sort by Status</option>
              <option value="product">🛍️ Sort by Product</option>
            </select>
          </div>
        </div>

        {/* Claims Grid - Exactly 2 columns */}
        <div style={styles.claimsGrid}>
          {sortedClaims.map(claim => {
            const product = dummyProducts[claim.product_id];
            const category = product ? dummyCategories[product.category_id] : null;
            const daysAgo = Math.floor((new Date() - new Date(claim.submitted_at)) / (1000 * 60 * 60 * 24));
            const priority = getPriorityLevel(claim.status, daysAgo);
            
            return (
              <div 
                key={claim.id} 
                style={{
                  ...styles.claimCard,
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }
                }} 
                onClick={() => handleClaimClick(claim)}
              >
                <div style={styles.claimHeader}>
                  <div style={styles.claimHeaderTop}>
                    <div style={styles.claimNumber}>Claim #{claim.id}</div>
                    <div style={{...styles.priorityBadge, borderColor: getPriorityColor(priority)}}>
                      {priority} Priority
                    </div>
                  </div>
                  <div style={{color: '#fed7aa'}}>
                    Submitted: {new Date(claim.submitted_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                <div style={styles.claimBody}>
                  {/* Product Information */}
                  {product && (
                    <div style={styles.productSection}>
                      <div style={styles.productImage}>
                        🛍️
                      </div>
                      <div style={styles.productInfo}>
                        <div style={styles.productName}>{product.name}</div>
                        <div style={styles.productCategory}>
                          {category ? category.name : 'Unknown Category'}
                        </div>
                        <div style={styles.productPrice}>${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  )}

                  {/* Claim Information */}
                  <div style={styles.claimInfo}>
                    <div style={styles.infoItem}>
                      <span style={{fontSize: '1rem'}}>📋</span>
                      <div>
                        <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Status</div>
                        <div className={getStatusStyle(claim.status)}>
                          <span>{getStatusIcon(claim.status)}</span>
                          {claim.status}
                        </div>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={{fontSize: '1rem'}}>🛒</span>
                      <div>
                        <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Order ID</div>
                        <div style={styles.infoValue}>#{claim.order_id}</div>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={{fontSize: '1rem'}}>⏱️</span>
                      <div>
                        <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Days Ago</div>
                        <div style={styles.infoValue}>{daysAgo} days</div>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={{fontSize: '1rem'}}>📸</span>
                      <div>
                        <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Evidence</div>
                        <div style={styles.infoValue}>
                          {claim.image_path ? 'Attached' : 'No Image'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Claim Reason */}
                  <div style={styles.claimReason}>
                    <div style={styles.reasonTitle}>
                      <span>⚠️</span>
                      Issue Description
                    </div>
                    <div style={styles.reasonText}>
                      {claim.claim_reason.length > 120 
                        ? `${claim.claim_reason.substring(0, 120)}...` 
                        : claim.claim_reason
                      }
                    </div>
                  </div>

                  <button style={styles.viewDetailsBtn}>
                    <span>👁️</span>
                    View Full Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {sortedClaims.length === 0 && (
          <div style={{textAlign: 'center', padding: '4rem 0'}}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🔍</div>
            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>No warranty claims found</h3>
            <p style={{color: '#9ca3af'}}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedClaim && (
          <div style={styles.modal} onClick={() => setShowModal(false)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Warranty Claim #{selectedClaim.id}</h2>
                <button style={styles.closeBtn} onClick={() => setShowModal(false)}>
                  ×
                </button>
              </div>

              <div style={styles.modalBody}>
                {/* Product Details Section */}
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>
                    <span>🛍️</span>
                    Product Information
                  </h3>
                  {(() => {
                    const product = dummyProducts[selectedClaim.product_id];
                    const category = product ? dummyCategories[product.category_id] : null;
                    return product ? (
                      <div style={styles.detailsGrid}>
                        <div style={styles.detailItem}>
                          <div style={styles.detailLabel}>Product Name</div>
                          <div style={styles.detailValue}>{product.name}</div>
                        </div>
                        <div style={styles.detailItem}>
                          <div style={styles.detailLabel}>Category</div>
                          <div style={styles.detailValue}>{category ? category.name : 'Unknown'}</div>
                        </div>
                        <div style={styles.detailItem}>
                          <div style={styles.detailLabel}>Product ID</div>
                          <div style={styles.detailValue}>#{product.id}</div>
                        </div>
                        <div style={styles.detailItem}>
                          <div style={styles.detailLabel}>Price</div>
                          <div style={styles.detailValue}>${product.price.toFixed(2)}</div>
                        </div>
                        <div style={styles.detailItem}>
                          <div style={styles.detailLabel}>Purchase Date</div>
                          <div style={styles.detailValue}>
                            {new Date(product.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div style={styles.detailItem}>
                          <div style={styles.detailLabel}>Description</div>
                          <div style={styles.detailValue}>{product.description}</div>
                        </div>
                      </div>
                    ) : (
                      <p style={{color: '#64748b'}}>Product information not available</p>
                    );
                  })()}
                </div>

                {/* Claim Details Section */}
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>
                    <span>📋</span>
                    Claim Details
                  </h3>
                  <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Claim ID</div>
                      <div style={styles.detailValue}>#{selectedClaim.id}</div>
                    </div>
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Order ID</div>
                      <div style={styles.detailValue}>#{selectedClaim.order_id}</div>
                    </div>
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Status</div>
                      <div className={getStatusStyle(selectedClaim.status)}>
                        <span>{getStatusIcon(selectedClaim.status)}</span>
                        {selectedClaim.status}
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Submitted Date</div>
                      <div style={styles.detailValue}>
                        {new Date(selectedClaim.submitted_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>Days Since Submission</div>
                      <div style={styles.detailValue}>
                        {Math.floor((new Date() - new Date(selectedClaim.submitted_at)) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                    <div style={styles.detailItem}>
                      <div style={styles.detailLabel}>User ID</div>
                      <div style={styles.detailValue}>#{selectedClaim.user_id}</div>
                    </div>
                  </div>
                </div>

                {/* Issue Description Section */}
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>
                    <span>⚠️</span>
                    Issue Description
                  </h3>
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb',
                    lineHeight: '1.6',
                    color: '#374151'
                  }}>
                    {selectedClaim.claim_reason}
                  </div>
                </div>

                {/* Evidence Section */}
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>
                    <span>📸</span>
                    Supporting Evidence
                  </h3>
                  {selectedClaim.image_path ? (
                    <div>
                      <p style={{color: '#64748b', marginBottom: '1rem'}}>
                        Image attachment: {selectedClaim.image_path}
                      </p>
                      <div style={styles.imagePreview}>
                        🖼️
                        <div style={{marginLeft: '1rem', fontSize: '1rem', color: '#64748b'}}>
                          Image Preview Not Available
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      padding: '2rem',
                      textAlign: 'center',
                      color: '#9ca3af',
                      background: '#f9fafb',
                      borderRadius: '0.5rem',
                      border: '2px dashed #e5e7eb'
                    }}>
                      <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📷</div>
                      <p>No supporting image provided with this claim</p>
                    </div>
                  )}
                </div>

                {/* Status Timeline Section */}
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>
                    <span>⏱️</span>
                    Status Timeline
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      background: '#f0fdf4',
                      borderRadius: '0.5rem',
                      border: '1px solid #bbf7d0'
                    }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        background: '#16a34a',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        fontWeight: 'bold'
                      }}>
                        1
                      </div>
                      <div>
                        <div style={{fontWeight: '600', color: '#15803d'}}>Claim Submitted</div>
                        <div style={{fontSize: '0.875rem', color: '#166534'}}>
                          {new Date(selectedClaim.submitted_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {selectedClaim.status !== 'Under Review' && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem',
                        background: selectedClaim.status === 'Rejected' ? '#fef2f2' : '#eff6ff',
                        borderRadius: '0.5rem',
                        border: `1px solid ${selectedClaim.status === 'Rejected' ? '#fecaca' : '#bfdbfe'}`
                      }}>
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: selectedClaim.status === 'Rejected' ? '#dc2626' : '#2563eb',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          2
                        </div>
                        <div>
                          <div style={{
                            fontWeight: '600',
                            color: selectedClaim.status === 'Rejected' ? '#b91c1c' : '#1d4ed8'
                          }}>
                            Current Status: {selectedClaim.status}
                          </div>
                          <div style={{
                            fontSize: '0.875rem',
                            color: selectedClaim.status === 'Rejected' ? '#991b1b' : '#1e40af'
                          }}>
                            Updated recently
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next Steps Section */}
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>
                    <span>🎯</span>
                    Next Steps
                  </h3>
                  <div style={{
                    background: 'white',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    {(() => {
                      switch (selectedClaim.status) {
                        case 'Under Review':
                          return (
                            <div>
                              <p style={{color: '#d97706', fontWeight: '600', marginBottom: '0.5rem'}}>
                                🔍 Your claim is being reviewed
                              </p>
                              <p style={{color: '#78350f', fontSize: '0.875rem'}}>
                                Our team is examining your warranty claim. You'll receive an email update within 3-5 business days.
                              </p>
                            </div>
                          );
                        case 'Approved':
                          return (
                            <div>
                              <p style={{color: '#059669', fontWeight: '600', marginBottom: '0.5rem'}}>
                                ✅ Claim approved! Replacement processing
                              </p>
                              <p style={{color: '#064e3b', fontSize: '0.875rem'}}>
                                Great news! Your warranty claim has been approved. A replacement will be shipped to you within 7-10 business days.
                              </p>
                            </div>
                          );
                        case 'Rejected':
                          return (
                            <div>
                              <p style={{color: '#dc2626', fontWeight: '600', marginBottom: '0.5rem'}}>
                                ❌ Claim rejected
                              </p>
                              <p style={{color: '#7f1d1d', fontSize: '0.875rem'}}>
                                Unfortunately, your claim doesn't meet warranty conditions. You can appeal this decision or contact customer support.
                              </p>
                            </div>
                          );
                        case 'Completed':
                          return (
                            <div>
                              <p style={{color: '#2563eb', fontWeight: '600', marginBottom: '0.5rem'}}>
                                🎉 Claim completed successfully!
                              </p>
                              <p style={{color: '#1e40af', fontSize: '0.875rem'}}>
                                Your warranty claim has been resolved. The replacement should have been delivered. Please rate your experience.
                              </p>
                            </div>
                          );
                        case 'In Progress':
                          return (
                            <div>
                              <p style={{color: '#7c3aed', fontWeight: '600', marginBottom: '0.5rem'}}>
                                ⚙️ Processing your replacement
                              </p>
                              <p style={{color: '#5b21b6', fontSize: '0.875rem'}}>
                                Your replacement is being prepared and will be shipped soon. Track your shipment via email notifications.
                              </p>
                            </div>
                          );
                        default:
                          return (
                            <p style={{color: '#64748b'}}>
                              Please contact customer support for more information about your claim status.
                            </p>
                          );
                      }
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantyClaimsPage;