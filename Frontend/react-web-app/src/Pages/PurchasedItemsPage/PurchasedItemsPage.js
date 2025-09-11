import React, { useEffect, useState } from 'react';

const PurchasedItemsPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState({});
  const [shipments, setShipments] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [feedbackForms, setFeedbackForms] = useState({});
  const [complaintForms, setComplaintForms] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const userId = 1; // Current user ID

  // Categories data matching your schema
  const categoriesData = {
    1: { id: 1, name: 'Electronics', description: 'Electronic devices and accessories' },
    2: { id: 2, name: 'Clothing', description: 'Fashion and apparel items' },
    3: { id: 3, name: 'Books', description: 'Books and educational materials' },
    4: { id: 4, name: 'Home & Garden', description: 'Home improvement and garden items' },
    5: { id: 5, name: 'Food & Beverage', description: 'Food and drink products' },
    6: { id: 6, name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' }
  };

  // Products data matching your schema
  const productsData = {
    201: {
      id: 201,
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium quality wireless headphones with noise cancellation',
      price: 89.99,
      image_path: '/images/headphones.jpg',
      category_id: 1,
      created_at: '2025-01-15T08:30:00'
    },
    202: {
      id: 202,
      name: 'Smart Fitness Watch',
      description: 'Advanced smartwatch with health monitoring features',
      price: 249.99,
      image_path: '/images/smartwatch.jpg',
      category_id: 1,
      created_at: '2025-01-20T10:15:00'
    },
    203: {
      id: 203,
      name: 'Organic Coffee Beans',
      description: 'Premium organic coffee beans - medium roast',
      price: 24.99,
      image_path: '/images/coffee.jpg',
      category_id: 5,
      created_at: '2025-02-01T14:20:00'
    },
    204: {
      id: 204,
      name: 'Gaming Mechanical Keyboard',
      description: 'RGB backlit mechanical gaming keyboard',
      price: 129.99,
      image_path: '/images/keyboard.jpg',
      category_id: 1,
      created_at: '2025-02-05T09:45:00'
    },
    205: {
      id: 205,
      name: 'Programming Books Set',
      description: 'Complete set of modern programming language books',
      price: 79.99,
      image_path: '/images/books.jpg',
      category_id: 3,
      created_at: '2025-02-10T11:30:00'
    },
    206: {
      id: 206,
      name: 'Silicone Phone Case',
      description: 'Protective silicone case for smartphones',
      price: 19.99,
      image_path: '/images/phonecase.jpg',
      category_id: 1,
      created_at: '2025-02-15T16:00:00'
    },
    207: {
      id: 207,
      name: 'Cotton T-Shirt',
      description: '100% organic cotton comfortable t-shirt',
      price: 29.99,
      image_path: '/images/tshirt.jpg',
      category_id: 2,
      created_at: '2025-02-18T12:45:00'
    },
    208: {
      id: 208,
      name: 'Running Sneakers',
      description: 'Professional running shoes with advanced cushioning',
      price: 119.99,
      image_path: '/images/sneakers.jpg',
      category_id: 6,
      created_at: '2025-02-20T15:30:00'
    },
    209: {
      id: 209,
      name: 'Portable Bluetooth Speaker',
      description: 'Waterproof portable speaker with 20-hour battery life',
      price: 69.99,
      image_path: '/images/speaker.jpg',
      category_id: 1,
      created_at: '2025-02-22T13:15:00'
    },
    210: {
      id: 210,
      name: 'LED Desk Lamp',
      description: 'Adjustable LED desk lamp with USB charging port',
      price: 39.99,
      image_path: '/images/lamp.jpg',
      category_id: 4,
      created_at: '2025-02-25T10:00:00'
    }
  };

  // Shipments data matching your schema
  const shipmentsData = {
    101: {
      id: 1,
      address: '123 Main Street, Colombo 03, Western Province, Sri Lanka',
      estimated_delivery: '2025-08-22T18:00:00',
      status: 'Delivered',
      tracking_number: 'LK2025080001',
      order_id: 101
    },
    102: {
      id: 2,
      address: '456 Lake Road, Kandy, Central Province, Sri Lanka',
      estimated_delivery: '2025-08-26T16:00:00',
      status: 'In Transit',
      tracking_number: 'LK2025080002',
      order_id: 102
    },
    103: {
      id: 3,
      address: '789 Beach Avenue, Galle, Southern Province, Sri Lanka',
      estimated_delivery: '2025-07-30T12:00:00',
      status: 'Delivered',
      tracking_number: 'LK2025070003',
      order_id: 103
    },
    104: {
      id: 4,
      address: '321 Hill View, Nuwara Eliya, Central Province, Sri Lanka',
      estimated_delivery: '2025-08-28T10:00:00',
      status: 'Processing',
      tracking_number: 'LK2025080004',
      order_id: 104
    },
    105: {
      id: 5,
      address: '654 Market Street, Jaffna, Northern Province, Sri Lanka',
      estimated_delivery: '2025-08-18T14:30:00',
      status: 'Cancelled',
      tracking_number: 'LK2025080005',
      order_id: 105
    },
    106: {
      id: 6,
      address: '987 Temple Road, Matara, Southern Province, Sri Lanka',
      estimated_delivery: '2025-08-30T11:15:00',
      status: 'Shipped',
      tracking_number: 'LK2025080006',
      order_id: 106
    }
  };

  // Order items data matching your schema
  const orderItemsData = {
    101: [
      { id: 1, product_id: 201, quantity: 1, price: 89.99, order_id: 101 },
      { id: 2, product_id: 203, quantity: 2, price: 24.99, order_id: 101 }
    ],
    102: [
      { id: 3, product_id: 202, quantity: 1, price: 249.99, order_id: 102 }
    ],
    103: [
      { id: 4, product_id: 204, quantity: 1, price: 129.99, order_id: 103 },
      { id: 5, product_id: 205, quantity: 1, price: 79.99, order_id: 103 },
      { id: 6, product_id: 206, quantity: 3, price: 19.99, order_id: 103 }
    ],
    104: [
      { id: 7, product_id: 206, quantity: 1, price: 19.99, order_id: 104 }
    ],
    105: [
      { id: 8, product_id: 207, quantity: 2, price: 29.99, order_id: 105 },
      { id: 9, product_id: 208, quantity: 1, price: 119.99, order_id: 105 }
    ],
    106: [
      { id: 10, product_id: 209, quantity: 1, price: 69.99, order_id: 106 },
      { id: 11, product_id: 210, quantity: 1, price: 39.99, order_id: 106 }
    ]
  };

  useEffect(() => {
    // Simulate API calls with setTimeout
    setTimeout(() => {
      // Set lookup data
      setCategories(categoriesData);
      setProducts(productsData);
      setShipments(shipmentsData);

      // Orders data matching your schema
      setOrders([
        {
          id: 101,
          created_at: '2025-08-20T10:15:00',
          status: 'Delivered',
          total_price: 139.97, // 89.99 + (24.99 * 2)
          user_id: userId
        },
        {
          id: 102,
          created_at: '2025-08-15T14:30:00',
          status: 'Processing',
          total_price: 249.99,
          user_id: userId
        },
        {
          id: 103,
          created_at: '2025-07-28T09:00:00',
          status: 'Delivered',
          total_price: 269.95, // 129.99 + 79.99 + (19.99 * 3)
          user_id: userId
        },
        {
          id: 104,
          created_at: '2025-08-23T16:45:00',
          status: 'Processing',
          total_price: 19.99,
          user_id: userId
        },
        {
          id: 105,
          created_at: '2025-08-12T11:20:00',
          status: 'Cancelled',
          total_price: 179.97, // (29.99 * 2) + 119.99
          user_id: userId
        },
        {
          id: 106,
          created_at: '2025-08-24T13:10:00',
          status: 'Shipped',
          total_price: 109.98, // 69.99 + 39.99
          user_id: userId
        }
      ]);
    }, 300);
  }, [userId]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
    setOrderItems(orderItemsData[order.id] || []);
  };

  const handleFeedbackChange = (productId, field, value) => {
    setFeedbackForms(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  const handleComplaintChange = (orderId, value) => {
    setComplaintForms(prev => ({
      ...prev,
      [orderId]: value
    }));
  };

  const submitFeedback = (item) => {
    const form = feedbackForms[item.product_id] || {};
    if (!form.comment || !form.rating) {
      return alert('Please fill all feedback fields.');
    }
    
    // Simulate feedback submission (matches feedback table schema)
    const feedbackData = {
      id: Date.now(), // Auto-increment simulation
      comment: form.comment,
      rating: parseInt(form.rating),
      product_id: item.product_id,
      user_id: userId,
      created_at: new Date().toISOString()
    };
    
    console.log('Submitting feedback:', feedbackData);
    alert('Feedback submitted successfully!');
    
    // Clear form
    setFeedbackForms(prev => ({ ...prev, [item.product_id]: {} }));
  };

  const submitComplaint = (orderId) => {
    const description = complaintForms[orderId];
    if (!description) {
      return alert('Please enter a complaint description.');
    }
    
    // Simulate complaint submission (matches complaints table schema)
    const complaintData = {
      id: Date.now(), // Auto-increment simulation
      issue_description: description,
      order_id: orderId,
      user_id: userId,
      status: 'Pending',
      created_at: new Date().toISOString()
    };
    
    console.log('Submitting complaint:', complaintData);
    alert('Complaint submitted successfully!');
    
    // Clear form
    setComplaintForms(prev => ({ ...prev, [orderId]: '' }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return '📦';
      case 'Shipped': return '🚚';
      case 'Processing': return '⏳';
      case 'Cancelled': return '❌';
      default: return '📋';
    }
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500',
      border: '1px solid'
    };
    
    switch (status) {
      case 'Delivered': return { ...baseStyle, background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
      case 'Shipped': return { ...baseStyle, background: '#dbeafe', color: '#1e40af', borderColor: '#bfdbfe' };
      case 'Processing': return { ...baseStyle, background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' };
      case 'Cancelled': return { ...baseStyle, background: '#fecaca', color: '#991b1b', borderColor: '#f87171' };
      default: return { ...baseStyle, background: '#f3f4f6', color: '#374151', borderColor: '#d1d5db' };
    }
  };

  const getItemsCount = (orderId) => {
    const items = orderItemsData[orderId] || [];
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filterStatus === 'all' || order.status.toLowerCase() === filterStatus;
    const matchesSearch = order.id.toString().includes(searchTerm) || 
                         order.status.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'price':
        return b.total_price - a.total_price;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const totalSpent = orders.reduce((sum, order) => sum + order.total_price, 0);
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;

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
    
    ordersGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      '@media (max-width: 1024px)': {
        gridTemplateColumns: '1fr'
      }
    },
    
    orderCard: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    
    orderHeader: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      padding: '1.5rem',
      color: 'white'
    },
    
    orderHeaderTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    
    orderNumber: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    
    orderBody: {
      padding: '1.5rem'
    },
    
    orderInfo: {
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
    
    shipmentSection: {
      background: '#f8fafc',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '1rem'
    },
    
    shipmentTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    shipmentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '0.5rem'
    },
    
    shipmentItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
      color: '#64748b'
    },
    
    viewItemsBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
    
    itemCard: {
      background: 'white',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    },
    
    itemHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    
    itemName: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937'
    },
    
    itemCategory: {
      padding: '0.25rem 0.75rem',
      background: '#e0e7ff',
      color: '#3730a3',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    
    actionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    
    actionSection: {
      background: 'white',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '1px solid #e5e7eb'
    },
    
    actionTitle: {
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      resize: 'none',
      outline: 'none',
      marginBottom: '0.75rem'
    },
    
    numberInput: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      marginBottom: '0.75rem'
    },
    
    submitBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  const updatedModalStyles = {
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
    maxWidth: '80rem',
    width: '95%',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    flexDirection: 'column'
  },
  
  modalHeader: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0
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
    padding: '1.5rem',
    overflowY: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },

  modalSection: {
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
    gap: '1rem',
    alignItems: 'start'
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
    fontWeight: '600',
    wordBreak: 'break-word'
  },
  
  itemCard: {
    background: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    marginBottom: '1rem'
  },
  
  itemHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    gap: '1rem'
  },
  
  itemImageSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  
  itemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '0.5rem',
    objectFit: 'cover',
    border: '2px solid #e5e7eb',
    flexShrink: 0
  },
  
  itemImagePlaceholder: {
    width: '80px',
    height: '80px',
    borderRadius: '0.5rem',
    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    border: '2px solid #e5e7eb',
    flexShrink: 0
  },
  
  itemInfo: {
    flex: 1,
    minWidth: 0
  },
  
  itemName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
    lineHeight: '1.3'
  },
  
  itemCategory: {
    padding: '0.25rem 0.75rem',
    background: '#e0e7ff',
    color: '#3730a3',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'inline-block',
    flexShrink: 0
  },
  
  itemDescription: {
    color: '#64748b',
    fontSize: '0.875rem',
    lineHeight: '1.4',
    marginBottom: '1rem'
  },
  
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem'
  },
  
  actionSection: {
    background: '#f9fafb',
    borderRadius: '0.5rem',
    padding: '1rem',
    border: '1px solid #e5e7eb'
  },
  
  actionTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1rem'
  },
  
  formGroup: {
    marginBottom: '0.75rem'
  },
  
  label: {
    display: 'block',
    fontSize: '0.875rem',
    color: '#374151',
    fontWeight: '500',
    marginBottom: '0.25rem'
  },
  
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  
  numberInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  },
  
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.875rem'
  },

  complaintSection: {
    background: '#fef2f2',
    borderRadius: '0.5rem',
    padding: '1rem',
    border: '1px solid #fecaca'
  },

  complaintBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '0.875rem'
  }
};

