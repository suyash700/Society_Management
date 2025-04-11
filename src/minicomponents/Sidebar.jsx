// components/Sidebar.jsx
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li><Link to="/admin/users">Residents</Link></li>
        <li><Link to="/admin/maintenance">Maintenance</Link></li>
        <li><Link to="/admin/complaints">Complaints</Link></li>
        <li><Link to="/admin/announcements">Announcements</Link></li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
