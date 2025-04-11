import React, { useEffect, useState } from "react";
import "../assets/admin/admin.css";
import AllUsers from "../utils/allUsers";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import UpdateUser from "./AdminUpdate";
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [notification, showNotification] = useState({ message: "", type: "" });
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Monthly Meeting", date: "2024-03-15", priority: "high" },
    { id: 2, title: "Maintenance Due", date: "2024-03-20", priority: "medium" },
  ]);
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      user: "John Doe",
      issue: "Water Supply",
      status: "pending",
      date: "2024-03-10",
    },
    {
      id: 2,
      user: "Jane Smith",
      issue: "Parking",
      status: "resolved",
      date: "2024-03-09",
    },
  ]);

  // Mock data - Replace with actual API calls
  const [users, setUsers] = useState([]);
  const [userMaintainData, setUserMaintainData] = useState([]);
  const [userSingleMaintainData, setUserSingleMaintainData] = useState([]);

  const [ContactusData, setContactusData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const getAllUsersData = async () => {
    // const {authorizationToken}=useAuth();

    try {
      const response = await fetch("http://localhost:4000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(`users :${data}`);
      setUsers(data);
      // console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  //delete user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(`users AFTER DELETE :${data}`);

      //no refresh needed
      if (response.ok) {
        getAllUsersData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() =>{
  //     getAllUsersData();

  // },[])

  const getAllMaitainData = async () => {
    // const {authorizationToken}=useAuth();

    try {
      const response = await fetch(
        "http://localhost:4000/api/admin/maintainances",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(`users :${data}`);
      setUserMaintainData(data);
      // console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() =>{
  //   getAllMaitainData();

  // },[])

  const getContactusData = async () => {
    // const {authorizationToken}=useAuth();

    try {
      const response = await fetch("http://localhost:4000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(`users :${data}`);
      setContactusData(data);
      // console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() =>{
  //   getContactusData();

  // },[])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let password = e.target.password;
    let address = e.target.address;

    setFormData({
      ...users,
      [name]: value,
    });
  };
  const handleUserUpdate = async (e, userData, id) => {
    // Implement user update logic

    // e.preventDefault();

    formData.name = userData.name;
    formData.email = userData.email;
    formData.phone = userData.phone;
    //  formData.name=userData.name;

    console.log(userData._id);

    try {
      console.log("Update Resident Registration Data:", formData);

      const response = await fetch(
        `http://localhost:4000/api/admin/users/update/${userData}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || " USER UPDATE failed");
      }
      onUpdate(); // Refresh user list
      onClose(); // Close modal

      showNotification("USER UPDATEsuccessful! ");

      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 2000);
    } catch (error) {
      console.log("Error from frontend updation:", error);
      showNotification(error.message, "error");
    }
    console.log("Updating user:", userData);
    setShowUpdateModal(false);
  };

  const handleMaintenanceUpdate = async (maintenanceData) => {
    // Implement maintenance update logic
    console.log(userData._id);
    try {
      console.log("Update Resident Registration Data:", formData);

      const response = await fetch(
        `http://localhost:4000/api/admin/users/update/${userData}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || " USER UPDATE failed");
      }
      onUpdate(); // Refresh user list
      onClose(); // Close modal

      showNotification("USER UPDATEsuccessful! ");

      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 2000);
    } catch (error) {
      console.log("Error from frontend updation:", error);
      showNotification(error.message, "error");
    }
    console.log("Updating maintenance:", maintenanceData);
    setShowMaintenanceModal(false);
  };

  const handleAddUser = (userData) => {
    // Implement add user logic
    console.log("Adding user:", userData);
    setShowAddUserModal(false);
  };

  const handleAddAnnouncement = (announcementData) => {
    // Implement add announcement logic
    console.log("Adding announcement:", announcementData);
    setShowAnnouncementModal(false);
  };

  const handleComplaintUpdate = (complaintData) => {
    // Implement complaint update logic
    console.log("Updating complaint:", complaintData);
    setShowComplaintModal(false);
  };

  const renderDashboard = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-users"></i>
          <h3>Total Residents</h3>
          <span className="amount">{users.length}</span>
        </div>
        <div className="stat-card">
          <i className="fas fa-money-bill-wave"></i>
          <h3>Total Collection</h3>
          <span className="amount">₹50,000</span>
        </div>
        <div className="stat-card">
          <i className="fas fa-exclamation-circle"></i>
          <h3>Pending Complaints</h3>
          <span className="amount pending">
            {complaints.filter((c) => c.status === "pending").length}
          </span>
        </div>
        <div className="stat-card">
          <i className="fas fa-bullhorn"></i>
          <h3>Active Announcements</h3>
          <span className="amount">{announcements.length}</span>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => setShowAddUserModal(true)}>
            <i className="fas fa-user-plus"></i> Add New Resident
          </button>
          <button onClick={() => setShowAnnouncementModal(true)}>
            <i className="fas fa-bullhorn"></i> Post Announcement
          </button>
          <button onClick={() => setShowComplaintModal(true)}>
            <i className="fas fa-tasks"></i> Manage Complaints
          </button>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {[
            ...users.map((user) => ({ ...user, key: `user-${user.id}` })),
            ...complaints.map((complaint) => ({
              ...complaint,
              key: `complaint-${complaint.id}`,
            })),
            ...announcements.map((announcement) => ({
              ...announcement,
              key: `announcement-${announcement.id}`,
            })),
          ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5)
            .map((item) => (
              <div key={item.key} className="activity-item">
                <i className={`fas ${getActivityIcon(item)}`}></i>
                <div className="activity-details">
                  <p>{getActivityText(item)}</p>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const getActivityIcon = (item) => {
    if ("maintenance" in item) return "fa-money-bill-wave";
    if ("priority" in item) return "fa-bullhorn";
    return "fa-exclamation-circle";
  };

  const getActivityText = (item) => {
    if ("maintenance" in item) return `${item.name} made a maintenance payment`;
    if ("priority" in item) return `New announcement: ${item.title}`;
    return `${item.user} reported: ${item.issue}`;
  };

  const renderAllUsers = () => (
    <div className="users-section">
      <div className="section-header">
        <h2>All Residents</h2>
        <button onClick={() => setShowAddUserModal(true)} className="add-btn">
          <i className="fas fa-user-plus"></i> Add New Resident
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search residents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Flat</th>
              <th>Phone</th>
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.flat}</td>
                <td>{user.phone}</td>
                {/* <td><button onClick={()=> handleUserUpdate(null,user._id)}>Edit</button></td> */}
                <td>
                  <Link to={`/admin/edit-user/${user._id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
               
                <td>
                  <button onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
                {/* <td> */}
                {/* <span className={`status ${user.status}`}>
                    {user.maintenance.status}
                  </span> */}
                {/* </td> */}

                {/* <td>
                  <button onClick={() => setSelectedUser(user)} title="View Details">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button onClick={() => {
                    setSelectedUser(user);
                    handleUserUpdate(user._id)
                    setShowUpdateModal(true);
                    
                  }} title="Edit">EDIT
                    <i className="fas fa-edit"></i>
                  </button>
                  
                  
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {showUpdateModal && selectedUser && (
          <UpdateUser
            user={selectedUser}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={setUsers} // Refresh user list after updating
          />
        )}
      </div>
    </div>
  );

  // <div className="admin-dashboard">
  //     <nav>
  //       <ul>
  //         <li><Link to="/admin/users">Manage Users</Link></li>
  //         {/* Add other links as needed */}
  //       </ul>
  //     </nav>

  //     <div className="dashboard-content">
  //       <Routes>
  //         <Route path="users" element={<AllUsers />} />
  //         {/* Add other routes here */}
  //       </Routes>
  //     </div>
  //   </div>

  const renderUserDetails = () => (
    <div className="user-details">
      {selectedUser ? (
        <>
          <div className="section-header">
            <h2>User Details</h2>
            <button onClick={() => setSelectedUser(null)} className="back-btn">
              <i className="fas fa-arrow-left"></i> Back
            </button>
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <label>Name</label>
              <span>{selectedUser.name}</span>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <span>{selectedUser.email}</span>
            </div>
            <div className="detail-item">
              <label>Flat</label>
              <span>{selectedUser.flat}</span>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <span>{selectedUser.phone}</span>
            </div>
            <div className="detail-item">
              <label>Maintenance Amount</label>
              <span>₹{selectedUser.maintenance.amount}</span>
            </div>
            <div className="detail-item">
              <label>Last Payment</label>
              <span>{selectedUser.maintenance.lastPaid}</span>
            </div>
          </div>
          <div className="action-buttons">
            <button
              onClick={() => {
                setShowUpdateModal(true);
              }}
            >
              <i className="fas fa-edit"></i> Update Details
            </button>
            <button
              onClick={() => {
                setShowMaintenanceModal(true);
              }}
            >
              <i className="fas fa-money-bill-wave"></i> Update Maintenance
            </button>
          </div>
        </>
      ) : (
        <p>Select a user to view details</p>
      )}
    </div>
  );

  const renderMaintenanceOverview = () => (
    
    <div className="maintenance-overview">
      <div className="section-header">
        <h2>Maintenance Overview</h2>
        <div className="date-filter">
          <select>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>
      <div className="stats-grid">
      <div className="stat-card">
  <h3>Total Collection</h3>
  <span className="amount">₹{userMaintainData.reduce((sum, user) => sum + user.total_amount, 0)}</span>
</div>
        <div className="stat-card">
          <h3>Pending Payments</h3>
          <span className="amount pending">₹15,000</span>
        </div>
        <div className="stat-card">
          <h3>Paid This Month</h3>
          <span className="amount success">₹35,000</span>
        </div>
      </div>
      <div className="maintenance-table">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>User_id</th>
              <th> Amount</th>
              <th>Fine Amount</th>
              <th>Total Amount</th>
             
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {userMaintainData.map((user, index) => {
    console.log("User Object:", user); // Debugging user data

    return (
      <tr key={index}>
        <td>{user.username}</td>
        <td>{user.user_id}</td>
        <td>{user.amount}</td>
        <td>{user.fine_amount}</td>
        <td>₹{user.total_amount}</td>
        
        <td>{user.due_date}</td>
        <td>
          <span className={`status ${user.status}`}>{user.status}</span>
        </td>
        <td>
          <Link to={`/admin/update-maintenance/${user._id}`}>
            <button>Update Maintenance</button>
          </Link>
        </td>
        <td>
          <button
            onClick={() => {
              setSelectedUser(user);
              setShowMaintenanceModal(true);
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        </td>
      </tr>
    );
  })}
</tbody>

          
        </table>
        {showMaintenanceModal && selectedUser && (
  <UpdateUserMaintenance
    user={selectedUser}
    onClose={() => setShowMaintenanceModal(false)}
    onUpdate={setUsers}
   
  />
)}


      </div>
    </div>
  );

  const renderAnnouncements = () => (
    <div className="announcements-section">
      <div className="section-header">
        <h2>Announcements</h2>
        <button
          onClick={() => setShowAnnouncementModal(true)}
          className="add-btn"
        >
          <i className="fas fa-plus"></i> New Announcement
        </button>
      </div>
      <div className="announcements-grid">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-card">
            <div className={`priority-badge ${announcement.priority}`}>
              {announcement.priority}
            </div>
            <h3>{announcement.title}</h3>
            <p>Date: {new Date(announcement.date).toLocaleDateString()}</p>
            <div className="announcement-actions">
              <button
                onClick={() => {
                  // Handle edit
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                onClick={() => {
                  // Handle delete
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComplaints = () => (
    <div className="complaints-section">
      <div className="section-header">
        <h2>Complaints</h2>
        <div className="filter-buttons">
          <button className="active">All</button>
          <button>Pending</button>
          <button>Resolved</button>
        </div>
      </div>
      <div className="complaints-grid">
        {ContactusData.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <div className={`status-badge ${complaint.email}`}>
              {complaint.email}
            </div>
            <h3>{complaint.name}</h3>
            <p>Reported by: {complaint.message}</p>
            <p>Date: {new Date(complaint.date).toLocaleDateString()}</p>
            <div className="complaint-actions">
              <button
                onClick={() => {
                  setShowComplaintModal(true);
                }}
              >
                <i className="fas fa-edit"></i> Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="logo">SocietyApp Admin</div>
        <ul className="admin-nav-links">
          <li>
            <button
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              <i className="fas fa-home"></i> Dashboard
            </button>
          </li>
          <li>
            <button
              className={activeTab === "all-users" ? "active" : ""}
              // onClick={() => setActiveTab('all-users')}

              onClick={() => {
                setActiveTab("all-users");
                getAllUsersData();
              }}
            >
              <i className="fas fa-users"></i> Residents
            </button>
          </li>
          <li>
            <button
              className={activeTab === "maintenance" ? "active" : ""}
              // onClick={() => setActiveTab('maintenance')}
              onClick={() => {
                setActiveTab("maintenance");
                getAllMaitainData();
              }}
            >
              <i className="fas fa-money-bill-wave"></i> Maintenance
            </button>
          </li>
          <li>
            <button
              className={activeTab === "announcements" ? "active" : ""}
              onClick={() => setActiveTab("announcements")}
            >
              <i className="fas fa-bullhorn"></i> Announcements
            </button>
          </li>
          <li>
            <button
              className={activeTab === "complaints" ? "active" : ""}
              onClick={() => setActiveTab("complaints")}
            >
              <i className="fas fa-exclamation-circle"></i> Complaints
            </button>
          </li>
        </ul>
      </nav>

      <div className="admin-content">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "all-users" && renderAllUsers()}
        {activeTab === "user-details" && renderUserDetails()}
        {activeTab === "maintenance" && renderMaintenanceOverview()}
        {activeTab === "announcements" && renderAnnouncements()}
        {activeTab === "complaints" && renderComplaints()}
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Resident</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser({});
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Flat Number</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" required />
              </div>
              <div className="modal-actions">
                <button type="submit">Add Resident</button>
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAnnouncementModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Post New Announcement</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAnnouncement({});
              }}
            >
              <div className="form-group">
                <label>Title</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea required></textarea>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select required>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit">Post Announcement</button>
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Complaint Modal */}
      {showComplaintModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Complaint Status</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleComplaintUpdate({});
              }}
            >
              <div className="form-group">
                <label>Status</label>
                <select required>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resolution Notes</label>
                <textarea></textarea>
              </div>
              <div className="modal-actions">
                <button type="submit">Update Status</button>
                <button
                  type="button"
                  // onClick={() => setShowComplaintModal(false)}
                  onClick={() => {
                    setActiveTab("all-users");
                    getContactusData();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Existing Modals */}
      {showUpdateModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update User Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUserUpdate(selectedUser, e);
              }}
            >
              <div className="form-group">
                <label>Name</label>
                <input type="text" defaultValue={selectedUser?.name} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={selectedUser?.email} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue={selectedUser?.phone} />
              </div>
              <div className="form-group">
                <label>Flat</label>
                <input type="text" defaultValue={selectedUser?.flat} />
              </div>
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowUpdateModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMaintenanceModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Maintenance Details</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleMaintenanceUpdate(selectedUser);
              }}
            >
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  defaultValue={selectedUser?.maintenance.total_amount}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select defaultValue={selectedUser?.maintenance.status}>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <div className="form-group">
                <label>Last Payment Date</label>
                <input
                  type="date"
                  defaultValue={selectedUser?.maintenance.lastPaid}
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Update</button>
                <button
                  type="button"
                  onClick={() => setShowMaintenanceModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Logout />
    </div>
  );
};

export default AdminDashboard;