const getProductImage = (productId) => {
  // Dummy images mapping - replace with your actual image endpoint call
  const dummyImages = {
    201: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    202: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    203: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop',
    204: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop',
    205: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    206: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    207: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    208: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    209: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    210: 'https://images.unsplash.com/photo-1507764923504-cd90bf7da772?w=400&h=400&fit=crop'
  };
  
  return dummyImages[productId] || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop';
  
  // When you have your endpoint, replace above with:
  // return `${API_BASE_URL}/products/${productId}/image`;
};
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🛍️ Your Order History</h1>
          <p style={styles.subtitle}>Track, review, and manage all your purchases in one convenient location</p>
        </div>

        {/* Stats Overview */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#dbeafe', color: '#2563eb'}}>
              🛒
            </div>
            <div style={styles.statValue}>{totalOrders}</div>
            <div style={styles.statLabel}>Total Orders</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#dcfce7', color: '#16a34a'}}>
              💰
            </div>
            <div style={styles.statValue}>${totalSpent.toFixed(2)}</div>
            <div style={styles.statLabel}>Total Spent</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#f3e8ff', color: '#7c3aed'}}>
              🏆
            </div>
            <div style={styles.statValue}>{deliveredOrders}</div>
            <div style={styles.statLabel}>Delivered Orders</div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: '#fef3c7', color: '#d97706'}}>
              📈
            </div>
            <div style={styles.statValue}>4.8★</div>
            <div style={styles.statLabel}>Avg Rating</div>
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controlsSection}>
          <div style={styles.controlsGrid}>
            <input
              type="text"
              placeholder="🔍 Search orders..."
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
              <option value="delivered">📦 Delivered</option>
              <option value="shipped">🚚 Shipped</option>
              <option value="processing">⏳ Processing</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
            <select
              style={styles.input}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">📅 Sort by Date</option>
              <option value="price">💲 Sort by Price</option>
              <option value="status">📊 Sort by Status</option>
            </select>
          </div>
        </div>

        {/* Orders Grid */}
        <div style={styles.ordersGrid}>
          {sortedOrders.map(order => {
            const shipment = shipments[order.id];
            const itemsCount = getItemsCount(order.id);
            
            return (
              <div key={order.id} style={styles.orderCard} onClick={() => handleOrderClick(order)}>
                <div style={styles.orderHeader}>
                  <div style={styles.orderHeaderTop}>
                    <div style={styles.orderNumber}>🛍️ Order #{order.id}</div>
                    <div style={getStatusStyle(order.status)}>
                      <span>{getStatusIcon(order.status)}</span>
                      {order.status}
                    </div>
                  </div>
                  <div style={{color: '#c7d2fe'}}>
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <div style={styles.orderBody}>
                  <div style={styles.orderInfo}>
                    <div style={styles.infoItem}>
                      <span style={{fontSize: '1rem'}}>💰</span>
                      <div>
                        <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Total Price</div>
                        <div style={styles.infoValue}>${order.total_price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={{fontSize: '1rem'}}>📦</span>
                      <div>
                        <div style={{fontSize: '0.875rem', color: '#9ca3af'}}>Items</div>
                        <div style={styles.infoValue}>{itemsCount} items</div>
                      </div>
                    </div>
                  </div>

                  {shipment && (
                    <div style={styles.shipmentSection}>
                      <div style={styles.shipmentTitle}>
                        <span>🚚</span>
                        Shipping Information
                      </div>
                      <div style={styles.shipmentGrid}>
                        <div style={styles.shipmentItem}>
                          <span>📍</span>
                          <span style={{fontSize: '0.75rem'}}>{shipment.address}</span>
                        </div>
                        <div style={styles.shipmentItem}>
                          <span>📅</span>
                          <span>Est. Delivery: {new Date(shipment.estimated_delivery).toLocaleDateString()}</span>
                        </div>
                        <div style={styles.shipmentItem}>
                          <span>📦</span>
                          <span>Status: {shipment.status}</span>
                        </div>
                        <div style={styles.shipmentItem}>
                          <span>🔍</span>
                          <span style={{fontFamily: 'monospace', fontSize: '0.75rem'}}>Tracking: {shipment.tracking_number}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button style={styles.viewItemsBtn}>
                    <span>👁️</span>
                    View Items & Give Feedback
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {sortedOrders.length === 0 && (
          <div style={{textAlign: 'center', padding: '4rem 0'}}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>📦</div>
            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#64748b', marginBottom: '0.5rem'}}>No orders found</h3>
            <p style={{color: '#9ca3af'}}>Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Modal */}
        {showModal && selectedOrder && (
  <div style={updatedModalStyles.modal} onClick={() => setShowModal(false)}>
    <div style={updatedModalStyles.modalContent} onClick={e => e.stopPropagation()}>
      <div style={updatedModalStyles.modalHeader}>
        <h2 style={updatedModalStyles.modalTitle}>🛍️ Order #{selectedOrder.id} Details</h2>
        <button 
          style={updatedModalStyles.closeBtn} 
          onClick={() => setShowModal(false)}
          onMouseEnter={e => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          ×
        </button>
      </div>

      <div style={updatedModalStyles.modalBody}>
        {/* Order Summary Section */}
        <div style={updatedModalStyles.modalSection}>
          <h3 style={updatedModalStyles.sectionTitle}>
            <span>📋</span>
            Order Summary
          </h3>
          <div style={updatedModalStyles.detailsGrid}>
            <div style={updatedModalStyles.detailItem}>
              <div style={updatedModalStyles.detailLabel}>Order ID</div>
              <div style={updatedModalStyles.detailValue}>#{selectedOrder.id}</div>
            </div>
            <div style={updatedModalStyles.detailItem}>
              <div style={updatedModalStyles.detailLabel}>Status</div>
              <div style={getStatusStyle(selectedOrder.status)}>
                <span>{getStatusIcon(selectedOrder.status)}</span>
                {selectedOrder.status}
              </div>
            </div>
            <div style={updatedModalStyles.detailItem}>
              <div style={updatedModalStyles.detailLabel}>Order Date</div>
              <div style={updatedModalStyles.detailValue}>
                {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            <div style={updatedModalStyles.detailItem}>
              <div style={updatedModalStyles.detailLabel}>Total Price</div>
              <div style={updatedModalStyles.detailValue}>${selectedOrder.total_price.toFixed(2)}</div>
            </div>
            <div style={updatedModalStyles.detailItem}>
              <div style={updatedModalStyles.detailLabel}>Total Items</div>
              <div style={updatedModalStyles.detailValue}>{getItemsCount(selectedOrder.id)} items</div>
            </div>
            <div style={updatedModalStyles.detailItem}>
              <div style={updatedModalStyles.detailLabel}>User ID</div>
              <div style={updatedModalStyles.detailValue}>#{selectedOrder.user_id}</div>
            </div>
          </div>
        </div>

        {/* Shipping Information Section */}
        {shipments[selectedOrder.id] && (
          <div style={updatedModalStyles.modalSection}>
            <h3 style={updatedModalStyles.sectionTitle}>
              <span>🚚</span>
              Shipping Information
            </h3>
            <div style={updatedModalStyles.detailsGrid}>
              <div style={updatedModalStyles.detailItem}>
                <div style={updatedModalStyles.detailLabel}>Delivery Address</div>
                <div style={updatedModalStyles.detailValue}>{shipments[selectedOrder.id].address}</div>
              </div>
              <div style={updatedModalStyles.detailItem}>
                <div style={updatedModalStyles.detailLabel}>Tracking Number</div>
                <div style={updatedModalStyles.detailValue}>{shipments[selectedOrder.id].tracking_number}</div>
              </div>
              <div style={updatedModalStyles.detailItem}>
                <div style={updatedModalStyles.detailLabel}>Estimated Delivery</div>
                <div style={updatedModalStyles.detailValue}>
                  {new Date(shipments[selectedOrder.id].estimated_delivery).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div style={updatedModalStyles.detailItem}>
                <div style={updatedModalStyles.detailLabel}>Shipping Status</div>
                <div style={updatedModalStyles.detailValue}>{shipments[selectedOrder.id].status}</div>
              </div>
            </div>
          </div>
        )}

        {/* Order-level complaint form */}
        <div style={updatedModalStyles.modalSection}>
          <h3 style={updatedModalStyles.sectionTitle}>
            <span>⚠️</span>
            Report Issue with Order
          </h3>
          <div style={updatedModalStyles.complaintSection}>
            <div style={updatedModalStyles.formGroup}>
              <label style={updatedModalStyles.label}>Issue Description</label>
              <textarea
                style={updatedModalStyles.textarea}
                placeholder="Describe any issues with this entire order..."
                rows="3"
                value={complaintForms[selectedOrder.id] || ''}
                onChange={e => handleComplaintChange(selectedOrder.id, e.target.value)}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <button 
              style={updatedModalStyles.complaintBtn}
              onClick={() => submitComplaint(selectedOrder.id)}
              onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
            >
              Submit Order Complaint
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div style={updatedModalStyles.modalSection}>
          <h3 style={updatedModalStyles.sectionTitle}>
            <span>🛍️</span>
            Ordered Products
          </h3>
          
          {orderItems.length === 0 ? (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#9ca3af',
              background: '#f9fafb',
              borderRadius: '0.5rem',
              border: '2px dashed #e5e7eb'
            }}>
              <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>📦</div>
              <p>No items found for this order</p>
            </div>
          ) : (
            orderItems.map(item => {
              const product = products[item.product_id];
              const category = categories[product?.category_id];
              
              if (!product) return null;
              
              return (
                <div key={item.id} style={updatedModalStyles.itemCard}>
                  <div style={updatedModalStyles.itemHeader}>
                    <div style={updatedModalStyles.itemInfo}>
                      <div style={updatedModalStyles.itemName}>{product.name}</div>
                      <div style={updatedModalStyles.itemCategory}>{category?.name || 'Unknown'}</div>
                    </div>
                  </div>

                  <div style={updatedModalStyles.itemImageSection}>
                    <img
                      src={getProductImage(item.product_id)}
                      alt={product.name}
                      style={updatedModalStyles.itemImage}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div style={{...updatedModalStyles.itemImagePlaceholder, display: 'none'}}>
                      📦
                    </div>
                    <div style={updatedModalStyles.itemInfo}>
                      <div style={updatedModalStyles.itemDescription}>
                        {product.description}
                      </div>
                    </div>
                  </div>
                  
                  <div style={updatedModalStyles.detailsGrid}>
                    <div style={updatedModalStyles.detailItem}>
                      <div style={updatedModalStyles.detailLabel}>Product ID</div>
                      <div style={updatedModalStyles.detailValue}>#{item.product_id}</div>
                    </div>
                    <div style={updatedModalStyles.detailItem}>
                      <div style={updatedModalStyles.detailLabel}>Quantity</div>
                      <div style={updatedModalStyles.detailValue}>{item.quantity}</div>
                    </div>
                    <div style={updatedModalStyles.detailItem}>
                      <div style={updatedModalStyles.detailLabel}>Unit Price</div>
                      <div style={updatedModalStyles.detailValue}>${item.price.toFixed(2)}</div>
                    </div>
                    <div style={updatedModalStyles.detailItem}>
                      <div style={updatedModalStyles.detailLabel}>Total</div>
                      <div style={updatedModalStyles.detailValue}>${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div style={updatedModalStyles.detailItem}>
                      <div style={updatedModalStyles.detailLabel}>Added Date</div>
                      <div style={updatedModalStyles.detailValue}>
                        {new Date(product.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div style={updatedModalStyles.actionsGrid}>
                    <div style={updatedModalStyles.actionSection}>
                      <h4 style={updatedModalStyles.actionTitle}>
                        <span>⭐</span>
                        Leave Product Feedback
                      </h4>
                      <div style={updatedModalStyles.formGroup}>
                        <label style={updatedModalStyles.label}>Your Review</label>
                        <textarea
                          style={updatedModalStyles.textarea}
                          placeholder="Share your experience with this product..."
                          rows="3"
                          value={feedbackForms[item.product_id]?.comment || ''}
                          onChange={e => handleFeedbackChange(item.product_id, 'comment', e.target.value)}
                          onFocus={e => e.target.style.borderColor = '#6366f1'}
                          onBlur={e => e.target.style.borderColor = '#d1d5db'}
                        />
                      </div>
                      <div style={updatedModalStyles.formGroup}>
                        <label style={updatedModalStyles.label}>Rating (1-5 stars)</label>
                        <input
                          type="number"
                          style={updatedModalStyles.numberInput}
                          placeholder="Enter rating from 1 to 5"
                          min="1"
                          max="5"
                          value={feedbackForms[item.product_id]?.rating || ''}
                          onChange={e => handleFeedbackChange(item.product_id, 'rating', e.target.value)}
                          onFocus={e => e.target.style.borderColor = '#6366f1'}
                          onBlur={e => e.target.style.borderColor = '#d1d5db'}
                        />
                      </div>
                      <button 
                        style={updatedModalStyles.submitBtn} 
                        onClick={() => submitFeedback(item)}
                        onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                      >
                        Submit Product Feedback
                      </button>
                    </div>

                    <div style={updatedModalStyles.actionSection}>
                      <h4 style={updatedModalStyles.actionTitle}>
                        <span>📋</span>
                        Product Information
                      </h4>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb'}}>
                          <span style={{color: '#9ca3af'}}>Category:</span>
                          <span style={{fontWeight: '500', color: '#1f2937'}}>{category?.name}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb'}}>
                          <span style={{color: '#9ca3af'}}>Product Added:</span>
                          <span style={{fontWeight: '500', color: '#1f2937'}}>
                            {new Date(product.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', padding: '0.5rem 0', borderBottom: '1px solid #e5e7eb'}}>
                          <span style={{color: '#9ca3af'}}>Order Item ID:</span>
                          <span style={{fontWeight: '500', color: '#1f2937'}}>#{item.id}</span>
                        </div>
                        <div style={{fontSize: '0.875rem', padding: '0.5rem 0'}}>
                          <span style={{color: '#9ca3af', display: 'block', marginBottom: '0.25rem'}}>Category Description:</span>
                          <span style={{fontWeight: '500', color: '#64748b', fontSize: '0.8rem', lineHeight: '1.4'}}>
                            {category?.description || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default PurchasedItemsPage;