import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/login/login.css';
import img1 from '../assets/login/img1.jpg';
import img2 from '../assets/login/img2.jpg';
import img3 from '../assets/login/img3.jpg';
import logo from '../assets/login/logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const carouselImages = [img1, img2, img3];
  const intervalRef = useRef(null);

  useEffect(() => {
    showSlide(0);
    intervalRef.current = setInterval(() => showSlide(activeSlide + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [activeSlide]);

  const showSlide = (index) => {
    setActiveSlide((index + carouselImages.length) % carouselImages.length);
  };

  const storeTokenInLS = (token) => {
    localStorage.setItem("token", token);
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    if (!userEmail || !userPassword) {
      toast.error("Email and Password are required!");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Login Successful!");
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
  
    if (!adminEmail || !adminPassword) {
      toast.error("Admin Email and Password are required!");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
  
      const res_data = await response.json();
      console.log("Response Data:", res_data);
  
      // Check if the request was successful
      if (!response.ok) {
        toast.error(res_data.message || "Invalid credentials");
        return;
      }
  
      // Ensure res_data.isAdmin exists before checking
      if (res_data.isAdmin === false) {
        toast.error("Not an admin");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
        return;
      }
  
      // If admin, navigate to the admin panel
      toast.success("Admin Login Successful!");
      storeTokenInLS(res_data.token);
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } catch (error) {
      console.error("Admin Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  

  return (
    <>
      <div className="container">
        {/* Carousel Section */}
        <div className="image_section">
          <div className="carousel">
            {carouselImages.map((img, i) => (
              <img key={i} src={img} alt={`Slide ${i}`} className={i === activeSlide ? 'active' : ''} />
            ))}
          </div>
          <div className="carousel-controls">
            {carouselImages.map((_, i) => (
              <span key={i} className={`dot ${i === activeSlide ? 'active' : ''}`} onClick={() => showSlide(i)}></span>
            ))}
          </div>
        </div>

        {/* Login Section */}
        <div className="login_section">
          <div className="header">
            <img src={logo} alt="Society Logo" className="logo" />
            <h1>Welcome to Smart Society</h1>
          </div>

          <div className="toggle-buttons">
            <button className={!isAdmin ? 'active' : ''} onClick={() => setIsAdmin(false)}>
              <i className="fas fa-user"></i> Resident Login
            </button>
            <button className={isAdmin ? 'active' : ''} onClick={() => setIsAdmin(true)}>
              <i className="fas fa-lock"></i> Admin Login
            </button>
          </div>

          {/* User Form */}
          {!isAdmin && (
            <form className="form-container active" onSubmit={handleUserLogin}>
              <div className="input-group">
                <input type="email" required placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                <label>Email Address</label>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="input-group">
                <input type="password" required placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                <label>Password</label>
                <i className="fas fa-eye-slash toggle-password"></i>
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-text">Login</span>
                <div className="loader"></div>
              </button>
            </form>
          )}

          {/* Admin Form */}
          {isAdmin && (
            <form className="form-container active" onSubmit={handleAdminLogin}>
              <div className="input-group">
                <input type="email" required placeholder="Admin Email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
                <label>Admin Email</label>
                <i className="fas fa-id-card"></i>
              </div>
              <div className="input-group">
                <input type="password" required placeholder="Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                <label>Password</label>
                <i className="fas fa-eye-slash toggle-password"></i>
              </div>

              <button type="submit" className="submit-btn">
                <span className="btn-text">Admin Login</span>
                <div className="loader"></div>
              </button>
            </form>
          )}

          <div className="register-link">
            New to our society? <a href="/register">Create Account</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
