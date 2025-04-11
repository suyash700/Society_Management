// components/Dashboard.jsx
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <button className="btn" onClick={() => navigate("/admin/users")}>
          Residents
        </button>
        <button className="btn" onClick={() => navigate("/admin/maintenance")}>
          Maintenance
        </button>
        <button className="btn" onClick={() => navigate("/admin/complaints")}>
          Complaints
        </button>
        <button className="btn" onClick={() => navigate("/admin/announcements")}>
          Announcements
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
