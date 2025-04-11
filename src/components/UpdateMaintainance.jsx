import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUserMaintenance = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username:"",
    amount: "",
    due_date: "",
    fine_amount: "",
    total_amount: "",
    status: "",

    maintainanceId: "",
  });
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Fetch user data when component loads
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/singlemaintainance/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);

        if (!response.ok) throw new Error("Maintainance not found");
        const data = await response.json();
        setFormData(data); // Fill the form with user data
        console.log(data);
        
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.amount || !formData.due_date || !formData.fine_amount) {
    //   alert("Please fill all required fields.");
    //   return;
    // }

    // ✅ Filter out undefined values (including total_amount)
    const updateData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== "")
    );

    console.log("Sending updateData:", updateData);

    try {
      const response = await fetch(`http://localhost:4000/api/admin/singlemaintainance/update/${id}`, {
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
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div>
          <label>due_date</label>
          <input
            type="due_date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
        </div>

        <div>
          <label>amount</label>
          <input
            type="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div>
          <label>fine_amount</label>
          <input
            type="tel"
            value={formData.fine_amount}
            onChange={(e) => setFormData({ ...formData, fine_amount: e.target.value })}
          />
        </div>

        <div>
          <label>total_amount</label>
          <input
            type="total_amount"
            value={formData.total_amount}
            onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
        </div>
        
        <div>
          <label>Maintainance ID</label>
          <input
            type="text"
            value={formData._id}
            onChange={(e) => setFormData({ ...formData,_id: e.target.value })}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserMaintenance;
