import React, { useState } from 'react';
import Cusheader from '../../Components/Cusheader/Cusheader';
import Footer from '../../Components/Footer/Footer';

const initialCartItems = [
	{
		id: 1,
		name: 'Toyota Brake Pad',
		image: 'parts.jpg',
		price: 4500,
		quantity: 2,
		category: 'Brakes',
		description: 'High quality brake pad for Toyota vehicles. Ensures safety and durability.',
		warranty: '6 months',
	},
	{
		id: 2,
		name: 'Nissan Oil Filter',
		image: 'parts.jpg',
		price: 1200,
		quantity: 1,
		category: 'Filters',
		description: 'Premium oil filter for Nissan. Keeps your engine clean.',
		warranty: '3 months',
	},
	{
		id: 3,
		name: 'Mazda Air Filter',
		image: 'parts.jpg',
		price: 1800,
		quantity: 3,
		category: 'Filters',
		description: 'Efficient air filter for Mazda. Improves air flow and performance.',
		warranty: '4 months',
	},
];

const CheckoutPopup = ({ isOpen, onClose, cartItems, selectedItems, total }) => {
	const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
	const [paymentMethod, setPaymentMethod] = useState('card');
	const [isProcessing, setIsProcessing] = useState(false);
	const [orderComplete, setOrderComplete] = useState(false);
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postalCode: '',
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		cardholderName: ''
	});

	const selectedCartItems = cartItems.filter((_, idx) => selectedItems[idx]);
	const deliveryFee = 500;
	const discount = selectedCartItems.length >= 3 ? total * 0.1 : 0;
	const finalTotal = total + deliveryFee - discount;

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleNextStep = () => {
		if (step < 3) setStep(step + 1);
	};

	const handlePayment = async () => {
		setIsProcessing(true);
		// Simulate payment processing
		setTimeout(() => {
			setIsProcessing(false);
			setOrderComplete(true);
			setStep(3);
		}, 3000);
	};

	const resetAndClose = () => {
		setStep(1);
		setOrderComplete(false);
		setIsProcessing(false);
		setFormData({
			fullName: '', email: '', phone: '', address: '', city: '', postalCode: '',
			cardNumber: '', expiryDate: '', cvv: '', cardholderName: ''
		});
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div style={overlayStyle}>
			<div style={popupStyle}>
				<div style={headerStyle}>
					<h2>Checkout - Step {step} of 3</h2>
					<button onClick={resetAndClose} style={closeButtonStyle}>×</button>
				</div>

				<div style={progressBarStyle}>
					<div style={{...progressFillStyle, width: `${(step / 3) * 100}%`}}></div>
				</div>

				{step === 1 && (
					<div style={stepContentStyle}>
						<h3>Shipping Details</h3>
						<div style={formGridStyle}>
							<input
								type="text"
								name="fullName"
								placeholder="Full Name *"
								value={formData.fullName}
								onChange={handleInputChange}
								style={inputStyle}
								required
							/>
							<input
								type="email"
								name="email"
								placeholder="Email Address *"
								value={formData.email}
								onChange={handleInputChange}
								style={inputStyle}
								required
							/>
							<input
								type="tel"
								name="phone"
								placeholder="Phone Number *"
								value={formData.phone}
								onChange={handleInputChange}
								style={inputStyle}
								required
							/>
							<textarea
								name="address"
								placeholder="Delivery Address *"
								value={formData.address}
								onChange={handleInputChange}
								style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
								required
							/>
							<input
								type="text"
								name="city"
								placeholder="City *"
								value={formData.city}
								onChange={handleInputChange}
								style={inputStyle}
								required
							/>
							<input
								type="text"
								name="postalCode"
								placeholder="Postal Code"
								value={formData.postalCode}
								onChange={handleInputChange}
								style={inputStyle}
							/>
						</div>
					</div>
				)}

				{step === 2 && (
					<div style={stepContentStyle}>
						<h3>Payment Method</h3>
						<div style={paymentMethodsStyle}>
							<label style={paymentOptionStyle}>
								<input
									type="radio"
									value="card"
									checked={paymentMethod === 'card'}
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<span>💳 Credit/Debit Card</span>
							</label>
							<label style={paymentOptionStyle}>
								<input
									type="radio"
									value="paypal"
									checked={paymentMethod === 'paypal'}
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<span>🔵 PayPal</span>
							</label>
							<label style={paymentOptionStyle}>
								<input
									type="radio"
									value="bank"
									checked={paymentMethod === 'bank'}
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<span>🏦 Bank Transfer</span>
							</label>
							<label style={paymentOptionStyle}>
								<input
									type="radio"
									value="cod"
									checked={paymentMethod === 'cod'}
									onChange={(e) => setPaymentMethod(e.target.value)}
								/>
								<span>💵 Cash on Delivery</span>
							</label>
						</div>

						{paymentMethod === 'card' && (
							<div style={cardFormStyle}>
								<input
									type="text"
									name="cardNumber"
									placeholder="Card Number *"
									value={formData.cardNumber}
									onChange={handleInputChange}
									style={inputStyle}
									maxLength="19"
									required
								/>
								<div style={{display: 'flex', gap: '1rem'}}>
									<input
										type="text"
										name="expiryDate"
										placeholder="MM/YY *"
										value={formData.expiryDate}
										onChange={handleInputChange}
										style={inputStyle}
										maxLength="5"
										required
									/>
									<input
										type="text"
										name="cvv"
										placeholder="CVV *"
										value={formData.cvv}
										onChange={handleInputChange}
										style={inputStyle}
										maxLength="4"
										required
									/>
								</div>
								<input
									type="text"
									name="cardholderName"
									placeholder="Cardholder Name *"
									value={formData.cardholderName}
									onChange={handleInputChange}
									style={inputStyle}
									required
								/>
							</div>
						)}

						{paymentMethod === 'paypal' && (
							<div style={paymentInfoStyle}>
								<p>You will be redirected to PayPal to complete your payment securely.</p>
							</div>
						)}

						{paymentMethod === 'bank' && (
							<div style={paymentInfoStyle}>
								<h4>Bank Details:</h4>
								<p><strong>Bank:</strong> Commercial Bank of Ceylon</p>
								<p><strong>Account:</strong> 1234567890</p>
								<p><strong>Branch:</strong> Colombo Main</p>
								<p style={{color: '#d32f2f'}}>Please include your order reference in the transfer note.</p>
							</div>
						)}

						{paymentMethod === 'cod' && (
							<div style={paymentInfoStyle}>
								<p>📦 Pay when your order is delivered to your doorstep.</p>
								<p style={{color: '#0077b6'}}>Additional COD fee: LKR 200</p>
							</div>
						)}
					</div>
				)}

				{step === 3 && (
					<div style={stepContentStyle}>
						{orderComplete ? (
							<div style={successStyle}>
								<div style={{fontSize: '3rem', marginBottom: '1rem'}}>✅</div>
								<h3 style={{color: '#4caf50'}}>Order Confirmed!</h3>
								<p>Order ID: <strong>ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></p>
								<p>You will receive a confirmation email shortly.</p>
								<p style={{color: '#666'}}>Expected delivery: 3-5 business days</p>
							</div>
						) : (
							<div>
								<h3>Order Summary</h3>
								<div style={summaryStyle}>
									{selectedCartItems.map(item => (
										<div key={item.id} style={summaryItemStyle}>
											<span>{item.name} × {item.quantity}</span>
											<span>LKR {(item.price * item.quantity).toLocaleString()}</span>
										</div>
									))}
									<hr />
									<div style={summaryItemStyle}>
										<span>Subtotal:</span>
										<span>LKR {total.toLocaleString()}</span>
									</div>
									<div style={summaryItemStyle}>
										<span>Delivery Fee:</span>
										<span>LKR {deliveryFee.toLocaleString()}</span>
									</div>
									{discount > 0 && (
										<div style={{...summaryItemStyle, color: '#4caf50'}}>
											<span>Discount (10%):</span>
											<span>-LKR {discount.toLocaleString()}</span>
										</div>
									)}
									{paymentMethod === 'cod' && (
										<div style={summaryItemStyle}>
											<span>COD Fee:</span>
											<span>LKR 200</span>
										</div>
									)}
									<hr />
									<div style={{...summaryItemStyle, fontWeight: 'bold', fontSize: '1.1rem'}}>
										<span>Total:</span>
										<span>LKR {(paymentMethod === 'cod' ? finalTotal + 200 : finalTotal).toLocaleString()}</span>
									</div>
								</div>
							</div>
						)}
					</div>
				)}

				<div style={actionsStyle}>
					{step > 1 && !orderComplete && (
						<button onClick={() => setStep(step - 1)} style={secondaryButtonStyle}>
							Back
						</button>
					)}
					
					{step === 1 && (
						<button 
							onClick={handleNextStep}
							disabled={!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city}
							style={primaryButtonStyle}
						>
							Continue to Payment
						</button>
					)}
					
					{step === 2 && (
						<button 
							onClick={handleNextStep}
							disabled={paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.cardholderName)}
							style={primaryButtonStyle}
						>
							Review Order
						</button>
					)}
					
					{step === 3 && !orderComplete && (
						<button 
							onClick={handlePayment}
							disabled={isProcessing}
							style={primaryButtonStyle}
						>
							{isProcessing ? 'Processing...' : `Confirm & Pay LKR ${(paymentMethod === 'cod' ? finalTotal + 200 : finalTotal).toLocaleString()}`}
						</button>
					)}
					
					{orderComplete && (
						<button onClick={resetAndClose} style={primaryButtonStyle}>
							Close
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

const CartItemsPage = () => {
	const [cartItems, setCartItems] = useState(initialCartItems);
	const [selected, setSelected] = useState(cartItems.map(() => false));
	const [showCheckout, setShowCheckout] = useState(false);

	// Real-time total for selected items
	const total = cartItems.reduce((sum, item, idx) => selected[idx] ? sum + item.price * item.quantity : sum, 0);

	const handleSelect = idx => {
		setSelected(sel => sel.map((v, i) => i === idx ? !v : v));
	};

	const handleRemove = idx => {
		setCartItems(items => items.filter((_, i) => i !== idx));
		setSelected(sel => sel.filter((_, i) => i !== idx));
	};

	const handleSelectAll = e => {
		setSelected(cartItems.map(() => e.target.checked));
	};

	const selectedCount = selected.filter(Boolean).length;
	const allSelected = selectedCount === cartItems.length && cartItems.length > 0;

	return (
		<div>
			<Cusheader />
			<main style={mainContentStyle}>
				<h1 style={titleStyle}>Your Cart Items</h1>
				
				<div style={summaryBarStyle}>
					<span>Items in Cart: <b>{cartItems.length}</b></span>
					<span>Selected: <b>{selectedCount}</b></span>
					<span>Total (Selected): <b>LKR {total.toLocaleString()}</b></span>
				</div>
				
				<div style={progressBarWrapperStyle}>
					<div style={progressBarContainerStyle}>
						<div style={{...progressFillMainStyle, width: `${cartItems.length ? (selectedCount / cartItems.length) * 100 : 0}%`}}></div>
					</div>
					<span style={progressTextStyle}>{selectedCount}/{cartItems.length} selected</span>
				</div>
				
				<div style={cartContainerStyle}>
					{cartItems.length === 0 ? (
						<div style={emptyCartStyle}>Your cart is empty.</div>
					) : (
						<table style={cartTableStyle}>
							<colgroup>
								<col style={{width: '4%'}} />
								<col style={{width: '8%'}} />
								<col style={{width: '26%'}} />
								<col style={{width: '12%'}} />
								<col style={{width: '12%'}} />
								<col style={{width: '9%'}} />
								<col style={{width: '13%'}} />
								<col style={{width: '6%'}} />
							</colgroup>
							<thead>
								<tr>
									<th style={cartThStyle}><input type="checkbox" checked={allSelected} onChange={handleSelectAll} /></th>
									<th style={cartThStyle}>Image</th>
									<th style={cartThStyle}>Item Name</th>
									<th style={cartThStyle}>Category</th>
									<th style={cartThStyle}>Price (LKR)</th>
									<th style={cartThStyle}>Quantity</th>
									<th style={cartThStyle}>Subtotal (LKR)</th>
									<th style={cartThStyle}>Remove</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item, idx) => (
									<tr key={item.id} style={selected[idx] ? selectedRowStyle : {}}>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa'} : cartTdStyle}>
											<input type="checkbox" checked={selected[idx]} onChange={() => handleSelect(idx)} />
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa'} : cartTdStyle}>
											<div style={itemImageStyle}>📦</div>
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa', textAlign: 'left'} : {...cartTdStyle, textAlign: 'left'}}>
											<div style={itemNameStyle}>{item.name}</div>
											<div style={itemDescStyle}>{item.description}</div>
											<div style={itemWarrantyStyle}>Warranty: {item.warranty}</div>
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa'} : cartTdStyle}>
											{item.category}
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa'} : cartTdStyle}>
											{item.price.toLocaleString()}
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa'} : cartTdStyle}>
											{item.quantity}
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa'} : cartTdStyle}>
											{(item.price * item.quantity).toLocaleString()}
										</td>
										<td style={selected[idx] ? {...cartTdStyle, background: '#e0f7fa', textAlign: 'center', verticalAlign: 'middle'} : {...cartTdStyle, textAlign: 'center', verticalAlign: 'middle'}}>
											<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
												<button style={removeBtnStyle} onClick={() => handleRemove(idx)}>Remove</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
				
				<div style={tipsSectionStyle}>
					<h3>💡 Shopping Tips</h3>
					<ul>
						<li>Tick items to include them in your checkout total.</li>
						<li>Remove items you no longer need.</li>
						<li>Check warranty and description for each part.</li>
						<li>Enjoy special offers: <span style={{color: '#d32f2f', fontWeight: 600}}>10% off for 3+ selected items!</span></li>
					</ul>
				</div>
				
				<div style={totalSectionStyle}>
					<span style={totalLabelStyle}>Total (Selected):</span>
					<span style={totalValueStyle}>LKR {total.toLocaleString()}</span>
				</div>
				
				<div style={actionsMainStyle}>
					<button 
						style={selectedCount === 0 ? disabledCheckoutBtnStyle : checkoutBtnStyle}
						disabled={selectedCount === 0}
						onClick={() => setShowCheckout(true)}
					>
						Proceed to Checkout
					</button>
				</div>
				
				<div style={bottomActionsStyle}>
					<button style={backBtnStyle} onClick={() => window.history.back()}>Back</button>
				</div>
			</main>
			
			<Footer />

			<CheckoutPopup 
				isOpen={showCheckout}
				onClose={() => setShowCheckout(false)}
				cartItems={cartItems}
				selectedItems={selected}
				total={total}
			/>
		</div>
	);
};

// Styles
const overlayStyle = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0, 0, 0, 0.7)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 1000,
	padding: '1rem'
};

const popupStyle = {
	background: '#fff',
	borderRadius: '12px',
	width: '90%',
	maxWidth: '600px',
	maxHeight: '90vh',
	overflow: 'auto',
	boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
};

const headerStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '1.5rem 2rem 1rem 2rem',
	borderBottom: '1px solid #e0e0e0'
};

const closeButtonStyle = {
	background: 'none',
	border: 'none',
	fontSize: '2rem',
	cursor: 'pointer',
	color: '#666',
	padding: 0,
	width: '30px',
	height: '30px',
	borderRadius: '50%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
};

const progressBarStyle = {
	height: '4px',
	background: '#e0e0e0',
	margin: '0 2rem'
};

const progressFillStyle = {
	height: '100%',
	background: 'linear-gradient(90deg, #00b4d8 0%, #0077b6 100%)',
	transition: 'width 0.3s'
};

const stepContentStyle = {
	padding: '2rem'
};

const formGridStyle = {
	display: 'grid',
	gap: '1rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
};

const inputStyle = {
	padding: '0.8rem',
	border: '1px solid #ddd',
	borderRadius: '6px',
	fontSize: '1rem',
	width: '100%',
	boxSizing: 'border-box'
};

const paymentMethodsStyle = {
	display: 'grid',
	gap: '1rem',
	marginBottom: '1.5rem'
};

const paymentOptionStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '0.5rem',
	padding: '1rem',
	border: '1px solid #ddd',
	borderRadius: '8px',
	cursor: 'pointer',
	fontSize: '1.1rem'
};

