// src/components/VerifyPayment.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyPayment = ({ amount, method }) => {
  const navigate = useNavigate();
 const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const verifyAndStore = async () => {
     
      try {
        const res = await fetch("http://localhost:4000/api/auth/user/createorder", {
          method: "POST",
          headers: {
           // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: "user-id-from-context-or-props", // Update this accordingly
            amount,
            method,
            status: "completed",
            transactionId: `TXN${Date.now()}`,
          }),
        });

        const data = await res.json();
        console.log("Payment verified:", data);
        navigate("/dashboard");
      } catch (error) {
        console.error("Verification failed:", error);
      }
    };

    verifyAndStore();
  }, [amount, method, navigate]);

  return (
    <div className="verification-page">
      <h2>Verifying your payment...</h2>
      <p>Please wait. Do not refresh the page.</p>
    </div>
  );
};

export default VerifyPayment;
