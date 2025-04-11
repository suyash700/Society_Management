import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/user/details.css';
import profileImg from '../assets/user/welcome.jpg'; // You can replace this with a dynamic image URL if needed

const UserMaintain = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setErrorMessage("No authentication token found. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/auth/user/maintainance', {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setErrorMessage("Unauthorized: Please log in again.");
            localStorage.removeItem("token"); // Clear invalid token
            setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 sec
          } else {
            throw new Error(`HTTP Error: ${response.status}`);
          }
        } else {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate]); // Added dependencies

  if (isLoading) return <div>Loading...</div>;
  if (errorMessage) return <div>Error: {errorMessage}</div>;

  return (
    <div className="user-details-container">
      <div className="user-info">
        <div className="user-profile">
          <img src={profileImg} alt="User Profile" className="profile-img" />
        </div>
        <div className="user-details">
          <h2 className="user-name">{userData.name}</h2>
          <p><strong>Permanent Address:</strong> {userData.address}</p>
          <p><strong>Mobile Number:</strong> {userData.phone}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Members Living:</strong> {userData.membersLiving} Members</p>
        </div>
      </div>

      <div className="maintenance-section">
        <h3>Maintenance Details</h3>
        <label htmlFor="month-select">Select Month</label>
        <select id="month-select">
          <option value="jan">January</option>
          <option value="feb">February</option>
        </select>

        <div className="maintenance-info">
          <p><strong>Status:</strong> {userData.trasaction_history}</p>
          {/* <p><strong>Amount:</strong> ₹ {userData.maintenance.amount}</p>
          <p><strong>Pending Amount:</strong> ₹ {userData.maintenance.pendingAmount}</p>
          <p><strong>Charge:</strong> ₹ {userData.maintenance.charge}</p> */}
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      <Link to="/update-profile" className="update-btn">Update Profile</Link>
    </div>
  );
};

export default UserMaintain;