const cardFormStyle = {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
	marginTop: '1rem'
};

const paymentInfoStyle = {
	background: '#f5f5f5',
	padding: '1rem',
	borderRadius: '8px',
	marginTop: '1rem'
};

const summaryStyle = {
	background: '#f9f9f9',
	padding: '1.5rem',
	borderRadius: '8px'
};

const summaryItemStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '0.5rem'
};

const successStyle = {
	textAlign: 'center',
	padding: '2rem'
};

const actionsStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	padding: '1.5rem 2rem',
	borderTop: '1px solid #e0e0e0',
	gap: '1rem'
};

const primaryButtonStyle = {
	background: 'linear-gradient(90deg, #0077b6 0%, #00b4d8 100%)',
	color: '#fff',
	border: 'none',
	padding: '0.9rem 1.5rem',
	borderRadius: '8px',
	fontSize: '1rem',
	fontWeight: 600,
	cursor: 'pointer',
	minWidth: '150px'
};

const secondaryButtonStyle = {
	background: '#e0e0e0',
	color: '#333',
	border: 'none',
	padding: '0.9rem 1.5rem',
	borderRadius: '8px',
	fontSize: '1rem',
	fontWeight: 600,
	cursor: 'pointer'
};

// Main page styles
const mainContentStyle = {
	minHeight: '80vh',
	background: '#f7fafd',
	padding: '2.5rem 0 2rem 0',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
};

