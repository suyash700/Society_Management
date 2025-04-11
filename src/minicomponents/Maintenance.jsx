// components/Maintenance.jsx
import { useEffect, useState } from "react";

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL/maintenance");
        const data = await response.json();
        setMaintenanceData(data);
      } catch (error) {
        console.error("Error fetching maintenance data:", error);
      }
    };

    fetchMaintenance();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Maintenance Records</h2>
      <ul>
        {maintenanceData.map((item) => (
          <li key={item.id}>
            {item.residentName} - {item.amount} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maintenance;
