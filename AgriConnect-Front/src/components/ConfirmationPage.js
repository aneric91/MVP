import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "../styles/ConfirmationPage.css";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="confirmation-container">
      <CheckCircle className="check-icon" />
      <h2>Congratulations!</h2>
      <p>Your subscription is active.</p>
      <button onClick={() => navigate("/delivery-request")} className="return-button">
        Delivery Request
      </button>
    </div> 
  );
};

export default ConfirmationPage;
