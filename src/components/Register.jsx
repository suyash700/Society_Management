import React, { useState } from 'react';
import '../assets/login/login.css';
import logo from '../assets/login/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Resident Registration Data:", formData);

      const response = await fetch(`http://localhost:4000/api/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      showNotification('Registration successful! Redirecting to login...', 'success');

      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (error) {
      console.log("Error from frontend registration:", error);
      showNotification(error.message, 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const togglePassword = (e) => {
    const input = e.target.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
    e.target.classList.toggle('fa-eye');
    e.target.classList.toggle('fa-eye-slash');
  };

  return (
    <>
      <div className="container">
        <div className="login_section">
          <div className="header">
            <img src={logo} alt="Society Logo" className="logo" />
            <h1>Create New Account</h1>
          </div>

          <form className="form-container active" onSubmit={handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                name="name" 
                required 
                placeholder=" " 
                value={formData.name}
                onChange={handleChange}
              />
              <label>Username</label>
              <i className="fas fa-user"></i>
            </div>

            <div className="input-group">
              <input 
                type="email" 
                name="email" 
                required 
                placeholder=" " 
                value={formData.email}
                onChange={handleChange}
              />
              <label>Email Address</label>
              <i className="fas fa-envelope"></i>
            </div>

            <div className="input-group">
              <input 
                type="text" 
                name="phone" 
                required 
                placeholder=" " 
                value={formData.phone}
                onChange={handleChange}
              />
              <label>Phone Number</label>
              <i className="fas fa-phone"></i>
            </div>

            <div className="input-group">
              <input 
                type="password" 
                name="password" 
                required 
                placeholder=" " 
                value={formData.password}
                onChange={handleChange}
              />
              <label>Password</label>
              <i className="fas fa-eye-slash toggle-password" onClick={togglePassword}></i>
            </div>

            <button type="submit" className="submit-btn">
              <span className="btn-text">Create Account</span>
              <div className="loader"></div>
            </button>
          </form>

          <div className="register-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>

      {notification.message && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}
    </>
  );
};

export default Register;
