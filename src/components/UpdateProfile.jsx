import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../assets/user/welcome.jpg";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/user", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const data = await response.json();
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== undefined && value !== "")
    );

    if (Object.keys(updateData).length === 0) {
      alert("No changes detected.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(resData.message || "Update failed. Please try again.");
        return;
      }

      alert("Profile updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (errorMessage) return <p className="error">{errorMessage}</p>;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Update Your Profile</h2>
      <p className="text-gray-500 mb-4">Keep your information up to date for better communication and security.</p>

      <div className="flex flex-col items-center">
        <img 
          src={profileImg} 
          alt="User Profile" 
          className="rounded-full mb-4 object-cover" 
          style={{ width: "100px", height: "100px" }} 
        />
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Mobile Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Permanent Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2 hover:bg-blue-600">
          Save Changes
        </button>
      </form>

      <button
        className="mt-4 text-gray-600 hover:text-gray-900"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
    </div>
  );
};

export default UpdateProfile;
