// components/Announcements.jsx
import { useEffect, useState } from "react";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("YOUR_BACKEND_API_URL/announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Announcements</h2>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.id}>{announcement.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
