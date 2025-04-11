// components/Complaints.jsx
import { useEffect, useState } from "react";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL/complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Resident Complaints</h2>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id}>
            {complaint.resident} - {complaint.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Complaints;
