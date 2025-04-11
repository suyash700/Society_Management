import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import './logout.css';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { Logoutuser } = useAuth();

    const handleLogout = () => {
        Logoutuser(); // Calls the logout function from auth context
        localStorage.removeItem("token"); // Remove token from local storage
        navigate("/login"); // Redirects to login page
    };

    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
        </button>
    );
};

export default LogoutButton;
