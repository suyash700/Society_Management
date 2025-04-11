import React, { useState } from 'react';
import '../assets/login/login.css';
import '../assets/login/forgot-password.css';
import logo from '../assets/login/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Here you would typically make an API call to send reset email
    // For now, we'll simulate it
    setIsSubmitted(true);
    showNotification('Password reset link sent to your email!', 'success');
    
    // Simulate email sending delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  return (
    <>
      <div className="container">
        <div className="login_section">
          <div className="header">
            <img src={logo} alt="Society Logo" className="logo" />
            <h1>Reset Password</h1>
          </div>

          {!isSubmitted ? (
            <>
              <p className="reset-instructions">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form className="form-container active" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input 
                    type="email" 
                    required 
                    placeholder=" " 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email Address</label>
                  <i className="fas fa-envelope"></i>
                </div>

                <button type="submit" className="submit-btn">
                  <span className="btn-text">Send Reset Link</span>
                  <div className="loader"></div>
                </button>
              </form>
            </>
          ) : (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <p>Please check your email for password reset instructions.</p>
              <p>Redirecting to login page...</p>
            </div>
          )}

          <div className="register-link">
            Remember your password? <a href="/login">Back to Login</a>
          </div>
        </div>
      </div>

      {notification.message && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}
    </>
  );
};

export default ForgotPassword; 