const titleStyle = {
	fontSize: '2.2rem',
	color: '#1b1b1b',
	marginBottom: '2rem',
	fontWeight: 700,
	letterSpacing: '1px'
};

const summaryBarStyle = {
	width: '100%',
	maxWidth: '1300px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	background: '#eaf6ff',
	borderRadius: '8px',
	padding: '0.7rem 2rem',
	marginBottom: '1rem',
	fontSize: '1.08rem'
};

const progressBarWrapperStyle = {
	width: '100%',
	maxWidth: '1300px',
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	marginBottom: '1.2rem'
};

const progressBarContainerStyle = {
	flex: 1,
	height: '12px',
	background: '#e0e0e0',
	borderRadius: '8px',
	overflow: 'hidden'
};

const progressFillMainStyle = {
	height: '100%',
	background: 'linear-gradient(90deg, #00b4d8 0%, #0077b6 100%)',
	transition: 'width 0.3s'
};

const progressTextStyle = {
	fontSize: '0.98rem',
	color: '#0077b6',
	minWidth: '90px'
};

const cartContainerStyle = {
  width: '100%',
  maxWidth: '1300px',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  padding: '2rem 2.5rem',
  marginBottom: '2rem',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const cartTableStyle = {
	width: '100%',
	borderCollapse: 'collapse',
	fontSize: '1.05rem',
	tableLayout: 'fixed',
};

const cartThStyle = {
  textAlign: 'center',
  padding: '0.5rem 0.2rem',
  background: '#f0f6fa',
  fontWeight: 700,
  borderBottom: '2px solid #e0e0e0',
  fontSize: '1rem',
};

const cartTdStyle = {
  textAlign: 'center',
  padding: '0.5rem 0.2rem',
  borderBottom: '1px solid #e0e0e0',
  verticalAlign: 'middle',
  wordBreak: 'break-word',
  fontSize: '0.98rem',
  position: 'relative',
};

const selectedRowStyle = {
	background: '#e0f7fa',
	transition: 'background 0.2s'
};

const itemImageStyle = {
	width: '60px',
	height: '60px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#f0f0f0',
	borderRadius: '8px',
	fontSize: '2rem'
};

const itemNameStyle = {
	fontWeight: 600,
	fontSize: '1.1rem'
};

const itemDescStyle = {
	fontSize: '0.95rem',
	color: '#666',
	marginTop: '0.2rem'
};

const itemWarrantyStyle = {
	fontSize: '0.9rem',
	color: '#0077b6',
	marginTop: '0.1rem'
};

const removeBtnStyle = {
  background: '#ff5252',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '0.3rem 0.8rem', // smaller padding
  fontSize: '0.92rem', // smaller font
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  minWidth: '60px', // slightly smaller min width
  display: 'inline-block',
  margin: 0,
  textAlign: 'center',
  lineHeight: '1.2',
};

const emptyCartStyle = {
	textAlign: 'center',
	color: '#888',
	fontSize: '1.3rem',
	padding: '2rem 0'
};

const tipsSectionStyle = {
  width: '100%',
  maxWidth: '1300px',
  background: '#fffbe7',
  borderRadius: '10px',
	padding: '2rem 2.5rem',
  marginBottom: '1.5rem',
  boxShadow: '0 1px 4px rgba(255, 215, 64, 0.08)',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const totalSectionStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1300px',
	marginBottom: '1.5rem',
	marginLeft: 'auto',
	marginRight: 'auto',
			padding: '0.2rem 2.5rem',
};

const totalLabelStyle = {
	fontSize: '1.2rem',
	fontWeight: 600,
	marginRight: '1rem'
};

const totalValueStyle = {
	fontSize: '1.5rem',
	color: '#0077b6',
	fontWeight: 700
};

const actionsMainStyle = {
  width: '100%',
  maxWidth: '1300px',
  display: 'flex',
  justifyContent: 'flex-end',
	marginLeft: 'auto',
	marginRight: 'auto',
			padding: '0.2rem 2.5rem',
};

const checkoutBtnStyle = {
	background: 'linear-gradient(90deg, #0077b6 0%, #00b4d8 100%)',
	color: '#fff',
	border: 'none',
	padding: '0.9rem 2.2rem',
	borderRadius: '8px',
	fontSize: '1.1rem',
	fontWeight: 600,
	cursor: 'pointer',
	boxShadow: '0 2px 8px rgba(0,123,255,0.08)'
};

const disabledCheckoutBtnStyle = {
	...checkoutBtnStyle,
	background: '#b0b0b0',
	cursor: 'not-allowed'
};

const bottomActionsStyle = {
  width: '100%',
  maxWidth: '1300px',
  display: 'flex',
  justifyContent: 'flex-end',
	marginTop: '1.5rem',
	marginLeft: 'auto',
	marginRight: 'auto',
			padding: '0.2rem 2.5rem',
};

const backBtnStyle = {
	background: '#e0e0e0',
	color: '#333',
	border: 'none',
	borderRadius: '8px',
	padding: '0.7rem 2.2rem',
	fontSize: '1.08rem',
	fontWeight: 600,
	cursor: 'pointer'
};

export default CartItemsPage;