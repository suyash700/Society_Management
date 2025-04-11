import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/user/user.css';
import welcomeImg from '../assets/user/welcome.jpg';
import { Chart } from 'chart.js/auto';
import LogoutButton from './Logout';

const UserDashboard = () => {
  const navigate = useNavigate();
  const maintenanceChartRef = useRef(null);
  const chartInstance = useRef(null);
  const [token] = useState(localStorage.getItem("token"));
  const [selfmaintainData, setselfMaintainData] = useState({});
  const [wholemaintainData, setwholeMaintainData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth") || "" // Load from localStorage if available
  );

  const monthList = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Load selectedMonth from localStorage on mount
  useEffect(() => {
    const savedMonth = localStorage.getItem("selectedMonth");
    if (savedMonth) {
      setSelectedMonth(savedMonth);
    }
  }, []);

  // Fetch Individual User Maintenance Data
  useEffect(() => {
    const fetchUserMaintainData = async () => {
      if (!token) return;
  
      try {
        const response = await fetch('http://localhost:4000/api/auth/user/maintainance', {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) throw new Error('Failed to fetch user data');
  
        const data = await response.json();
        setselfMaintainData(data);
      } catch (error) {
        console.error("Error fetching user maintenance data:", error);
      }
    };
  
    fetchUserMaintainData();
  }, [token]);

  // Fetch Society-wide Maintenance Data based on Selected Month
  useEffect(() => {
    if (!selectedMonth) return;
  
    const fetchWholeMaintainData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/auth/maintainances?month=${selectedMonth}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) throw new Error('Failed to fetch society data');
  
        const data = await response.json();
        setwholeMaintainData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
        setwholeMaintainData([]);
      }
    };
  
    fetchWholeMaintainData();
  }, [selectedMonth, token]);

  // Function to update selectedMonth and persist it
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    localStorage.setItem("selectedMonth", month);
  };

  // Cleanup chart on component unmount
  useEffect(() => {
    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  // Initialize Chart.js
  useEffect(() => {
    if (!maintenanceChartRef.current) return;

    const ctx = maintenanceChartRef.current.getContext('2d');

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Maintenance Requests',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, []);

  return (
    <div>
       <nav class="navbar">
        <div class="logo">MyBrand</div>
        <input type="checkbox" id="menu-toggle" class="menu-toggle"/>
        <label for="menu-toggle" class="hamburger">&#9776;</label>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#maintenance_contener">Maintenance</a></li>
          <li><a href="/events">Events</a></li>


        </ul>
    </nav>

      <LogoutButton />

      <section id="home" className="section">
        <h1>Hi, {selfmaintainData.username} <br /> Welcome to Society Management System <br /> AKA [SMS]</h1>
        <img src={welcomeImg} alt="Society" />
      </section>

      <div className="maintenance_contener" id="maintenance_contener">
        <label htmlFor="month-select">Select Month</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => handleMonthChange(e.target.value)} // ✅ FIXED HERE
        >
          <option value="">-- Select Month --</option>
          {monthList.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <div className="society_maintenance_contener">
          <h1>Maintenance Details of Whole Society</h1>
          <div className="total_available">
            <p>Total Available Funds</p>
            <span>
              ₹{wholemaintainData.length > 0 
                ? wholemaintainData.reduce((sum, user) => sum + (user.total_amount || 0), 0)
                : 0}  
            </span>
          </div>
          <div className="Fine amount"><p>Fine Amount</p><span>₹{wholemaintainData.fine_amount}</span></div>
          <div className="Pending Amount"><p>Total Amount</p><span>₹{wholemaintainData.total_amount}</span></div>
        </div>

        <div className="user_maintenance_contener">
          <h1>Maintenance Details of your Flat</h1>
          <div className="user_status"><p>Status:</p> <strong>{selfmaintainData.status}</strong></div>
          <div className="charge"><p>Fine Amount</p><span>₹{selfmaintainData.fine_amount}</span></div>
          <div className="user_pending"><p>Total Amount</p><span>₹{selfmaintainData.total_amount}</span></div>
        </div>

        <button className="open-details-btn" onClick={() => navigate('/details')}>Profile Details</button>
        <button className="open-details-btn" onClick={() => navigate('/maintainanace')}>Maintenance Details</button>
        <button className="payment-btn" onClick={() => navigate('/payment')}>Proceed to Payment</button>
      </div>

      <div className="chart-container">
        <h2>Maintenance Requests Overview</h2>
        <canvas ref={maintenanceChartRef} id="maintenanceChart"></canvas>
      </div>
    </div>
  );
};

export default UserDashboard;
