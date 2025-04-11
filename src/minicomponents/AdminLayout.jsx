import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userIsAdmin = JSON.parse(localStorage.getItem("isAdmin"));

    if (!token || userIsAdmin === false) {
      navigate("/login"); // Redirect to login if not admin
    } else {
      setLoading(false); // Stop loading when check is complete
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("isAdmin"); // Remove admin status
    navigate("/login"); // Redirect to login page
  };

  // Show a loading message while checking admin status
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex">
      <button className="logout-button bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Logout
      </button>
      <div className="p-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
