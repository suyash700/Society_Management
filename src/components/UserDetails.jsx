import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/user/details.css';
import profileImg from '../assets/user/welcome.jpg'; // You can replace this with a dynamic image URL if needed

const UserDetails = () => {
  const [userData, setUserData] = useState(null); // Fixed variable name
  const [isLoading, setIsLoading] = useState(true); // Improved variable name
  const [errorMessage, setErrorMessage] = useState(null); // Improved variable name
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const fetchUserData = async () => { // Fixed variable name
      try {
        const response = await fetch('http://localhost:4000/api/auth/user',{
          method:"GET",
          headers:{
              Authorization:`Bearer ${token}`,
          },
        }); // Replace with your API endpoint
        console.log(response);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data); // Fixed variable name
      } catch (error) {
        setErrorMessage(error.message); // Improved variable name
      } finally {
        setIsLoading(false); // Improved variable name
      }
    };

   

    fetchUserData(); // Fixed variable name
    
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>; // Improved variable name
  }

  return (
    <div className="user-details-container">
      <div className="user-info">
        <div className="user-profile">
          <img src={profileImg} alt="User  Profile Picture" className="profile-img" />
        </div>
        <div className="user-details">
          <h2 className="user-name">{userData.name}</h2>
          <p><strong>Permanent Address:</strong> {userData.address}</p>
          <p><strong>Mobile Number:</strong> {userData.phone}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Members Living:</strong> {userData.membersLiving} Members</p>
        </div>
      </div>

      {/* <div className="maintenance-section">
        <h3>Maintenance Details</h3>
        <label htmlFor="month-select">Select Month</label>
        <select id="month-select">
          <option value="jan">January</option>
          <option value="feb">February</option>
        </select> */}

        {/* <div className="maintenance-info">
          <p><strong>Status:</strong> {userData.maintenance.status}</p>
          <p><strong>Amount:</strong> ₹ {userData.maintenance.amount}</p>
          <p><strong>Pending Amount:</strong> ₹ {userData.maintenance.pendingAmount}</p>
          <p><strong>Charge:</strong> ₹ {userData.maintenance.charge}</p>
        </div> */}
      {/* </div> */}
      <button className="back-btn" onClick={() => window.history.back()}>Back</button>
      <Link to="/update-profile" className="update-btn">Update Profile</Link>
    </div>
  );
};

export default UserDetails;