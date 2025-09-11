
import React, { useState, useEffect } from 'react';
import Cusheader from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';

const ItemsPage = () => {
  // View Details popup state and handlers
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [detailsProduct, setDetailsProduct] = useState(null);

  const detailsPopupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100
    },
    modal: {
      background: 'white',
      borderRadius: '1rem',
      padding: '3rem',
      minWidth: '900px',
      maxWidth: '99vw',
      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
    },
    closeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'transparent',
      border: 'none',
      fontSize: '1.7rem',
      cursor: 'pointer',
    },
    label: {
      fontWeight: 'bold',
      marginRight: '0.5rem',
    }
  };

  const openDetailsPopup = (product) => {
    setDetailsProduct(product);
    setShowDetailsPopup(true);
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
    setDetailsProduct(null);
  };
  // Popup state and handlers
  const [showPopup, setShowPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [popupQuantity, setPopupQuantity] = useState(1);

  const popupStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modal: {
      background: 'white',
      borderRadius: '1rem',
      padding: '2.5rem',
      minWidth: '600px',
      maxWidth: '98vw',
      boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
    },
    closeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    confirmBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '1rem',
      marginTop: '1rem',
    },
    qtyInput: {
      width: '60px',
      padding: '0.5rem',
      fontSize: '1rem',
      textAlign: 'center',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
    },
    label: {
      fontWeight: 'bold',
      marginRight: '0.5rem',
    }
  };

  const openPopup = (product) => {
    setPopupProduct(product);
    setPopupQuantity(1);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupProduct(null);
  };

  const handleQuantityChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (popupProduct && val > popupProduct.stock?.quantity) val = popupProduct.stock?.quantity || 1;
    setPopupQuantity(val);
  };
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    itemsPageWrapper: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #c7d2fe 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    itemsContainer: {
      flex: 1,
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1.5rem',
      width: '100%'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#1f2937',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    searchBar: {
      marginBottom: '2rem',
      display: 'flex',
      justifyContent: 'center'
    },
    searchInput: {
      width: '100%',
      maxWidth: '500px',
      padding: '0.75rem 1rem',
      fontSize: '1rem',
      border: '2px solid #e5e7eb',
      borderRadius: '0.5rem',
  outline: 'none',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    itemsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    itemCard: {
      background: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    itemImage: {
      width: '200px',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      border: '2px solid #e5e7eb'
    },
    noImagePlaceholder: {
      width: '200px',
      height: '200px',
      background: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9ca3af',
      fontSize: '1rem',
      borderRadius: '0.5rem',
      marginBottom: '1rem',
      border: '2px solid #e5e7eb'
    },
    itemName: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '0.5rem',
      lineHeight: '1.4'
    },
    itemDescription: {
      color: '#64748b',
      fontSize: '0.875rem',
      marginBottom: '0.75rem',
      lineHeight: '1.5'
    },
    itemCategory: {
      marginBottom: '0.5rem',
      color: '#6b7280',
      fontSize: '0.813rem',
      background: '#f3f4f6',
      padding: '0.25rem 0.75rem',
      borderRadius: '9999px'
    },
    itemPrice: {
      fontWeight: 'bold',
      color: '#007bff',
      fontSize: '1.125rem',
      margin: '0.5rem 0'
    },
    stockInfo: {
      fontSize: '0.875rem',
      marginBottom: '0.75rem'
    },
    inStock: {
      color: '#16a34a'
    },
    outOfStock: {
      color: '#dc2626'
    },
    buttonContainer: {
      display: 'flex',
      gap: '0.5rem',
      width: '100%',
      marginTop: 'auto'
    },
    addToCartButton: {
      flex: 1,
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem'
    },
    viewDetailsButton: {
      flex: 1,
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      padding: '0.75rem 1rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem'
    },
    backButton: {
      background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      color: 'white',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem'
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      color: '#64748b',
      fontSize: '1.125rem'
    },
    errorContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      color: '#dc2626',
      fontSize: '1.125rem',
      textAlign: 'center'
    },
    noItemsContainer: {
      textAlign: 'center',
      gridColumn: '1 / -1',
      padding: '2rem',
      color: '#64748b',
      fontSize: '1.125rem'
    },
    backButtonContainer: {
      width: '100%',
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'flex-end'
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8082/ps-api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setItems(data);
      setFilteredItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Real-time frontend search
  useEffect(() => {
    if (!searchTerm) {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter(item =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, items]);

  const handleBuy = async (itemId) => {
    const userId = localStorage.getItem('userId');
    try {
      await fetch(`http://localhost:8082/os-api/orders?userId=${userId}&itemId=${itemId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, itemId }),
      });
      alert('Item purchased successfully!');
    } catch (err) {
      alert('Failed to purchase item.');
    }
  };

  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  };

  const handleButtonHover = (e, isEntering, type) => {
    if (isEntering) {
      e.target.style.transform = 'translateY(-1px)';
      if (type === 'addToCart') {
        e.target.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
      } else if (type === 'viewDetails') {
        e.target.style.background = 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)';
      } else if (type === 'back') {
        e.target.style.background = 'linear-gradient(135deg, #475569 0%, #334155 100%)';
      }
    } else {
      e.target.style.transform = 'translateY(0)';
      if (type === 'addToCart') {
        e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      } else if (type === 'viewDetails') {
        e.target.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
      } else if (type === 'back') {
        e.target.style.background = 'linear-gradient(135deg, #64748b 0%, #475569 100%)';
      }
    }
  };

  const handleSearchFocus = (e) => {
    e.target.style.borderColor = '#6366f1';
    e.target.style.boxShadow = '0 4px 8px rgba(99, 102, 241, 0.2)';
  };

  const handleSearchBlur = (e) => {
    e.target.style.borderColor = '#e5e7eb';
    e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  };

  const handleBackClick = () => {
    window.history.back();
  };

  if (loading) {
     return (
       <div style={styles.itemsPageWrapper}>
         <Cusheader />
         <div style={styles.itemsContainer}>
           <div style={styles.loadingContainer}>Loading items...</div>
         </div>
         <Footer />
       </div>
     );
  }

  if (error) {
     return (
       <div style={styles.itemsPageWrapper}>
         <Cusheader />
         <div style={styles.itemsContainer}>
           <div style={styles.errorContainer}>Error: {error}</div>
         </div>
         <Footer />
       </div>
     );
  }

   return (
     <div style={styles.itemsPageWrapper}>
       <Cusheader />
       <div style={styles.itemsContainer}>
         <h1 style={styles.title}>Our Products</h1>
         <div style={styles.searchBar}>
           <input
             type="text"
             placeholder="Search for items..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             style={styles.searchInput}
             onFocus={handleSearchFocus}
             onBlur={handleSearchBlur}
           />
         </div>
         <div style={styles.itemsGrid}>
           {filteredItems.length === 0 ? (
             <div style={styles.noItemsContainer}>No items found.</div>
           ) : (
             filteredItems.map((item) => (
               <div 
                 key={item.id} 
                 style={styles.itemCard}
                 onMouseEnter={(e) => handleCardHover(e, true)}
                 onMouseLeave={(e) => handleCardHover(e, false)}
               >
                 {item.imagePath ? (
                   <img
                     src={`http://localhost:8082/ps-api/images/${item.imagePath}`}
                     alt={item.name}
                     style={styles.itemImage}
                   />
                 ) : (
                   <div style={styles.noImagePlaceholder}>No Image</div>
                 )}
                 <div style={styles.itemName}>{item.name}</div>
                 <div style={styles.itemDescription}>{item.description}</div>
                 <div style={styles.itemCategory}>
                   {item.category?.name || 'Uncategorized'}
                 </div>
                 <div style={styles.itemPrice}>
                   Rs.{item.price?.toFixed(2) || '0.00'}
                 </div>
                 <div style={{
                   ...styles.stockInfo,
                   ...(item.stock?.quantity > 0 ? styles.inStock : styles.outOfStock)
                 }}>
                   {item.stock?.quantity > 0
                     ? `In Stock: ${item.stock.quantity}`
                     : 'Out of Stock'}
                 </div>
                 <div style={styles.buttonContainer}>
                   <button 
                     style={styles.addToCartButton}
                     onMouseEnter={(e) => handleButtonHover(e, true, 'addToCart')}
                     onMouseLeave={(e) => handleButtonHover(e, false, 'addToCart')}
                     onClick={() => openPopup(item)}
                   >
                     Add to Cart
                   </button>
                   <button 
                     style={styles.viewDetailsButton}
                     onMouseEnter={(e) => handleButtonHover(e, true, 'viewDetails')}
                     onMouseLeave={(e) => handleButtonHover(e, false, 'viewDetails')}
                     onClick={() => openDetailsPopup(item)}
                   >
                     View Details
                   </button>
                 </div>
               </div>
             ))
           )}
         </div>
         <div style={styles.backButtonContainer}>
           <button
             onClick={handleBackClick}
             style={styles.backButton}
             onMouseEnter={(e) => handleButtonHover(e, true, 'back')}
             onMouseLeave={(e) => handleButtonHover(e, false, 'back')}
           >
             Back
           </button>
         </div>
       </div>
       {/* Add to Cart Popup Modal */}
       {showPopup && popupProduct && (
         <div style={popupStyles.overlay}>
           <div style={{...popupStyles.modal, position: 'relative'}}>
             <button style={popupStyles.closeBtn} onClick={closePopup} title="Close">&times;</button>
             <h2>{popupProduct.name}</h2>
             {popupProduct.imagePath ? (
               <img src={`http://localhost:8082/ps-api/images/${popupProduct.imagePath}`} alt={popupProduct.name} style={{width: '120px', height: '120px', objectFit: 'cover', borderRadius: '0.5rem'}} />
             ) : (
               <div style={{width: '120px', height: '120px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', borderRadius: '0.5rem'}}>No Image</div>
             )}
             <div><span style={popupStyles.label}>Description:</span>{popupProduct.description}</div>
             <div><span style={popupStyles.label}>Category:</span>{popupProduct.category?.name || 'Uncategorized'}</div>
             <div><span style={popupStyles.label}>Price:</span>Rs.{popupProduct.price?.toFixed(2) || '0.00'}</div>
             <div><span style={popupStyles.label}>Stock:</span>{popupProduct.stock?.quantity || 0}</div>
             <div>
               <span style={popupStyles.label}>Quantity:</span>
               <input type="number" min="1" max={popupProduct.stock?.quantity || 1} value={popupQuantity} onChange={handleQuantityChange} style={popupStyles.qtyInput} />
             </div>
             <button style={popupStyles.confirmBtn} onClick={closePopup}>Confirm</button>
           </div>
         </div>
       )}

       {/* View Details Popup Modal */}
       {showDetailsPopup && detailsProduct && (
         <div style={detailsPopupStyles.overlay}>
           <div style={{...detailsPopupStyles.modal, position: 'relative'}}>
             <button style={detailsPopupStyles.closeBtn} onClick={closeDetailsPopup} title="Close">&times;</button>
             <h1>{detailsProduct.name}</h1>
             {detailsProduct.imagePath ? (
               <img src={`http://localhost:8082/ps-api/images/${detailsProduct.imagePath}`} alt={detailsProduct.name} style={{width: '200px', height: '200px', objectFit: 'cover', borderRadius: '0.7rem'}} />
             ) : (
               <div style={{width: '200px', height: '200px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', borderRadius: '0.7rem'}}>No Image</div>
             )}
             <div><span style={detailsPopupStyles.label}>Description:</span>{detailsProduct.description}</div>
             <div><span style={detailsPopupStyles.label}>Category:</span>{detailsProduct.category?.name || 'Uncategorized'}</div>
             <div><span style={detailsPopupStyles.label}>Price:</span>Rs.{detailsProduct.price?.toFixed(2) || '0.00'}</div>
             <div><span style={detailsPopupStyles.label}>Stock:</span>{detailsProduct.stock?.quantity || 0}</div>
             {/* Add more details here if needed */}
           </div>
         </div>
       )}
       <Footer />
     </div>

  );
}

export default ItemsPage;