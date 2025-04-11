// src/components/PaymentPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/user/payment.css';
import QR from '../assets/user/QR.png';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [amount, setAmount] = useState(null); // Fix: Initialize as null
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [token] = useState(localStorage.getItem("token"));
  const [cardDetails, setcardDetails] = useState([]);
 // const [showReceipt, setShowReceipt] = useState(false);
  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: 'fas fa-mobile-alt' },
    { id: 'card', name: 'Card', icon: 'fas fa-credit-card' },
    { id: 'netbanking', name: 'Net Banking', icon: 'fas fa-university' },
    { id: 'wallet', name: 'Wallet', icon: 'fas fa-wallet' }
  ];

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/auth/user/maintainance/payment', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Fetched Payment Data:", data); // Debugging
        setAmount(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentData();
  }, [token]);

  useEffect(() => {
    console.log("Updated amount:", amount); // Debugging
  }, [amount]);

  const handleShowQR = () => {
    setShowQR(true);
    setTimeout(() => {
      const confirmed = window.confirm('Have you completed the payment?');
      if (confirmed) {
        setShowQR(false);
        setShowReceipt(true);
        setPaymentStatus('completed');
      } else {
        setPaymentStatus('failed');
        alert('Payment not completed. Please try again.');
      }
    }, 1000);
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    navigate('/dashboard');
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
    setShowQR(false);
  };

  return (
    <div className="payment-page">
      <nav className="navbar">
        <div className="logo">SocietyApp</div>
        <ul className="nav-links">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="/dashboard#maintenance_contener">Maintenance</a></li>
          <li><a href="/events">Events</a></li>
        </ul>
      </nav>

      <div className="payment-content">
        <div className="payment-summary">
          <h2>Payment Summary</h2>
          <div className="summary-details">
            <div className="summary-item">
              <span>FineAmount </span>
              <span className="amount">
                {amount ? `₹${amount.fine_amount}` : 'Loading...'}
              </span><br />
              <span>Total Amount </span>
              <span className="amount">
                {amount ? `₹${amount.total_amount}` : 'Loading...'}
              </span>
            </div>
            <div className="summary-item">
              <span>Payment Status</span>
              <span className={`status ${paymentStatus}`}>{paymentStatus}</span>
            </div>
            <div className="summary-item">
              <span>Due Date</span>
              <span>{amount ? amount.due_date : 'Loading...'}</span>
            </div>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Select Payment Method</h3>
          <div className="method-grid">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                onClick={() => handlePaymentMethodChange(method.id)}
              >
                <i className={method.icon}></i>
                <span>{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-container">
          {selectedMethod === 'upi' && (
            <>
              <h2>Scan to Pay</h2>
              <p>Use any UPI app to scan the QR code and complete the payment.</p>
              {!showQR && !showReceipt && (
                <button className="show-qr-btn" onClick={handleShowQR}>
                  <i className="fas fa-qrcode"></i> Show QR Code
                </button>
              )}

              {showQR && (
                <div className="qr-code-container">
                  <img src={QR} alt="QR Code" id="qr-code" />
                  <div className="qr-instructions">
                    <p>1. Open your UPI app</p>
                    <p>2. Scan this QR code</p>
                    <p>3. Enter the amount: ₹{amount ? amount.total_amount : "Loading..."}</p>
                    <p>4. Complete the payment</p>
                  </div>
                </div>
              )}
            </>
          )}

          {selectedMethod === 'card' && (
            <div className="card-payment-form">
              <h2>Card Payment</h2>
              <form>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
                <button type="submit" className="pay-btn">Pay ₹{amount ? amount.total_amount : "Loading..."}</button>
              </form>
            </div>
          )}
        </div>

        {showReceipt && (
          <div className="receipt-container">
            <div className="receipt-header">
              <i className="fas fa-check-circle success-icon"></i>
              <h2>Payment Successful!</h2>
            </div>
            <div className="receipt-details">
              <div className="receipt-item">
                <span>Transaction ID</span>
                <span>123456789</span>
              </div>
              <div className="receipt-item">
                <span>Date</span>
                <span>2023-10-25</span>
              </div>
              <div className="receipt-item">
                <span>Amount</span>
                <span>₹{amount ? amount.fine_amount : "Loading..."}</span>
              </div>
              <div className="receipt-item">
                <span>Status</span>
                <span className="status success">Success</span>
              </div>
            </div>
            <div className="receipt-actions">
              <button className="close-receipt-btn" onClick={closeReceipt}>
                <i className="fas fa-home"></i> Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
