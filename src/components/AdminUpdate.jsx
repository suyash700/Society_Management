import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password:"",
    maintainanceId:""
  });
const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    // Fetch user data when component loads
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/users/${id}`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`,
            }
            });
            console.log(response);
            
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setFormData(data); // Fill the form with user data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill all required fields.");
        return;
    }

    // ✅ Filter out undefined values (including password)
    const updateData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== undefined && value !== "")
    );

    console.log("Sending updateData:", updateData);

    try {
        const response = await fetch(`http://localhost:4000/api/admin/users/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
        });

        const resData = await response.json();

        if (!response.ok) {
            console.error("Server Error Response:", resData);
            throw new Error(resData.message || "Update failed");
        }

        alert("User updated successfully!");
        navigate("/admin");
    } catch (error) {
        console.error("Error updating user:", error);
    }
};


  return (
    <div className="container">
  <h2>Edit User</h2>
  <form onSubmit={handleSubmit}>
    <div>
      <label>Name</label>
      <input type="text" value={formData.name} 
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
    </div>
    
    <div>
      <label>Email</label>
      <input type="email" value={formData.email} 
        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
    </div>
    
    <div>
      <label>Phone</label>
      <input type="tel" value={formData.phone} 
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
    </div>

    <div>
      <label>Password</label>
      <input type="password" value={formData.password} 
        onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
    </div>

    <div>
      <label>Maintainance ID</label>
      <input type="text" value={formData.maintainanceId} 
        onChange={(e) => setFormData({ ...formData, maintainanceId: e.target.value })} />
    </div>
    
    <button type="submit">Update</button>
  </form>
</div>

  );
};

export default EditUser;
