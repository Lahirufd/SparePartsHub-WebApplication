import React, { useEffect, useState } from 'react';

const AccountSettingsPage = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = 1; // Current user ID

  // Mock user data based on your schema
  const userData = {
    id: 1,
    username: 'john_doe',
    name: 'John Doe',
    address: '123 Main Street, Colombo 03, Western Province, Sri Lanka',
    tel_number: '+94 77 123 4567',
    role: 'customer',
    password: '********' // Never show actual password
  };

  useEffect(() => {
    // Simulate API call to fetch user data
    setTimeout(() => {
      setUser(userData);
      setFormData(userData);
    }, 300);
  }, [userId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    setLoading(true);
    
    // Simulate API call to update user profile
    setTimeout(() => {
      // Validate required fields
      if (!formData.name || !formData.username || !formData.address || !formData.tel_number) {
        alert('Please fill in all required fields.');
        setLoading(false);
        return;
      }

      // Simulate updating user data (matches users table schema)
      const updatedUser = {
        id: user.id,
        username: formData.username,
        name: formData.name,
        address: formData.address,
        tel_number: formData.tel_number,
        role: formData.role,
        password: user.password // Password stays the same
      };

      console.log('Updating user profile:', updatedUser);
      setUser(updatedUser);
      setEditMode(false);
      setLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handlePasswordUpdate = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    // Simulate password update API call
    setTimeout(() => {
      console.log('Password updated for user:', user.id);
      alert('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordModal(false);
      setLoading(false);
    }, 1000);
  };

  const handleCancelEdit = () => {
    setFormData(user);
    setEditMode(false);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return '👑';
      case 'customer': return '👤';
      case 'vendor': return '🏪';
      default: return '👤';
    }
  };

  const getRoleStyle = (role) => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      fontSize: '0.875rem',
      fontWeight: '600',
      border: '1px solid'
    };
    
    switch (role) {
      case 'admin': return { ...baseStyle, background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' };
      case 'customer': return { ...baseStyle, background: '#dbeafe', color: '#1e40af', borderColor: '#bfdbfe' };
      case 'vendor': return { ...baseStyle, background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
      default: return { ...baseStyle, background: '#f3f4f6', color: '#374151', borderColor: '#d1d5db' };
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #c7d2fe 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    
    container: {
      maxWidth: '1000px',
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

    profileCard: {
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      marginBottom: '2rem'
    },

    profileHeader: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      padding: '2rem',
      color: 'white',
      textAlign: 'center'
    },

    avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '3rem',
      margin: '0 auto 1rem'
    },

    profileName: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem'
    },

    profileUsername: {
      fontSize: '1.25rem',
      opacity: 0.9
    },

    profileBody: {
      padding: '2rem'
    },

    formSection: {
      marginBottom: '2rem'
    },

    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },

    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    },

    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },

    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#374151'
    },

    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },

    textarea: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      outline: 'none',
      resize: 'vertical',
      fontFamily: 'inherit',
      minHeight: '100px',
      boxSizing: 'border-box'
    },

    select: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      outline: 'none',
      background: 'white',
      boxSizing: 'border-box'
    },

    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
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

    secondaryBtn: {
      background: '#f3f4f6',
      color: '#374151',
      border: '1px solid #d1d5db'
    },

    dangerBtn: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white'
    },

    successBtn: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white'
    },

    infoCard: {
      background: '#f0f9ff',
      border: '1px solid #bae6fd',
      borderRadius: '0.75rem',
      padding: '1rem',
      marginBottom: '1.5rem'
    },

    infoIcon: {
      color: '#0284c7',
      fontSize: '1.25rem',
      marginRight: '0.5rem'
    },

    infoText: {
      color: '#0c4a6e',
      fontSize: '0.875rem',
      lineHeight: '1.5'
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
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },

    modalHeader: {
      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      color: 'white',
      padding: '1.5rem',
      borderTopLeftRadius: '1rem',
      borderTopRightRadius: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    modalTitle: {
      fontSize: '1.25rem',
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

    disabledInput: {
      background: '#f9fafb',
      color: '#6b7280',
      cursor: 'not-allowed'
    }
  };

  if (!user) {
    return (
      <div style={styles.pageWrapper}>
        <div style={styles.container}>
          <div style={{textAlign: 'center', padding: '4rem 0'}}>
            <div style={{fontSize: '4rem', marginBottom: '1rem'}}>⏳</div>
            <h3 style={{fontSize: '1.5rem', fontWeight: '600', color: '#64748b'}}>Loading your account...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>⚙️ Account Settings</h1>
          <p style={styles.subtitle}>Manage your personal information and account preferences</p>
        </div>

        {/* Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div style={styles.profileName}>{user.name}</div>
            <div style={styles.profileUsername}>@{user.username}</div>
            <div style={{marginTop: '1rem'}}>
              <span style={getRoleStyle(user.role)}>
                <span>{getRoleIcon(user.role)}</span>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          <div style={styles.profileBody}>
            {/* Account Information */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <span>📋</span>
                Account Information
              </h3>

              <div style={styles.infoCard}>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                  <span style={styles.infoIcon}>ℹ️</span>
                  <div style={styles.infoText}>
                    Your account ID is <strong>#{user.id}</strong> and was created with <strong>{user.role}</strong> privileges. 
                    Contact support if you need to change your role or have account-related questions.
                  </div>
                </div>
              </div>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>User ID</label>
                  <input
                    type="text"
                    style={{...styles.input, ...styles.disabledInput}}
                    value={`#${user.id}`}
                    disabled
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Account Role</label>
                  <input
                    type="text"
                    style={{...styles.input, ...styles.disabledInput}}
                    value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <span>👤</span>
                Personal Information
              </h3>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={editMode ? formData.name : user.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    disabled={!editMode}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Username *</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={editMode ? formData.username : user.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    disabled={!editMode}
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    style={styles.input}
                    value={editMode ? formData.tel_number : user.tel_number}
                    onChange={(e) => handleInputChange('tel_number', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    disabled={!editMode}
                    placeholder="+94 77 123 4567"
                  />
                </div>

                <div style={{...styles.inputGroup, gridColumn: 'span 2'}}>
                  <label style={styles.label}>Address *</label>
                  <textarea
                    style={styles.textarea}
                    value={editMode ? formData.address : user.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    disabled={!editMode}
                    placeholder="Enter your full address..."
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div style={styles.formSection}>
              <h3 style={styles.sectionTitle}>
                <span>🔒</span>
                Security Settings
              </h3>

              <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input
                    type="password"
                    style={{...styles.input, ...styles.disabledInput}}
                    value="********"
                    disabled
                  />
                </div>

                <div style={{display: 'flex', alignItems: 'end'}}>
                  <button
                    style={{...styles.button, ...styles.dangerBtn}}
                    onClick={() => setShowPasswordModal(true)}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    <span>🔑</span>
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonGroup}>
              {editMode ? (
                <>
                  <button
                    style={{...styles.button, ...styles.secondaryBtn}}
                    onClick={handleCancelEdit}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    <span>❌</span>
                    Cancel
                  </button>
                  <button
                    style={{...styles.button, ...styles.successBtn}}
                    onClick={handleSaveProfile}
                    disabled={loading}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    <span>{loading ? '⏳' : '💾'}</span>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  style={{...styles.button, ...styles.primaryBtn}}
                  onClick={() => setEditMode(true)}
                  onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                  onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                >
                  <span>✏️</span>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div style={styles.modal} onClick={() => setShowPasswordModal(false)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>🔑 Change Password</h2>
                <button 
                  style={styles.closeBtn} 
                  onClick={() => setShowPasswordModal(false)}
                  onMouseEnter={e => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={e => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                >
                  ×
                </button>
              </div>

              <div style={styles.modalBody}>
                <div style={{marginBottom: '1rem'}}>
                  <div style={styles.infoCard}>
                    <div style={{display: 'flex', alignItems: 'flex-start'}}>
                      <span style={styles.infoIcon}>🔒</span>
                      <div style={styles.infoText}>
                        For security purposes, please enter your current password and choose a new one. 
                        Your new password should be at least 6 characters long.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Current Password *</label>
                  <input
                    type="password"
                    style={styles.input}
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    placeholder="Enter your current password"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>New Password *</label>
                  <input
                    type="password"
                    style={styles.input}
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    placeholder="Enter your new password"
                  />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm New Password *</label>
                  <input
                    type="password"
                    style={styles.input}
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#d1d5db'}
                    placeholder="Confirm your new password"
                  />
                </div>

                <div style={{...styles.buttonGroup, marginTop: '2rem'}}>
                  <button
                    style={{...styles.button, ...styles.secondaryBtn}}
                    onClick={() => setShowPasswordModal(false)}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    <span>❌</span>
                    Cancel
                  </button>
                  <button
                    style={{...styles.button, ...styles.dangerBtn}}
                    onClick={handlePasswordUpdate}
                    disabled={loading}
                    onMouseEnter={e => e.target.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
                  >
                    <span>{loading ? '⏳' : '🔑'}</span>
                    {loading ? 'Updating...' : 'Update Password'}
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

export default AccountSettingsPage;